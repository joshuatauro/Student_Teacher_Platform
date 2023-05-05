import React, { useEffect, useState } from 'react'
import MainNavbar from '../MainNavbar'
import SideNav from '../sidenav';
import PlacementPrep from '../../Pages/PlacementPrep';
import { BrowserRouter, Route, Routes, Link  } from 'react-router-dom';
import Resources from '../../Pages/Resources';
import axios from 'axios'
import data from '../data'
import { StarIcon, ArrowDownTrayIcon } from '@heroicons/react/24/solid'
import "./college.scss"
import PostPreview from '../PostPreview';


const About = () => {
  return (
	<div className='about'>
		<h1>College Info</h1>
		<div className="content">
			<h2><b>{data.rank}</b>NIRF Rank</h2>
			<p>{data.clg_desc}</p>
		</div>
	</div>
  )
}

const Courses = () => {
	return (
	  <div className='courses'>
		  <h1>Courses Offered</h1>
		  <div className="content">
			{data.courses.map((course) => (
				<li>{course}</li>
			))}
		  </div>
	  </div>
	)
}

const Placements = () => {
	return (
	  <div className='placements'>
		  <h1>Placement Info</h1>
		  <div className="content">
			  <p>{data.clg_desc}</p>
			  <div className="cards-container">
				<div className="card">
					<h2>{data.highest_pkg}</h2>
					<h3>Highest Package</h3>
				</div>
				<div className="card">
					<h2>{data.avg_pkg}</h2>
					<h3>Average Package</h3>
				</div>
				<div className="card">
					<h2>{data.median_pkg}</h2>
					<h3>Median Package</h3>
				</div>
			  </div>
		  </div>
	  </div>
	)
}

const Scholarships = () => {
	return (
	  <div className='scholarships'>
		  <h1>Scholarships</h1>
		  <div className="content">
			  <h2><b></b>NIRF Rank</h2>
			  <p>{data.clg_desc}</p>
		  </div>
	  </div>
	)
}

const Contact = () => {
	return (
	  <div className='contact'>
		  <h1>Contact Info</h1>
		  <div className="content">
			<li><b>Official website:</b> <a href={data.clg_url}>{data.clg_url}</a></li>
			<li><b>Email:</b><a href={`mailto:${data.clg_email}`}> {data.clg_email}</a></li>
			<li><b>Phone (For general enquiry):</b> {data.contact_one}</li>
			<li><b>Phone (For admission related enquiry):</b> {data.contact_two}</li>
			<li><b>Address:</b> {data.clg_address}</li>
		  </div>
	  </div>
	)
}

const Questions = ({id}) => {
	
  const [posts, setPosts] = useState([])

  useEffect(() => {
    const getDetails = async() => {
      const {data} = await axios.get("http://localhost:5000/api/questions/", { withCredentials: false })
      console.log(data)
      setPosts(data.posts)
    }
    getDetails()
  }, [])
	return(
		<div className=''>
		<div className="w-full min-h-screen border-l-2 ">
			{
				posts?.map(({id, profile_url, username, title, branch, body, upvoted_by, downvoted_by, total_replies, sub_flair, created_at, is_pinned}) => <PostPreview title={title} body={body} qID={id} branch={branch} upvotedBy={upvoted_by} downvotedBy={downvoted_by} totalAnswers={total_replies} url={profile_url} username={username} subFlair={sub_flair} createdAt={created_at} />)
			}
		</div>
	</div>
	)
}

const College = () => {
	const [avgRating, setAvgRating] = useState(0);

	useEffect(() => {
		var sumOfRatings=0;
		for (const item of data.rating) {
			sumOfRatings += item;
		}
		setAvgRating(sumOfRatings/data.rating.length)
}, [avgRating])
	


  return (
    <>
      <MainNavbar />
	  <div className='college-page-wrapper'>
		<div className='side-nav-container'>
			<SideNav />	
		</div>
		<div className='college-wrapper bg-white min-w-full flex justify-center'>
			<div className=" bg-white mt-10">
				<div  className='section-1 w-auto '>
					<div className='banner'>
						<img className=' object-fill' src={data.banner_url} alt={data.clg_name} />
					</div>
								
					<div className='bottom'>
						<div className='img-container'>
							<img className='' src={data.logo_url} alt={data.clg_name} />
						</div>
						<div className='content'>
							<h1>{data.clg_name}</h1>
							<a href={data.clg_url} className=' text-blue-600 italic hover:underline text-[14px]'>Visit</a>
							<div>
								{(data.rating[0])? 
									<div className='rating'><b>{avgRating.toPrecision(2)}</b> <StarIcon className='w-5 h-5 mt-0.5 white'/> <i>({data.rating.length})</i></div>
									: <p>No ratings yet.</p>
								}
								{data.brochure_url &&
									<div className='button-container'>
										<button className='text-white bg-sky-700 p-[5px]'>
											<ArrowDownTrayIcon className='w-5 h-5 text-white'/>
											Brochure
										</button>
									</div>
								}
							</div>
						</div>
					</div>
				</div>
				<div className='page-nav'>
				<Routes>
					<Route path="" element={<About />}/>
					<Route path="courses" element={<Courses />}/>
					<Route path="placements" element={<Placements />}/>
					<Route path="scholarships" element={<Scholarships />}/>
					<Route path="contact" element={<Contact />}/>
					<Route path="placement-prep" element={<PlacementPrep />}/>
					<Route path="resources" element={<Resources />}/>
					<Route path="forum" element={<Questions />} />
				</Routes>
				</div>
				
			</div>
		</div>
	  </div>
      
    </>
  )
}

export default College