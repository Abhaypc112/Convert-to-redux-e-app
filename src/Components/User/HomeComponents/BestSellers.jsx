import React, { useEffect, useState } from 'react'
import { getHomeProducts } from '../../../Api/ProductHelper/ProductConnection'
import { NavLink } from 'react-router-dom';

function BestSellers() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    getHomeProducts()
    .then((res)=>setData((res.data.products).sort((a,b)=>{
      return b.rating - a.rating
    })))
    .catch((error) => console.log(error));
    
  },[])
  return (
    <div>
      <div className="p-6 mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Shop Best Sellers</h2>
      <div className="flex flex-wrap gap-10 mx-10 justify-center">
        {
          data.map((Obj,index)=>{
           if(index<7){
            return (
              <NavLink to={`/product/${Obj._id}`}>
                  <div>
                  <img src={Obj.images[0]} className=' bg-gray-200 h-40 w-40 rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
                  <span>⭐{Obj.rating}</span>
                  <p className='text-xs'>{Obj.name}</p>
                </div>
              </NavLink>
            )
           }
          })
        }
      </div>
    </div>
    </div>
  )
}

export default BestSellers
