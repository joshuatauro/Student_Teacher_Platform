import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import PostPreview from '../Components/PostPreview'
import axios from '../axios'
import { Link, useSearchParams } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import { InformationCircleIcon } from '@heroicons/react/outline'

const SearchQuestions = () => {
  const [questions, setQuestions] = useState([])
  const [page, setPage] = useState(0)
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const fetchPosts = async() => {
      const { data } = await axios.get(`/api/questions/search?q=${searchParams.get("q")}`)
      setQuestions(data.posts)
      console.log(data)
    }

    fetchPosts()
  }, [searchParams])




  return (
    <div className="md:border-x-2 min-h-custom dark:bg-dark dark:text-white dark:border-dark-fade transition duration-300">
      <div className="px-4 m-auto py-5 border-b-2 dark:border-gray-700 ">
        <div className="flex items-center justify-between">
          <h1 className="text-mobile-lg md:text-[24px] font-medium text-gray-800 dark:text-white mr-2">Search</h1>
          <Link to="/post" className="bg-cta px-5 py-2 md:px-5 md:py-3 text-[14px] md:text-sm font-medium min-w-max text-white rounded-default place-self-start ">
            Ask Question 
          </Link>
        </div>
        
      </div>
      {
        questions?.length > 0 ? (
          <>
          {questions?.map(({title, body, profile_url, username, created_at, total_replies, tags, upvoted_by, downvoted_by, question_id, branch, id}) => <PostPreview title={title} branch={branch} body={body} qID={id} username={username} upvotedBy={upvoted_by} downvotedBy={downvoted_by} createdAt={created_at} totalAnswers={total_replies} url={profile_url} />)}
          <div className="flex justify-center my-4">
      </div>  
          </>
          ) : (
            <h1 className="text-2xl font-semibold flex items-center justify-center my-3 w-full">No posts found :(</h1>
          )
      }

      
      <Toaster position="bottom-right" /> 
    </div>
  )
}

export default SearchQuestions