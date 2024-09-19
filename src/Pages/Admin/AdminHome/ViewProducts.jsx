import React, { useEffect } from 'react'
import AdminProducts from '../../../Components/Admin/ViewProducs/AdminProducts'
import SideBar from '../../../Components/Admin/Header&Footer/SideBar'
import AdminHeader from '../../../Components/Admin/Header&Footer/AdminHeader'
import { useNavigate } from 'react-router-dom';


function ViewProducts() {
    const adminId=localStorage.getItem("adminId");
    const navigate=useNavigate();
    useEffect(()=>{
      if(!adminId){
        navigate('/login')
      }
    },[adminId])
  return (
    <div>
        {
            adminId?
            <div className='flex flex-col bg-slate-100'>
        <AdminHeader/>
        <div className='flex justify-between'>
            <div><SideBar/></div>
            <AdminProducts/>
        </div>
    </div>
    :null
        }
    </div>
  )
}

export default ViewProducts
