import React, { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../../../Contexts/UserContext';
import { addCart, deleteItem, getCartById, getUserById } from '../../../Api/UserHelpers/UsersConnection';
import { useNavigate } from 'react-router-dom';

function CartSection() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState({});
  const {carts,setCart} = useContext(UserContext);
  const userInfo=localStorage.getItem("userId");
  const nav = useNavigate();
  const[id,setId]=useState('');
  const modalRef=useRef();
  const emptyModalRef=useRef();


  useEffect(() => {
    if (userInfo) {
      getUserById(userInfo)
        .then((res) => {
          setData(res.data);
          calculateTotalPrice(res.data.cart);
        })
        .catch((error) => console.log(error));
    }
  }, [userInfo]);

  function calculateTotalPrice(cart) {
    if (cart) {
      const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalPrice(total);
    }
  }

  function deleteCartItem(cartId) {
    setId(cartId)
    modalRef.current.style.top="200px"
    setTimeout(()=>{
      modalRef.current.style.top="0px"
    },3000)
      
  }
  function CheckedState(){
    modalRef.current.style.top="0px"
    const updatedCart = data.cart.filter((value) => value.id !== id);
       const updatedData = { ...data, cart: updatedCart };
        deleteItem(data.id, { cart: updatedCart })
        .then(() => {
          setData(updatedData);
          calculateTotalPrice(updatedCart);
          if(carts){
            setCart(false)
          }else{
            setCart(true)
          }
        })
        .catch((error) => console.log(error));
  }
  function stateCancel(){
    modalRef.current.style.top="0px"
  }
  async function increment(productId){
    const currentCart = await getCartById(userInfo)
    const updatedCart=currentCart.map((value)=>
      productId===value.id?{...value,count:value.count+1,totalPrice:value.price*(value.count+1)}:value)
    await addCart(userInfo,{cart:updatedCart})
    .then((res)=>{
      setData(res.data)
      calculateTotalPrice(res.data.cart)
  })
  }
  async function decrement(productId) {
    const currentCart = await getCartById(userInfo)
    const updatedCart=currentCart.map((value)=>
      productId===value.id?{...value,count:value.count===1?1:value.count-1,totalPrice:value.price*(value.count===1?1:value.count-1)}:value)
    await addCart(userInfo,{cart:updatedCart})
    .then((res)=>{
      setData(res.data)
      calculateTotalPrice(res.data.cart)
  })
  }

  if (!userInfo) {
    nav('/login');
    return null;
  }

  function buyOrder(){
   if(data.cart.length>0){
    nav('/payment')
   }else{
    emptyModalRef.current.style.top="200px"
    setTimeout(()=>{
      emptyModalRef.current.style.top="0px"
    },1000)
   }
  }


  return (
    <div style={{ marginTop: '10rem' }}>
      <div className="main flex justify-center">
        <div className="image-details w-[80%] rounded flex flex-col md:flex-row">
          <div style={{ height: '40rem' }}className="image space-y-5 md:w-1/2  flex flex-col border overflow-scroll overflow-x-hidden custom-scrollbar">
            {data.cart && data.cart.length > 0 ? (
              data.cart.map((value) => (
                <div key={value.id} className="md:flex flex-col">
                  <div className="image-details md:flex w-full md:w-[100%] md:m-6 space-y-3">
                    <img src={value.image} className="big-image bg-white w-full md:w-[40%] md:h-[80%] rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out"alt={value.name} onClick={()=>nav(`/product/${value.id}`)}/>
                    <div className="md:ml-5 ml-2 flex flex-col space-y-3">
                      <h1 className="text-md font-bold">{value.name}</h1>
                      <p className="text-sm max-w-[70%]">{value.description}</p>
                      <div className="count border w-28 h-9 flex justify-evenly items-center rounded-2xl">
                        <button onClick={()=>decrement(value.id)} className="rounded-lg w-10 h-7">-</button>
                        <span>{value.count}</span>
                        <button onClick={()=>increment(value.id)} className="rounded-lg w-10 h-7">+</button>
                      </div>
                      <span  className="text-xl font-bold">${value.totalPrice}</span>
                    </div>
                  </div>
                  <div className="delete-wishlist space-y-3 md:space-y-0 mb-5 md:flex-row flex flex-col justify-between md:justify-evenly">
                    <button className="text-black   py-3 rounded-lg w-full md:w-[40%] border">Wishlist</button>
                    <button onClick={() => deleteCartItem(value.id)}className="text-black  py-3 rounded-lg w-full md:w-[40%] border">Delete</button>
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
                <span>MRP ({data.cart ? data.cart.length : 0} items)</span>
                <span>${totalPrice}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-bold">Sub Total</span>
                <span className="font-bold">${totalPrice}</span>
              </div>
              <hr />
              <div>
                <span>Plant a tree for Rs.60 only!</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-bold text-xl">TOTAL</span>
                <span className="font-bold text-xl">${totalPrice}</span>
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
              
              <div ref={modalRef} className="absolute  left-[35%] h-[90px] flex flex-col justify-between w-[300px] bg-black p-3 rounded shadow-lg z-40 top-0 transition-all duration-500 ease-in-out">
                            <span className='text-center text-yellow-400 '> Item Delete to Cart ❌</span>
                              <div className='flex justify-center  space-x-5'>
                              <button onClick={CheckedState} className=' w-20 rounded font-bold bg-yellow-400'>Ok</button>
                              <button onClick={stateCancel} className='bg-white w-20 rounded font-bold'>Cancel</button>
                             </div>
                       </div>
                       <div ref={emptyModalRef} className="absolute left-[40%]  w-[20%] text-center bg-black p-2 rounded shadow-lg z-40 top-0 transition-all duration-500 ease-in-out">
                             <span className='text-center text-yellow-400 '> Cart Is Empty ❗</span>
                       </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartSection;
