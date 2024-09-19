import React, { useEffect, useState } from 'react'
import { getProducts } from '../../../Api/ProductHelper/ProductConnection'
import { NavLink } from 'react-router-dom';

function BestSellers() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    getProducts()
    .then((res)=>setData((res.data).sort((a,b)=>{
      return b.rating - a.rating
    })))
  },[])
  return (
    <div>
      <div className="p-6 mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4">Shop Best Sellers</h2>
      <div className="flex flex-wrap gap-10 mx-10 justify-center">
        {
          data.map((Obj,index)=>{
           if(index<14){
            return (
              <NavLink to={`/product/${Obj.id}`}>
                  <div>
                  <img src={Obj.image} className=' bg-gray-200 h-40 w-40 rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
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
