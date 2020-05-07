import React, { useState, useEffect } from 'react'
import ProductList from './Product/ProductList';


const Home = () => {
  
  return(
    <ProductList fetchurl="http://172.16.101.1:3000/products" />
  )
}

export default Home
