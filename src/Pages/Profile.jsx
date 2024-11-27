import React, { useEffect, useState } from 'react'
import { addAddress, getAddressById, getUserById } from '../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom'
import Header from '../Components/Header'
import Footer from '../Components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '../Slices/authSlice';

function Profile() {
  const token = localStorage.getItem("token");
  const[user,setUser]=useState({})
  const nav=useNavigate();
  const [updateAddress,setUpdateAddress] = useState({fullName:'',address:'',pincode:'',phone:''})
  const [userData,setUSerData]=useState({});
  const dispatch = useDispatch();

    useEffect(()=>{
        if(token){
            getUserById()
            .then((res)=>setUser(res.data))
            .catch((error) => console.log(error));
            getAddressById()
            .then((res)=>setUSerData(res.data.addressDetails))
            .catch(error => {
              console.log(error)
              setUSerData(null) 
            })
        }else{
          nav('/login')
        }
    },[token])

function handelOnChange(event){
  const {name,value} = event.target;
  setUpdateAddress({...updateAddress,[name]:value});
}

function addAddressData(){
  addAddress(updateAddress)
  .then((res)=>setUSerData(res.data.data.addressDetails))
  .catch((error) => console.log(error));
}
function editAddress(){
  setUpdateAddress(userData)
    setUSerData(null)
}
function logout(){
  dispatch(logOut())
  nav('/login')
}
  return (
    
     <div>
      <Header/> 
       <div style={{marginTop:"10rem"}} className='flex justify-center'>
       <div  className='w-[100%] md:w-[50%] border shadow-sm flex md:flex-row flex-col  '>
        <div className="left flex flex-col space-y-3 p-10  md:w-1/3 items-center h-full justify-evenly border">
          <div className='text-center'>
            <img src='https://www.pngkey.com/png/detail/202-2024792_user-profile-icon-png-download-fa-user-circle.png' className='w-30 h-30 bg-white rounded-full'/>
            <h1 className='font-bold text-xl'>{user.name}</h1>
          </div>
          <button onClick={()=>nav('/orders')} className='text-sm bg-yellow-400 w-[90%] md:w-40 font-bold p-2 rounded-lg hover:bg-yellow-500'>Orders</button>
          <button onClick={()=>nav('/Cart')} className='text-sm bg-yellow-400 w-[90%] md:w-40 font-bold p-2 rounded-lg hover:bg-yellow-500'>Cart</button>
          <button onClick={()=>nav('/store')} className='text-sm bg-yellow-400 w-[90%] md:w-40 font-bold p-2 rounded-lg hover:bg-yellow-500'>Store</button>
          <button onClick={logout} className='text-sm bg-black text-white w-[90%] md:w-40 font-bold  p-2 rounded-lg hover:text-yellow-500'>Logout</button>
          
        </div>
        <div className='border p-5 flex flex-col space-y-5 w-[100%] md:w-[90%] items-center'>
                   {
                    (userData)?
                    <div className='border w-[100%]  md:w-[90%] space-y-6 p-5'>
                         <div className='flex justify-between '>
                    <h1 className='font-bold text-xl'>Address</h1>
                    
                    <button onClick={()=>editAddress(userData._id)} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Edit</button>
                    </div>
                    <hr/>
                    <div className='space-y-1'>
                        <h3 className='font-bold'>{userData.fullName}</h3>
                        <p >{userData.address}</p>
                        <p>{userData.pincode}</p>
                        <p>+91 {userData.phone}</p>
                    </div>
                    </div>
                    :
                    <>
                        <div className='flex flex-col justify-between w-[100%] space-y-5'>
                    <div className='flex justify-between'>
                      <h1 className='font-bold text-xl'>Address</h1>
                      <button onClick={addAddressData} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Add</button>
                    </div>
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={handelOnChange} name='fullName' value={updateAddress.fullName} type="text" placeholder='Enter Fullname'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                      </div>
                      <div className=''><input onChange={handelOnChange} name='address' value={updateAddress.address} type="text"placeholder='Address'  className='p-3 w-[90%] border rounded-md h-10  focus:outline-yellow-400 '/></div>
                      <div className='flex justify-between w-[90%]'>
                        <input onChange={handelOnChange} name='pincode' value={updateAddress.pincode} type="numbert"placeholder='Pincode'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400'/>
                        <input onChange={handelOnChange} name='phone' value={updateAddress.phone} type="number" placeholder='Enter Phone'  className='p-3 w-[48%] border rounded-md h-10  focus:outline-yellow-400' />
                      </div>
                    </div>
                    </>
                   }

                    
            </div>
       </div>
    </div>
    <Footer/>
     </div>
  )
}

export default Profile
