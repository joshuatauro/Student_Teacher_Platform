const router = require("express").Router()
const db = require("../dbConfig")
const bcrypt = require("bcrypt")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

require("dotenv").config()

router.post("/sign-up", async(req, res) => {
  const {email, password, username, semester, yop} = req.body

  try{
    if(!email || !password || !username) return res.status(400).json({code: -1,message: "Enter all the details"})
    
    const checkDuplicateQuery = await db.query(`
      SELECT username FROM users
      WHERE username ILIKE $1
    `, [username])

    if(checkDuplicateQuery.rowCount>0) return res.status(400).json({code: -1,message: "The username is in use"})

    const checkEmailQuery = await db.query(`
      SELECT email FROM users
      WHERE email = $1
    `, [email])

    const identifier = email.split("@")[1]
    
    const getCollegeName = await db.query("SELECT clg_name FROM college WHERE email_identifier = $1", [identifier])

    const collegeName = getCollegeName.rows[0]?.clg_name || "general"

    if(checkEmailQuery.rowCount > 0) return res.status(400).json({code: -1,message: "The email is already in use"})

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    let gravitarURL = `https://www.gravatar.com/avatar/${md5(
      email.trim().toLowerCase()
    )}?d=identicon`;


    const saveUserDetailsQuery = await db.query(`
      INSERT INTO users (email, username, hashed_password, site_joined, profile_url, college_name) 
      VALUES ($1, $2, $3, $4, $5, $6) 
      RETURNING id, profile_url, username, college_name
    `, [email, username, hashedPassword, new Date(),gravitarURL, collegeName])
    
    if(saveUserDetailsQuery.rowCount>0){
      const authToken = jwt.sign({
        username,
        id: saveUserDetailsQuery.rows[0].id,
      }, process.env.JWT_SECRET)

      res.cookie("auth", authToken, {httpOnly: true, sameSite: 'lax'}).status(200).json({
        code: 1,
        message: "Successfully created a new user!",
        isLoggedIn: true,
        userID: saveUserDetailsQuery.rows[0].id,
        username: saveUserDetailsQuery.rows[0].username ,
        url: saveUserDetailsQuery.rows[0].profile_url,
      })

    }
  } catch(err) {
    console.log(err)
  }
})

router.post("/login", async(req, res) => {
  const { email, password } = req.body
  console.log(req.body)

  try{
    if(!email || !password) return res.status(400).json({code: -1, message: "Please make sure all the details are entered properly"})

    const getDetailsQuery = await db.query(`
      SELECT email, hashed_password, clg_name, username, id, profile_url FROM users
      WHERE email ILIKE $1
    `, [email])

    if(getDetailsQuery.rowCount<=0) return res.status(400).json({code:-1,message: "No such account found"})

    if(getDetailsQuery.rows[0].email != email) return res.status(400).json({code:-1,message: "No such account found"})
    if(await bcrypt.compare(password, getDetailsQuery.rows[0].hashed_password)){
      const authToken = jwt.sign({
        username: getDetailsQuery.rows[0].username,
        id: getDetailsQuery.rows[0].id,
      }, process.env.JWT_SECRET)
      res.cookie("auth", authToken, {httpOnly: true, sameSite: 'lax'}).status(200).json({
        code: 1, message: "Logged in successfully",
        isLoggedIn: true,
        userID: getDetailsQuery.rows[0].id,
        username: getDetailsQuery.rows[0].username ,
        url: getDetailsQuery.rows[0].profile_url,
        college: getDetailsQuery.rows[0].clg_name 
      })
    }else{
      return res.status(400).json({
        code: -1,
        message: "Could not login, please check your email and/or password"
      })
    }
  }catch(err) {
    console.log(err)
  }
})

router.get("/logout", async(req, res) => {
  try{
    res.clearCookie("auth").status(200).json({code: 1, message: "Logged out"})
  }catch(err){
    console.log(err)
  }
})

router.get("/status", async (req, res) => {
  const userID = req.userID;
  const username = req.username;
  const url = req.profile_url;
  res.status(200).json({
    status: "Success",
    userID,
    username,
    isLoggedIn: userID ? true : false,
    url,
  });
});

module.exports = router