import React from 'react'
import { NavLink } from 'react-router-dom'

function SignUp() {
  return (
    <div className='bg-gray-100 h-screen '>
      <div className="main flex justify-center">
        <div style={{height:"32rem",marginTop:"8rem"}} className=" rounded login w-[90%] md:w-[30%] shadow-md flex flex-col justify-center p-10 bg-white">
            <h3 className='font-bold text-2xl text-center mb-6'>Create New Account</h3>
              <div className='flex justify-evenly'>
                <div className='flex flex-col'>
                  <label htmlFor="name">Name</label>
                  <input type="text" name='name' className='border  h-10 rounded-md mb-4 focus:outline-yellow-400' required/>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="username">Username</label>
                  <input type="text" name='username' className='border  h-10 rounded-md mb-4 focus:outline-yellow-400' required/>
                </div>
              </div>
              <label htmlFor="email">Email</label>
              <input type="password" name='password' className='border rounded-md h-10 mb-4 focus:outline-yellow-400' required/>
              <label htmlFor="password">Password</label>
              <input type="password" name='password' className='border rounded-md h-10 mb-4 focus:outline-yellow-400' required/>
              <div>
                <input type="checkbox" name='checkbox' className='border mb-5 'required/>
                <label htmlFor="checkbox" className='text-gray-600'> I agree with Dribble's</label>
              </div>
              <button className=' h-10 rounded-md bg-black text-yellow-400 font-bold hover:text-white'>Sign Up</button>
              <span className='text-center mt-3'>Alredy have an account?{' '}
                <NavLink to="/login" className='text-yellow-500'>Log In</NavLink>
              </span>
        </div>
      </div>
    </div>
  )
}

export default SignUp
