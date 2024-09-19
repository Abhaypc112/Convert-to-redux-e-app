import React from 'react'

function AddProduct() {
  return (
    <div style={{marginLeft:"18%",marginTop:"8rem"}} className='w-[80%] flex justify-center bg-slate-100 h-lvh'>
      <div className="form-div md:w-[80%] space-y-5 shadow-md p-10 bg-white mb-20 rounded">
        <h1 className='text-2xl font-bold'>Add Product</h1>
        <form action="" className='space-y-5'>
            <div className='md:flex justify-between'>
                <div className='flex flex-col md:w-[49%] '>
                    <label htmlFor="name">Name</label>
                    <input type="text" name='name'className='border p-2  rounded-md  focus:outline-yellow-400'/>
                </div>
                <div className='flex flex-col md:w-[49%] ' >
                        <label htmlFor="name">Price</label>
                        <input type="number" name='price'className='border p-2   rounded-md  focus:outline-yellow-400'/>
                </div>
            </div>

            <div className='flex justify-between'>
                <div style={{width:"49%"}} className='flex flex-col'>
                    <label htmlFor="name">Category</label>
                    <div className='border p-2   rounded-md  focus:outline-yellow-400'>
                <select name="category" id="category" className='w-[100%] outline-none'>
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
                        <input type="number" name='stock'className='border p-2   rounded-md  focus:outline-yellow-400'/>
                </div>
            </div>
            <div className='flex flex-col'>
                <label htmlFor="image">Image Url</label>
                <input type="text" name='image'className='border p-2   rounded-md  focus:outline-yellow-400'/>
            </div>

            <div className='flex flex-col'>
                <label htmlFor="discription">Discription</label>
                <textarea name="discription" id="" className='border p-2   rounded-md  focus:outline-yellow-400'></textarea>
            </div>
           
            <button className=' text-yellow-400 w-[100%] p-3 rounded bg-black font-bold'>Add Product</button>
          
           
        </form>
      </div>
    </div>
  )
}

export default AddProduct
