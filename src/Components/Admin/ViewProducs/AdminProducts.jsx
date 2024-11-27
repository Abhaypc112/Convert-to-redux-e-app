import React, { useContext, useEffect, useState } from 'react'
import { deleteProductById, getProducts } from '../../../Api/ProductHelper/ProductConnection'
import { useNavigate } from 'react-router-dom';
import EditProduct from './EditProduct';
import { UserContext } from '../../../Contexts/UserContext';
import { toast } from 'react-toastify';

function AdminProducts() {
  const [products,setProducts]=useState([]);
  const [filterdProducts,setFilterdProducts]=useState([]);
  const navigate=useNavigate();
  const {editStatus,setEditStatus}=useContext(UserContext);
  const [productId,setProductId]=useState("");
 const [searchTerm, setSearchTerm] = useState("");



  function handelEdit(id){
    setProductId(id)
    setEditStatus(true)
    
  }

  function handleDelete(id){
    deleteProductById(id)
    .then(()=>{
      getProducts()
    .then((res)=>setProducts(res.data))
    .catch((error) => console.log(error));
    toast.success("Product Deleted")
    })
    .catch((error) => console.log(error));
  }
  useEffect(()=>{
    getProducts()
    .then((res)=>setProducts(res.data))
    .catch((error) => console.log(error));
  },[editStatus])

  useEffect(()=>{
      if(searchTerm.trim()===''){
        setFilterdProducts(products)
        return ;
      }
      else{
        const searchProducts=products.filter((value)=>
          value.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilterdProducts(searchProducts)
      }
   

  },[searchTerm,products])
  
  return (
      <div style={{marginTop:"7rem"}}  className='w-[88%] md:w-[80%] flex justify-center bg-slate-100 h-lvh relative '>
      <div className="form-div w-[95%] space-y-3 shadow-md p-10 bg-white mb-32 rounded overflow-y-auto custom-scrollbar">
        <div className='flex justify-between w-[67rem]'>
          <h1 className='text-2xl font-bold'>Products</h1>
          <input type="text" placeholder='Search Products' onChange={(e)=>setSearchTerm(e.target.value)} className='className="w-40 md:w-48 py-2 bg-transparent text-black focus:outline-none border-black outline-none border-b focus:w-64 transition-all duration-500 ease-in-out"' />
          <button onClick={()=>navigate('/admin/add-product')} className='bg-green-500 rounded p-2 text-white font-bold text-sm'>Add Product</button>
        </div>
        <div className='grid grid-cols-7 w-[67rem] '>
                    <h1 className='font-bold text-center '>Image</h1>
                    <h1 className='font-bold text-center col-span-2'>Name</h1>
                    {/* <h1 className='font-bold text-center'>Id</h1> */}
                    <h1 className='font-bold text-center'>Price</h1>
                    <h1 className='font-bold text-center'>Quantity</h1>
                    <div className='flex justify-evenly col-span-2'>
                      <h1 className='font-bold text-center'>Edit</h1>
                      <h1 className='font-bold text-center'>Delete</h1>
                    </div>
                </div>
              
             {
              filterdProducts.slice(0).reverse().map((product)=>{
                return(
                  <div key={product.id} className='grid grid-cols-7 items-center w-[67rem]'>
                    <div  onClick={()=>navigate(`/admin/view-product/${product._id}`)} className='flex justify-center cursor-pointer' ><img src={product.images[0]} alt="" className='w-16' /></div>
                      <span onClick={()=>navigate(`/admin/view-product/${product._id}`)} className='col-span-2 text-center cursor-pointer'>{product.name}</span>
                      {/* <span className='text-center '>#{product.id}</span> */}
                      <span className='text-center'>$ {product.price}</span>
                      <span className='text-center'>{product.stock}</span>
                    <div  className='col-span-2 flex justify-evenly'>
                      <button onClick={()=>handelEdit(product._id)} className='bg-yellow-400 w-[30%] p-1 rounded'>Edit</button>
                      <button onClick={()=>handleDelete(product._id)} className='bg-black text-white w-[30%] p-1 rounded'>Delete</button>
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
