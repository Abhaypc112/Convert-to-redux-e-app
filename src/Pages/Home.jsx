import React from 'react'
import Slider from '../Components/HomeComponents/Slider'
import Categories from '../Components/HomeComponents/Categories'
import BestSellers from '../Components/HomeComponents/BestSellers'
import Budget from '../Components/HomeComponents/Budget'

function Home() {
  return (
    <div>
      <Slider/>
      <Categories/>
      <BestSellers/>
      <Budget/>
    </div>
  )
}

export default Home
