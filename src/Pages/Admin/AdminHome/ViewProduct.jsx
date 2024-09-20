import React, { useEffect } from 'react'
import AdminProdauct from '../../../Components/Admin/ViewEachProduct/AdminProdauct'
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../../../Components/Admin/Header&Footer/AdminHeader';
import SideBar from '../../../Components/Admin/Header&Footer/SideBar';

function ViewProduct() {
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
            <AdminProdauct/>
        </div>
    </div>
    :null
        }
    </div>
  )
}

export default ViewProduct
