// "/productList?category=*"에서 상품 상세정보 확인하는 페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'

import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
  Grid,
  Typography,
  Divider,
} from '@material-ui/core'
import {sangminserver} from '../../restfulapi';

import ProductList from './ProductList'

const useStyles = makeStyles((theme) => ({

}));

const categoryMatches = [
    {
        "id": 1,
        "title": "상의",
    },
    {
        "id": 2,
        "title": "하의",
    },
    {
        "id": 3,
        "title": "악세서리",
    },
    {
        "id": 4,
        "title": "신발",
    },
]

const ProductCategoryPage = ({search}) => {
    const classes = useStyles();
    const parsed = JSON.parse(queryString.parse(search).category)
    const category = (categoryMatches.find((data) => {return(data.id == parsed)}))

    return(
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>{category.title}</Typography>
            <Divider />
            <ProductList fetchurl={sangminserver+"/productList/"+category.id} />
        </Container>
    )
}

ProductCategoryPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(ProductCategoryPage)
