import React, { useState } from 'react'
import { GlobeAsiaAustraliaIcon, TagIcon, UserIcon,RocketLaunchIcon, PlusIcon, GiftIcon, AcademicCapIcon, BuildingLibraryIcon, BookOpenIcon, ChartBarIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Link, useParams } from 'react-router-dom'
import { useEffect } from 'react'
const SideNav = ({tab}) => {
  const [val, setVal] = useState(1)
  const { cID } = useParams()
  useEffect(() => {
    if(window.location.href.split('/')[4] === "courses"){
      setVal(2)
    } else if(window.location.href.split('/')[4] === "placements"){
      setVal(3)
    } else if(window.location.href.split('/')[4] === "scholarships"){
      setVal(4)
    } else if(window.location.href.split('/')[4] === "contact"){
      setVal(5)
    }else if(window.location.href.split('/')[4] === "forum"){
      setVal(6)
    }else if(window.location.href.split('/')[4] === "resources"){
      setVal(7)
    }else if(window.location.href.split('/')[4] === "placement-prep"){
      setVal(8)
    }else if(window.location.href.split('/')[4] === "post"){
      setVal(9)
    }else{
      setVal(1)
    }
  }, [window.location.href])
  return (
    <div className="pt-5  h-custom w-[200px] h-screen dark:bg-dark transition duration-300 hidden lg:block fixed">
      <div className="">
        <ul className="">
          <Link to={``}>
            <div className={` py-1.5 mb-2  dark:text-white ${val === 1 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <BuildingLibraryIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">About College</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/courses`}>
            <div className={` py-1.5 mb-2  dark:text-white ${val === 2 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <BookOpenIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Courses</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/placements`}>
            <div className={` py-1.5 mb-2  dark:text-white ${val === 3 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <ChartBarIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Placements</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/scholarships`}>
            <div className={` py-1.5 mb-2  dark:text-white ${val === 4 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <AcademicCapIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Scholarships</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/contact`}>
            <div  className={` py-1.5 mb-2  dark:text-white ${val === 5 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <PhoneIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Contact</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/forum`}>
            <div  className={` py-1.5 mb-2  dark:text-white ${val === 6 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <GlobeAsiaAustraliaIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Questions</h1>
              </div>
            </div>
          </Link>
          {/* <Link to="/users">
            <div className={` py-1.5 mb-2 ${val === 3 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta dark:text-white' : 'dark:text-white'}`}>
              <div className="flex items-center w-9/12 m-auto">
                <UserIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Users</h1>
              </div>
            </div>
          </Link> */}
           <Link to={`/${cID}/resources`}>
            <div  className={` py-1.5 mb-2 ${val === 7 ? "bg-cta-fade border-r-4 border-cta" : ""} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <GiftIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Resources</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/placement-prep`}>
            <div className={` py-1.5 mb-2 ${val === 8 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <RocketLaunchIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Placement Prep</h1>
              </div>
            </div>
          </Link>
          <Link to={`/${cID}/post`}>
            <div className={` py-1.5 mb-2 ${val === 9 ? "bg-cta-fade border-r-4 border-cta" : ""}`}>
              <div className="flex items-center w-9/12 m-auto">
                <PlusIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Ask a question</h1>
              </div>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  )
}

export default SideNav