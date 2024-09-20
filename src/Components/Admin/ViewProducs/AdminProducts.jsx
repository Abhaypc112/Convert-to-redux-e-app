import React, { useContext, useEffect, useState } from 'react'
import { deleteProductById, getProducts } from '../../../Api/ProductHelper/ProductConnection'
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';
import { UserContext } from '../../../Contexts/UserContext';

function AdminProducts() {
  const [products,setProducts]=useState([]);
  const navigate=useNavigate();
  const {editStatus,setEditStatus}=useContext(UserContext);
  const [productId,setProductId]=useState("");

  function handelEdit(id){
    setProductId(id)
    setEditStatus(true)
    
  }

  function handleDelete(id){
    console.log(id);
    
    deleteProductById(id)
  }
  useEffect(()=>{
    getProducts()
    .then((res)=>setProducts(res.data))
  },[handleDelete])
  return (
      <div style={{marginTop:"7rem"}}  className='w-[88%] md:w-[80%] flex justify-center bg-slate-100 h-lvh relative '>
      <div className="form-div w-[95%] space-y-3 shadow-md p-10 bg-white mb-32 rounded overflow-y-auto custom-scrollbar">
        <div className='flex justify-between w-[67rem]'>
          <h1 className='text-2xl font-bold'>Products</h1>
          <button onClick={()=>navigate('/addproduct')} className='bg-green-500 rounded p-2 text-white font-bold text-sm'>Add Product</button>
        </div>
        <div className='grid grid-cols-8 w-[67rem]'>
                    <h1 className='font-bold text-center '>Image</h1>
                    <h1 className='font-bold text-center col-span-2'>Name</h1>
                    <h1 className='font-bold text-center '>Id</h1>
                    <h1 className='font-bold text-center'>Price</h1>
                    <h1 className='font-bold text-center'>Quantity</h1>
                    <div className='flex justify-evenly col-span-2'>
                      <h1 className='font-bold text-center'>Edit</h1>
                      <h1 className='font-bold text-center'>Delete</h1>
                    </div>
                </div>
              
             {
              products.map((product)=>{
                return(
                  <div className='grid grid-cols-8 items-center w-[67rem] '>
                  <div className='flex justify-center' ><img src={product.images[0]} alt="" className='w-16' /></div>
                  <span className='col-span-2 text-center'>{product.name}</span>
                  <span className='text-center '>#{product.id}</span>
                  <span className='text-center'>$ {product.price}</span>
                  <span className='text-center'>{product.stock}</span>
                  <div className='col-span-2 flex justify-evenly'>
                  <button onClick={()=>handelEdit(product.id)} className='bg-yellow-400 w-[30%] p-1 rounded'>Edit</button>
                  <button onClick={()=>handleDelete(product.id)} className='bg-black text-white w-[30%] p-1 rounded'>Delete</button>
                  </div>
                  </div>
                )
              })
             }
      </div>
      {
        editStatus?
         <EditProduct id={productId}/>
        :null
      }
    </div>
  )
}

export default AdminProducts
