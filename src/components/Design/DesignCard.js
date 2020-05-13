import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import clsx from 'clsx'
import { useSnackbar } from 'notistack';
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
  Button, Typography, Avatar, IconButton, ThemeProvider, Tooltip 
} from '@material-ui/core';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@material-ui/icons'

import {yujinserver} from '../../restfulapi'
import { connect } from 'react-redux';
import { requestDesignLikes, requestDesignLikesCancel } from '../../actions/design'


const useStyles = makeStyles((theme) => ({
  card: {
      padding: theme.spacing(1),
  },
  headerAction: {
    
  },
  cardMedia: {
    width: '100%',
    height: '100%',
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
  likes: {
    color: 'red',
  },
}));


const DesignCard = ({design, designStore, requestDesignLikes, requestDesignLikesCancel}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const initialLikes = designStore.likeDesign.some((designId) => (designId === design.id));
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    if(designStore.fetching !== "FAILURE"){
      if(designStore.likeDesign.some((designId) => (designId === design.id))) setLikes(true)
      else setLikes(false)
    }
    else{
      enqueueSnackbar("실패따리",{"variant": "error"});
    }
  }, [designStore])

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const handleLikes = () => {
    if(likes){
      requestDesignLikesCancel(design.id)
    }
    else{
      requestDesignLikes(design.id)
    }
  }

  const hashtagChips = design.hashtags.map((tag) => {
    return <Chip
      avatar={<Avatar>#</Avatar>}
      label={tag.title}
      clickable
    />
  })
  // console.log(design)

  return (
    <Box container={Card} width={1/2} className={classes.card} variant="outlined">
      <Grid container direction="row">
        <Grid item container xs={12} md={8}>
          <Grid item>
            <Avatar>{design.user.name}</Avatar>
          </Grid>
          <Box>
            <Typography>{design.user.name}</Typography>
            <Typography>{design.updatedAt}</Typography>
          </Box>
        </Grid>
        <Grid item container xs={12} md={4} direction="row" justify="flex-end" alignItems="center">
          <Tooltip placement="top" title={likes?"좋아요 취소":"좋아요"}>
            <IconButton aria-label="like" onClick={handleLikes}>
              {likes?<FavoriteIcon className={classes.likes}/>:<FavoriteBorderIcon />}
            </IconButton>
          </Tooltip>
          <Typography>{design.likecount}</Typography>
        </Grid>
      </Grid>
        
      <CardActionArea>
        {/* <CardMedia
          className={classes.cardMedia}
          image={design.img}
        /> */}
        <Avatar
          src={design.img} 
          variant="rounded"
          className={classes.cardMedia} />
      </CardActionArea>
      <CardActions disableSpacing>
        <Box flexGrow={1}>
          {hashtagChips}
        </Box>
        <Tooltip title="수정">
            <IconButton>
              <EditIcon />
            </IconButton>
          </Tooltip>
        <Tooltip title="삭제">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="사용된 상품">
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
        </Tooltip>
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
  
const mapStateToProps = state => ({
  designStore: state.design,
  //pathname: state.router.location.pathname,
  //search: state.router.location.search,
  //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
  requestDesignLikes: (designId) => dispatch(requestDesignLikes(designId)),
  requestDesignLikesCancel: (designId) => dispatch(requestDesignLikesCancel(designId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignCard)
