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
  Button, Typography, Avatar, IconButton, ThemeProvider, Tooltip ,
  withWidth,
  Popover,
} from '@material-ui/core';
import {
  FavoriteBorder as FavoriteBorderIcon,
  Favorite as FavoriteIcon,
  Share as ShareIcon,
  ExpandMore as ExpandMoreIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  PersonAdd as FollowIcon,
  PersonAddDisabled as UnfollowIcon,
} from '@material-ui/icons'

import {yujinserver} from '../../restfulapi'
import { connect } from 'react-redux';
import { requestDesignLikes, requestDesignLikesCancel } from '../../actions/design'
import { requestUnfollow, requestFollow } from '../../actions/follow';
import { push } from 'connected-react-router';
import ChipInput from 'material-ui-chip-input';


const useStyles = makeStyles((theme) => ({
  card: {
      padding: theme.spacing(1),
  },
  chips: {
    margin: "1px",
  },
  headerAction: {
    
  },
  popover: {
    pointerEvents: 'none',
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
  follow: {
    color: theme.palette.info.main,
  }
}));


const DesignCard = ({sessionId, width, design, designStore, followStore, requestDesignLikes, requestDesignLikesCancel, requestFollow, requestUnfollow, dispatchPush}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const initialLikes = designStore.likeDesign.some((designId) => (designId === design.id));
  const initialFollows = followStore.follow.some((userId) => (userId === design.user.id));
  const [expanded, setExpanded] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [follows, setFollows] = useState(initialFollows);
  const [hashtags, setHashtags] = useState(design.hashtags.map((tag) => tag.title))
  const [hashtagEdit, setHashtagEdit] = useState(false)
  const [hashtagFormValue, setHashtagFormValue] =useState([])
  const [cardSize, setCardSize] = useState(1)
  const [followButtonHover, setFollowButtonHover] = useState(false)
  // const [ userPopoverAnchor, setUserPopoverAnchor ] = useState(null)

  const handleFollowHover = () => {
    setFollowButtonHover(true)
  }
  const handleFollowUnhover = () => {
    setFollowButtonHover(false)
  }

  useEffect(() => {
    if(designStore.fetching !== "FAILURE"){
      if(designStore.likeDesign.some((designId) => (designId === design.id))) setLikes(true)
      else setLikes(false)
    }
    else{
      enqueueSnackbar("좋아요처리 실패",{"variant": "error"});
    }
  }, [designStore])

  useEffect(() => {
    if(followStore.fetching === "SUCCESS") {
      if(followStore.follow.some((userId) => (userId === design.user.id))){
        // enqueueSnackbar(design.user.name+"님을 팔로우했어요.",{"variant": "success"});
        setFollows(true)
      }
      else{
        // enqueueSnackbar(design.user.name+"님을 언팔로우했어요.",{"variant": "success"});
        setFollows(false)
      }
    }
  }, [followStore])

  useEffect(() => {
    setCardSize(cardSizeLookup[width])
  }, [width])

  const cardSizeLookup = {
    xs: 1,
    sm: 1,
    md: 1/2,
    lg: 1/2,
    xl: 1/4,
  }

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
  const handleFollow = () => {
    if(follows){
      requestUnfollow(design.user.id)
      .then(() => {
        if(followStore.fetching === "FAILURE"){
          enqueueSnackbar("팔로우처리 실패",{"variant": "error"});
        }
        else if(followStore.fetching === "SUCCESS"){
          enqueueSnackbar(design.user.name+"님을 언팔로우했어요.🖐",{"variant": "success"});
          setFollows(false)
        }
      })
    }
    else{
      requestFollow(design.user.id)
      .then(() => {
        if(followStore.fetching === "FAILURE"){
          enqueueSnackbar("팔로우처리 실패",{"variant": "error"});
        }
        else if(followStore.fetching === "SUCCESS"){
          enqueueSnackbar(design.user.name+"님을 팔로우했어요.🤝",{"variant": "success"});
          setFollows(true)
        }
      })
    }
  }

  const hashtagChips = hashtags.map((tag) => {
    return <Chip
      className={classes.chips}
      avatar={<Avatar>#</Avatar>}
      label={tag}
      clickable
      onClick={() => dispatchPush("/design/hashtag/"+tag)}
    />
  })

  const handleHashtagEdit = () => {
    if(sessionId !== design.user.id){
      enqueueSnackbar("자기 글만 수정합시다",{"variant": "error"});
    }
    else setHashtagEdit(!hashtagEdit)
  }

  const hashtagEditForm = <ChipInput 
    label="태그 수정"
    fullWidth
    defaultValue={hashtags}
    onChange={(chips) => setHashtagFormValue(chips)}
  />
  const submitHashtagEdit = () => {
    if(sessionId !== design.user.id){
      enqueueSnackbar("자기 글만 수정합시다",{"variant": "error"});
    }
    fetch(yujinserver+"/design/"+design.id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Cache': 'no-cache'
      },
      body: JSON.stringify({
          content: hashtagFormValue,
      }),
      credentials: 'include',
  })
  .then(response => response.text(),
      error => console.error(error))
  .then(text => {
      if(text === 'success'){
        enqueueSnackbar("수정완료요",{"variant": "success"});
        setHashtags(hashtagFormValue)
      }
      else enqueueSnackbar("실패요",{"variant": "error"});
      setHashtagEdit(false)
  })
  }

  return (
    <Box container={Card} width={cardSize} className={classes.card} variant="outlined">
      <Grid container direction="row">
        <Grid item container xs={12} md={8}>
          <Grid item
            // onMouseEnter={handlePopoverOpen}
            // onMouseLeave={handlePopoverClose}
            >
            <Avatar>{design.user.name}</Avatar>
            {/* <Popover
              className={classes.popover}
              open={userPopoverOpened}
              anchorEl={userPopoverAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              onClose={handlePopoverClose}

              disableRestoreFocus
              >
              <Box
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}>
                <Typography>{design.user.name}</Typography>
                <Tooltip 
                  placement="top" 
                  title={follows?"언팔로우":"팔로우"}
                  >
                  <IconButton aria-label="follow" color="primary" centerRipple onClick={handleFollow}>
                    {follows?
                      <UnfollowIcon  />
                    :<FollowIcon  />}
                  </IconButton>
                </Tooltip>
              </Box>
            </Popover> */}
          </Grid>
          <Box>
            <Typography>{design.user.name}</Typography>
            <Typography>{design.updatedAt}</Typography>
          </Box>
        </Grid>
        <Grid item container xs={12} md={4} direction="row" justify="flex-end" alignItems="center">
          <Tooltip 
            placement="top" 
            title={follows?"언팔로우":"팔로우"}
            >
            <IconButton aria-label="follow" centerRipple onClick={handleFollow}
              onClick={handleFollow}
              onMouseEnter={handleFollowHover}
              onMouseLeave={handleFollowUnhover}>
              {follows? (followButtonHover?
                <UnfollowIcon />
                : <PersonIcon className={classes.follow} />
              )
              : <FollowIcon />}
              {/* {!followButtonHover?
                <PersonIcon className={clsx({
                  [classes.icon]: true,
                  [classes.follows]: follows
                })}/>:
              (follows?
               <UnfollowIcon className={classes.icon} />
              :<FollowIcon className={classes.icon} />)} */}
            </IconButton>
          </Tooltip>
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
          {hashtagEdit? hashtagEditForm:hashtagChips}
        </Box>
        <Tooltip title="수정">
          <IconButton onClick={submitHashtagEdit}>
            
          </IconButton>
        </Tooltip>
        <Tooltip title="수정">
          <IconButton onClick={handleHashtagEdit}>
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
  sessionId: state.auth.currentId,
  designStore: state.design,
  followStore: state.follow,
  //pathname: state.router.location.pathname,
  //search: state.router.location.search,
  //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
  requestDesignLikes: (designId) => dispatch(requestDesignLikes(designId)),
  requestDesignLikesCancel: (designId) => dispatch(requestDesignLikesCancel(designId)),
  requestFollow: (userId) => dispatch(requestFollow(userId)),
  requestUnfollow: (userId) => dispatch(requestUnfollow(userId)),
  dispatchPush: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(DesignCard))
