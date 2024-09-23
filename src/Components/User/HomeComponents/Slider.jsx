import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import axios from 'axios'
import b1 from '../../../Assets/b1.png'
import b2 from '../../../Assets/b2.png'
import b3 from '../../../Assets/b3.png'


function Slider() {
  const slides=[
    b1,
    b2,
    b3
  ]
  const[index,setIndex]=useState(0);

  useEffect(()=>{
    setTimeout(()=>{
      setIndex((pre)=>(pre+1)%slides.length)
    },5000)
  })
  
  return (
    <div>
        
        <div className=" md:max-w-[90%] max-w-[90%] mx-auto bg-gray-400 rounded ">
        <NavLink to={'/store'}>
         {/* <a href="#home" className='scroll-smooth'><button className='z-50 bg-yellow-400 p-3 rounded bottom-44 right-32' style={{position:"absolute"}}>Shop Now</button></a> */}
         <img src={slides[index]} alt="" style={{marginTop:"7rem",position:"relative"}} className='rounded min-w-[100%] h-52 md:h-96'/>
         </NavLink>
       </div>
        
    </div>
  )
}

export default Slider
