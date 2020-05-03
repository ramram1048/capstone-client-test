import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { Card, CardActionArea, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

const useStyles = makeStyles({
    card: {
        width: '200px',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
});

const ProductCard = ({product}) => {
  const classes = useStyles();

  return (
    <Card className={classes.card} variant="outlined">
      <Link to={"/product/"+product.id}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={product.img}
            title={product.pname}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom>
              {product.pname}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}

ProductCard.propTypes = {
    product: PropTypes.object,
}
  
export default ProductCard