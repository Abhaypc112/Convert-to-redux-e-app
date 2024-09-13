import './App.css';
import Home from './Pages/Home';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Store from './Pages/Store';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Product from './Pages/Product';
import Cart from './Pages/Cart';
import {Route, Routes } from 'react-router-dom'
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Payment from './Pages/Payment';
import Orders from './Pages/Orders';

function App() {
  return (
    <div className="App">
      
      
      <Header/> 
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
          </Routes>
    
      <Footer/>
    </div>
  );
}

export default App;
