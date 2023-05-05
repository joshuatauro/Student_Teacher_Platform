import React, { useEffect, useState } from 'react'
import axios from '../axios'
import PostPreview from '../Components/PostPreview'
import SideNav from '../Components/sidenav'
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
    <div className=''>
      
      <div className="w-full min-h-screen border-l-2 ">
        {
          posts?.map(({id, profile_url, username, title, branch, body, upvoted_by, downvoted_by, total_replies, sub_flair, created_at, is_pinned}) => <PostPreview title={title} body={body} qID={id} branch={branch} upvotedBy={upvoted_by} downvotedBy={downvoted_by} totalAnswers={total_replies} url={profile_url} username={username} subFlair={sub_flair} createdAt={created_at} />)
        }
      </div>
    </div>
  )
}

export default Landing