import React, {useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Features/authActions';


function Login() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const nav=useNavigate();
  const [errorr,setErrorr]=useState({});
  const adminId=localStorage.getItem('adminId');
  const dispatch=useDispatch();
  const {user, isAuthenticated, loading ,error}=useSelector((state)=>state.auth)

  console.log(loading);
  
  function doSignup(e){
    e.preventDefault();
    const errors={}
    if(username.trim()===""){
        errors.username="Username Required *";
    }
    if(password.trim()===""){
        errors.password="Password Required *";
    }else if(password.length<6){
        errors.password="Must 6 Char *"
    }
    setErrorr(errors)
    if(Object.keys(errors).length===0){
      const data={username,password};
      dispatch(login(data))
      setUsername('')
      setPassword('')
      if(error){
        setErrorr({fetch:error})
      }
    }
    }
    
  useEffect(()=>{
    if(isAuthenticated){
      nav('/home')
    }
    else if(adminId){
      nav('/admin')
    }
  },[isAuthenticated,adminId])
  
  
  return (
    <div>
      <Header/>
    <div className='bg-gray-100 h-screen '>
      <div className="main flex justify-center">
        <div style={{height:"28rem",marginTop:"8rem"}} className=" rounded login w-[80%] md:w-[30%] shadow-md flex flex-col  p-10 bg-white">
            <h3 className='font-bold text-2xl text-center mb-6'>Login To Your Account</h3>
                <p className='font-bold text-xs text-center text-red-500'>{errorr.fetch}</p>
              <form onSubmit={doSignup} className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" name='username' className='border p-3 h-10 rounded-md  focus:outline-yellow-400' />
              <p className='font-bold text-xs text-red-500 mb-4'>{errorr.username}</p>
              <label htmlFor="password">Password</label>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name='password' className='p-3 border rounded-md h-10  focus:outline-yellow-400' />
              <p className='font-bold text-xs text-red-500 mb-4'>{errorr.password}</p>
              <a href="" className='mb-5 text-yellow-500 '>Forgot your password?</a>
              <div>
                <input type="checkbox" name='checkbox' className='border mb-5 'required/>
                <label htmlFor="checkbox" className='text-gray-600'> Remember me</label>
              </div>
              <button className=' h-10 rounded-md bg-black text-yellow-400 font-bold hover:text-white'>LogIn</button>
              </form>
              <span className='text-center mt-3'>Don't have an account?{' '}
                <NavLink to="/signup" className='text-yellow-500'>Sign Up</NavLink>
              </span>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
    
}


export default Login
