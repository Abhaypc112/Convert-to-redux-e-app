import './App.css';
import Home from './Pages/Store/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Store from './Pages/Store/Store';
import Product from './Pages/Store/Product';
import Cart from './Pages/User/Cart';
import {Route, Routes } from 'react-router-dom'
import Login from './Pages/User/Login';
import SignUp from './Pages/User/SignUp';
import Profile from './Pages/User/Profile';
import Payment from './Pages/User/Payment';
import Orders from './Pages/User/Orders';
import AdminHome from './Pages/Admin/AdminHome';

function App() {
  return (
    <div className="App">
      
      
      
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/home' element={<Home/>}/>
            <Route path='/store/:category' element={<Store/>}/>
            <Route path='/store' element={<Store/>}/>
            <Route path='/product/:id' element={<Product/>}/>
           

    
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/profile' element={<Profile/>}/>
            <Route path='/payment' element={<Payment/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/home/:id' element={<Home/>}/>

            <Route path='/admin' element={<AdminHome/>}/>
          </Routes>

         
              
        
    
    </div>
  );
}

export default App;
