const express = require('express')
const cors = require("cors")
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
const bodyParser = require("body-parser")
const morgan = require("morgan")

const app = express()
app.use((cors({credentials: true, origin: "http://localhost:3000"})))
app.use(morgan('tiny'))
app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

const authMiddleWare = async(req, res, next) => {
  const token = req.cookies.auth
  try{
    const {username, id, priority} = jwt.verify(token, process.env.JWT_SECRET)
    req.username = username
    req.userID=id
    req.priority = priority
    next()
  } catch(err){
    console.log(err)
    next()
  }
} 

app.use(authMiddleWare)

app.use("/api/auth", require("./Routes/auth.routes"))
app.use("/api/questions", require("./Routes/questions.routes"))
app.use("/api/answers", require("./Routes/answers.routes"))
app.use("/api/voting", require("./Routes/voting.routes"))
app.use("/api/users", require("./Routes/users.routes"))

app.listen(5000, () => {
  console.log("Listening to server at PORT", 5000, "!")
})