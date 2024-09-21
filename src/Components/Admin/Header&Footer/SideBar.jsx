import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { IoIosPeople } from "react-icons/io";
import { HiOutlineDocumentAdd } from "react-icons/hi";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

function SideBar() {
     const navigate=useNavigate();
     function signout(){
          localStorage.removeItem("adminId")
          navigate('/login')
     }
  return (
    
    
      <div className=" lg:w-[17rem] side-bar p-2 h-lvh md:p-10 bg-white shadow-md border flex flex-col justify-evenly mt-5 fixed"> 
      <div className="top flex flex-col items-center justify-center">
            <h1 className='md:text-2xl hidden md:flex font-semibold ext-gray-500'>Admin</h1>
      </div>
       <div className="mid space-y-5 flex flex-col items-center">
            <div onClick={()=>navigate('/viewproducts')} className='bg-slate-100 md:p-2 cursor-pointer rounded-md font-semibold flex items-center space-x-5 h-10 w-10 md:h-full lg:w-full lg:justify-start justify-center'><MdOutlineShoppingCart className='w-7 h-7'/> <span className='hidden lg:flex'>Ecommerce</span></div>
            <div onClick={()=>navigate('/viewproducts')} className='bg-slate-100 md:p-2 cursor-pointer rounded-md font-semibold flex items-center space-x-5 h-10 w-10 md:h-full lg:w-full lg:justify-start justify-center'><MdCategory className='w-7 h-7'/> <span className='hidden lg:flex'>Category</span></div>
            <div onClick={()=>navigate('/vieworders')} className='bg-slate-100 md:p-2 cursor-pointer rounded-md font-semibold flex items-center space-x-5 h-10 w-10 md:h-full lg:w-full lg:justify-start justify-center'><HiOutlineDocumentAdd className='w-7 h-7'/> <span className='hidden lg:flex'>Orders</span></div>
            <div onClick={()=>navigate('/viewusers')} className='bg-slate-100 md:p-2 cursor-pointer rounded-md font-semibold flex items-center space-x-5 h-10 w-10 md:h-full lg:w-full lg:justify-start justify-center'><IoIosPeople className='w-7 h-7'/> <span className='hidden lg:flex'>Users</span></div>
       </div>
       <div className='bottom flex flex-col items-center'>
            <div onClick={signout} className='bg-slate-100 md:p-2 cursor-pointer rounded-md font-semibold flex items-center space-x-5 h-10 w-10 md:h-full md:w-full md:justify-start justify-center'> <FaSignOutAlt className='w-6 h-6'/><span className='hidden lg:flex'>Sign Out</span></div>
       </div>
      </div>
  
  )
}

export default SideBar
