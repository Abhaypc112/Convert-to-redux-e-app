import React, { useEffect, useState } from 'react'
import { getAllUsers } from '../../../Api/UserHelpers/UsersConnection';
import { getTotalOrders } from '../../../Api/ProductHelper/ProductConnection';

function OrdersView() {
  const [users,setUsers]=useState([]);
  useEffect(()=>{
    getTotalOrders()
    .then((res)=>setUsers(res.data.data))
  })
  return (
    <div style={{marginTop:"7rem"}} className='w-[88%] md:w-[80%] flex justify-center bg-slate-100 h-lvh'>
      <div className="form-div w-[95%] space-y-3 shadow-md p-10 bg-white mb-32 rounded overflow-y-auto custom-scrollbar">
        <div className=' w-[67rem]'>
          <h1 className='text-2xl font-bold'>Orders</h1>
        </div>
        <div className='grid grid-cols-9 w-[67rem]'>
                    <h1 className='font-bold text-center '>Image</h1>
                    <h1 className='font-bold text-center '>Name</h1>
                    <h1 className='font-bold text-center col-span-2'>Order Id</h1>
                    <h1 className='font-bold text-center'>Price</h1>
                    <h1 className='font-bold text-center'>Quantity</h1>
                    <h1 className='font-bold text-center col-span-2'>Address</h1>
                    <h1 className='font-bold text-center '>Pay</h1>
                </div>
             {
              users.slice(0).reverse().map((user)=>{
                return (user.products).map((item)=>{
              
                    return(
                       
                      <div key={item.id} className='grid grid-cols-9 items-center w-[67rem] '>
                      <div className='flex justify-center' ><img src={item.productId.images[0]} alt="" className='w-20'/></div>
                      <span className=' text-center'>{item.productId.name}</span>
                      <span className='text-center col-span-2 '>#{item.productId._id}</span>
                      <span className='text-center'>$ {user.totalAmount}</span>
                      <span className='text-center'>{item.quantity}</span>
                      <div className='col-span-2 flex  flex-col items-center'>
                        <div>
                          <p className=' '>{user.deliveryDetails.name}</p>
                         <span className=' '>{user.deliveryDetails.address}</span>
                          <p className=' '>{user.deliveryDetails.pincode}</p>
                        </div>
                      </div>
                      <span className='text-center '>{user.paymentMethode}</span>
                      </div>

                    )
                  })
                })
             
             }
     
      </div>
    </div>
  )
}

export default OrdersView
