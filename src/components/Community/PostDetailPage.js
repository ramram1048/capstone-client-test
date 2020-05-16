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
    GridList,
    Button,
} from '@material-ui/core'

import PostTitle from './PostTitle'
import { yujinserver } from '../../restfulapi';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
          padding: theme.spacing(1),
          margin: theme.spacing(2),
        },
    },
    image: {
        width: '100%',
        height: '100%'
    }
}));

const PostDetailPage = ({pathname}) => {
    const [ loading, setLoading ] = useState(true)
    const [ post, setPost ] = useState([]);
    const [ likes, setLikes ] = useState([]);
    const [ follow, setFollow ] = useState([]);

    useEffect(() => {
        if(loading){
            const postid = pathname.substring(pathname.lastIndexOf('/') + 1);
            fetch(yujinserver+"/post/"+postid, {
                credentials: 'include',
            })
            .then(response => response.json())
            .then(json => {
                setPost(json)
                // console.log(json.post)
                setLoading(false)
            })
        }
    }, [loading])

    

    const classes = useStyles();
    // const commentDoms = comments.map((comment) => {
    //     return(
    //         <Grid container component={Paper} direction="column" elevation={3}>
    //             <ButtonBase item><img src="https://picsum.photos/200" /></ButtonBase>
    //             <Typography item gutterBottom>{comment.body}</Typography>
    //             <Grid item container>
    //                 <Avatar item>{comment.name}</Avatar>
    //                 <Box item direction="column" flexGrow={1}>
    //                     <Typography>{comment.name}</Typography>
    //                     <Typography variant="body2" color="textSecondary">언제 몇월 몇일 {comment.email}</Typography>
    //                 </Box>
    //                 <Box item>
    //                     <IconButton>ㅋ</IconButton>
    //                     <IconButton>ㄴ</IconButton>
    //                     <IconButton>ㅇ</IconButton>
    //                     <IconButton>ㄷ</IconButton>
    //                 </Box>
    //             </Grid>
    //         </Grid>
    //     )
    // })

    

    if(loading || !post) return(<div>loading~</div>)
    else {
        const images = post.Pimgs.map((image) => {
            if(image.closet){
                // closet
                return <Box>
                    <ButtonBase>
                    <Avatar variant="rounded" src={image.img} className={classes.image} />
                    </ButtonBase>
                    </Box>
            }
            else{
                // image only
                return <Box>
                <ButtonBase>
                <Avatar variant="rounded" src={image.img} className={classes.image} />
                </ButtonBase>
                </Box>
            }
        })

        return(
            <Container maxWidth="md" className={classes.root}>
                <Grid container component={Paper} direction="column" elevation={3}>
                    <Typography item variant="h4" gutterBottom>{post.title}</Typography>
                    <Grid item container>
                        <Avatar item>{post.user.name}</Avatar>
                        <Box item direction="column" flexGrow={1}>
                            <Typography>{post.user.name}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {post.updatedAt} {post.createdAt !== post.updatedAt?"(수정됨)":""} 댓글 {post.commentcount}개
                            </Typography>
                        </Box>
                        <Box item>
                            <Button>팔로우</Button>
                            <Button>좋아요</Button>
                        </Box>
                    </Grid>
                    <Grid>
                        {images}
                    </Grid>
                    <Typography item gutterBottom>{post.content}</Typography>
                    
                </Grid>
                {/* <Typography gutterBottom variant="h6">댓글 {comments.length}개</Typography> */}
                {/* {commentDoms} */}
            </Container>
        )
    }
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
