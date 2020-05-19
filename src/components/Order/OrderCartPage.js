// "/order/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
} from '@material-ui/core'
import { yujinserver } from '../../restfulapi';
import OrderList from './OrderList'

const useStyles = makeStyles((theme) => ({

}));

const OrderCartPage = ({}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    const [productOptionTable, setProductOptionTable] = useState([])

    useEffect(() => {
        if(loading){
            fetch(yujinserver+"/cart",{
                credentials: "include"
            })
            .then(
                (res) => res.json(),
                (err) => console.error(err)
            )
            .then((json) => {
                setCart(json.cartsByUid)
                setProductOptionTable(json.result2)
                setLoading(false)
            })
        }
    }, [loading])

    if(loading || !cart.length) return (<div>로딩중이요</div>)
    else{
        return (
          <OrderList orders={cart.map((option) => ({
              img: option.img,
              pname: option.pname,
              color: option.color,
              size: option.size,
              quantity: option.cnt,
              price: 333,
          }))} edit={true}/>
        )
    }
}

OrderCartPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OrderCartPage)