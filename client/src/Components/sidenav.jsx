import React, { useState } from 'react'
import { GlobeAsiaAustraliaIcon, TagIcon, UserIcon,RocketLaunchIcon, PlusIcon, GiftIcon, AcademicCapIcon, BuildingLibraryIcon, BookOpenIcon, ChartBarIcon, PhoneIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
const SideNav = ({tab}) => {
  const [val, setVal] = useState(1)
  useEffect(() => {
    if(window.location.href.split('/')[3] === "resources"){
      setVal(2)
    } else if(window.location.href.split('/')[3] === "placements"){
      setVal(3)
    } else if(window.location.href.split('/')[3] === "post"){
      setVal(4)
    } else {
      setVal(1)
    }
  }, [window.location.href])
  return (
    <div className="pt-5 sticky top-[85px] dark:bg-dark transition duration-300 hidden lg:block min-h-screen">
      <div className="">
        <ul className="sticky top-[100px]">
          <Link to="/college">
            <div to="/college" className={` py-1.5 mb-2 ${val === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <BuildingLibraryIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">About College</h1>
              </div>
            </div>
          </Link>
          <Link to="/college/courses">
            <div to="/college/course" className={` py-1.5 mb-2 ${val === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <BookOpenIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Courses</h1>
              </div>
            </div>
          </Link>
          <Link to="/college/placements">
            <div to="/college/placements" className={` py-1.5 mb-2 ${val === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <ChartBarIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Placements</h1>
              </div>
            </div>
          </Link>
          <Link to="/college/scholarships">
            <div to="/college/scholarship" className={` py-1.5 mb-2 ${val === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <AcademicCapIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Scholarships</h1>
              </div>
            </div>
          </Link>
          <Link to="/college/contact">
            <div to="/college/contact" className={` py-1.5 mb-2 ${val === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <PhoneIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Contact</h1>
              </div>
            </div>
          </Link>
          <Link to="/college/forum">
            <div to="/feed" className={` py-1.5 mb-2 ${val === 1 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
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
           <Link to="/college/resources">
            <div to="/feed" className={` py-1.5 mb-2 ${val === 2 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta' : ''} dark:text-white`}>
              <div className="flex items-center w-9/12 m-auto">
                <GiftIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Resources</h1>
              </div>
            </div>
          </Link>
          <Link to="/college/placement-prep">
            <div className={` py-1.5 mb-2 ${val === 3 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta dark:text-white' : 'dark:text-white'}`}>
              <div className="flex items-center w-9/12 m-auto">
                <RocketLaunchIcon className="h-6 mr-1 w-6" />
                <h1 className="text-sm">Placement Prep</h1>
              </div>
            </div>
          </Link>
          <Link to="/post">
            <div className={` py-1.5 mb-2 ${val === 4 ? 'bg-gray-200 dark:bg-dark-cta-fade  border-r-4 border-cta dark:text-white' : 'dark:text-white'}`}>
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