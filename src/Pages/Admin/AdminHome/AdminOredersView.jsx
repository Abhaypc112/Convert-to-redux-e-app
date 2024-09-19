import React, { useEffect } from 'react'
import AdminHeader from '../../../Components/Admin/Header&Footer/AdminHeader'
import SideBar from '../../../Components/Admin/Header&Footer/SideBar'
import OrdersView from '../../../Components/Admin/OredersView/OrdersView'
import { useNavigate } from 'react-router-dom';

function AdminOredersView() {
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
            <OrdersView/>
        </div>
    </div>
    :null
        }
    </div>
  )
}

export default AdminOredersView
