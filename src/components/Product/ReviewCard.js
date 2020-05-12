import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx'
import { 
  Box,
  Grid,
  Card, 
  CardHeader, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  CardActions,
  Collapse,
  Chip,
  Button, Typography, Avatar, IconButton, ThemeProvider 
} from '@material-ui/core';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  card: {
      padding: theme.spacing(1),
  },
  cardMedia: {
      width: 'auto',
      height: 'auto'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  product: {
    display: "flex",
  },
}));

const ReviewCard = ({review}) => {
  const classes = useStyles();

  return (
    <Box container={Card} item width={1/2} className={classes.card} variant="outlined">
      <CardHeader
        avatar={
          <Avatar item>{review.userId}</Avatar>
        }
        title={review.userId}
        subheader={"언제 몇월 몇일"+review.email} />
      <CardActionArea>
        <Avatar src={review.img} 
          variant="square"
          // className={classes.cardMedia}
          sizes="md"
        />
      </CardActionArea>
      <CardContent>
        {review.content}
      </CardContent>
      {/* <CardActions disableSpacing>
        <Typography gutterBottom>이 리뷰가 도움이 됐나요?</Typography>
        <Box item>
          <IconButton>따봉</IconButton>
          <IconButton>ㄴㄴ</IconButton>
        </Box>
      </CardActions> */}
    </Box>
  );
}

ReviewCard.propTypes = {
    design: PropTypes.object,
}
  
export default ReviewCard