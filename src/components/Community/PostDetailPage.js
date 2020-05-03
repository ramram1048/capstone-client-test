// "/community/post/:id"에서 확인하는 글 상세보기 페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
  Grid,
  Paper,
  Typography,
  IconButton,
  Avatar,
  Box,
    Divider,
    ButtonBase,
} from '@material-ui/core'

import PostTitle from './PostTitle'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          padding: theme.spacing(1),
          margin: theme.spacing(2),
        },
    }
}));

const PostDetailPage = ({pathname}) => {
    const [ post, setPost ] = useState([]);
    const [ comments, setComments ] = useState([]);

    useEffect(() => {
        const postid = pathname.substring(pathname.lastIndexOf('/') + 1);
        fetch("https://jsonplaceholder.typicode.com/posts/"+postid)
        .then(response => response.json())
        .then(json => {
            setPost(json)
        })
        .catch(error => {
        console.warn("Error:", error)
        })
        fetch("https://jsonplaceholder.typicode.com/comments?postId="+postid)
        .then(response => response.json())
        .then(json => {
            setComments(json)
        })
        .catch(error => {
        console.warn("Error:", error)
        })
    }, [pathname])

    if(!post || !comments) return (<div>ㄴㄴ</div>)

    const classes = useStyles();
    const commentDoms = comments.map((comment) => {

        return(
            <Grid container component={Paper} direction="column" elevation={3}>
                <ButtonBase item><img src="https://picsum.photos/200" /></ButtonBase>
                <Typography item gutterBottom>{comment.body}</Typography>
                <Grid item container>
                    <Avatar item>{comment.name}</Avatar>
                    <Box item direction="column" flexGrow={1}>
                        <Typography>{comment.name}</Typography>
                        <Typography variant="body2" color="textSecondary">언제 몇월 몇일 {comment.email}</Typography>
                    </Box>
                    <Box item>
                        <IconButton>ㅋ</IconButton>
                        <IconButton>ㄴ</IconButton>
                        <IconButton>ㅇ</IconButton>
                        <IconButton>ㄷ</IconButton>
                    </Box>
                </Grid>
            </Grid>
        )
    })

    return(
        <Container maxWidth="md" className={classes.root}>
            <Grid container component={Paper} direction="column" elevation={3}>
                <Typography item variant="h4" gutterBottom>{post.title}</Typography>
                <Grid item container>
                    <Avatar item>{post.userId}</Avatar>
                    <Box item direction="column" flexGrow={1}>
                        <Typography>{post.userId}</Typography>
                        <Typography variant="body2" color="textSecondary">언제 몇월 몇일 조회수 댓글수</Typography>
                    </Box>
                    <Box item>
                        <IconButton>ㅋ</IconButton>
                        <IconButton>ㄴ</IconButton>
                        <IconButton>ㅇ</IconButton>
                        <IconButton>ㄷ</IconButton>
                    </Box>
                </Grid>
                <ButtonBase item><img src="https://picsum.photos/500" /></ButtonBase>
                <Typography item gutterBottom>{post.body}</Typography>
                
            </Grid>
            <Typography gutterBottom variant="h6">댓글 {comments.length}개</Typography>
            {commentDoms}
        </Container>
    )
}

PostDetailPage.propTypes = {
    pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    //search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailPage)
