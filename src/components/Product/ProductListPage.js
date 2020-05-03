// "/productList?category=*"에서 상품 상세정보 확인하는 페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
} from '@material-ui/core'

import ProductListSummary from './ProductListSummary'

const useStyles = makeStyles((theme) => ({

}));

const categoryMatches = [
    {
        "id": 1,
        "cname": "top",
        "title": "상의",
    },
    {
        "id": 2,
        "cname": "bottom",
        "title": "하의",
    },
    {
        "id": 3,
        "cname": "shoes",
        "title": "신발",
    },
    {
        "id": 4,
        "cname": "acc",
        "title": "패션잡화",
    },
]

const ProductListPage = ({search}) => {
    const classes = useStyles();
    const parsed = JSON.parse(queryString.parse(search).category)
    const category = (categoryMatches.find((data) => {return(data.id == parsed)}))

    return(
        <Grid container>
            <Typography variant="h4" gutterBottom>{category.title}</Typography>
            <Divider />
            <ProductListSummary fetchurl={"http://localhost:3000/"+category.cname} />
        </Grid>
    )
}

ProductListPage.propTypes = {
    //pathname: PropTypes.string,
    search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    pathname: state.router.location.pathname,
    search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductListPage)
