import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../Api/UserHelpers/UsersConnection';

function OrdersView() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    getAllUsers()
    .then((res)=>setUsers(res.data))
  })
  return (
    <div style={{marginTop:"7rem"}} className='w-[88%] md:w-[80%] flex justify-center bg-slate-100 h-lvh'>
      <div className="form-div w-[95%] space-y-3 shadow-md p-10 bg-white mb-32 rounded overflow-y-auto custom-scrollbar">
        <div className=' w-[67rem]'>
          <h1 className='text-2xl font-bold'>Orders</h1>
        </div>
        <div className='grid grid-cols-9 w-[67rem]'>
                    <h1 className='font-bold text-center '>Image</h1>
                    <h1 className='font-bold text-center col-span-2'>Name</h1>
                    <h1 className='font-bold text-center '>Order Id</h1>
                    <h1 className='font-bold text-center'>Price</h1>
                    <h1 className='font-bold text-center'>Quantity</h1>
                    <h1 className='font-bold text-center col-span-2'>Address</h1>
                    <h1 className='font-bold text-center '>Pay</h1>
                </div>
             {
              users.map((user)=>{
                return (user.orders).map((order)=>{
                  return (order.Items).map((item)=>{
                    return(
                       
                      <div className='grid grid-cols-9 items-center w-[67rem] '>
                      <div className='flex justify-center' ><img src={item.images[0]} alt="" className='w-20'/></div>
                      <span className='col-span-2 text-center'>{item.name}</span>
                      <span className='text-center '>#{order.id}</span>
                      <span className='text-center'>$ {item.price}</span>
                      <span className='text-center'>{item.count}</span>
                      <div className='col-span-2 flex  flex-col items-center'>
                        <div>
                          <p className=' '>{order.userData.name}</p>
                         <span className=' '>{order.userData.address}</span>
                          <p className=' '>{order.userData.zipcode}</p>
                        </div>
                      </div>
                      <span className='text-center '>{order.paymentMethode}</span>
                      </div>

                    )
                  })
                })
              })
             }
     
      </div>
    </div>
  )
}

export default OrdersView
