import React, { useEffect,useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getProducts } from '../../Api/ProductHelper/ProductConnection'
import { CgHeart } from "react-icons/cg";
import { FcLike } from "react-icons/fc";

function Products() {
  const[data,setData]=useState([]);
  const[storeData,setStoreData]=useState([]);
  const[wishlist,setWishlist]=("");
  const {category}=useParams();
  
  useEffect(()=>{
    getProducts()
    .then((res)=>setStoreData(res.data))
  },[])
  useEffect(()=>{
    getProducts()
    .then((res)=>setData((res.data).filter((value)=>{
      return value.category===category
    })))
  },[])
  return (
    <div>
      <div style={{marginTop:"7rem"}} className="p-6 ">
      {/* <h2 className="text-2xl font-semibold mb-4">Produts</h2> */}
      <div className="flex gap-5 mx-10 flex-wrap justify-start">
        {
          (!category)?
          storeData.map((Obj)=>{
            return(
                  <NavLink to={`/product/${Obj.id}`}>
              <div style={{width:"20rem",height:"26rem"}} className=' rounded shadow '>
              {
                !wishlist?
                <FcLike onClick={()=>setWishlist("")} className='absolute z-10 m-5 size-5 hover:size-6'/>
                : <CgHeart onClick={()=>setWishlist("true")} className='absolute z-10 m-5 size-5 hover:size-6'/>
              }
              <img src={Obj.image} alt="" className='w-[100%] h-[70%] bg-black rounded relative' />
              
              <div className='flex flex-col ml-1 justify-between'>
              <span className='text-sm font-bold'>{Obj.name}</span>
                <span className='text-sm text-gray-600'>{Obj.description}</span>
                <span className='text-xs  text-gray-400'>Left {Obj.stock}</span>
                <span className='text-xs'>{Obj.rating}⭐</span>
                <span className='text-xl font-bold'>$ {Obj.price}</span>
                {/* <div className="cart-buy md:space-x-3 space-y-3 w-[100%] ">
                      <NavLink to={`/cart/${Obj.id}`}><button className="text-black bg-yellow-400 px-5 py-2 rounded-lg w-full md:w-auto  hover:bg-black hover:text-yellow-400">Add to Cart </button></NavLink>
                    
                    </div>   */}
                </div>
              </div>
            </NavLink>
            )
          }) 
          :
          data.map((Obj)=>{
            return(
                  <NavLink to={`/product/${Obj.id}`}>
              <div style={{width:"20rem",height:"26rem"}} className=' rounded shadow '>
              <img width="25" height="24" alt="wishlist icon" src="https://ii1.pepperfry.com/assets/w22-wishlist-empty.svg" className=" rounded-2xl absolute z-10 m-5 hover:bg-yellow-400"></img>
              <img src={Obj.image} alt="" className='w-[100%] h-[70%] bg-black rounded relative' />
              
              <div className='flex flex-col ml-1 justify-between'>
              <span className='text-sm font-bold'>{Obj.name}</span>
                <span className='text-sm text-gray-600'>{Obj.description}</span>
                <span className='text-xs  text-gray-400'>Left {Obj.stock}</span>
                <span className='text-xs'>{Obj.rating}⭐</span>
                <span className='text-xl font-bold'>$ {Obj.price}</span>
                {/* <div className="cart-buy md:space-x-3 space-y-3 w-[100%] ">
                      <NavLink to={`/cart/${Obj.id}`}><button className="text-black bg-yellow-400 px-5 py-2 rounded-lg w-full md:w-auto  hover:bg-black hover:text-yellow-400">Add to Cart </button></NavLink>
                    
                    </div>   */}
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
