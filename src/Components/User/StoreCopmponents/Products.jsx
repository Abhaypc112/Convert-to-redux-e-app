import React, { useEffect,useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import { getProducts, getProductsByCategory } from '../../../Api/ProductHelper/ProductConnection';
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { addWishlist, getWishlist } from '../../../Api/UserHelpers/UsersConnection';
import { toast } from 'react-toastify';

function Products() {
  const[data,setData]=useState([]);
  const[wishDta,setWishData] = useState([]);
  const[storeData,setStoreData]=useState([]);
  const {category}=useParams();
  
  useEffect(()=>{
   if(category){
    getProductsByCategory(category)
    .then((res)=>setData(res.data))
    getWishlist()
    .then((res) => setWishData(res.data.data))
  }else{
    getProductsByCategory("")
    .then((res)=>setStoreData(res.data))
    getWishlist()
    .then((res) => setWishData(res.data.data))
  }
  },[category])
  const addtoWishlist = (_id) =>{
    addWishlist(_id)
    .then((res)=>{
      getWishlist()
      .then((res) => setWishData(res.data.data))
  })
  } 
  return (
    <div>
      <div style={{marginTop:"7rem"}} className="p-6 ">
      {/* <h2 className="text-2xl font-semibold mb-4">Produts</h2> */}
      <div className="flex gap-5 mx-10 flex-wrap justify-center">
        {
          ((!category)?storeData:data).map((Obj)=>{
            const data = wishDta.products && wishDta.products.find((item) => item.productId._id == Obj._id)
            if(data){
              return(
                <div style={{width:"20rem",height:"26rem"}} className=' rounded shadow border hover:transform hover:scale-105  transition-all duration-500 ease-in-out'>
                  <NavLink to={`/product/${data._id}`}>
                <img src={data.productId.images[0]} alt="" className='w-[100%] h-[60%] bg-black rounded relative ' />
                </NavLink>
                <div className='flex flex-col mx-1 justify-between'>
                <span className='text-sm font-bold'>{data.productId.name}</span>
                  <span className='text-sm text-gray-600 h-10'>{data.productId.description}</span>
                  <span className='text-xs  text-gray-400'>Left {data.productId.stock}</span>
                  <span className='text-xs'>{data.productId.rating}⭐</span>
                  <div className='flex justify-between items-center h-10'>
                    <span className='text-xl font-bold'>$ {data.productId.price}</span>
                    {/* <FaRegHeart className='h-6 w-6 hover:h-7 w-7 text-red-600 hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/> */}
                    <FaHeart onClick={()=>addtoWishlist(data.productId._id)} className='h-6 w-6 hover:h-7 w-7 text-red-600 hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
                  </div>
                  </div>
                </div>
              
              )
            }else{
              return(
                <div style={{width:"20rem",height:"26rem"}} className=' rounded shadow border hover:transform hover:scale-105  transition-all duration-500 ease-in-out'>
                  <NavLink to={`/product/${Obj._id}`}>
                <img src={Obj.images[0]} alt="" className='w-[100%] h-[60%] bg-black rounded relative ' />
                </NavLink>
                <div className='flex flex-col mx-1 justify-between'>
                <span className='text-sm font-bold'>{Obj.name}</span>
                  <span className='text-sm text-gray-600 h-10'>{Obj.description}</span>
                  <span className='text-xs  text-gray-400'>Left {Obj.stock}</span>
                  <span className='text-xs'>{Obj.rating}⭐</span>
                  <div className='flex justify-between items-center h-10'>
                    <span className='text-xl font-bold'>$ {Obj.price}</span>
                    <FaRegHeart onClick={()=>addtoWishlist(Obj._id)} className='h-6 w-6 hover:h-7 w-7 text-red-600 hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/>
                    {/* <FaHeart className='h-6 w-6 hover:h-7 w-7 text-red-600 hover:transform hover:scale-105  transition-all duration-500 ease-in-out'/> */}
                  </div>
                  </div>
                </div>
              
              )
            }
            
          }) 
        }
      </div>
    </div>
    </div>
  )
}

export default Products
