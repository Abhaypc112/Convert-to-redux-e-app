import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { getCategory } from '../../Api/ProductHelper/ProductConnection'

function Categories() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    getCategory()
    .then((res)=>setData(res.data))
  },[])
  return (
    <div id='home' >
      <div className="p-6 mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Shop By Categories</h2>
      <div className="flex flex-wrap space-x-10 mx-10">
        {
          data.map((Obj)=>{
            return(
              <NavLink to={`/store/${Obj.category}`}  style={{textAlign:"center"}}><img src={Obj.images} className=' bg-white h-28 w-28 md:h-40 md:w-40 rounded hover:transform hover:scale-110  transition-all duration-500 ease-in-out'/><span>{Obj.category}</span></NavLink>
            )
          })
        }
      </div>
    </div>
    </div>
  )
}

export default Categories
