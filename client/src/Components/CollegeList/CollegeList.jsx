import React from 'react'
import './collegelist.scss';
import data from '../data';
import { StarIcon, ArrowDownTrayIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid'


const CollegeList = () => {
  return (
    <div className='card-collection'>
        <div  className='college-card'>
					<div className='bottom'>
						<div className='img-container'>
							<img className='' src={data.logo_url} alt={data.clg_name} />
						</div>
						<div className='content'>
							<h1>{data.clg_name}</h1>
							<a href={data.clg_url} className=' text-blue-600 italic hover:underline text-[14px]'>Visit</a>
							<div>
								
                <div className='stats'>
                  <span><b>{data.rank}</b>NIRF</span>
                  {(data.rating[0])? 
                    <div className='rating'><b>{4.7}</b> <StarIcon className='w-5 h-5 mt-0.5 white'/> <i>({data.rating.length})</i></div>
                    : <p>No ratings yet.</p>
                  }
                  <span><b>{data.avg_pkg}LPA</b> Avg. package</span>
                </div>
								{data.brochure_url &&
									<a href={data.brochure_url} target="_blank" rel="noreferrer" className='button-container'>
										<button className='text-white bg-cta p-[5px]'>
											<ArrowDownTrayIcon className='w-5 h-5 text-white'/>
											Brochure
										</button>
									</a>
								}
							</div>
						</div>
					</div>
				</div>
    </div>
  )
}

export default CollegeList