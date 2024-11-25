import React, { useEffect } from 'react'
import AdminHeader from '../../../Components/Admin/Header&Footer/AdminHeader'
import SideBar from '../../../Components/Admin/Header&Footer/SideBar'
import AddProduct from '../../../Components/Admin/AddProductComponents/AddProduct'
import { useNavigate } from 'react-router-dom';

function AddProducts() {
  const adminId=localStorage.getItem("userRole");
  const navigate=useNavigate();
  useEffect(()=>{
    if(!adminId){
      navigate('/login')
    }
  },[adminId])
  return (
    <div className='bg-slate-100'>
      {
        adminId?
      <>
              
      <AdminHeader/>
      <SideBar/>
      <AddProduct/>
   
        </>
    :null
      }
    </div>
  )
}

export default AddProducts
