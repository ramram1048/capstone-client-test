import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import ProductCard from './ProductCard';

import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
}));

const ProductList = ({fetchurl}) => {
    const classes = useStyles();
    const [status, setStatus] = useState(0) // 0: loading, 1: success, -1: fetch error
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(fetchurl, {
            credentials: 'include',
        })
        .then(response => {
            // console.log(response)
            return response.json()
        })
        .then((json) => setData(json.productRows))
        .catch(error => {
            console.warn("Error:", error)
        })
    }, [fetchurl]);

    if(!data) return (<div>loading</div>)
    const items = data.map((product) => (
        <ProductCard product={product} key={product.id}/>
    ));
    // console.log(data);

    return (
        <Grid container spacing={1}>
            {items}
        </Grid>
    )
  }
  
  ProductList.propTypes = {
    fetchurl: PropTypes.object,
  }
    
  export default ProductList