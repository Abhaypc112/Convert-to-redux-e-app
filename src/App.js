import './App.css';
import Home from './Pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Store from './Pages/Store';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import {Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Payment from './Pages/Payment';
import Orders from './Pages/Orders';
import AdminHome from './Pages/Admin/AdminHome/AdminHome';
import AddProducts from './Pages/Admin/AdminHome/AddProducts';
import ViewProducts from './Pages/Admin/AdminHome/ViewProducts';
import AdminOredersView from './Pages/Admin/AdminHome/AdminOredersView';
import AdminUserView from './Pages/Admin/AdminHome/AdminUserView';
import AddUsers from './Pages/Admin/AdminHome/AddUsers';
import Error from './Pages/Error';
import ViewProduct from './Pages/Admin/AdminHome/ViewProduct';
import Test from './Pages/Test';

function App() {
  const adminId=localStorage.getItem("adminId")
  return (
    <div className="App">
      
      
        <Routes>
          {/* UserSide */}

          
            <Route path='/test' element={<Test/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/store/:category' element={<Store/>}/>
            <Route path='/store' element={<Store/>}/>
            <Route path='/product/:_id' element={<Product/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/orders' element={<Orders/>}/>

            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/home/:_id' element={<Home/>}/>


            {/* Admin Side */}

              <Route path='*' element={<Error/>}/>
              <Route path='/admin' element={<AdminHome/>}/>
              <Route path='/addproduct' element={<AddProducts/>} />
              <Route path='/viewproducts' element={<ViewProducts/>}/>
              <Route path='/vieworders' element={<AdminOredersView/>}/>
              <Route path='/viewusers' element={<AdminUserView/>}/>
              <Route path='/adduser' element={<AddUsers/>}/>
              <Route path='/viewproduct/:id' element={<ViewProduct/>}/>
              
          </Routes>
    </div>
  );
}

export default App;
