import React, { useState, useEffect } from 'react'
import ProductList from './Product/ProductList';
import {sangminserver} from '../restfulapi';

const Home = () => {
  console.log(sangminserver);
  return(
    <ProductList fetchurl={sangminserver+"/products"} />
  )
}

export default Home
