import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
}));

const ProductListSummary = ({fetchurl}) => {
    const classes = useStyles();
    const [status, setStatus] = useState(0) // 0: loading, 1: success, -1: fetch error
    const [data, setData] = useState([]);

    useEffect(() => {
    fetch(fetchurl)
    .then(response => {
        if(!response.ok){
        setStatus(-1)
        throw error;
        }
        return response.json()
    },
    error => {
        setStatus(-1);
        throw error
    })
    .then(json => {
        setData(json.result)
        setStatus(1)
    .catch(error => {
        console.warn("Error:", error)
    })
    })}, []);

    if(!data) return (<div>loading</div>)
    const items = data.map((product) => (
        <Grid item key={product.id}>
            <ProductCard product={product} />
        </Grid>
    ));
    // console.log(data);

    return (
        <Grid container spacing={1}>
            {items}
        </Grid>
    )
  }
  
  ProductListSummary.propTypes = {
    fetchurl: PropTypes.object,
  }
    
  export default ProductListSummary