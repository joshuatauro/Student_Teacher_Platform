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
  

  return (
    <div className="w-full h-screen dark:bg-dark">
      <Link to="/" className="w-full py-5 border-b-2 dark:border-dark-fade flex items-center justify-center text-3xl font-bold">HIVE<span className="text-cta">!</span></Link>
      <div className="grid place-items-center min-h-custom">
        <div className="grid place-items-center">
        <Link to="/signup-user" className=" bg-cta text-white font-medium px-4 py-2 rounded-md">User Signup</Link>
        <p className='text-sm text-gray-500 my-2'>or</p>
        <Link to="/register-college" className="bg-cta text-white font-medium px-4 py-2 rounded-md">Register College</Link>
        </div>
      </div>
      <Toaster position="bottom-right"/>
    </div>
  )
}

export default Signup