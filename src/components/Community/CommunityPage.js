// "/community"에서 커뮤니티글 리스트 보는 페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'
import PostList from './PostList'

import yujinserver from '../../restfulapi'

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}));

const CommunityPage = () => {
    const classes = useStyles();

    return(
        <Grid container direction="column">
            <Grid item container>
                <Typography className={classes.title} variant="h4">패션케어커뮤니티</Typography>
                <Button component={Link} to="/community/write">글쓰기</Button>
            </Grid>
            <Divider />
            <PostList fetchurl="https://jsonplaceholder.typicode.com/posts" />
        </Grid>
    )
}

CommunityPage.propTypes = {
    pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    //pathname: state.router.location.pathname,
    //search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(CommunityPage)
