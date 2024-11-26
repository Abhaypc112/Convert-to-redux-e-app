import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import { deleteProductById, getProductsById } from '../../../Api/ProductHelper/ProductConnection'
import { addCart, getCartById, getUserById } from '../../../Api/UserHelpers/UsersConnection';
import { UserContext } from '../../../Contexts/UserContext';
import Header from '../../Header';
import EditProduct from '../ViewProducs/EditProduct';
import { toast } from 'react-toastify';


function AdminProdauct() {
    


  const[Obj,setObj]=useState({});
  const[imgcount,setImgCount]=useState(0);
  const {id}=useParams();
  const adminId=localStorage.getItem("userRole");
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();
  const {editStatus,setEditStatus}=useContext(UserContext);
  const [productId,setProductId]=useState("");
  
  function handelEdit(){
    setProductId(id)
    setEditStatus(true)
    
  }

  function handleDelete(){
    deleteProductById(id)
    navigate('/viewproducts')
    toast.success("Product Deleted")
  }

  useEffect(()=>{
    getProductsById(id)
    .then((res)=>setObj(res.data))
    .catch((error)=>console.log(error))
  },[editStatus])
  

  return (
 
      
      <div style={{marginTop:"8rem"}} className="main flex  w-[80%] relative">
                    <div className="image-details  rounded flex border bg-white shadow-md flex-col md:flex-row">
                <div className="image md:w-1/2 flex flex-col items-center">
                    {
                      Obj.images && Obj.images[imgcount]?(
                        <img src={Obj.images[imgcount]} className="big-image bg-white w-[90%] h-96  m-6 rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out"/>
                    
                      ):
                      <span className='w-[25rem] h-96'>No Image Available</span>
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
                    <div className="cart-buy md:space-x-3 gap-5 w-[100%] ">
                      <button onClick={handelEdit} className="bg-yellow-400 text-black px-6 py-3 rounded-lg w-full md:w-auto hover:text-white mt-5">Edit</button>
                      <button onClick={handleDelete} className="bg-black text-yellow-400 px-6 py-3 rounded-lg w-full md:w-auto hover:text-white mt-5">Delete</button>
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
              {
                editStatus?
                
                  <EditProduct id={productId}/>
               
                :null
              }
      </div>
   
  )
}

export default AdminProdauct
