const router = require("express").Router()
const db = require("../dbConfig")
const bcrypt = require("bcrypt")
const md5 = require("md5")
const jwt = require("jsonwebtoken")

require("dotenv").config()

router.post("/sign-up", async(req, res) => {
  const {email, password, username, semester, branch, yop} = req.body
  console.log(req.body)

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

    if(checkEmailQuery.rowCount > 0) return res.status(400).json({code: -1,message: "The email is already in use"})

    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    let gravitarURL = `https://www.gravatar.com/avatar/${md5(
      email.trim().toLowerCase()
    )}?d=identicon`;


    const saveUserDetailsQuery = await db.query(`
      INSERT INTO users (email, username, hashed_password, site_joined, priority, semester, branch, year_of_passing, profile_url) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) 
      RETURNING id
    `, [email, username, hashedPassword, new Date(), 0, semester, branch, yop, gravitarURL])
    
    if(saveUserDetailsQuery.rowCount>0){
      const authToken = jwt.sign({
        username,
        id: saveUserDetailsQuery.rows[0].id,
        priority: 0,
      }, process.env.JWT_SECRET)

      res.cookie("auth", authToken, {httpOnly: true, sameSite: 'lax'}).status(200).json({
        code: 1,
        message: "Successfully created a new user!",
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
      SELECT email, hashed_password, priority, username, id FROM users
      WHERE email ILIKE $1
    `, [email])

    if(getDetailsQuery.rows[0].email != email) return res.status(400).json({code:-1,message: "No such account found"})
    if(await bcrypt.compare(password, getDetailsQuery.rows[0].hashed_password)){
      const authToken = jwt.sign({
        username: getDetailsQuery.rows[0].username,
        id: getDetailsQuery.rows[0].id,
        priority: getDetailsQuery.rows[0].priority
      }, process.env.JWT_SECRET)
      res.cookie("auth", authToken, {httpOnly: true, sameSite: 'lax'}).status(200).json({code: 1, message: "Logged in successfully"})
    }else{
      return res.status(400).json({
        code: -1,
        message: "Could not login, please check your email and/or password"
      })
    }

  }catch(err) {
    console.log("this is the error" ,err)
  }
})

router.get("/logout", async(req, res) => {
  try{
    res.clearCookie("auth").status(200).json({code: -1, message: "Logged out"})
  }catch(err){
    console.log(err)
  }
})

module.exports = router