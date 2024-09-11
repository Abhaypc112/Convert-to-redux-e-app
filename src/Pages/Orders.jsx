import React, { useEffect, useState } from 'react'
import { getOrdersById } from '../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom'

function Orders() {
    const userInfo=localStorage.getItem('userId')
    const[data,setData]=useState([])
    const nav=useNavigate();
    useEffect(()=>{
       if(userInfo){
        getOrdersById(userInfo)
        .then((res)=>setData(res)) 
       }
    },[userInfo]) 
  return (
    <div style={{marginTop:"8rem",minHeight:"25rem"}} className='flex flex-col min:h-96 md:space-y-5 items-center'>
        <h1 className='text-2xl font-bold mb-5'>Orders</h1>
        {
            data.map((Obj)=>(
                       
               
                    Obj.Items.map((value)=>(
                     <>
                            <div  className='w-[80%] border flex-col md:flex-row  flex justify-between p-2'>
                           <div className='flex flex-col justify-center'>
                           <img onClick={()=>nav(`/product/${value.id}`)} src={value.image} alt="" className='w-28'/>
                        </div>
                        <div className='flex flex-col justify-center w-60'>
                            <p className='font-bold'>{value.name}</p>
                            <p className='text-sm'>{value.description}</p>
                            <p>Quantity : {value.count}</p>
                            <p className='font-bold'>$ {value.totalPrice}</p>
                        </div>
                         <div className='flex flex-col justify-center'>
                         <p className='text-sm'>{Obj.date.day}</p> 
                                <p className='text-sm'>{Obj.date.time}</p>
                                <p className='text-sm font-bold'>OrderId : {Obj.id}</p>
                        </div>
                        <div className='flex flex-col justify-center   w-40'>
                                <p>{Obj.userData.name}</p>
                                <p className='text-sm'>{Obj.userData.address}</p>
                        </div>
                        <div className='flex flex-col justify-center  w-40'>
                                <p className='text-sm font-bold'>{Obj.paymentMethode}</p>
                        </div>
                        </div>
                     </>
                       
                    ))
             
               
            ))
        }

        
    </div>
  )
}

export default Orders
