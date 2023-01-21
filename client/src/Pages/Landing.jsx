import React, { useEffect, useState } from 'react'
import axios from '../axios'
import PostPreview from '../Components/PostPreview'
const Landing = () => {

  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getDetails = async() => {
      const {data} = await axios.get("/api/questions/branch/cse", { withCredentials: false })
      console.log(data)
      setPosts(data.posts)
    }
    getDetails()
  }, [])

  return (
    <div className='w-full grid grid-cols-layout'>
      <h1>ddd </h1>
      
      <div className="w-full min-h-screen border-l-2 ">
        {
          posts.map(({id, profile_url, username, title, branch, semester, body, upvoted_by, downvoted_by, total_replies}) => <PostPreview title={title} body={body} qID={id} branch={branch} upvotedBy={upvoted_by} downvotedBy={downvoted_by} totalAnswers={total_replies} url={profile_url} username={username} />)
        }
        {
          posts.map(({id, profile_url, username, title, branch, semester, body, upvoted_by, downvoted_by, total_replies}) => <PostPreview title={title} body={body} qID={id} branch={branch} upvotedBy={upvoted_by} downvotedBy={downvoted_by} totalAnswers={total_replies} url={profile_url} username={username} />)
        }
      </div>
    </div>
  )
}

export default Landing