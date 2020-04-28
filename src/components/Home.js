import React, { useState, useEffect } from 'react'
import ProductListSummary from './ProductListSummary';


const Home = () => {
  const [externalData, fetchData] = useState(null);
  fetchData = (data) => {externalData = data};

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then(res => res.json())
      .then(data => fetchData(data));
  })

  if(externalData === null) return(
    <div>
      home...loading
    </div>
  )
  console.log(externalData);
  return(
    <ProductListSummary list={externalData} />
  )
}

export default Home
