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

const categoryLookup = [
    "", "상의", "하의", "패션잡화", "신발"
]

const ProductCategoryPage = ({pathname, search}) => {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(true)
    const [ productList, setProductList ] = useState(null)
    const [ category, setCategory ] = useState("")

    useEffect(() => {
        console.log(search)
        if(!loading) setLoading(true)
    }, [search])

    useEffect(() => {
        if(loading){
            const categoryId = queryString.parse(search).category
            console.log(categoryId)
            setCategory(
                categoryLookup[categoryId]
            )
            while(categoryId !== 0){
                fetch(sangminserver+"/product/category/"+categoryId, {
                    credentials: 'include',
                })
                .then(
                    (res) => res.json(),
                    (err) => { console.error(err) }
                )
                .then((json) => {
                    console.log()
                    setProductList(
                        <ProductList products={json.productRows} previews={json.imgArr} />
                    )
                    setLoading(false)
                })
                break;
            }
        }
    }, [loading])

    return(
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>{category}</Typography>
            <Divider />
            {productList}
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
