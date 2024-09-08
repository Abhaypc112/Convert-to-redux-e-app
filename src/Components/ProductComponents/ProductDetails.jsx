import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { getProducts } from '../../Api/ProductHelper/ProductConnection'


function ProductDetails() {
  const[data,setData]=useState([]);
  const[count,setCount]=useState(0);
  const {id}=useParams();
  useEffect(()=>{
    getProducts()
    .then((res)=>setData((res.data).filter((value)=>{
      return value.id==id
    })))
  })
  return (
    <div>
      <div style={{marginTop:"10rem"}} className="main flex justify-center">
        {
          data.map((Obj)=>{
            return(
                    <div className="image-details w-[80%] rounded flex border flex-col md:flex-row">
                <div className="image md:w-1/2 flex flex-col items-center ">
                    <img src={Obj.images[count]} className="big-image bg-white w-[90%] h-96  m-6 rounded"/>
                    <div className='sm-image w-[90%] h-20 bg-white gap-5 flex justify-between overflow-scroll overflow-y-hidden custom-scrollbar'>
                      <img onClick={()=>setCount(0)} src={Obj.images[0]} alt="" className='w-30 h-20 bg-black' />
                      <img onClick={()=>setCount(1)} src={Obj.images[1]} alt="" className='w-30 h-20 bg-black' />
                      <img onClick={()=>setCount(2)} src={Obj.images[2]} alt="" className='w-30 h-20 bg-black' />
                      <img onClick={()=>setCount(3)} src={Obj.images[3]} alt="" className='w-30 h-20 bg-black' />
                    </div>
                </div>
                <div className="details h-[100%] md:w-1/2 text-left md:ml-5 flex flex-col space-y-5 p-5 w-[100%]">
                    <h1 className='text-3xl font-bold '>{Obj.name}</h1>
                    <p className='text-sm max-w-[70%]'>{Obj.description}</p>
                    <div className='mb-5'><span className='text-sm'>⭐ {Obj.rating}</span><p className='text-red-700'>Left Only {Obj.stock} !</p></div>
                    <hr />
                    <span className='text-3xl font-bold'>${Obj.price}</span>
                    <div className='count bg-gray-200 w-28 h-9 flex justify-evenly items-center rounded-2xl '>
                      <button className='rounded-lg w-10 h-7'>-</button>
                      <span>1</span>
                      <button className='rounded-lg w-10 h-7'>+</button>
                    </div>
                    <div className="cart-buy md:space-x-3 gap-5 w-[100%] ">
                      <button className="bg-yellow-400 text-balck px-6 py-3 rounded-lg w-full md:w-auto">Buy Now</button>
                      <NavLink to={'/cart'}><button className="bg-black text-yellow-400 px-6 py-3 rounded-lg w-full md:w-auto mt-5">Add to Cart </button></NavLink>
                    </div>
                    <div className="delivery space-y-1 ">
                      <div className="free w-[100%] border p-3">
                          <span className='font-bold'>Free Delivery</span>
                          <p>The href attribute requires a valid value to be accessible.</p>
                      </div>
                      <div className="pay w-[100%] border p-3">
                        <span className='font-bold'>Pay Online</span>
                        <p>The href attribute requires a valid value to be accessible.</p>
                      </div>
                    </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default ProductDetails
