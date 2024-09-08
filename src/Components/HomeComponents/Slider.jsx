import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import axios from 'axios'


function Slider() {
  const slides=[
    "https://img.freepik.com/free-photo/image-advertising-property-sale-dream-home-sale_185193-109613.jpg?t=st=1725717119~exp=1725720719~hmac=a3598355c40e5c7a6880eb71f904408b3102db9d8d71718c91d8d67c93d33eda&w=1380",
        "https://img.freepik.com/free-photo/sale-with-special-discount-couch_23-2150040375.jpg?t=st=1725717235~exp=1725720835~hmac=eaee0dbb85247e5ad5499ba42c78ff300c46404b034f01e611de50748d058d65&w=1380",
        "https://img.freepik.com/free-photo/solitary-crimson-chair-offers-pop-color-against-geometric-patterned-backdrop_91128-4364.jpg?t=st=1725717118~exp=1725720718~hmac=3deca1f8669e1653adc6d74f3dd0f94cf002001803c4081b7d806f1033eb9a12&w=1380"
  ]
  const[index,setIndex]=useState(0);

  useEffect(()=>{
    setTimeout(()=>{
      setIndex((pre)=>(pre+1)%slides.length)
    },5000)
  })
  
  return (
    <div>
        <NavLink to={'/store'}>
        <div className=" md:max-w-[90%] max-w-[90%] mx-auto bg-gray-400 rounded ">
         
         {/* <a href="#home" className='scroll-smooth'><button className='z-50 bg-yellow-400 p-3 rounded bottom-44 right-32' style={{position:"absolute"}}>Shop Now</button></a> */}
         <img src={slides[index]} alt="" style={{marginTop:"7rem",position:"relative"}} className='rounded min-w-[100%] h-52 md:h-96'/>
         
       </div>
        </NavLink>
    </div>
  )
}

export default Slider
