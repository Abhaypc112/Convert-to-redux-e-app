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

          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
        </Routes>
      <Footer/>
    </div>
  );
}

export default App;
