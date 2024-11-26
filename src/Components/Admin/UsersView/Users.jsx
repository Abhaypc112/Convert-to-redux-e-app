import React, { useEffect, useState } from 'react'
import { blockUserById, deleteUserById, getAllUsers, getOrdersById } from '../../../Api/UserHelpers/UsersConnection'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getTotalOrders } from '../../../Api/ProductHelper/ProductConnection';

function Users() {
  const [users,setUsers]=useState([]);
  const navigate=useNavigate();
 const [searchTerm, setSearchTerm] = useState("");
 const [filterdUsers,setFilterdUsers]=useState([]);



  // function handelDelete(id){
  //   deleteUserById(id)
  //   .then(()=>{
  //     getAllUsers()
  //   .then((res)=>setUsers(res.data))
  //   toast.success("User Deleted")
  //   })
  // }
  function handelBlock(id,status){
    if(status){
      blockUserById(id,"unblock")
      .then((res)=>{
        getAllUsers()
      .then((res)=>setUsers(res.data.data))
    })
  }  
    else if(!status) {
      blockUserById(id,"block")
    .then((res)=>{
      getAllUsers()
    .then((res)=>setUsers(res.data.data))
    })
  }
  toast.success(status?"User Unblocked":"User Blocked")
  }
  useEffect(()=>{
    getAllUsers()
    .then((res)=>setUsers(res.data.data))
  },[])

  useEffect(()=>{
    if(searchTerm.trim()===''){
      setFilterdUsers(users)
      return ;
    }
    else{
      const searchProducts=users.filter((value)=>
        value.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilterdUsers(searchProducts)
    }
 

},[searchTerm,users])

  
  return (
    <div style={{marginTop:"7rem"}} className='w-[88%] md:w-[80%] flex justify-center bg-slate-100 h-lvh'>
    <div className="form-div w-[95%] space-y-5 shadow-md p-10 bg-white mb-32 rounded overflow-y-auto custom-scrollbar">
    <div className='flex justify-between w-[67rem]'>
          <h1 className='text-2xl font-bold'>Users</h1>
          <input type="text" placeholder='Search Users' onChange={(e)=>setSearchTerm(e.target.value)} className='className="w-40 md:w-48 py-2 bg-transparent text-black focus:outline-none border-black outline-none border-b focus:w-64 transition-all duration-500 ease-in-out' />
          {/* <button onClick={()=>navigate('/adduser')} className='bg-green-500 rounded p-2 text-white font-bold text-sm'>Add User</button> */}
          </div>
      <div className='grid grid-cols-5 w-[67rem]'>
                <h1 className='font-bold text-center'>Id</h1>
                  <h1 className='font-bold text-center '>Name</h1>
                  <h1 className='font-bold text-center '>Username</h1>
                  <h1 className='font-bold text-center'>Email</h1>
                  {/* <h1 className='font-bold text-center'>Total Orders</h1> */}
                  <h1 className='font-bold text-center '>Block/Unblock</h1>
                  {/* <h1 className='font-bold text-center '>Delete</h1> */}
                 
              </div>
            
            {
             filterdUsers.slice(0).reverse().map((Obj,index)=>{
                return(
                  <div key={Obj.id} className='grid grid-cols-5 items-center w-[67rem] '>
                    <span className='text-center'>#{index}</span>
                    <span className='text-center'>{Obj.name}</span>
                    <span className='text-center '>{Obj.username}</span>
                    <span className='text-center'>{Obj.email}</span>
                   
                    {/* <span className='text-center'>{Obj.orders}</span> */}
                    <div className=' flex justify-center'>
                    <button onClick={()=>handelBlock(Obj._id,Obj.block)} className='bg-yellow-400 w-[50%] p-1 rounded'>{Obj.block?"Unblock":"Block"}</button>
                    {/* <button onClick={()=>handelDelete(Obj.id)} className='bg-black text-white w-[30%] p-1 rounded'>Delete</button> */}
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
