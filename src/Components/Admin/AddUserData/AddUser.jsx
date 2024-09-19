import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext';
import { checkUserName } from '../../../Api/UserHelpers/UsersConnection';

function AddUser() {
    const navigate=useNavigate();
    const[name,setName]=useState('');
    const[username,setUsername]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    const[error,setError]=useState({});
    const {addUser}=useContext(UserContext);
    const adminId=localStorage.getItem('adminId');
    const[usernameAlredy,setUsernameAlerdy]=useState(false);
    useEffect(()=>{
        checkUserName(username)
        .then((res)=>setUsernameAlerdy(res))
    },[username])
    function addUserData(e){
        e.preventDefault()
        const errors={}
        if(name.trim()===""){
            errors.name="Name Required *";
        }
        if(username.trim()===""){
            errors.username="Username Required *";
        }else if(usernameAlredy){
            errors.username="Alredy Taken *";
        }
        if(email.trim()===""){
            errors.email="Email Required *";
        }
        if(password.trim()===""){
            errors.password="Password Required *";
        }else if(password.length<6){
            errors.password="Must 6 Char *"
        }
        setError(errors)
        if(Object.keys(errors).length===0){
            const data = { name,username,email,password, cart: [],orders:[],block:false };
            addUser(data);
            navigate('/viewusers');
        }
    }
  return (
    
    <div className='w-[80%] flex justify-center bg-slate-100 h-lvh'>
         <div style={{height:"32rem",marginTop:"8rem"}} className=" rounded login w-[90%] md:w-[40%] shadow-md flex flex-col justify-center p-10 bg-white">
            <h3 className='font-bold text-2xl text-center mb-6'>Create New User</h3>
              <form onSubmit={addUserData} className='flex flex-col'>
                        <div className='flex flex-col md:flex-row justify-between'>
                            <div className='flex flex-col'>
                            <label htmlFor="name">Name</label>
                            <input type="text" name='name' onChange={(e)=>setName(e.target.value)} className='border p-2   rounded-md  focus:outline-yellow-400'/>
                            <p className='text-xs text-red-500 font-bold mb-4'>{error.name}</p>
                            </div>
                            <div className='flex flex-col'>
                            <label htmlFor="username">Username</label>
                            <input  type="text" name='username' onChange={(e)=>setUsername(e.target.value)} className='border p-2 rounded-md  focus:outline-yellow-400' />
                            <p className='text-xs text-red-500 font-bold mb-4'>{error.username}</p>
                            </div>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' onChange={(e)=>setEmail(e.target.value)} className='border rounded-md p-2 h-10 focus:outline-yellow-400' />
                        <p className='text-xs text-red-500 font-bold mb-4'>{error.email}</p>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)} className='border p-2 rounded-md h-10  focus:outline-yellow-400' />
                        <p className='text-xs text-red-500 font-bold mb-4'>{error.password}</p>
                        <div>
                            <input type="checkbox" name='checkbox' className='border mb-5 'required/>
                            <label htmlFor="checkbox" className='text-gray-600'> I agree with Dribble's</label>
                        </div>
                        <button type='submit' className=' h-10 rounded-md bg-black text-yellow-400 font-bold hover:text-white'>Sign Up</button>
                        <span className='text-center mt-3'>Alredy have an account?{' '}
                            <NavLink to="/login" className='text-yellow-500'>Log In</NavLink>
                        </span>
              </form>
        </div>
    </div>
   
  )
}

export default AddUser
