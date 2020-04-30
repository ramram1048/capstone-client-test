import React from 'react';
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

const ProductListSummary = ({title, data}) => {
    const classes = useStyles();
    const items = !data.length?
    <Typography variant="h6" align="center" gutterBottom>검색 결과가 없습니다.</Typography>
    :data.map((product) => (
        <Grid item key={product.id}>
            <ProductCard product={product} />
        </Grid>
    ));

    return (
        <Container maxWidth="md">
            <Container maxWidth="sm">
                <Typography variant="h6" align="center" gutterBottom>{title}</Typography>
            </Container>
            <Container className={classes.cardGrid}>
                <Grid container spacing={1}>
                    {items}
                </Grid>
            </Container>
        </Container>
    )
  }
  
  ProductListSummary.propTypes = {
    list: PropTypes.object,
  }
    
  export default ProductListSummary