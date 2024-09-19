import React from 'react'
import { NavLink } from 'react-router-dom'
import logo from '../../Logo1.png';

function AdminHeader() {
  return (
    <div>
      <div className="main-nav fixed z-50 w-full">
      <div className="bg-yellow-400 text-black h-6 flex text-sm justify-between">
        <p className="ml-5">+91 9497860963</p>
        <div>
          <span>Get 50% Off</span> | <span>Shop Now</span>
        </div>
        <p className="mr-5">Location</p>
      </div>
      <header className="bg-black text-white p-4">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <NavLink to="/admin" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
          </NavLink>
        </div>
      </header>
     
    </div>
    </div>
  )
}

export default AdminHeader
