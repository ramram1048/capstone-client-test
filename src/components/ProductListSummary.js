import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Container } from '@material-ui/core';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    },
}));

const ProductListSummary = ({list}) => {
    const classes = useStyles();
    const title = list.title;
    const productList = list.productList;

    return (
        <Container maxWidth="md">
            <Container maxWidth="sm">
                <Typography component="h3" variant="h4" align="center" color="textPrimary" gutterBottom>
                    {title}
                </Typography>
            </Container>
            <Container className={classes.cardGrid}>
                <Grid container spacing={2}>
                    {productList.map((product) => (
                        <Grid item key={product.id}>
                            <ProductCard product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Container>
    )
  }
  
  ProductListSummary.propTypes = {
    list: PropTypes.object,
  }
    
  export default ProductListSummary