import React, { useEffect, useState } from 'react'
import SideBar from '../Header&Footer/SideBar'
import { FiShoppingBag } from "react-icons/fi";
import { IoIosPeople } from "react-icons/io";
import { IoDocumentOutline } from "react-icons/io5";
import { getAllUsers } from '../../../Api/UserHelpers/UsersConnection';
import { getTotalSales } from '../../../Api/ProductHelper/ProductConnection';

function HomePage() {
  const [pData,setPData]=useState([]);
  const [orderCount,setOrderCount]=useState(0);
  const [userCount,setUserCount]=useState([]);
  const [sales,setSales]=useState(0)
  ;
  useEffect(()=>{
    getAllUsers()
    .then((res)=>setUserCount(res.data))
    getTotalSales()
    .then((res)=>{
      totalSales(res.data);
      setOrderCount(res.data.length)
    })
  },[])
  function totalSales(arr){
    let total=arr.reduce((acc,value)=>acc+ value.totalPrice,0)
    setSales(total);
  }
  return (
    <div className='flex w-[100%] bg-slate-100 '> 
      <div className='w-[100%]'>
        <div style={{marginLeft:"18%"}} className='  p-5 grid md:grid-cols-3  md:gap-x-5 gap-y-5 mt-24'>
        <div className="box w-full h-[180px] bg-white rounded shadow-md flex justify-evenly items-center">
            <div  className='relative w-[65px]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 48 52" fill="none"><path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#22C55E"></path></svg>
              <FiShoppingBag style={{color:"white"}} className='absolute top-1/4 left-1/4 w-9 h-9 '/>
            </div>
            <div>
              <p className='text-gray-500'>Total Sales </p>
                <h1 className='font-bold text-3xl'>$ {sales}</h1>
            </div>
          </div>
            <div className="box w-full h-[180px] bg-white rounded shadow-md flex justify-evenly items-center"> 
              <div className='relative w-[65px]'>
              <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 48 52" fill="none"><path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#CBD5E1"></path></svg>
              <IoDocumentOutline style={{color:"white"}} className='absolute top-1/4 left-1/4 w-9 h-9 '/>
            </div>
            <div>
              <p className='text-gray-500'>Total Orders </p>
              <h1 className='font-bold text-3xl'>{orderCount}</h1>
            </div> 
        </div>
            <div className="box w-full h-[180px] bg-white rounded shadow-md flex justify-evenly items-center">
              <div className="relative w-[65px]">
               <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 48 52" fill="none"><path d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z" fill="#2377FC"></path></svg>
                <IoIosPeople style={{color:"white"}} className='absolute top-1/4 left-1/4 w-9 h-9 '/>
            </div>
            <div>
              <p className='text-gray-500'>Total Users </p>
              <h1 className='font-bold text-3xl'>{userCount.length}</h1>
            </div>
            </div>
        </div>
        
        
      </div>
    </div>
  )
}

export default HomePage
