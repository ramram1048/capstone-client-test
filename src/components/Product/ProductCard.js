import React, { useState, useEffect } from 'react';
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
  Typography, 
  Tooltip,
  IconButton,
  withWidth,
  Avatar
} from '@material-ui/core';
import { AddShoppingCart, Palette } from '@material-ui/icons';
import TryButton from './TryButton';

const useStyles = makeStyles((theme) => ({
    // card: {
    //     // display: 'flex',
    //     // flexDirection: 'column',
    //     padding: theme.spacing(1),
    // },
    cardMedia: {
      width: '100%',
      height: '100%',
    },
    cardContent: {
        flexGrow: 1,
    },
    cardActions: {
      display: 'flex',
      flexDirection: 'column',
      // alignItems: "flex-start"
    }
}));

const ProductCard = ({width, product, preview}) => {
  const classes = useStyles();
  const [cardSize, setCardSize] = useState(1/2)
  const cardSizeLookup = {
    xs: 1/2,
    sm: 1/4,
    md: 1/4,
    lg: 1/4,
    xl: 1/4,
  }

  useEffect(() => {
    setCardSize(cardSizeLookup[width])
  }, [width])

  return (
    <Box component={Card} width={cardSize} p={1} elevation={0}>
      <Link to={"/product/"+product.id}>
        <CardActionArea>
          <Avatar
            src={product.img} 
            variant="rounded"
            className={classes.cardMedia} />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom color="inherit">{product.pname}</Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <Box className={classes.cardActions}>
        <Typography gutterBottom>{product.price}원</Typography>
        <Typography gutterBottom variant="body2">{product.seller}</Typography>
      </Box>
      <CardActions>
        <Tooltip>
          <IconButton>
            <AddShoppingCart />
          </IconButton>
        </Tooltip>
        <TryButton previews={preview} />
      </CardActions>
    </Box>
  );
}

ProductCard.propTypes = {
    product: PropTypes.object,
}
  
export default withWidth()(ProductCard)