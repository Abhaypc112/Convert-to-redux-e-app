import React from 'react'
import Slider from '../Components/User/HomeComponents/Slider'
import Categories from '../Components/User/HomeComponents/Categories'
import BestSellers from '../Components/User/HomeComponents/BestSellers'
import Budget from '../Components/User/HomeComponents/Budget'
import Header from '../Components/Header'
import Footer from '../Components/Footer'


function Home() {
  return (
    <div>
      <Header/>
      <Slider/>
      <Categories/>
      <BestSellers/>
      <Budget/>
      <Footer/>
    </div>
  )
}

export default Home
