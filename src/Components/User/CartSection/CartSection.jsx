import React, { useContext, useEffect, useState } from 'react';
import { adjustCount, deleteItem, getCartById, } from '../../../Api/UserHelpers/UsersConnection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../../Contexts/UserContext';

function CartSection() {
  const [data, setData] = useState([]);
  const userRole = localStorage.getItem("userRole");
  const nav = useNavigate();
  const {setCart,carts} = useContext(UserContext);


  // Fetch cart products
  useEffect(() => {
    if (userRole) {
      getCartById()
        .then((res) => setData(res.data.data))
        .catch((error) => console.log(error));
    }
  }, [userRole]);

  // Delete product
  async function deleteCartItem(productId) {
    await deleteItem(productId)
    .then((res) =>{
      setData(res.data.data);
      setCart(!carts)
      toast.success("Item deleted",{position:'bottom-right'});
    })
  }

  // Change product count
  async function changeProductCount(productId,adjust){
    await adjustCount(productId,adjust)
    .then((res) => setData(res.data.data))
  }

  //Role verification
  if (!userRole) {
    nav('/login');
    return null;
  }

  // Order section
  function buyOrder(){
   if(data.products.length>0){
    nav('/payment')
   }else{
    toast.error("Cart is Empty",{position:'bottom-right'});
   }
  }

  return (
    <div style={{ marginTop: '8rem' }}>
      <div className="main flex justify-center">
        <div className="image-details w-[80%] rounded flex flex-col md:flex-row">
          <div style={{ height: '40rem' }}className="image space-y-5 md:w-1/2  flex flex-col border overflow-scroll overflow-x-hidden custom-scrollbar">
            {data.products && data.products.length > 0 ? (
              data.products.map((value) => (
                <div key={value.id} className="md:flex flex-col">
                  <div className="image-details md:flex w-full md:w-[100%] md:m-6 space-y-3">
                    <img src={value.productId.images[0]} className="big-image bg-white w-full md:w-[40%] md:h-[80%] rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out"alt={value.name} onClick={()=>nav(`/product/${value.productId._id}`)}/>
                    <div className="md:ml-5 ml-2 flex flex-col space-y-3">
                      <h1 className="text-md font-bold">{value.productId.name}</h1>
                      <p className="text-sm max-w-[70%]">{value.productId.description}</p>
                      <div className="count border w-28 h-9 flex justify-evenly items-center rounded-2xl">
                        <button onClick={()=>changeProductCount(value.productId._id,'decrement')} className="rounded-lg w-10 h-7">-</button>
                        <span>{value.quantity}</span>
                        <button onClick={()=>changeProductCount(value.productId._id,'increment')} name='decrement' className="rounded-lg w-10 h-7">+</button>
                      </div>
                      <span  className="text-xl font-bold">${value.totalProductPrice}</span>
                    </div>
                  </div>
                  <div className="delete-wishlist space-y-3 md:space-y-0 mb-5 md:flex-row flex flex-col justify-between md:justify-evenly">
                    <button className="text-black   py-3 rounded-lg w-full md:w-[40%] border">Wishlist</button>
                    <button onClick={() => deleteCartItem(value.productId._id)}className="text-black  py-3 rounded-lg w-full md:w-[40%] border">Delete</button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-cart flex justify-center items-center">
                <img src="https://cdni.iconscout.com/illustration/free/thumb/free-empty-cart-illustration-download-in-svg-png-gif-file-formats--is-explore-box-states-pack-design-development-illustrations-3385483.png?f=webp" alt="" />
              </div>
            )}
          </div>

          <div className="details h-[100%] md:w-1/2 text-left md:ml-5 flex flex-col space-y-5 mt-5  w-[100%]">
            <span className="text-sm text-gray-400">Delivering To</span>
            <input type="text" placeholder="Enter Pincode" className="border h-10 p-5 focus:outline-none" />
            <hr />
            <div className="total flex flex-col justify-evenly space-y-3 border p-5">
              <div className="flex justify-center">
                <span className="text-xl font-bold">Cart Summary</span>
              </div>
              <div className="flex justify-between">
                <span>MRP ({data.products ? data.products.length : 0} items)</span>
                <span>${data.totalCartPrice}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-bold">Sub Total</span>
                <span className="font-bold">${data.totalCartPrice}</span>
              </div>
              <hr />
              <hr />
              <div className="flex justify-between">
                <span className="font-bold text-xl">TOTAL</span>
                <span className="font-bold text-xl">${data.totalCartPrice}</span>
              </div>
            </div>
            <div className="cart-buy md:space-x-3 space-y-3 w-[100%]">
              <button onClick={buyOrder} className="bg-yellow-400 text-black px-6 py-3 rounded-lg w-full hover:bg-black hover:text-yellow-400 font-bold">Buy Now</button>
            </div>
            <div className="delivery space-y-1">
              <div className="free w-[100%] border p-3">
                <span className="font-bold">Free Delivery</span>
                <p>Free delivery on orders above $50</p>
              </div>
              <div className="pay w-[100%] border p-3">
                <span className="font-bold">Pay Online</span>
                <p>Secure payments through credit card or UPI</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSection;
