import React, { useContext, useEffect, useState } from 'react'
import { getOrdersById } from '../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContext'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function Orders() {
    const userInfo=localStorage.getItem('userId')
    const[data,setData]=useState([])
    const nav=useNavigate();
    const {carts}=useContext(UserContext)
    useEffect(()=>{
       if(userInfo){
        getOrdersById(userInfo)
        .then((res)=>setData(res)) 
       }
       console.log('order');
       
    },[userInfo,carts]) 
  return (
   <div>
<Header/> 
   <div  style={{marginTop:"8rem",minHeight:"25rem"}}>
    <h1 className='text-2xl font-bold mb-5 text-center'>Orders</h1>
       <div style={{minHeight:"25rem"}} className='flex flex-col-reverse min:h-96 md:space-y-5  items-center'>
       
        {
            data.map((Obj)=>(
                       
               
                    Obj.Items.map((value)=>(
                     <>
                            <div  className='w-[80%] border flex-col md:flex-row  flex justify-between p-2 '>
                           <div className='flex flex-col justify-center'>
                           <img onClick={()=>nav(`/product/${value.id}`)} src={value.image} alt="" className='w-28 hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
                        </div>
                        <div className='flex flex-col justify-center w-60'>
                            <p className='font-bold'>{value.name}</p>
                            <p className='text-sm'>{value.description}</p>
                            <p>Quantity : {value.count}</p>
                            <p className='font-bold'>$ {value.totalPrice}</p>
                        </div>
                         <div className='flex flex-col justify-center'>
                         <p className='text-sm font-bold'>OrderId : {Obj.id}</p>
                         <p className='text-sm'>{Obj.date.day}</p> 
                                <p className='text-sm'>{Obj.date.time}</p>
                                
                        </div>
                        <div className='flex flex-col justify-center   w-40'>
                                <p className='font-bold'>{Obj.userData.name}</p>
                                <p className='text-sm'>{Obj.userData.address}</p>
                                <p className='text-sm'>{Obj.userData.zipcode}</p>
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
   </div>
   <Footer/>
   </div>
  )
}

export default Orders
