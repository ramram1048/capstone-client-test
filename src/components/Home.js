import React, { useState, useEffect } from 'react'
import ProductListSummary from './ProductListSummary';


const Home = () => {
  
  return(
    <ProductListSummary fetchurl="http://localhost:3000/products" />
  )
}

export default Home
