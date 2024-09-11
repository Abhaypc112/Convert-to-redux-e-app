import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
// import axios from 'axios'


function Slider() {
  const slides=[
    "https://ahdfurniture.com/wp-content/uploads/2024/04/sectional-sofa-1.webp",
        "https://cartersfurnitureonline.co.uk/cdn/shop/files/G_Plan_Web_Banner_Kingsbury_1400x.jpg?v=1720020418",
        "https://www.getmycouch.com/cdn/shop/files/SUMMER_SALE.png?v=1719482589&width=750"
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
