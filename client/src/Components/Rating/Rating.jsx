import React, { useEffect, useState } from 'react'
import './rating.scss'

const Rating = () => {
    const [rating, setRating] = useState(0);
    useEffect(() => {
        console.log(rating)
        var count=rating;
        document.querySelectorAll('.star').forEach(element => {
                element.style.background="#475569"
        });
        document.querySelectorAll('.star').forEach(element => {
            if(count>0){
                element.style.background="#FFD700"
                count--;
            }
        });
    }, [rating])


  return (
    <div className="rating-stars flex items-center">
        <span className=' font-medium text-[18px]'>Rate college:</span>
        <button className=' bg-slate-600 w-[22px] h-[22px] star star-1' onClick={() => {setRating(1)}}><img src="./star.png" alt="" /></button>
        <button className=' bg-slate-600 w-[22px] h-[22px] star star-1' onClick={() => {setRating(2)}}><img src="./star.png" alt="" /></button>
        <button className=' bg-slate-600 w-[22px] h-[22px] star star-1' onClick={() => {setRating(3)}}><img src="./star.png" alt="" /></button>
        <button className=' bg-slate-600 w-[22px] h-[22px] star star-1' onClick={() => {setRating(4)}}><img src="./star.png" alt="" /></button>
        <button className=' bg-slate-600 w-[22px] h-[22px] star star-1' onClick={() => {setRating(5)}}><img src="./star.png" alt="" /></button>
    </div>
  )
}

export default Rating