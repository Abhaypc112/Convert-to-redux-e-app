import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../Contexts/UserContext';
import Header from '../../Components/Header&Footer/Users/Header';
import Footer from '../../Components/Header&Footer/Users/Footer';


function Login() {
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const nav=useNavigate();
  const {activeUser}=useContext(UserContext);
  const userInfo=localStorage.getItem('userId');
  const [error,setError]=useState({});

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
    setError(errors)
    if(Object.keys(errors).length===0){
      const data={username,password};
      activeUser(data)
      setUsername('')
      setPassword('')
      if(!userInfo){
        setError({fetch:"Invalid Username Or Password *"})
      }
     
    }
    }
    
  useEffect(()=>{
    if(userInfo){
      nav('/home')
    }
  },[userInfo])
  
  
  return (
    <div>
      <Header/>
    <div className='bg-gray-100 h-screen '>
      <div className="main flex justify-center">
        <div style={{height:"28rem",marginTop:"8rem"}} className=" rounded login w-[80%] md:w-[30%] shadow-md flex flex-col  p-10 bg-white">
            <h3 className='font-bold text-2xl text-center mb-6'>Login To Your Account</h3>
                <p className='font-bold text-xs text-center text-red-500'>{error.fetch}</p>
              <form onSubmit={doSignup} className="flex flex-col">
              <label htmlFor="username">Username</label>
              <input onChange={(e)=>setUsername(e.target.value)} value={username} type="text" name='username' className='border p-3 h-10 rounded-md  focus:outline-yellow-400' />
              <p className='font-bold text-xs text-red-500 mb-4'>{error.username}</p>
              <label htmlFor="password">Password</label>
              <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" name='password' className='p-3 border rounded-md h-10  focus:outline-yellow-400' />
              <p className='font-bold text-xs text-red-500 mb-4'>{error.password}</p>
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
