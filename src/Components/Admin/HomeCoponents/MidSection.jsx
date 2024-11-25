import React, { useEffect, useState } from 'react'
import { getProducts } from '../../../Api/ProductHelper/ProductConnection'
import { useNavigate } from 'react-router-dom';
import Graph from './Graph';

function MidSection() {
  const [data,setData]=useState([]);
  const navigate=useNavigate();
  useEffect(()=>{
    getProducts()
    .then((res)=>setData(res.data))
  },[])
  return (

      <div style={{marginLeft:"18%"}} className=' p-5 grid md:grid-cols-6  md:gap-x-5 gap-y-5 '>
            <div className="box w-full h-[380px] bg-white rounded shadow-md md:col-span-2 md:row-span-2 col-span-4 overflow-hidden">
              <Graph/>
            </div>
            <div className="box flex flex-col p-5 w-full h-[380px] bg-white rounded shadow-md col-span-4 overflow-scroll custom-scrollbar space-y-3">
                <div className='flex justify-between'><h1 className='text-xl font-bold'>Product Overview</h1>
                <button onClick={()=>navigate('/addproduct')} className='bg-green-500 rounded p-2 text-white font-bold text-sm'>Add Product</button>
                </div>
                <div className='grid grid-cols-6 '>
                    <h1 className='font-bold text-center'>Image</h1>
                    <h1 className='font-bold text-center col-span-2'>Name</h1>
                    <h1 className='font-bold text-center '>Category</h1>
                    <h1 className='font-bold text-center'>Price</h1>
                    <h1 className='font-bold text-center'>Stock</h1>
                </div>
    
              {
                data.slice(0).reverse().map((Obj)=>{
                  return(
                    <div key={Obj.id} className='grid grid-cols-6 items-center'>
                      <div className='flex justify-center h-20' ><img src={Obj.images[0]} alt="" /></div>
                      <span className='col-span-2 text-center'>{Obj.name}</span>
                      <span className='text-center '>{Obj.category}</span>
                      <span className='text-center'>{Obj.price}</span>
                      <span className='text-center'>{Obj.stock}</span>
                    </div>
                  )
                })
              }
              
            </div>
        </div>
  )
}

export default MidSection
