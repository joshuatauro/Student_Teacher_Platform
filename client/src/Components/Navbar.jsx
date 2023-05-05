import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//import { AuthContext } from '../context/AuthContext'
import toast, {Toaster} from 'react-hot-toast'
import { useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { CheckCircleIcon, MagnifyingGlassIcon, MoonIcon, SunIcon, XCircleIcon, XMarkIcon } from '@heroicons/react/24/solid'

const Navbar = () => {
  const [isDark, setIsDark] = useState(localStorage.isDark)
  const [searchShow, setSearchShow] = useState(false)
  const [search, setSearch] = useState()
  const navigate = useNavigate()

  const { isLoggedIn, checkIfUserLoggedIn, username, url, logout } = useContext(AuthContext)

  useEffect(() => {
    checkIfUserLoggedIn()

  }, [])

  const handleLogout = async() => {
    const response = await logout()
    if(response.data.status === "Success") {
      toast(response.data.message, {
        icon: <CheckCircleIcon className='h-6' />,
        style: {
          backgroundColor: "#22C55E",
          color: "#fff"
        },
        duration: 2500
      })
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
  const toggleTheme = () => {
    if(localStorage.isDark === 'yes') {
      document.documentElement.classList.remove('dark')
      localStorage.isDark = 'no' 
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.isDark = 'yes'
      setIsDark(true)
    }
  }
  const handleSearchQuery = (e) => {
    e.preventDefault()
    navigate(`/search?q=${search}`)
  }
  return (
    <nav className="w-full border-b bg-white dark:bg-dark sticky z-50 top-0 border-cta border-b-gray-500 transition duration-300 ">
      <div className={` px-4 md:px-6 h-16 dark:border-dark-text ${isLoggedIn ? 'grid grid-cols-11' : 'flex'} items-center xl:max-w-[1600px] m-auto`}>
        <div className={`items-center w-full mr-2 ${searchShow ? 'col-span-11 md:col-span-7' : 'col-span-7'}`}>
          <div className="flex items-center  ">
            <div className="">
              <Link to="/" className="text-xl font-black text-gray-800 dark:text-white mr-2 hidden md:block">HIVE<span className="text-cta ">!</span></Link>
              <Link to="/" className="text-xl font-black text-gray-800 dark:text-white mr-2 md:hidden">H<span className="text-cta">!</span></Link>
            </div>
            <Link to="/signup">SIGNUP</Link>
            <form action="" className='w-full' onSubmit={handleSearchQuery}>

            <input value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Search anything here....." className={`w-full h-11 px-4 focus:outline-gray-800 outline outline-1 outline-gray-400 dark:outline-dark-fade rounded-md text-sm font-normal placeholder:text-gray-600 dark:bg-dark transition duration-300 dark:text-white ${searchShow ? 'block': 'hidden md:block '}`} />
            </form>
            <button className={`dark:text-white ${searchShow ? 'block md:hidden': 'hidden'}`} onClick={handleSearchQuery}><MagnifyingGlassIcon className='h-5 ml-2 md:hidden' /></button>
            <button className={`dark:text-white ${searchShow ? 'block md:hidden': 'hidden'}`} onClick={() => setSearchShow(!searchShow)}><XMarkIcon className='h-5 ml-2 md:hidden' /></button>



          </div>
        </div>
        <div className={`col-span-4 ${searchShow ? 'hidden md:block':'block'}`}>
        {
          isLoggedIn ? (
            <div className="flex w-full items-center justify-end">
              <button className='dark:text-white' onClick={() => setSearchShow(!searchShow)}><MagnifyingGlassIcon className='h-5 mr-2 md:hidden' /></button>
              <Link to={`/user/${username}`}  className="flex items-center">
                <h1 className="text-sm font-medium text-gray-600 ml-1.5 mr-1 dark:text-white hidden lg:block">{username}</h1>
                <img className=" object-contain h-8" src={url} alt="" />
              </Link>
              <div className="mr-2 ml-3">

              {/* {
                localStorage.isDark === 'yes' ? <SunIcon onClick={toggleTheme} className='h-6 cursor-pointer dark:text-white' />: <MoonIcon onClick={toggleTheme} className='h-6 cursor-pointer dark:text-white' /> 
              } */}
              </div>
              {/* <button className='dark:text-white' onClick={handleLogout}><Log className='h-5' /></button> */}
              
            </div>

          ) : (
            <div className="flex flex-1 justify-end items-center min-w-max ">
              <Link to="/signup" className="text-sm font-medium flex items-center outline outline-1 text-cta bg-cta bg-opacity-10 rounded-md h-12 px-5 mr-2">Sign Up</Link>
              <Link to="/login" className="text-sm flex items-center font-medium outline bg-cta outline-2 text-white rounded-md h-12 px-5 dark:outline-none">Log In</Link>
            {/* {
                localStorage.isDark === 'yes' ? <SunIcon onClick={toggleTheme} className='ml-2 h-6 cursor-pointer dark:text-white' />: <MoonIcon onClick={toggleTheme} className='ml-2 h-6 cursor-pointer dark:text-white' /> 
              } */}
            </div>
          )
        }
        
        </div>
        
      </div>
      <Toaster position="bottom-right"/>

    </nav>
  )
}

export default Navbar