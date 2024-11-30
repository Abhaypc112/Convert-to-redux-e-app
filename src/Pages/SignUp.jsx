import React, { useEffect,useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import { addUser } from '../Api/UserHelpers/UsersConnection';
import { FaEye , FaEyeSlash} from "react-icons/fa";


function SignUp() {
    const [inputData,setInputData]=useState({name:"",username:"",email:"",password:""})
    const[errors,setError]=useState({});
    const navigate=useNavigate();
    const [serverError,setServerError] = useState('') ;
    const [passwordVisible,setPasswordVisible] = useState(false)
  
    function handelOnChange(event){
        const {name,value} = event.target;
        setInputData({...inputData,[name]:value})
    }

    function togglePasswordVisibility (){
        setPasswordVisible(!passwordVisible)
      }
    async function addUserData (e){
        e.preventDefault()
        const errors={}
        if(inputData.name.trim()===""){
            errors.name="Name Required *";
        }
        if(inputData.username.trim()===""){
            errors.username="Username Required *";
        }
        if(inputData.email.trim()===""){
            errors.email="Email Required *";
        }
        if(inputData.password.trim()===""){
            errors.password="Password Required *";
        }else if(inputData.password.length<6){
            errors.password="Must 6 Char *"
        }
        setError(errors)
        if(Object.keys(errors).length===0){
            try{
                const result = await addUser(inputData);
                console.log(result);
                
                if(result) navigate('/login');
            }catch(error){
                console.log(error);
                setServerError('Already taken !')
                errors.username = 'Already taken !'
                setError(errors);
            }
        }
    }

  return (
    <div>
        <Header/> 
        <div className='bg-gray-100 h-screen '>
      <div className="main flex justify-center">
        <div style={{height:"32rem",marginTop:"8rem"}} className=" rounded login w-[90%] md:w-[30%] shadow-md flex flex-col justify-center p-10 bg-white">
            <h3 className='font-bold text-2xl text-center mb-6'>Create New Account</h3>
              <form onSubmit={addUserData} className='flex flex-col'>
                        <div className='flex justify-between'>
                            <div className='flex flex-col'>
                            <label htmlFor="name">Name</label>
                            <input style={{width:"11rem"}} type="text" name='name' onChange={handelOnChange} className='border p-2   rounded-md  focus:outline-yellow-400'/>
                            <p className='text-xs text-red-500 font-bold mb-4'>{errors.name}</p>
                            </div>
                            <div className='flex flex-col'>
                            <label htmlFor="username">Username</label>
                            <input style={{width:"11rem"}} type="text" name='username' onChange={handelOnChange} className='border p-2 rounded-md  focus:outline-yellow-400' />
                            {!errors.username ? serverError && <p className='text-xs text-red-500 font-bold mb-4'>{serverError}</p>: null}
                            {errors.username && <p className='text-xs text-red-500 font-bold mb-4'>{errors.username}</p>}
                            </div>
                        </div>
                        <label htmlFor="email">Email</label>
                        <input type="text" name='email' onChange={handelOnChange} className='border rounded-md p-2 h-10 focus:outline-yellow-400' />
                        <p className='text-xs text-red-500 font-bold mb-4'>{errors.email}</p>
                        <label htmlFor="password">Password</label>
                        <div className='flex justify-between items-center border rounded px-3 focus:border-yellow-400'>
                            <input type={passwordVisible?"text":"password"} name='password' onChange={handelOnChange} className=' w-[100%] h-10 border-none focus:outline-none' />
                                {
                                    passwordVisible?<FaEye onClick={togglePasswordVisibility} className='cursor-pointer'/>
                                    :<FaEyeSlash onClick={togglePasswordVisibility} className='cursor-pointer' />
                                }
                        </div>
                        <p className='text-xs text-red-500 font-bold mb-4'>{errors.password}</p>
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
    </div>
    <Footer/>
    </div>
  )
}

export default SignUp