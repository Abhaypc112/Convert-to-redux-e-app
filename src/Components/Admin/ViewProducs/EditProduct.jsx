import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../../Contexts/UserContext'
import { EditProductById, getProductsById } from '../../../Api/ProductHelper/ProductConnection'
import { toast } from 'react-toastify'

function EditProduct({id}) {
    const data={name:"",price:0,category:"",stock:0,description:"",rating:0,images:[""]}
    const [productDetails,setProductDetails]=useState(data)
    const {editStatus,setEditStatus}=useContext(UserContext);

    
    function addImageInput(){
        setProductDetails(pre=>({
            ...pre,images:[...pre.images,""]
        }))
    } 
    function handleImageChange(e,index){
        const updatedImage=[...productDetails.images];
        updatedImage[index]=e.target.value;
        setProductDetails((pre)=>({
            ...pre,images:updatedImage
        }))
    }
    function handleCghange(e){
        const{name,value,type,checked}=e.target;
            setProductDetails(
                {...productDetails,[name]:value}
            )    
    }
    function handleSubmit(e){
        e.preventDefault();
       EditProductById(id,productDetails)
       .then((res) => console.log(res.data))
       setEditStatus(false)
       toast.success("Upadated Product Details")
    }

    useEffect(()=>{
        if(id){
            getProductsById(id)
        .then((res)=>setProductDetails(res.data)) 
        }
    },[id])
  return (
    <div className=" form-div md:w-[90%] w-[90%] h-[35rem] space-y-3 shadow-md p-10 bg-gray-300 mb-32 rounded z-50 absolute top-5  overflow-scroll custom-scrollbar ">
             <div className='flex justify-between'>
             <h1 className='text-2xl font-bold'>Add Product</h1>
             <button onClick={()=>setEditStatus(false)} className='bg-yellow-400 p-1 font-bold rounded'>Close</button>
             </div>
             <form onSubmit={handleSubmit} className='space-y-5'>
            <div className='md:flex justify-between'>
                <div className='flex flex-col md:w-[49%] '>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleCghange} type="text" value={productDetails.name} name='name'className='border p-2  rounded-md  focus:outline-yellow-400'/>
                </div>
                <div className='flex flex-col md:w-[49%] ' >
                        <label htmlFor="name">Price</label>
                        <input onChange={handleCghange} type="number" value={productDetails.price} name='price'className='border p-2   rounded-md  focus:outline-yellow-400'/>
                </div>
            </div>

            <div className='flex justify-between'>
                <div style={{width:"49%"}} className='flex flex-col'>
                    <label htmlFor="name">Category</label>
                    <div className='border p-2   rounded-md bg-white focus:outline-yellow-400'>
                <select onChange={handleCghange} name="category" id="category" value={productDetails.category} className='w-[100%] focus:outline-none '>
                    <option value="no selection" selected>Choose category</option>
                    <option value="beds">beds</option>
                    <option value="sofas">sofas</option>
                    <option value="chairs">chairs</option>
                    <option value="gaming chire">gaming chairs</option>
                    <option value="tables">tables</option>
                    <option value="mattresses">mattresses</option>
                </select>
            </div>
                </div>
                <div  style={{width:"49%"}} className='flex flex-col' >
                        <label htmlFor="name">Stock</label>
                        <input onChange={handleCghange} type="number" value={productDetails.stock} name='stock'className='border p-2   rounded-md  focus:outline-yellow-400'/>
                </div>
            </div>
            <div className='flex flex-col'>
            
                <label htmlFor="image">Image Url</label>
                <div className='flex  space-x-2'>
                    <img src={productDetails.images[0]} alt="" className='w-10 h-10' />
                    <input onChange={(e)=>handleImageChange(e,0)} type="text" value={productDetails.images[0]} name='images'className='border p-2 w-full  rounded-md  focus:outline-yellow-400'/>
                </div>
            </div>
                {
                    productDetails.images.slice(1).map((img,index)=>{
                        return(
                        <div key={index} className='flex flex-col'>
                            
                            <label htmlFor="image">Image Url</label>
                            <div className='flex  space-x-2'>
                            <img src={img} alt="" className='w-10 h-10' />
                            <input onChange={(e)=>handleImageChange(e,index+1)} type="text" value={img} name='images'className='border p-2   rounded-md w-full focus:outline-yellow-400'/>
                            </div>
                             
                        </div>
                        )
                    })
                }
                 <button type='button' onClick={addImageInput} className=' text-black w-[50%] p-3 rounded bg-yellow-400 font-bold'>Add Image</button>
          
            <div className='flex flex-col'>
                <label htmlFor="description">Description</label>
                <textarea onChange={handleCghange} name="description" value={productDetails.description} id="" className='border p-2   rounded-md  focus:outline-yellow-400'></textarea>
            </div>
           
            <button className=' text-yellow-400 w-[100%] p-3 rounded bg-black font-bold'>Edit Product</button>
          
           
        </form>
            </div>
  )
}

export default EditProduct
