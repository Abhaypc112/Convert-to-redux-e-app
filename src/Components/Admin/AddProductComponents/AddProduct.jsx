import React, { useState } from 'react'
import { addProduct } from '../../../Api/ProductHelper/ProductConnection';
import { toast } from 'react-toastify';

function AddProduct() {
    const data={name:"",price:null,category:"",stock:null,description:"",rating:0,images:[""]}
    const [productDetails,setProductDetails]=useState(data)

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
            setProductDetails(prev=>(
                {...prev,[name]:value}
            )) 
        
    }
    function handleSubmit(e){
        e.preventDefault();
        addProduct(productDetails)
        setProductDetails(data)
        toast.success("Product Added")
    }

  return (
    <div style={{marginLeft:"18%",marginTop:"8rem"}} className='w-[80%] flex justify-center bg-slate-100 '>
      <div className="form-div md:w-[80%] space-y-5 shadow-md p-10 bg-white mb-20 rounded ">
        <h1 className='text-2xl font-bold'>Add Product</h1>
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
                    <div className='border p-2 bg-white  rounded-md  focus:outline-yellow-400'>
                <select onChange={handleCghange} name="category" id="category" value={productDetails.category} className='w-[100%] focus:outline-none'>
                    <option value="" selected>Choose category</option>
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
                <input onChange={(e)=>handleImageChange(e,0)} type="text" value={productDetails.images[0]} name='images'className='border p-2   rounded-md  focus:outline-yellow-400'/>
            </div>
                {
                    productDetails.images.slice(1).map((img,index)=>{
                        return(
                        <div className='flex flex-col'>
                            <label htmlFor="image">Image Url</label>
                            <input onChange={(e)=>handleImageChange(e,index+1)} type="text" value={img} name='images'className='border p-2   rounded-md  focus:outline-yellow-400'/>
                        </div>
                        )
                    })
                }
                 <button type='button' onClick={addImageInput} className=' text-black w-[50%] p-3 rounded bg-yellow-400 font-bold'>Add Image</button>
          
            <div className='flex flex-col'>
                <label htmlFor="description">Description</label>
                <textarea onChange={handleCghange} name="description" value={productDetails.description} id="" className='border p-2   rounded-md  focus:outline-yellow-400'></textarea>
            </div>
           
            <button className=' text-yellow-400 w-[100%] p-3 rounded bg-black font-bold'>Add Product</button>
          
           
        </form>
      </div>
    </div>
  )
}

export default AddProduct
