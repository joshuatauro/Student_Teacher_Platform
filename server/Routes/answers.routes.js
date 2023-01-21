const router = require("express").Router()
const db = require("../dbConfig")
router.post("/post", async(req, res) => {
  const {qID, body}=req.body
  const userID = req.userID

  try{
    if(!userID) return res.status(400).json({code: -1, message: "Login to post answers"})
    if(!qID || !body) return res.status(400).json({code: -1, message: "Enter all the required fields"})

    const publishAnswerQuery = await db.query(`
      INSERT INTO answers(q_id, user_id, body, upvoted_by, created_at) VALUES
      ($1,$2,$3,$4,$5) returning *
    `,[qID, userID,body,[userID], new Date()])

    res.status(200).json({code: 1, answer: publishAnswerQuery.rows[0]})

  }catch(err) {
    console.log(err)
  }

})

router.get("/id/:qID", async(req, res) => {
  const qID = req.params.qID
  try{
    if(!qID) return res.status(400).json({code: -1, message: "Enter all the required fields"})

    const getAnswersQuery = await db.query(`
      SELECT a.id, a.user_id, a.q_id, a.body, a.created_at, a.updated_at, a.upvoted_by, a.downvoted_by, a.is_verified, username, profile_url
      FROM answers a
      JOIN users u ON u.id = a.user_id 
      WHERE a.q_id = $1
      ORDER BY cardinality(upvoted_by) - cardinality(downvoted_by)
    `, [qID])

    const getCommentsQuery = await db.query(`
    SELECT c.id, c.user_id, c.a_id, c.q_id, body, c.created_at, c.updated_at, c.updated_at, username, profile_url
    FROM comments c
    LEFT JOIN users ON users.id = c.user_id
    WHERE c.q_id = $1
    ORDER BY c.created_at desc
    `, [qID])

    res.status(200).json({code: 1, answers: getAnswersQuery.rows, comments: getCommentsQuery.rows})


  }catch(err){
    console.log(err)
  }

})

router.delete("/delete/:aID", async(req, res) => {
  const aID = req.params.aID
  const userID = req.userID
  try{

    if(!userID) return res.status(200).json({code: -1, message: "Please login to be able to delete answers"})

    const deleteAnswerQuery = await db.query(`DELETE FROM answers
    WHERE id = $1 AND user_id = $2
    returning id`, [aID, userID])
    res.status(200).json({
      code: 1,
      message: "Successfully deleted the answer!",
      deletedAnswer: deleteAnswerQuery.rows[0]
    })

  } catch(err) {
    console.log(err)
  }
})

router.post("/edit/:aID", async(req, res) => {
  const { editedAns } = req.body
  const aID = req.params.aID
  const userID = req.userID
  try{
    if(!userID) return res.status(400).json({code: -1, message: "Login to post answers"})
    if(!qID || !editedAns) return res.status(400).json({code: -1, message: "Enter all the required fields"})

    const editAnswerQuery = await db.query(`
      UPDATE answers SET
      body=$1, updated_at=$2
      WHERE user_id=$3 AND a_id=$4  
      returning body
    `)

    res.status(200).json({code: 1, editedContent: editAnswerQuery.rows[0]})

  } catch(err) {

  }
})

module.exports = router;