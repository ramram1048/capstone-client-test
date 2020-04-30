import React, { useState, useEffect } from 'react'
import ProductListSummary from './ProductListSummary';


const Home = () => {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
  })}, [loading]);

  if(loading) return(
    <div />
  )
  return(
    <ProductListSummary title="모든제품" data={data} />
  )
}

export default Home
