// "/design"에서 확인하는 추천코디페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'connected-react-router'
import { useSnackbar } from 'notistack';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
} from '@material-ui/core'

import ClosetList from './ClosetList'
import {yujinserver} from '../../restfulapi'

const useStyles = makeStyles((theme) => ({

}));

const ClosetPage = () => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    // useEffect(() => {
    //     checkLoginStatus()
    //     .then(() => {})
    //     .then(() => {
    //         console.log(loginResult)
    //         if(loginResult !== "SUCCESS"){
    //             dispatchPush("/auth")
    //             return (<div>좀기다리셈</div>)
    //         }
    //     })
    // }, [])

    

    return(
        <Grid container direction="column">
            <Typography variant="h4">나의 옷장</Typography>
            <Divider />
            <ClosetList fetchurl={yujinserver+"/page/closet"} />
        </Grid>
    )
}

ClosetPage.propTypes = {
    //pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    loginResult: state.auth.fetching,
    //pathname: state.router.location.pathname,
    //search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ClosetPage)
