import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import logo from '../../Logo1.png';
import { getProducts } from '../../../Api/ProductHelper/ProductConnection';

function AdminHeader() {
  const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const nav=useNavigate();
  useEffect(()=>{
    async function fetchProducts(){
      if(searchTerm.trim()===''){
        setProducts([])
        setShowModal(false)
        return ;
      }
      try{
        const res= await getProducts()
        const searchProducts=res.data.filter((value)=>
          value.category.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setProducts(searchProducts)
        setShowModal(true)
      }
      catch(error){
        console.error(error)
      }
    }
    fetchProducts()

  },[searchTerm])

  function handleProductClick(id){
    setShowModal(false)
    setSearchTerm('')
    nav(`/view-product/${id}`)
  }
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
      <header className="bg-black text-white p-4 flex">
        <div className="container mx-auto flex justify-between items-center flex-wrap">
          <NavLink to="/admin" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
          </NavLink>
        </div>
        <div className="relative w-full md:w-96 hidden xl:flex ">
          <input 
  onChange={(e) => setSearchTerm(e.target.value)} 
  type="text" 
  placeholder="Search Product" value={searchTerm} className="w-40 md:w-48 py-2 bg-transparent text-white focus:outline-none outline-none border-b border-white focus:w-96 transition-all duration-500 ease-in-out"/>
          {showModal && products.length > 0 && (
            <div className="absolute left-0 mt-12 w-full bg-white rounded shadow-lg z-50 max-h-60  overflow-y-auto custom-scrollbar">
              <ul className="divide-y divide-gray-300">
                {products.map((product) => (
                  <li 
                    key={product._id}
                    onClick={() => handleProductClick(product._id)}
                    className="cursor-pointer p-2 hover:bg-yellow-400 border-none text-black"
                  >
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          )}
          </div>
      </header>
     
    </div>
    </div>
  )
}

export default AdminHeader
