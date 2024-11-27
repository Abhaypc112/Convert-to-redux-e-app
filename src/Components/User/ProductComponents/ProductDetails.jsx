import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductsById } from '../../../Api/ProductHelper/ProductConnection'
import { addCart } from '../../../Api/UserHelpers/UsersConnection';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Contexts/UserContext';


function ProductDetails() {
  const [Obj, setObj] = useState({});
  const [count, setCount] = useState(1);
  const [imgcount, setImgCount] = useState(0);
  const {_id} = useParams();
  const userRole = localStorage.getItem("userRole");
  const nav = useNavigate();
  const {setCart,carts} = useContext(UserContext);
 
// Fetch product
  useEffect(()=>{
    getProductsById(_id)
    .then((res)=>setObj(res.data))
    .catch((error)=>console.log(error))
  },[_id,userRole])
  
// Add to cart
async function addItemCart(_id){
  if(userRole){
    addCart(_id,{quantity:count})
    .then((res)=>{
      setCart(!carts)
      if(res.data) toast.success("Item added to cart",{position:'bottom-right'})})}
  else nav('/login')
}
  return (
    <div>
      <div style={{marginTop:"8rem"}} className="main flex justify-center">
                    <div className="image-details w-[80%] rounded flex border flex-col md:flex-row">
                <div className="image md:w-1/2 flex flex-col items-center ">
                    {
                      Obj.images && Obj.images[imgcount]?(
                        <img src={Obj.images[imgcount]} className="big-image bg-white w-[90%] h-96  m-6 rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out"/>
                    
                      ):
                      <span>No Image Available</span>
                    }
                     <div className='sm-image w-[90%] h-20 bg-white space-x-20 flex overflow-scroll overflow-y-hidden custom-scrollbar'>
                     {
                      Obj.images?.map((image,index)=>{
                        return(
                         
                        <img onClick={()=>setImgCount(index)} src={image} alt="" className='w-30 h-20 bg-black hover:transform hover:scale-105  transition-all duration-500 ease-in-out' />
                        
                        )
                      })
                     }
                    </div> 
                </div>
                <div className="details h-[100%] md:w-1/2 text-left md:ml-5 flex flex-col space-y-5 p-5 w-[100%]">
                    <h1 className='text-3xl font-bold '>{Obj.name}</h1>
                    <p className='text-sm max-w-[70%]'>{Obj.description}</p>
                    <div className='mb-5'><span className='text-sm'>⭐ {Obj.rating}</span><p className='text-red-700'> Only Left {Obj.stock} !</p></div>
                    <hr />
                    <span className='text-3xl font-bold'>${Obj.price}</span>
                    <div className='count bg-gray-200 w-28 h-9 flex justify-evenly items-center rounded-2xl '>
                      <button onClick={()=>setCount(pre=>pre===1?1:count-1)} className='rounded-lg w-10 h-7'>-</button>
                      <span>{count}</span>
                      <button onClick={()=>setCount(count+1)}  className='rounded-lg w-10 h-7'>+</button>
                    </div>
                    <div className="cart-buy md:space-x-3 gap-5 w-[100%] ">
                      <button onClick={()=>addItemCart(Obj._id)} className="bg-black text-yellow-400 px-6 py-3 rounded-lg w-full md:w-auto hover:text-white mt-5">Add to Cart </button>
                    </div>
                    <div className="delivery space-y-1 ">
                      <div className="free w-[100%] border p-3">
                          <span className='font-bold'>Free Delivery</span>
                          <p>Free delivery on orders above $50</p>
                      </div>
                      <div className="pay w-[100%] border p-3">
                        <span className='font-bold'>Pay Online</span>
                        <p>Secure payments through credit card or UPI</p>
                      </div>
                    </div>
                </div>
              </div>
      </div>
    </div>
  )
}

export default ProductDetails
