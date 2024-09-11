import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../Contexts/UserContext';

function SignUp() {
  const { addUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Define the validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      const data = { ...values, cart: [] };
      addUser(data);
      navigate('/login');
    },
  });

  return (
    <div className='bg-gray-100 h-screen'>
      <div className="main flex justify-center">
        <div style={{ height: "32rem", marginTop: "8rem" }} className="rounded login w-[90%] md:w-[30%] shadow-md flex flex-col justify-center p-10 bg-white">
          <h3 className='font-bold text-2xl text-center mb-6'>Create New Account</h3>
          <form onSubmit={formik.handleSubmit} className="flex flex-col justify-center">
            <div className='flex justify-between w-full'>
              <div className='flex flex-col w-[49%]'>
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  className='border p-5 h-10 rounded-md mb-1 focus:outline-yellow-400'
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-red-500 text-sm">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className='flex flex-col w-[49%]'>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  className='border p-5 h-10 rounded-md mb-1 focus:outline-yellow-400'
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.username && formik.errors.username ? (
                  <div className="text-red-500 text-sm">{formik.errors.username}</div>
                ) : null}
              </div>
            </div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              className='border p-5 h-10 rounded-md mb-1 focus:outline-yellow-400'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-500 text-sm">{formik.errors.email}</div>
            ) : null}
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className='border p-5 h-10 rounded-md mb-1 focus:outline-yellow-400'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-500 text-sm">{formik.errors.password}</div>
            ) : null}
            <div className="mt-4">
              <input type="checkbox" name="checkbox" className='border mb-5' required />
              <label htmlFor="checkbox" className='text-gray-600'> I agree with Dribble's</label>
            </div>
            <button type="submit" className='h-10 rounded-md bg-black text-yellow-400 font-bold hover:text-white'>
              Sign Up
            </button>
          </form>
          <span className='text-center mt-3'>
            Already have an account?{' '}
            <NavLink to="/login" className='text-yellow-500'>Log In</NavLink>
          </span>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
