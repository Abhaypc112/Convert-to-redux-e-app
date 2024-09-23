import React, { useContext, useEffect, useState } from 'react'
import { getAllUsers } from '../../../Api/UserHelpers/UsersConnection';
import { AdminContext } from '../../../Contexts/AdminContext';
import { getProducts } from '../../../Api/ProductHelper/ProductConnection';
import { useNavigate } from 'react-router-dom';

function BottomSection() {
  const [items,setItems]=useState([]);
  const [data,setData]=useState([]);
  const navigate=useNavigate();
  // const {setTotalOrders}=useContext(AdminContext)
  useEffect(()=>{
    getAllUsers()
    .then((res)=> setItems(res.data))
    getProducts()
    .then((res)=>setData((res.data).sort((a,b)=>{
      return b.rating-a.rating
    })))
    console.log("bottum");
    
  },[])
  return (
    <div>
      <div style={{marginLeft:"18%"}} className=' p-5 grid md:grid-cols-6  md:gap-x-5 gap-y-5 '>
            <div className="box p-5 w-full h-[380px] bg-white rounded shadow-md md:col-span-2 md:row-span-2 col-span-4 overflow-y-scroll custom-scrollbar ">
            <div onClick={()=>navigate('/vieworders')} className='flex justify-between'><h1 className='text-xl font-bold'>Orders</h1>
            <button className='bg-yellow-400 rounded p-1 w-14 text-black font-bold text-xs'>View</button>
            </div>
            <div className='grid grid-cols-3 p-2'>
                    <h1 className='font-bold  '>Product</h1>
                    <h1 className='font-bold text-center '>Date</h1>
                    <h1 className='font-bold text-center '>User</h1>
                </div>
    
              {
                items.slice(0).reverse().map((value)=>{
                  return (value.orders).map((ord)=>{
                    return (ord.Items).map((Obj)=>{ 
                      return(
                        <div className='grid grid-cols-3 mt-5 '>
                        <div className='flex'>
                        <div className='' ><img src={Obj.images[0]} alt="" className='w-10 h-10' /></div>
                        <span className='text-center'>{Obj.name}</span>
                        </div>
                        <span className='text-center '>{ord.date.time}</span>
                        <span className='text-center '>{value.name}</span>
                        </div>  
                      ) 
                                  })
                    
                  })
                })
                 
              }
              
            </div>


            <div className="box w-full h-[380px] p-5 bg-white rounded shadow-md md:col-span-2 md:row-span-2 col-span-4 overflow-auto custom-scrollbar">
            <h1 className='text-xl font-bold'>Top Products</h1>
            <div className='grid grid-cols-2'>
                    <h1 className='font-bold  '>Product</h1>
                    <h1 className='font-bold text-end '>Rating</h1>
                </div>
    
              {
                data.map((Obj)=>{
                  return(
                    <div className='grid grid-cols-2 mt-5 '>
                      <div className='flex'>
                      <div className='' ><img src={Obj.image} alt="" className='w-10 h-10' /></div>
                      <div>
                      <span className='text-center'>{Obj.name}</span>
                      <p className='text-xs'>{Obj.stock} Left</p>
                      </div>
                      </div>
                      <div className='text-end '>
                      <span className='text-sm ' >⭐ {Obj.rating}</span>
                      <p className='text-sm font-bold'>$ {Obj.price}</p>
                      </div>
                    </div>
                  )
                })
              }
              
            </div>
            <div className="box w-full p-5 h-[380px] bg-white rounded shadow-md md:col-span-2 md:row-span-2 col-span-4 space-y-5">
            <h1 className='text-xl font-bold'>New Comments</h1>
            <div className=' bg-slate-100 rounded p-2'>
              <h1 className='font-bold'>Kathryn Murphy</h1>
              <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor vel est interdum</p>
            </div>
            <div className=' bg-slate-100 rounded p-2'>
              <h1 className='font-bold'>Kathryn Murphy</h1>
              <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor vel est interdum</p>
            </div>
            <div className=' bg-slate-100 rounded p-2'>
              <h1 className='font-bold'>Kathryn Murphy</h1>
              <p className='text-sm'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras nec dolor vel est interdum</p>
            </div>
            </div>
        </div>
    </div>
  )
}

export default BottomSection
