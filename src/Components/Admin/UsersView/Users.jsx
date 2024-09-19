import React, { useEffect, useState } from 'react'
import { blockUserById, deleteUserById, getAllUsers } from '../../../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users,setUsers]=useState([]);
  const navigate=useNavigate();

  function handelDelete(id){
    deleteUserById(id)
  }
  function handelBlock(id,status){
    blockUserById(id,!status)
    .then((res)=>console.log(res.data))
  }
  useEffect(()=>{
    getAllUsers()
    .then((res)=>setUsers(res.data))
  },[handelDelete,handelBlock])
  
  return (
    <div style={{marginTop:"7rem"}} className='w-[88%] md:w-[80%] flex justify-center bg-slate-100 h-lvh'>
    <div className="form-div w-[95%] space-y-5 shadow-md p-10 bg-white mb-32 rounded overflow-y-auto custom-scrollbar">
    <div className='flex justify-between w-[67rem]'>
          <h1 className='text-2xl font-bold'>Users</h1>
          <button onClick={()=>navigate('/adduser')} className='bg-green-500 rounded p-2 text-white font-bold text-sm'>Add User</button>
          </div>
      <div className='grid grid-cols-7 w-[67rem]'>
                <h1 className='font-bold text-center'>Id</h1>
                  <h1 className='font-bold text-center '>Name</h1>
                  <h1 className='font-bold text-center '>Username</h1>
                  <h1 className='font-bold text-center'>Email</h1>
                  <h1 className='font-bold text-center'>Total Orders</h1>
                  <h1 className='font-bold text-center '>Block/Unblock</h1>
                  <h1 className='font-bold text-center '>Delete</h1>
              </div>
            
            {
              users.map((Obj)=>{
                return(
                  <div className='grid grid-cols-7 items-center w-[67rem] '>
                    <span className='text-center'>#{Obj.id}</span>
                    <span className='text-center'>{Obj.name}</span>
                    <span className='text-center '>{Obj.username}</span>
                    <span className='text-center'>{Obj.email}</span>
                    <span className='text-center'>{Obj.orders.length}</span>
                    <div className='col-span-2 flex justify-evenly'>
                    <button onClick={()=>handelBlock(Obj.id,Obj.block)} className='bg-yellow-400 w-[30%] p-1 rounded'>{Obj.block?"Unblock":"Block"}</button>
                    <button onClick={()=>handelDelete(Obj.id)} className='bg-black text-white w-[30%] p-1 rounded'>Delete</button>
                    </div>
              </div>
                )
              })
            }

   
    </div>
  </div>
  )
}

export default Users
