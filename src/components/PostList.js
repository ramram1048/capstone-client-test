// 커뮤니티글 리스트
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Container,
  List
} from '@material-ui/core'

import PostCard from './PostCard';

const useStyles = makeStyles((theme) => ({
    root:{
        padding: theme.spacing(2),
    }
}));

const PostList = ({fetchurl}) => {
    const [ posts, setPosts ] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        fetch(fetchurl)
        .then(response => response.json())
        .then(json => {
            setPosts(json)
        })
        .catch(error => {
        console.warn("Error:", error)
    })}, [fetchurl]);
    if(!posts) return(<div>loading.</div>)

    const postCards = posts.map((post) => {
        return <PostCard post={post} />
    })

    return(
        <Container maxWidth="md" className={classes.root}>
                {postCards}
        </Container>
    )
}

PostList.propTypes = {
    fetchurl: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(PostList)
