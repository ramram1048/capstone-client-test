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
  Button,
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
    const [initialProducts, setInitialProducts] = useState([])
    const [products, setProducts] = useState([])
    const [previews, setPreviews] = useState([])
    const [ productListComponent, setProductListComponent ] = useState(null)
    const [ category, setCategory ] = useState("")

    useEffect(() => {
        setLoading(true)
    }, [pathname])

    useEffect(() => {
        while(loading){
            const categoryId = pathname.substring(pathname.lastIndexOf('/') + 1)
            console.log(categoryId)
            setCategory(categoryLookup[categoryId])
            fetch(sangminserver+"/product/category/"+categoryId, {
                credentials: 'include',
            })
            .then(
                (res) => res.json(),
                (err) => console.error(err)
            )
            .then((json) => {
                setPreviews(json.imgArr)
                setInitialProducts(json.productRows)
                setProducts(json.productRows)
            })
            setLoading(false)
            break
        }
    }, [loading])

    // useEffect(() => {
    //     // console.log(search)
    //     if(!loading) setLoading(true)
    // }, [search])

    useEffect(() => {
        setProductListComponent(
            <ProductList products={products} previews={previews} />
        )
    }, [products])

    // useEffect(() => {
    //     if(loading){
    //         const categoryId = queryString.parse(search).category
    //         // console.log(categoryId)
    //         setCategory(
    //             categoryLookup[categoryId]
    //         )
    //         while(category === 0){
    //             fetch(sangminserver+"/product/category/"+categoryId, {
    //                 credentials: 'include',
    //             })
    //             .then(
    //                 (res) => res.json(),
    //                 (err) => { console.error(err) }
    //             )
    //             .then((json) => {
    //                 console.log()
    //                 setPreviews(json.imgArr)
    //                 setInitialProducts(json.productRows)
    //                 setProducts(json.productRows)
    //                 setLoading(false)
    //             })
    //             break;
    //         }
    //     }
    // }, [loading])

    const genderLookup = [
        "U", "M", "W"
    ]
    const filterGender = (gender) => {
        console.log(gender)
        if(gender === "U") setProducts(initialProducts)
        else{
            const newArray = initialProducts.filter((product) => product.gender === gender)
            setProducts(newArray)
        }
    }
    const sortUpdatedAscending = () => {
        const newArray = products.sort((a,b) => Math.max(new Date(a.createdAt), new Date(a.updatedAt)) - Math.max(new Date(b.createdAt), new Date(b.updatedAt))).slice()
        setProducts(newArray)
    }
    const sortUpdatedDescending = () => {
        const newArray = products.sort((a,b) => Math.max(new Date(b.createdAt), new Date(b.updatedAt)) - Math.max(new Date(a.createdAt), new Date(a.updatedAt))).slice()
        setProducts(newArray)
    }
    const sortPriceAscending = () => {
        const newArray = products.sort((a,b) => a.price - b.price).slice()
        setProducts(newArray)
    }
    const sortPriceDescending = () => {
        const newArray = products.sort((a,b) => b.price - a.price).slice()
        setProducts(newArray)
    }

    return(
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>{category}</Typography>
            <Divider />
            {genderLookup.map((gender) => (
                <Button onClick={() => filterGender(gender)}>{gender}</Button>
            ))}
            <Button onClick={() => sortUpdatedAscending()}>최신오름</Button>
            <Button onClick={() => sortUpdatedDescending()}>최신내림</Button>
            <Button onClick={() => sortPriceAscending()}>가격오름</Button>
            <Button onClick={() => sortPriceDescending()}>가격내림</Button>
            {productListComponent}
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
