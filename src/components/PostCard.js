// PostList(커뮤니티 글 리스트)에 보여주는 요약 카드
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Box,
  Card,
  Typography,
  Avatar,
  CardActionArea,
  CardContent,
  CardMedia,
  CardActions,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    card: {
        display: 'flex',
        flexGrow: 1,
        '& > *': {
          padding: theme.spacing(2),
        },
    },
    actionBox: {
        display: 'flex'
    },
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1
    },
    media: {
        padding: 100, // 16:9
    },
}));

const PostCard = ({post}) => {
    const classes = useStyles();

    const id = post.id
    const uname = post.userId
    const title = post.title
    const body = post.body
    const summary = body.length>100?body.substring(0,100) + "...":body

    return(
        <Card className={classes.card} variant="outlined">
            <div className={classes.cardContent}>
                <CardActionArea component={Link} to={"/community/post/"+id}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {title}
                        </Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
                            {summary}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions>
                    <Box className={classes.actionBox} flexGrow={1}>
                        <Typography gutterBottom>{uname}</Typography>
                        <Typography gutterBottom variant="body2" color="textSecondary">
                            ー 몇월몇일 몇시 몇분
                        </Typography>
                    </Box>
                    <Box>
                    <Typography gutterBottom>댓글 몇개</Typography>
                    </Box>
                </CardActions>
            </div>
            <CardMedia component={Link} to={"/community/post/"+id}
                className={classes.media}
                image="https://picsum.photos/500"
                title={title}
            />
        </Card>
    )
}

PostCard.propTypes = {
    post: PropTypes.object,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    // pathname: state.router.location.pathname,
    //search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PostCard)
