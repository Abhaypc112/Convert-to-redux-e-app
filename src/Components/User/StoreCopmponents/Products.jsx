import React, { useEffect,useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../../Api/ProductHelper/ProductConnection';

function Products() {
  const[data,setData]=useState([]);
  const[storeData,setStoreData]=useState([]);
  const {category}=useParams();
  
  useEffect(()=>{
   if(category){
    getProductsByCategory(category)
    .then((res)=>setData(res.data))
   }else{
    getProductsByCategory("")
    .then((res)=>setStoreData(res.data))
   }
  },[category])
  return (
    <div>
      <div style={{marginTop:"7rem"}} className="p-6 ">
      {/* <h2 className="text-2xl font-semibold mb-4">Produts</h2> */}
      <div className="flex gap-5 mx-10 flex-wrap justify-center">
        {
          ((!category)?storeData:data).map((Obj)=>{
            return(
                  <NavLink to={`/product/${Obj._id}`}>
              <div style={{width:"20rem",height:"26rem"}} className=' rounded shadow border hover:transform hover:scale-105  transition-all duration-500 ease-in-out'>
              <img src={Obj.images[0]} alt="" className='w-[100%] h-[70%] bg-black rounded relative ' />
              <div className='flex flex-col ml-1 justify-between'>
              <span className='text-sm font-bold'>{Obj.name}</span>
                <span className='text-sm text-gray-600'>{Obj.description}</span>
                <span className='text-xs  text-gray-400'>Left {Obj.stock}</span>
                <span className='text-xs'>{Obj.rating}⭐</span>
                <span className='text-xl font-bold'>$ {Obj.price}</span>
                </div>
              </div>
            </NavLink>
            )
          }) 
        }
      </div>
    </div>
    </div>
  )
}

export default Products
