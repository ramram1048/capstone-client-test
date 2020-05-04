import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { 
  Box,
  Card, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  CardActions,
  CardHeader,
  Button, 
  Typography 
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: theme.spacing(1),
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
}));

const ProductCard = ({product}) => {
  const classes = useStyles();

  return (
    <Box component={Card} width={1/4} className={classes.card} elevation={0}>
      <Link to={"/product/"+product.id}>
        <CardActionArea>
          <CardMedia
            className={classes.cardMedia}
            image={product.img}
            title={product.pname}
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom>{product.pname}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Typography gutterBottom>{product.price}</Typography>
        <Typography gutterBottom>{product.seller}</Typography>
      </CardActions>
    </Box>
  );
}

ProductCard.propTypes = {
    product: PropTypes.object,
}
  
export default ProductCard