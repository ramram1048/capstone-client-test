// "/productCategory/:catid"에서 확인하는 상의하의신발악세사리 페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({

}));

const ProductCategoryPage = (post) => {
    const classes = useStyles();

    return(
        <div></div>
    )
}

ProductCategoryPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryPage)
