import React, { useEffect, useState } from 'react'
import { addAddress, getAddressById, getUserById } from '../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom'

function Profile() {
  const userInfo=localStorage.getItem("userId")
  const[user,setUser]=useState({})
  const nav=useNavigate();
  const [fname,setFname]=useState('');
  const [lname,setLname]=useState('');
  const [address,setAddress]=useState('');
  const [town,setTown]=useState('');
  const [zipcode,setZipcode]=useState('');
  const [mobile,setMobile]=useState('');
  const [email,setEmail]=useState('');
  const [userData,setUSerData]=useState({});

    useEffect(()=>{
        if(userInfo){
            getUserById(userInfo)
            .then((res)=>setUser(res.data))
            getAddressById(userInfo)
            .then((res)=>setUSerData(res))
        }else{
          nav('/login')
        }
    },[userInfo])

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
    function logout(){
      localStorage.removeItem("userId")
      nav('/home')
    }
  return (
    
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
                    
                    <button onClick={editAddress} className='bg-gray-200 p-1 w-20 text-sm rounded-md'>Edit</button>
                    </div>
                    <hr/>
                    <div className='space-y-1'>
                        <h3 className='font-bold'>{userData.name}</h3>
                        <p >{userData.address}</p>
                        <p>{userData.zipcode}</p>
                        <p>+91 {userData.mobile}</p>
                        <p>{userData.email}</p>
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
                    </div>
                    </>
                   }

                    
            </div>
       </div>
    </div>
  )
}

export default Profile
