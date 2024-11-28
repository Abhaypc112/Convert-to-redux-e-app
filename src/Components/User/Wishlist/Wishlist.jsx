import React, { useContext, useEffect, useState } from 'react'
import { addCart, deleteWishlist, getWishlist } from '../../../Api/UserHelpers/UsersConnection';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext';
import { toast } from 'react-toastify';

function Wishlist() {
    const [wishData,setWishData] = useState([]);
    const userRole = localStorage.getItem('userRole');
    const {setCart,carts} = useContext(UserContext);
    const nav = useNavigate();

    useEffect(()=>{
        if(userRole){
            getWishlist()
            .then((res) => setWishData(res.data.data))
            .catch((error) => console.log(error));
        }
    },[userRole])
    const addItemCart = (_id) => {
        if(userRole){
            addCart(_id,{quantity:1})
            .then((res)=>{
              setCart(!carts)
              if(res.data) toast.success("Item added to cart",{position:'bottom-right'})})
            .catch((error) => console.log(error));
            }
          else nav('/login')
    }
    const deleteWishItem = (_id) => {
        deleteWishlist(_id)
        .then((res) => {
            getWishlist()
            .then((res) => setWishData(res.data.data))
            toast.success("Remove from wishlist",{position:'bottom-right'})
    })
    .catch((error) => console.log(error));
    }
  return (
    <div>
      <div style={{marginTop:"7rem"}} className="p-6 ">
      <h2 className="text-2xl font-semibold mb-4 text-center">Wishlist</h2>
      <div className="flex gap-5 mx-10 flex-wrap justify-center">
        {
        
        wishData && wishData.products && wishData.products.map((Obj)=>{
            
            return(
                  
              <div style={{width:"20rem",height:"26rem"}} className=' rounded shadow border hover:transform hover:scale-105  transition-all duration-500 ease-in-out'>
                <NavLink to={`/product/${Obj.productId._id}`}>
              <img src={Obj.productId.images[0]} alt="" className='w-[100%] h-[60%] bg-black rounded relative ' />
              </NavLink>
              <div className='flex flex-col mx-1 justify-between'>
              <span className='text-sm font-bold'>{Obj.productId.name}</span>
                <span className='text-sm text-gray-600 h-10'>{Obj.productId.description}</span>
                <span className='text-xs  text-gray-400'>Left {Obj.productId.stock}</span>
                <span className='text-xs'>{Obj.productId.rating}⭐</span>
                <div className='flex justify-between items-center'>
                    <span className='text-xl font-bold'>$ {Obj.productId.price}</span>
                    <div className='flex justify-between w-[50%]'>
                        <button onClick={()=>addItemCart(Obj.productId._id)} className="bg-black text-yellow-400 px-3 py-2 rounded-lg w-full md:w-auto hover:text-white  text-xs "> Add to cart </button>
                        <button onClick={()=>deleteWishItem(Obj.productId._id)} className="text-black bg-yellow-400 px-3 py-2 rounded-lg w-full md:w-auto hover:text-white  text-xs "> Delete </button>
                    </div>
                </div>
                </div>
              </div>
            )
          }) 
        }
      </div>
    </div>
    </div>
  )
}

export default Wishlist
