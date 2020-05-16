import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Typography, Button, Divider,
} from '@material-ui/core'
import ProductList from './Product/ProductList';
import {sangminserver} from '../restfulapi';

const useStyles = makeStyles((theme) => ({
  title: {
      flexGrow: 1
  }
}));

const Home = () => {
  const classes = useStyles();

  return(
    <Grid container direction="column">
      {/* <Grid item container>
        <Typography className={classes.title} variant="h4">최신상품~</Typography>
        <Button component={Link} to="">더보기</Button>
      </Grid>
      <Divider />
      <ProductList fetchurl={sangminserver+"/products"} /> */}
    </Grid>
  )
}

export default Home
