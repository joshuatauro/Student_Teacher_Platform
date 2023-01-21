const router = require("express").Router()
const db = require("../dbConfig")
router.post("/post", async(req, res) => {
  const { comment, qID, aID } = req.body

  try{
    const postCommentQuery = await db.query(`
      INSERT INTO comments (q_id, a_id, user_id, body, created_at)
      VALUES ($1, $2, $3, $4, $5) returning *
    `, [qID, aID, userID, comment, new Date()])

    res.status(200).json({code: 1, details: postCommentQuery.rows[0]})
  } catch(err) {
    console.log(err)
    console.log(err)
  }
})


module.exports = router