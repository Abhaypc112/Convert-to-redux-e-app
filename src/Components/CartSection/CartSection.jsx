import React from 'react'

function CartSection() {
  return (
    <div style={{marginTop:"10rem"}}>
      <div style={{marginTop:"10rem"}} className="main flex justify-center">
        <div className="image-details w-[80%]  rounded flex flex-col md:flex-row ">
          <div style={{height:"40rem"}} className="image space-y-5  md:w-1/2 flex flex-col border overflow-scroll overflow-x-hidden custom-scrollbar">
              <div className=' md:flex flex-col'>
              <div className="image-details md:flex w-full md:w-[100%] md:m-6 space-y-3 ">
                    <img src='https://www.mobelhomestore.com/cdn/shop/files/helbrp.jpg?v=1703153580' className="big-image bg-white w-full md:w-[40%] md:h-[80%]  rounded"/>
                    <div className='md:ml-5 ml-2 flex flex-col  space-y-3'>
                        <h1 className='text-md font-bold '>BIngo Fabric 2 Seater Sofa</h1>
                        <p className='text-sm max-w-[70%]'>The href attribute requires a valid value to be accessible.</p>
                        <div className='count border w-28 h-9 flex justify-evenly items-center rounded-2xl '>
                            <button className='rounded-lg w-10 h-7'>-</button>
                            <span>1</span>
                            <button className='rounded-lg w-10 h-7'>+</button>
                        </div>
                        <span className='text-xl font-bold'>$3999</span>
                    </div>
              </div>
              <div className="delete-wishlist  md:ml-6 space-x-3 space-y-3  ">
                <button className="text-balck px-6 py-3 rounded-lg w-full md:w-[40%] border">Wishlist</button>
                <button className=" text-black px-6 py-3 rounded-lg w-full md:w-[40%] border">Delete</button>
              </div>
              </div>
              <div className=' md:flex flex-col'>
              <div className="image-details md:flex w-full md:w-[100%] md:m-6 space-y-3 ">
                    <img src='https://www.mobelhomestore.com/cdn/shop/files/helbrp.jpg?v=1703153580' className="big-image bg-white w-full md:w-[40%] md:h-[80%]  rounded"/>
                    <div className='md:ml-5 ml-2 flex flex-col  space-y-3'>
                        <h1 className='text-md font-bold '>BIngo Fabric 2 Seater Sofa</h1>
                        <p className='text-sm max-w-[70%]'>The href attribute requires a valid value to be accessible.</p>
                        <div className='count border w-28 h-9 flex justify-evenly items-center rounded-2xl '>
                            <button className='rounded-lg w-10 h-7'>-</button>
                            <span>1</span>
                            <button className='rounded-lg w-10 h-7'>+</button>
                        </div>
                        <span className='text-xl font-bold'>$3999</span>
                    </div>
              </div>
              <div className="delete-wishlist  md:ml-6 space-x-3 space-y-3  ">
                <button className="text-balck px-6 py-3 rounded-lg w-full md:w-[40%] border">Wishlist</button>
                <button className=" text-black px-6 py-3 rounded-lg w-full md:w-[40%] border">Delete</button>
              </div>
              </div>
              <div className=' md:flex flex-col'>
              <div className="image-details md:flex w-full md:w-[100%] md:m-6 space-y-3 ">
                    <img src='https://www.mobelhomestore.com/cdn/shop/files/helbrp.jpg?v=1703153580' className="big-image bg-white w-full md:w-[40%] md:h-[80%]  rounded"/>
                    <div className='md:ml-5 ml-2 flex flex-col  space-y-3'>
                        <h1 className='text-md font-bold '>BIngo Fabric 2 Seater Sofa</h1>
                        <p className='text-sm max-w-[70%]'>The href attribute requires a valid value to be accessible.</p>
                        <div className='count border w-28 h-9 flex justify-evenly items-center rounded-2xl '>
                            <button className='rounded-lg w-10 h-7'>-</button>
                            <span>1</span>
                            <button className='rounded-lg w-10 h-7'>+</button>
                        </div>
                        <span className='text-xl font-bold'>$3999</span>
                    </div>
              </div>
              <div className="delete-wishlist  md:ml-6  space-y-3  ">
                <button className="text-balck px-6 py-3 rounded-lg w-full md:w-[40%] border">Wishlist</button>
                <button className=" text-black px-6 py-3 rounded-lg w-full md:w-[40%] border">Delete</button>
              </div>
              </div>
              
              
          </div>
          
          <div className="details h-[100%] md:w-1/2 text-left md:ml-5 flex flex-col space-y-5 p-5 w-[100%]">
          <span className='text-sm text-gray-400'>Delivering To</span>
              <input type="text" placeholder='Enter Pincode' className='border h-10 p-5 focus:outline-none'/>
              <hr />
                <div className="total flex flex-col justify-evenly space-y-3 border p-5">
                    <div className='flex justify-center'><span className='text-xl font-bold'>Cart Summary</span></div>
                    <div className='flex justify-between'><span>MRP (2 items)</span> <span>$10999</span></div><hr />
                    <div className='flex justify-between'><span className='font-bold'>Sub Total</span> <span className='font-bold'>$10999</span></div><hr />
                    <div ><input type="checkbox" /> <span>Plant a tree for Rs.60 only !</span></div><hr />
                    <div className='flex justify-between' ><span className='font-bold text-xl'>TOTAL</span><span className='font-bold text-xl'>$10999</span></div>
                </div>
              <div className="cart-buy md:space-x-3 space-y-3 w-[100%] ">
                <button className="bg-yellow-400 text-balck px-6 py-3 rounded-lg w-full">Buy Now</button>
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
      </div>
    </div>
  )
}

export default CartSection
