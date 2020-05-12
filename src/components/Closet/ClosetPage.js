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

const ClosetPage = ({isLoggedIn, dispatchPush}) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    if(!isLoggedIn){
        enqueueSnackbar("로그인이 필요해요.");
        dispatchPush("/auth")
    }

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
    isLoggedIn: state.auth.status.isLoggedIn,
    //pathname: state.router.location.pathname,
    //search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
    dispatchPush: (url) => dispatch(push(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ClosetPage)
