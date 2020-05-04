import React from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { 
  Box,
  Grid,
  Card, 
  CardHeader, 
  CardActionArea, 
  CardContent, 
  CardMedia, 
  Chip,
  Button, Typography, Avatar, IconButton, ThemeProvider 
} from '@material-ui/core';
import {
  FavoriteBorder,
  Favorite
} from '@material-ui/icons'

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

const ClosetCard = ({design}) => {
  const classes = useStyles();
  const hashtagChips = design.hashtags.map((tag) => {
    return <Chip
      avatar={<Avatar>#</Avatar>}
      label={tag.title}
      clickable
    />
  })

  return (
    <Box container={Card} item width={1/2} className={classes.card} variant="outlined">
      <CardHeader
        avatar={
          <Avatar>{design.user.name}</Avatar>
        }
        action={
          <IconButton>
            <FavoriteBorder />
          </IconButton>
        }
        title={design.user.name}
        subheader={design.updatedAt} />
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={design.img}
        />
      </CardActionArea>
      <CardContent className={classes.cardContent}>
        여기에 제품목록 들어가야함~
        {hashtagChips}
      </CardContent>
    </Box>
  );
}

ClosetCard.propTypes = {
    product: PropTypes.object,
}
  
export default ClosetCard