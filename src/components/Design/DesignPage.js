// "/design"에서 확인하는 추천코디페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
} from '@material-ui/core'

import DesignList from './DesignList'

const useStyles = makeStyles((theme) => ({

}));

const DesignPage = () => {
    const classes = useStyles();

    return(
        <Grid container direction="column">
            <Typography variant="h4">추천코디</Typography>
            <Divider />
            <DesignList fetchurl="http://172.16.101.25:8001/page/bestdesign" />
            <Typography variant="h4">모두가 올린 코디</Typography>
            <Divider />
            <DesignList fetchurl="http://172.16.101.25:8001/page/design" />
        </Grid>
    )
}

DesignPage.propTypes = {
    //pathname: PropTypes.string,
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

export default connect(mapStateToProps, mapDispatchToProps)(DesignPage)
