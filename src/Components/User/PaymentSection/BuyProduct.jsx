
import React, { useEffect, useState } from 'react';
import { addAddress, addOrder, getAddressById, getCartById} from '../../../Api/UserHelpers/UsersConnection';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function BuyProduct() {
  const [data, setData] = useState([]);
  const userRole = localStorage.getItem("userRole");
  const [updateAddress,setUpdateAddress] = useState({fullName:'',address:'',pincode:'',phone:''});
  const nav = useNavigate();
  const [userData,setUSerData] = useState({});
  const [paymentMethode,setPaymentMethod] = useState('');

    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      script.onload = () => {
        console.log('Razorpay script loaded successfully');
      };
      document.body.appendChild(script);
    }, []);
  
    const handlePayment = async () => {
     
      try {
        // Create an order on the backend
        const { data: order } = await axios.post('http://localhost:3001/api/payment', {
          amount: data.totalCartPrice,
        });
        const options = {
          key: 'rzp_test_czxwLsdvB0eVMr',
          amount: order.amount,
          currency: order.currency,
          name: 'LuxeLounge',
          description: 'Transaction',
          order_id: order.id,
          handler: async function (response) {
            // Verify the payment on the backend
            const verificationResponse = await axios.post(
              'http://localhost:3001/api/verify-payment',
              response
            );
  
            if (verificationResponse.data.success) {
              alert('Payment Successful!');
            } else {
              alert('Payment Verification Failed!');
            }
          },
          prefill: {
            name: 'John Doe', // User's name
            email: 'johndoe@example.com', // User's email
            contact: '9876543210', // User's phone
          },
          theme: {
            color: '#FFFF00', // Custom color for Razorpay Checkout
          },
        };
  
        // Open Razorpay Checkout
        const razorpay = new window.Razorpay(options);
        console.log(razorpay);
        
        razorpay.open();
  
        // Add a handler for payment failure
        razorpay.on('payment.failed', function (response) {
          alert(`Payment Failed: ${response.error.reason}`);
        });
      } catch (error) {
        console.error('Payment Error:', error);
        alert('Payment Initialization Failed!');
      }
    };
    

  // Fetch cart and address
  useEffect(() => {
    if (userRole) {
      getCartById()
        .then((res) => setData(res.data.data))
        .catch((error) => console.log(error));
        getAddressById()
        .then((res)=>setUSerData(res.data.addressDetails))
        .catch(error => setUSerData(null))
    }
  }, [userRole]);

  // Handel onChange
  function handelOnChange(event){
    const {name,value} = event.target;
    setUpdateAddress({...updateAddress,[name]:value});
  }

  // Add address and update
  function addAddressData(){
    addAddress(updateAddress)
    .then((res)=>setUSerData(res.data.data.addressDetails))
    .catch((error) => console.log(error));
  }
  function editAddress(){
    setUpdateAddress(userData)
    setUSerData(null)
  }

  // Payment section
  function payMethode(status,value){
    if(status){
      setPaymentMethod(value);
    }
  }

  // Add order
  async function addOrderData(){
    if(userData && paymentMethode){
      if(paymentMethode !== "Cash on delivery"){
        const payment = await handlePayment()
          if (payment){
            addOrder({paymentMethode})
            .then(()=> { nav('/orders')
            toast.success("Item Orders Sucessfully",{position:'bottom-right'})
          })
          }else console.log("haii")
      }
      else{
        addOrder({paymentMethode})
        .then(()=> { nav('/orders')
        toast.success("Item Orders Sucessfully",{position:'bottom-right'})
      })
      }
    }else{
      if(!userData){
       toast.error('Fill The Address ❗',{position:'bottom-right'})
        
      }else if(!paymentMethode){
       toast.error('Fill The Payment Methode ❗',{position:'bottom-right'})
      }
    }
  }

  return (
    <div>
      <div style={{ marginTop: '8rem' }}>
      <div className="main flex justify-center">
        <div className="image-details w-[80%] rounded flex flex-col md:flex-row">
          <div style={{height:"40rem"}} className=' md:w-1/2 flex flex-col justify-between'>
          <div style={{ height: '25rem' }} className="image space-y-5  p-2 flex flex-col border  overflow-scroll overflow-x-hidden custom-scrollbar">
            <div className="md:flex flex-col space-y-5">
                  
                  {
                    data.products && data.products.map((value)=>(
                      <div className="image-details border flex w-[100%] p-3 justify-evenly">
                    <img src={value.productId.images[0]} className="big-image bg-white w-32  rounded hover:transform hover:scale-105  transition-all duration-500 ease-in-out"alt=''/>
                    <div className='flex justify-between w-[60%] '>
                       <div>
                            <h1 className='font-bold'>{value.productId.name}</h1>
                            <h1 className='text-xs'>{value.productId.description}</h1>
                       </div>
                        <div>
                            <p className='font-bold'>${value.productId.price}</p>
                            <p className='text-xs'>Quantity : {value.quantity}</p>
                        </div>
                    </div>
                  </div>
                    ))
                  }
                </div>
          </div>
                <div className='border p-5 flex flex-col space-y-5 mt-5'>
                   {
                    (userData)?
                    <>
                         <div className='flex justify-between'>
                    <h1 className='font-bold text-xl'>Delivery Information</h1>
                    
                    <button onClick={()=>editAddress(userData._id)} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Edit</button>
                    </div>
                    <hr/>
                    <div>
                        <h3 className='font-bold'>{userData.fullName}</h3>
                        <p >{userData.address}</p>
                        <p>{userData.pincode}</p>
                        <p>+91 {userData.phone}</p>
                    </div>
                    </>
                    :
                    <>
                        <div className='flex flex-col justify-between w-[100%] space-y-5'>
                    <div className='flex justify-between'>
                      <h1 className='font-bold text-xl'>Delivery Information</h1>
                      <button onClick={addAddressData} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Add</button>
                    </div>
                  
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={handelOnChange} value={updateAddress.fullName} name='fullName' type="text" placeholder='Firstname'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                      </div>
                      <div className=''><input onChange={handelOnChange} value={updateAddress.address} name='address' type="text"placeholder='Address'  className='p-3 w-[90%] border rounded-md h-10  focus:outline-yellow-400 '/></div>
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={handelOnChange} value={updateAddress.pincode} name='pincode' type="numbert"placeholder='Pincode'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400'/>
                      </div>
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={handelOnChange} value={updateAddress.phone} name='phone' type="number" placeholder='Enter Mobile'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                      </div>
                      
                    </div>
                    </>
                   }

                    
            </div>
          </div>

         

          <div className="details h-[100%] md:w-1/2 text-left md:ml-5 flex flex-col space-y-5 mt-5  w-[100%]">
            <span className="text-xl font-bold ">Order Summary</span>
            <div className='flex justify-between border'>
              <input type="text" placeholder="Enter Coupon Code" className=" h-10 p-5 focus:outline-none" />
              <button className='text-sm p-1 text-white bg-black'>Applay Code</button>
            </div>
            <div className="total flex flex-col justify-evenly space-y-3 border p-5">
            <div className="flex justify-between">
                <span>MRP ({data.products ? data.products.length : 0} items)</span>
                <span>${data.totalCartPrice}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-bold">Total</span>
                <span className="font-bold">${data.totalCartPrice}</span>
              </div>
            </div>
            <hr />
            <div className="total flex flex-col justify-evenly space-y-3 border p-5">
              <div className="flex justify-center">
                <span className="text-xl font-bold">Payment Details</span>
              </div>
              <hr />
              <div>
                  <div><input onChange={(e)=>payMethode(e.target.checked,"Cash on delivery")} name='payMethode' type="radio" /><span> Cash on delivery</span></div>
                  <div><input onChange={(e)=>payMethode(e.target.checked,"Paypal")} name='payMethode' type="radio" /><span> Paypal</span></div>
                  <div><input onChange={(e)=>payMethode(e.target.checked,"Upi")} name='payMethode' type="radio" /><span> Upi</span></div>
                  <div><input onChange={(e)=>payMethode(e.target.checked,"Credit or Debit card")} name='payMethode' type="radio" /><span> Credit or Debit card</span></div>
                  <div><input onChange={(e)=>payMethode(e.target.checked,"Pay Later")} name='payMethode' type="radio" /><span> Pay Later</span></div>
                  
              </div>
            </div>
            <div className="cart-buy md:space-x-3 space-y-3 w-[100%]">
              <button onClick={addOrderData}  className="bg-yellow-400 font-bold text-xl text-black px-6 py-3 rounded-lg w-full  hover:bg-black hover:text-yellow-400">Pay now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BuyProduct
