import React, { useContext, useEffect, useState } from 'react'
import { getOrdersById } from '../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'

function Orders() {
    const userRole = localStorage.getItem('userRole')
    const [ orders, setOrders ] = useState({})
    const nav=useNavigate();

// Get orders 
    useEffect(()=>{
    if(userRole){
        getOrdersById()
        .then((res)=> setOrders(res.data)) 
        .catch((error) => console.log(error));
       }
    },[userRole]);


  return (
   <div>
<Header/> 
   <div  style={{marginTop:"8rem",minHeight:"25rem"}}>
    <h1 className='text-2xl font-bold mb-5 text-center'>Orders</h1>
       <div style={{minHeight:"25rem"}} className='flex flex-col-reverse min:h-96 md:space-y-5  items-center'>
        {orders.data && orders.data.map((Obj)=>(
               Obj.products.map((value)=>(
                     <>
                        <div  className='w-[80%] border flex-col md:flex-row  flex justify-between p-2 '>
                        <div className='flex flex-col justify-center'>
                        <img onClick={()=>nav(`/product/${value.productId._id}`)} src={value.productId.images[0]} alt="" className='w-28 hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
                        </div>
                        <div className='flex flex-col justify-center w-60'>
                            <p className='font-bold'>{value.productId.name}</p>
                            <p className='text-sm'>{value.productId.description}</p>
                            <p>Quantity : {value.quantity}</p>
                            <p className='font-bold'>$ {Obj.totalAmount}</p>
                        </div>
                         <div className='flex flex-col justify-center'>
                         <p className='text-sm font-bold'>OrderId : {Obj._id}</p>
                         <p className='text-sm'>Date : {Obj.date}</p> 
                        </div>
                        <div className='flex flex-col justify-center   w-40'>
                                <p className='font-bold'>{Obj.deliveryDetails.name}</p>
                                <p className='text-sm'>{Obj.deliveryDetails.address}</p>
                                <p className='text-sm'>{Obj.deliveryDetails.pincode}</p>
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
