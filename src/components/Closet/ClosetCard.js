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
  Button, Typography, Avatar, IconButton, ThemeProvider ,
  Popover, Fade,
} from '@material-ui/core';
import {
  Delete,
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Create,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'

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

const ClosetCard = ({closet}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [confirmPopoverAnchorEl, setConfirmPopoverAnchorEl] = useState(null);
  const open = Boolean(confirmPopoverAnchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleDeleteIconClick = (event) => {
    setConfirmPopoverAnchorEl(event.currentTarget)
  }
  const handleConfirmPopoverClose = () => {
    setConfirmPopoverAnchorEl(null)
  }

  return (
    <Box component={Card} width={1/2} className={classes.card} elevation={0}>
      <CardActionArea>
        <CardMedia
          className={classes.cardMedia}
          image={closet.img}
        />
      </CardActionArea>
      <CardActions disableSpacing>
        <IconButton aria-label="delete" onClick={handleDeleteIconClick}>
            <Delete />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={confirmPopoverAnchorEl}
            onClose={handleConfirmPopoverClose}
            anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
            transformOrigirn={{vertical: 'top', horizontal: 'left'}}>
              <Typography gutterBottom>진짜지울래?</Typography>
              <Button onClick={handleConfirmPopoverClose}>ㅇㅇ</Button>
              <Button onClick={handleConfirmPopoverClose}>ㄴㄴ</Button>
            </Popover>
          <Button
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            {expanded? "":"사용한 아이템"}<ExpandMoreIcon />
          </Button>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {closet.products.map((product) => {
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

ClosetCard.propTypes = {
    product: PropTypes.object,
}
  
export default ClosetCard