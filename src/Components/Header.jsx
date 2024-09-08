import React from 'react'
import { Menu, MenuButton, Button, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import logo from'./Logo1.png';
import { NavLink, useNavigate } from 'react-router-dom';


function Header() {
  const nav=useNavigate();
  return (
    <div className="main-nav fixed z-50 w-[100%]">
      <div className='bg-yellow-400 text-black h-6 flex text-sm justify-between'>
        <p className='ml-5'>+91 9497860963</p>
        <div><span>Get 50% Off </span> | <span>Shop Now</span></div>
        <p className='mr-5'>Location</p>
      </div>
      <header className="bg-black text-white p-4">
      <div className='bg-black'></div>
      <div className="container mx-auto flex justify-between items-center flex-wrap">
        <NavLink to={'/home'}>
                <div className="flex items-center">
          
          <div className="flex items-center">
            <span className="ml-2 text-2xl font-bold"><img src={logo} alt="" className='h-10'/></span>
          </div>
        </div>
        </NavLink>

        <nav className="flex space-x-5 ">
          <div className="relative">
          <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-bold text-white shadow-sm">
        Categories
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
        </MenuButton>
      </div>

      <MenuItems 
        transition
        className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          <MenuItem>
            <NavLink
              to="/store/sofas"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Sofas
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/store/beads"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Beads
            </NavLink>
          </MenuItem>
          <MenuItem>
            <NavLink
              to="/store/diningtable"
              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
            >
              Dining table
            </NavLink>
          </MenuItem>
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Chairs
              </button>
            </MenuItem><MenuItem>
              <button
                type="submit" onClick={()=>nav('/store/gaming chairs')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Gaming Chairs
              </button>
            </MenuItem>
            <MenuItem>
              <button
                type="submit" onClick={()=>nav('/store/mattresses')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                mattresses
              </button>
              </MenuItem>
        </div>
      </MenuItems>
    </Menu>
          </div>
          <Button onClick={()=>nav('/store')} className="md:inline-flex w-full justify-center  rounded-md px-3 py-2 text-sm font-bold text-white hidden shadow-sm">
          Store
        </Button>
        <Button className=" w-full justify-center rounded-md px-3 py-2 text-sm font-bold text-white shadow-sm hidden md:flex">
        What'sNew
        </Button>
        </nav>

  
        <div className="flex mt-0 items-center space-x-4  " >
          <div className="relative w-full md:w-60 hidden xl:flex">
            <input type="text"placeholder="Search Product" className=" md:w-50 py-2  bg-transparent text-white focus:outline-none border-b border-white focus:w-60 "/>
            <button className="absolute right-5 top-2 text-white">
              <svg className="w-5 h-5"xmlns="http://www.w3.org/2000/svg"fill="none"viewBox="0 0 24 24"stroke="currentColor">
                <path strokeLinecap="round"strokeLinejoin="round"strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
            </button>
          </div>

<div className='mx-auto w-20'>
  <NavLink to="/login" className="text-white flex items-center">
  <svg xmlns="http://www.w3.org/2000/svg"className="h-6 w-6 text-white"fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth="2" >
    <path strokeLinecap="round"strokeLinejoin="round" d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"/></svg>
    <span className=' md:visible:'>Account</span>
    </NavLink>
  </div>
  <div className='mx-auto w-20'>
    <NavLink to='/cart' className="text-white flex items-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white"fill="none"viewBox="0 0 24 24"stroke="currentColor"strokeWidth="2">
        <path strokeLinecap="round"strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 8m4-8h10m0 0l1.5 6M16 21a1 1 0 11-2 0 1 1 0 012 0zm-7 0a1 1 0 11-2 0 1 1 0 012 0z"/>
      </svg>
       <span>Cart</span>
    </NavLink>
  </div>
  </div>
      </div>
    </header>
    </div>
  )
}

export default Header
