import React, { useEffect,useState } from 'react'
import { getProducts } from '../../../Api/ProductHelper/ProductConnection'
import { NavLink } from 'react-router-dom';

function Budget() {
  const[data,setData]=useState([]);
  useEffect(()=>{
    getProducts()
    .then((res)=>setData((res.data).sort((a,b)=>{
      return a.price - b.price
    })))
    .catch((error) => console.log(error));
  },[])
  return (
    <div>
      <div className="p-6 mt-10 flex flex-col items-center">
      <h2 className="text-2xl font-semibold mb-4 ">Budget Buys</h2>
      <div className="flex  flex-wrap gap-10 justify-center">
       {
        data.map((Obj,index)=>{
          if(index<7){
            return(
              <NavLink to={`/product/${Obj._id}`}>
                  <div className=' h-40 w-40 rounded'>
                  <img src={Obj.images[0]} alt="" className=' bg-gray-200 h-40 w-40 rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
                  <span className='font-bold'>$ {Obj.price}</span>
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

export default Budget
