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

import {yujinserver} from '../../restfulapi'

const useStyles = makeStyles((theme) => ({
  card: {
      padding: theme.spacing(1),
  },
  cardMedia: {
      paddingTop: '100%',
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
  productMedia: {
      paddingTop: "100%",
  },
}));


const DesignCard = ({design}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  
  const handleLikeButton = () => {
    // 보내야되는것: design id (:id) get /design/id
    fetch(yujinserver+"/like/design/"+design.id, {
      credentials: 'include',
    })
    .then(response => console.log(response.text()))
    // .then(json => {
    //     setDesigns(json)
    // })
    .catch(error => {
    console.warn("Error:", error)})
  }

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
          <Box>
            <IconButton aria-label="add to favorites" onClick={handleLikeButton}>
              <FavoriteIcon />
            </IconButton>
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </Box>
        }
        title={design.user.name}
        subheader={design.updatedAt} />
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={design.img}
        />
      </CardActionArea>
      <CardActions disableSpacing>
        <Box>
          {hashtagChips}
        </Box>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {design.closet.products.map((product) => {
            return(
              <Box component={Card} width={1} elevation={0} className={classes.product}>
                <Link component={CardActionArea} to={"./product/"+product.id} style={{width: "25%"}}>
                  <CardMedia
                    className={classes.productMedia}
                    image={product.img}
                  />
                </Link>
                <CardContent style={{flexGrow:1}}>
                  <Typography gutterBottom>{product.pname}</Typography>
                  <Typography gutterBottom variant="body2">{product.price}원</Typography>
                </CardContent>
              </Box>
            )
          })}
        </CardContent>
      </Collapse>
    </Box>
  );
}

DesignCard.propTypes = {
    design: PropTypes.object,
}
  
export default DesignCard