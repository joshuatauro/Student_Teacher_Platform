const router = require("express").Router()
const db = require("../dbConfig")

router.post("/post", async(req, res) => {
  const { title, body, flair, cID } = req.body
  try{

    if(!req.userID) return res.status(400).json({code: -1, message: "Login to be able to post"})

    if(!title || !body) return res.status(400).json({code: -1, message: "Please enter all fields"})


    const getQuestionsQuery = await db.query(`
      INSERT INTO questions(title, body, sub_flair, search_helper, created_at, upvoted_by, user_id, c_id) VALUES
      ($1,$2,$3, to_tsvector($4), $5, $6, $7, $8) returning id
    `, [title, body,flair, body, new Date(), [req.userID], req.userID, cID])

    if(getQuestionsQuery.rowCount>0){
      return res.status(200).json({
        code: 1,
        message: "Successfully created the post, redirecting",
        id: getQuestionsQuery.rows[0].id
      })
    }

  } catch(err){
    console.log(err)
  }
})

router.get("/id/:id", async(req, res) => {
  const id = req.params.id
  try{

    const getQuestionByIDQuery = await db.query(`
      SELECT q.id, user_id, title, body, sub_flair, upvoted_by, downvoted_by, created_at, username, profile_url
      FROM questions q
      JOIN users u ON q.user_id = u.id
      WHERE q.id = $1
    `, [id])

    console.log(getQuestionByIDQuery.rows[0])

    return res.status(200).json({code: 1, post: getQuestionByIDQuery.rows[0]})

  } catch(err) {
    console.log(err)
  }
})

router.get('/', async(req, res) => {
  const flair = req.query.flair
  try{
    if(!flair){
      const getPostDetailsByFlair = await db.query(`
        SELECT q.id, q.user_id, q.title, q.body, sub_flair, q.upvoted_by, q.downvoted_by, q.created_at, username, COUNT(a.q_id) as total_replies, username, profile_url
        FROM questions q
        JOIN users u ON q.user_id = u.id
        LEFT JOIN answers a ON q.id = a.q_id
        GROUP BY q.id, u.username, u.profile_url
        ORDER BY q.created_at DESC
      `)
      if(getPostDetailsByFlair.rowCount > 0){
        return res.status(200).json({code: 1, posts: getPostDetailsByFlair.rows})
      }else{
        return res.status(200).json({code:1, message: "Could not find any posts with that specific flair"})
      }
    }
  } catch(err){
    console.log(err)
  }

})

router.post('/edit/:qid', async(req, res) => {
  const { editedBody } = req.body
  const qID = req.params.qid
  const userID = req.userID
  console.log("This is the usyer id => ", userID, req.username)
  try{

    if(!userID) return res.status(400).json({code: -1, message: "Forbidden"})
    console.log(userID)
    const updateQuestionQuery = await db.query(`
      UPDATE questions SET
      body=$1,  search_helper=to_tsvector($2)
      WHERE id=$3 AND user_id=$4 returning body
    `, [editedBody,  editedBody, qID, userID])

    res.status(200).json({code: 1,editedBody: updateQuestionQuery.rows})

  } catch(err){
    console.log(err.message)
  }
})

router.delete('/delete/:qID', async(req, res) => {
  const qID = req.params.qID
  const userID = req.userID
  try{
    if(!userID) return res.status(400).json({code: -1, message: "Login to your account to be able to delete posts"})
    
    const deletePostQuery = await db.query(`
      DELETE FROM questions 
      WHERE id = $1 AND user_id = $2 returning id
    `, [qID, userID])

    res.status(200).json({code: 1, message: "Deleted", value: deletePostQuery.rows})

  } catch(err){
    console.log(err)
  }
})

router.get("/search", async(req, res)=>{
  const searchParam = req.query.q.replace(/\s/g, "|");
  console.log(searchParam, "is the param")
  try{
    const getBySearchQuery = await db.query(`
    SELECT q.id, q.user_id, q.title, q.body, sub_flair, q.upvoted_by, q.downvoted_by, q.created_at, username, COUNT(a.q_id) as total_replies, search_helper, profile_url
      FROM questions q
      JOIN users u ON q.user_id = u.id
      LEFT JOIN answers a ON q.id = a.q_id
      GROUP BY q.id, u.username, u.profile_url
      HAVING search_helper @@ to_tsquery($1)
      ORDER BY q.created_at DESC
      `, [searchParam])
    res.status(200).json({code: 1, posts: getBySearchQuery.rows})
  }catch(err){
    console.log(err)
  }
})

module.exports = router;