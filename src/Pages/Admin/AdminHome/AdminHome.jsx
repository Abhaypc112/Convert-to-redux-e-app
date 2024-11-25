import React, { useEffect } from 'react'
import AdminHeader from '../../../Components/Admin/Header&Footer/AdminHeader'
import HomePage from '../../../Components/Admin/HomeCoponents/HomePage'
import MidSection from '../../../Components/Admin/HomeCoponents/MidSection'
import BottomSection from '../../../Components/Admin/HomeCoponents/BottomSection'
import SideBar from '../../../Components/Admin/Header&Footer/SideBar'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
  const adminId = localStorage.getItem("userRole");
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
      <div className='flex'>
      <SideBar/>
        <div>
          <HomePage/>
          <MidSection/>
          <BottomSection/>
        </div>
      </div>
    </div>
    :null
      }
    </div>
  )
}

export default AdminHome
