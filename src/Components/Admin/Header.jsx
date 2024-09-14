import React, { useContext, useEffect, useState } from 'react';
import { Menu, MenuButton, MenuItems, MenuItem ,Button } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import logo from '../../../Assets/Logo1.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import { getCartById, getUserById } from '../../Api/UserHelpers/UsersConnection';
import { getProducts } from '../../Api/ProductHelper/ProductConnection';


function Header() {
  const [data, setData] = useState({});
  const nav = useNavigate();
 const {carts} = useContext(UserContext);
 const userInfo=localStorage.getItem("userId");
 const[cart,setCart]=useState([]);
 const [searchTerm, setSearchTerm] = useState("");
const [products, setProducts] = useState([]);
const [showModal, setShowModal] = useState(false);

 
 
  useEffect(() => {
    if (userInfo) {
        getUserById(userInfo)
        .then((res) => setData(res.data))
        .catch((err) => console.error('Error fetching user data:', err)); 
          getCartById(userInfo)
          .then((res)=>{
            setCart(res)
          })
    }
    
  },[userInfo,carts]);

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
  nav(`/product/${id}`)
}
  return (
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
          <NavLink to="/home" className="flex items-center">
            <img src={logo} alt="Logo" className="h-10" />
          </NavLink>

          <nav className="flex space-x-5">
            <Menu as="div" className="relative inline-block text-left">
              <MenuButton className=" hover:text-yellow-400 inline-flex w-full justify-center gap-x-1.5 rounded-md px-3 py-2 text-sm font-bold text-white shadow-sm">
                Categories
                <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-white" />
              </MenuButton>
              <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
                <div className="py-1">
                  <MenuItem>
                    <NavLink
                      to="/store/sofas"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Sofas
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="/store/beds"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Beads
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <NavLink
                      to="/store/dining tables"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Dining Table
                    </NavLink>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={() => nav('/store/chairs')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Chairs
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={() => nav('/store/gaming chairs')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Gaming Chairs
                    </button>
                  </MenuItem>
                  <MenuItem>
                    <button
                      type="button"
                      onClick={() => nav('/store/mattresses')}
                      className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    >
                      Mattresses
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
            <Button
              onClick={() => nav('/store')}
              className="md:inline-flex w-full hover:text-yellow-400 justify-center rounded-md px-3 py-2 text-sm font-bold text-white hidden shadow-sm"
            >
              Store
            </Button>
            <Button className="w-full justify-center hover:text-yellow-400 rounded-md px-3 py-2 text-sm font-bold text-white shadow-sm hidden md:flex">
              What'sNew
            </Button>
          </nav>

          <div className="flex mt-0 items-center space-x-4  " >
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
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
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
          
          </div>

          <div className="flex mt-0 items-center space-x-4">

            <div className="flex space-x-5">
                  <div className="mx-auto w-30 ">
                    <button onClick={()=>userInfo?nav('/profile'):nav('/login')} className="text-white flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white  hover:text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 11c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.31 0-6 2.69-6 6v1h12v-1c0-3.31-2.69-6-6-6z"
                        />
                      </svg>
                      <span className="md:visible">{data.name}</span>
                    </button>
                  </div>
                  <div className="mx-auto w-20 ">
                    <button onClick={()=>userInfo?nav('/cart'):nav('/login')}  className="text-white flex items-center ">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-white hover:text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-4 8m4-8h10m0 0l1.5 6M16 21a1 1 0 11-2 0 1 1 0 012 0zm-7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                      {
                        cart.length>0?
                        <span className='absolute bg-yellow-500 rounded-lg text-xs w-4 text-center top-1/2'>{cart.length}</span>
                        :null
                      }
                      <span  className='relative'>Cart</span>
                    </button>
                  </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
