import React, { useEffect, useState } from 'react'
import axios from '../axios'
import { useNavigate, useParams } from 'react-router-dom'
import toast, {Toaster} from 'react-hot-toast'
import Select from 'react-select'

const branchOptions = [
  {label:'COMPUTER SCIENCE ENGINEERING',value:'CSE'},
  {label:'INFORMATION SCIENCE ENGINEERING' ,value:'ISE'},
  {label:'ARTIFICIAL INTELLIGENCE AND DATA SCIENCE', value:'AIDS'},
  {label:'ELECTRONIC AND COMMUNICATION ENGINEERING',value:'ECE'},
  {label:'ELECTRONIC AND TELECOMMUNICATION ENGINEERING',value:'ECE'},
  {label:'ELECTRONIC ELECTRICAL ENIGINEERING',value:'EEE'},
  {label:'ELECTRONIC AND INTRUMENTAL ENGINEERING',value:'EIE'},
  {label:'CHEMICAL ENIGINEERING',value:'CE'},
  {label:'BIOTECHNOLOGY',valuee:'BT'},
  {label:'INDUSTRIAL MANAGEMENT AND ENGINEERING',value:'IME'}
]

const Publish = () => {
  const {college} = useParams()
  const [branch, setBranch] = useState('CSE')
  const [flair, setFlair] = useState('DOUBT')

  const navigate = useNavigate()

  const [selected, setSelected] = useState([])

  const [title, setTitle] = useState()
  const [body, setBody] = useState()

  const handleSubmit = async(e) => {

    e.preventDefault()
    try {
      if(!title || !body) return toast.error('Please enter all the fields', {
        iconTheme: {
          primary: "#EF4444"
        },
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        },
        duration: 2000
      })

      if(title.trim().length < 15) return toast.error('Please make sure your title consists of atleast 15 words', {
          iconTheme: {
            primary: "#EF4444"
          },
          style: {
            backgroundColor: "#EF4444",
            color: "#fff"
          }
        })
      
      if(body.trim().length < 30) return toast.error('Please make sure your body consists of atleast 30 words', {
          iconTheme: {
            primary: "#EF4444"
          },
          style: {
            backgroundColor: "#EF4444",
            color: "#fff"
          },
          duration: 1800
        })
      

      const { data } = await axios.post('/api/questions/post', { title, body, college, flair }, { withCredentials: true })
      if(data.code === 1) {
        toast.success(data.message, {
          iconTheme: {
            primary: "#22C55E",
            
          },
          style: {
            backgroundColor: "#22C55E",
            color: "#fff"
          }
        })
        console.log(data)
        setTimeout(() => {
          return navigate(`/question/${data.id}`)
        }, "2500")
      }
    } catch(err) {
      toast.error(err.response.data.message, {
        iconTheme: {
          primary: "#EF4444"
        },
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        }
      })
    }
  }

  const flairOptions = [
    { label: "DOUBT", value: "DOUBT" },
    { label: "PROJECT", value: "PROJECT" },
    { label: "STUDY MATERIAL", value: "STUDY MATERIAL"},
    { label: "ANNOUNCEMENTS", value: "ANNOUNCEMENTS"}
  ]


  return (
    <div className="lg:border-x-2 dark:border-dark-fade dark:bg-dark min-h-custom transition duration-300">
      <div className="px-4 m-auto py-5 ">
        <form action="" onSubmit={e=>handleSubmit(e)} className="">
          <h1 className="text-mobile-xl md:text-[24px] font-medium text-gray-800 dark:text-white ">Ask a Question</h1>
          <p className="text-mobile-xs md:text-sm text-gray-500 dark:text-gray-300 font-medium mb-5">Got a question that you just cant seem to solve? Feel free to post it here and seek help from multiple developers across the world</p>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-medium text-gray-600 dark:text-white mb-1">Title</label>
            <input  type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder='Enter atleast 15 characters' className="w-full py-1.5 px-2 outline  outline-1 rounded-default placeholder:text-sm dark:bg-dark dark:outline-white dark:text-gray-200" />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="" className="text-sm font-medium text-gray-600 dark:text-white mb-1">Flair </label>
            <Select options={flairOptions} defaultValue={flairOptions[0]} onChange={(value) => setFlair(value.value)} />   
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-sm font-medium text-gray-600 dark:text-white mb-1">Body</label>
            <textarea value={body} onChange={e => setBody(e.target.value)} placeholder="Enter atleast 30 characters" className="w-full py-1.5 px-2 outline outline-1 rounded-default h-44 resize-none placeholder:text-sm dark:bg-dark dark:outline-white dark:text-gray-200" />
          </div>


          <button type='submit' onSubmit={e => handleSubmit(e)} className="px-10 rounded-default bg-cta text-white font-medium py-2 mt-4 ">Submit</button>
        </form>
      </div>
      <Toaster position="bottom-right" />
    </div>
  )
}

export default Publish