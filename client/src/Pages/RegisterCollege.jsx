import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'
import toast, {Toaster} from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import Select from 'react-select'



const RegisterCollege = () => {
  const branchOptions = [
    {label:'Computer Science Engineering',value:'CSE'},
    {label:'Information Science Engineering' ,value:'ISE'},
    {label:'Artificial Intelligence And Data Science', value:'AIDS'},
    {label:'Electronic And Communication Engineering',value:'ECE'},
    {label:'Electronic And Telecommunication Engineering',value:'ECE'},
    {label:'Electronic Electrical Enigineering',value:'EEE'},
    {label:'Electronic And Intrumental Engineering',value:'EIE'},
    {label:'Chemical Enigineering',value:'CE'},
    {label:'Biotechnology',value:'BT'},
    {label:'Industrial Management And Engineering',value:'IME'}
  ]

  const navigate = useNavigate()
  const { register } = useContext(AuthContext)

  const [branch, setBranch] = useState()
  const [clgURL, setClgURL] = useState('')
  const [desc, setDesc] = useState('')
  const [name, setName] = useState('')
  const [brochureURL, setBrochureURL] = useState('')
  const [rank, setRank] = useState('')
  const [rating, setRating] = useState('')
  const [logoURL, setLogoURL] = useState('')
  const [bannerURL, setBannerURL] = useState('')
  const [highestPKG, setHighestPKG] = useState('')
  const [averagePKG, setAveragePKG] = useState('')
  const [medianPKG, setMedianPKG] = useState('')
  const [address, setAddress] = useState('')
  const [emailIdentifier, setEmailIdentifier] = useState('')
  

  const handleBranch = (value) => {
    setBranch(value)
  }

  const handleRegister = async(e) => {
    e.preventDefault()
    try{

      const courses = branch.map(br => br.label)
      const response = await register(name, address, courses, brochureURL, desc, rank, rating, logoURL, bannerURL, highestPKG, medianPKG, averagePKG, clgURL, emailIdentifier)
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
    } catch(err){
      toast.error(err.message, {
        icon: <XCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#EF4444",
          color: "#fff"
        }
      })
    }
  }

  return (
    <div className="w-full h-screen dark:bg-dark">
      <Link to="/" className="w-full py-5 border-b-2 dark:border-dark-fade flex items-center justify-center text-3xl font-bold">HIVE<span className="text-cta">!</span></Link>
      <div className=" flex flex-col w-10/12 md:w-1/3 m-auto mt-5 mb-20">
        <form action="" className="" onSubmit={handleRegister}>
          <h1 className="text-mobile-xl md:text-2xl font-bold dark:text-white">Register your college!</h1>
          <p className="text-mobile-xs md:text-xs text-gray-500 font-medium mb-5 dark:text-dark-text">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque, sunt sint? Odio nobis ullam impedit .</p>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Name</label>
            <input value={name} onChange={e => setName(e.target.value)} type="text" className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base  outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Description</label>
            <textarea value={desc} onChange={e => setDesc(e.target.value)} type="text" rows={5} className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base  outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Address</label>
            <input value={address} onChange={e => setAddress(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3 my-3">
            <label htmlFor="" className="text-sm font-medium text-gray-600 dark:text-white mb-1">Select the provided courses</label>
            <Select isMulti options={branchOptions} onChange={handleBranch} />   
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College site URL</label>
            <input value={clgURL} onChange={e => setClgURL(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Brochure URL</label>
            <input value={brochureURL} onChange={e => setBrochureURL(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Rank</label>
            <input value={rank} onChange={e => setRank(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Rating</label>
            <input value={rating} onChange={e => setRating(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Logo URL</label>
            <input value={logoURL} onChange={e => setLogoURL(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">College Banner URL</label>
            <input value={bannerURL} onChange={e => setBannerURL(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Highest Placement Package</label>
            <input value={highestPKG} onChange={e => setHighestPKG(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Average Placement Package</label>
            <input value={averagePKG} onChange={e => setAveragePKG(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Median Placement Package</label>
            <input value={medianPKG} onChange={e => setMedianPKG(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="" className="text-mobile-xs md:text-sm font-medium text-gray-600 mb-1 dark:text-dark-text">Email Identifier</label>
            <input value={emailIdentifier} onChange={e => setEmailIdentifier(e.target.value)}  className="w-full py-1.5 px-2 outline text-mobile-sm md:text-base outline-1 rounded-default bg-transparent dark:outline-gray-400 dark:text-white" />
          </div>
          <button type="submit" className="text-mobile-sm md:text-base w-full rounded-default bg-cta text-white font-medium py-2 mt-4">Register</button>
        </form>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  )
}

export default RegisterCollege