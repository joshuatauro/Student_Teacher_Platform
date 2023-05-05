import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
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

const Signup = () => {
  const [branch, setBranch] = useState()

  const navigate = useNavigate()
  const { signup } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')

  const handleSignup = async(e) => {
    e.preventDefault()
    const response = await signup(email, username, password, branch)
    if(response.data.code === 1) {
      toast(response.data.message, {
        icon: <CheckCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#22C55E",
          color: "#fff"
        },
        duration: 2500
      })
      setTimeout(() => {
        return navigate("/")
      }, "3000")
    } else {
      toast.error(response.data.message, {
        icon: <XCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        }
      })
    }
  }

  const handleBranch = (value) => {
    setBranch(value.value)
  }

  return (
    <div className="w-full h-screen dark:bg-dark">
      <Link to="/" className="w-full py-5 border-b-2 dark:border-dark-fade flex items-center justify-center text-3xl font-bold">HIVE<span className="text-cta">!</span></Link>
      <div className=" flex flex-col w-10/12 md:w-1/3 m-auto mt-5">
        <form action="" className="" onSubmit={handleSignup}>
          <h1 className="text-mobile-xl md:text-2xl font-bold dark:text-white">Sign up</h1>
          <p className="text-mobile-xs md:text-xs text-gray-500 font-medium mb-5 dark:text-dark-text">Ever get stuck on a question for hours? Never again, one post is all it takes</p>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Username</label>
            <input value={username} onChange={e => setUsername(e.target.value)} type="text" className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base  outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Email address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} type="text" className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base  outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col my-3">
            <label htmlFor="" className="text-sm font-medium text-gray-600 dark:text-white mb-1">Select the Branch </label>
            <Select options={branchOptions} onChange={handleBranch} />   
          </div>
          <button className="text-mobile-sm md:text-base w-full rounded-default bg-cta text-white font-medium py-2 mt-4">Sign up</button>
        </form>
        
        <div className="relative my-4">
          <div className="outline outline-1 outline-gray-500 dark:outline-dark-fade rounded-full  w-full"></div>
          <p className="absolute left-1/2 text-gray-500 dark:text-dark-text top-1/2 -translate-y-2/4 -translate-x-2/4 px-1 bg-white dark:bg-dark text-xs ">OR</p>
        </div>
        <h1 className="text-mobile-xl md:text-2xl font-bold dark:text-white ">Log in</h1>
        <p className="text-xs text-gray-500 font-medium dark:text-dark-text">Already have an account? Log in here</p>
        <Link to="/login" className='w-full outline outline-1 outline-cta bg-cta bg-opacity-10 rounded-default py-1.5 flex justify-center mt-5 text-cta font-medium text-mobile-sm md:text-base'>Log in</Link>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  )
}

export default Signup