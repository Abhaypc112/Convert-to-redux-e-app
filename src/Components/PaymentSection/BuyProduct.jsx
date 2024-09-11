
import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Contexts/UserContext';
import { addAddress, addCart, addOrder, deleteItem, getAddressById, getCartById, getOrdersById, getUserById } from '../../Api/UserHelpers/UsersConnection';
import { useNavigate } from 'react-router-dom';

function BuyProduct() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [data, setData] = useState([]);
  // const { userInfo } = useContext(UserContext);
  const userInfo=localStorage.getItem("userId");
  const nav = useNavigate();
  const [fname,setFname]=useState('');
  const [lname,setLname]=useState('');
  const [address,setAddress]=useState('');
  const [town,setTown]=useState('');
  const [zipcode,setZipcode]=useState('');
  const [mobile,setMobile]=useState('');
  const [email,setEmail]=useState('');
  const [userData,setUSerData]=useState({});
  const [paymentMethode,setPaymentMethod]=useState('')
  const d= new Date()


  useEffect(() => {
    if (userInfo) {
      getCartById(userInfo)
      .then((res)=>{
        setData(res)
        calculateTotalPrice(res)
      })
      getAddressById(userInfo)
      .then((res)=>setUSerData(res))
    }
  }, [userInfo]);
  function calculateTotalPrice(cart) {
    if (cart) {
      const total = cart.reduce((acc, item) => acc + item.totalPrice, 0);
      setTotalPrice(total);
    }
  }
  function addAddressData(){
    const name=fname+lname;
    const data={name,address,town,zipcode,mobile,email}
    addAddress(userInfo,{address:data})
    .then((res)=>setUSerData(res.data.address))
  }
  function editAddress(){
    addAddress(userInfo,{address:null})
    .then((res)=>setUSerData(res.data.address))
  }
  function payMethode(status,value){
    if(status){
      setPaymentMethod(value);
    }
    
  }
  async function addOrderData(){
    if(data.length>0 && userData && paymentMethode){
      const day=d.toDateString();
    const time=d.toLocaleTimeString();
    const date={day,time}
    const currentOrders= await getOrdersById(userInfo)
    let updatedOrders;
    
    const dataSet={id:Date.now(),Items:data,date,userData,paymentMethode}
    if(!currentOrders){
      updatedOrders=[dataSet]
    }else{
      updatedOrders=[...currentOrders,dataSet]
    }
    
   
    addOrder(userInfo,{orders:updatedOrders})
    deleteItem(userInfo,{ cart:[]})
    .then((res)=>setData(res.data))
    nav('/orders')
    }else{
      if(data.length==0){
        alert('Add Iteam to Cart')
      }
      else if(!userData){
        alert('Fill The Address')
        
      }else if(!paymentMethode){
        alert('Fill The Payment Methode')
      }
    }
  }

  return (
    <div>
      <div style={{ marginTop: '10rem' }}>
      <div className="main flex justify-center">
        <div className="image-details w-[80%] rounded flex flex-col md:flex-row">
          <div style={{height:"40rem"}} className=' md:w-1/2 flex flex-col justify-between'>
          <div style={{ height: '25rem' }} className="image space-y-5  p-2 flex flex-col border  overflow-scroll overflow-x-hidden custom-scrollbar">
            <div className="md:flex flex-col space-y-5">
                  
                  {
                    data.map((value)=>(
                      <div className="image-details border flex w-[100%] p-3 justify-evenly">
                    <img src={value.image} className="big-image bg-white w-32  rounded"alt=''/>
                    <div className='flex justify-between w-[60%] '>
                       <div>
                            <h1 className='font-bold'>{value.name}</h1>
                            <h1 className='text-xs'>{value.description}</h1>
                       </div>
                        <div>
                            <p className='font-bold'>${value.price}</p>
                            <p className='text-xs'>Quantity : {value.count}</p>
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
                    
                    <button onClick={editAddress} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Edit</button>
                    </div>
                    <hr/>
                    <div>
                        <h3 className='font-bold'>{userData.name}</h3>
                        <p >{userData.address}</p>
                        <p>{userData.zipcode}</p>
                        <p>+91 {userData.mobile}</p>
                        <p>{userData.email}</p>
                    </div>
                    </>
                    :
                    <>
                        <div className='flex flex-col justify-between w-[100%] space-y-5'>
                    <div className='flex justify-between'>
                      <h1 className='font-bold text-xl'>Delivery Information</h1>
                      <button onClick={addAddressData} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Add</button>
                    </div>
                      <form action="">
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={(e)=>setFname(e.target.value)} value={fname} type="text" placeholder='Firstname'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                        <input onChange={(e)=>setLname(e.target.value)} value={lname} type="text"placeholder='Lastname'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400'/>
                      </div>
                      <div className=''><input onChange={(e)=>setAddress(e.target.value)} value={address} type="text"placeholder='Address'  className='p-3 w-[90%] border rounded-md h-10  focus:outline-yellow-400 '/></div>
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={(e)=>setTown(e.target.value)} value={town} type="text" placeholder='City / Towm'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                        <input onChange={(e)=>setZipcode(e.target.value)} value={zipcode} type="numbert"placeholder='Zip Code'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400'/>
                      </div>
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={(e)=>setMobile(e.target.value)} value={mobile} type="number" placeholder='Enter Mobile'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type="text"placeholder='Enter Email'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400'/>
                      </div>
                      </form>
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
                <span>MRP ({data ? data.length : 0} items)</span>
                <span>${totalPrice}</span>
              </div>
              <hr />
              <div className="flex justify-between">
                <span className="font-bold">Sub Total</span>
                <span className="font-bold">${totalPrice}</span>
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
                  
              </div>
            </div>
            <div className="cart-buy md:space-x-3 space-y-3 w-[100%]">
              <button onClick={addOrderData}  className="bg-yellow-400 font-bold text-xl text-black px-6 py-3 rounded-lg w-full">Pay now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default BuyProduct
