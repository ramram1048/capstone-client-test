// "/order/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Box, ButtonBase, Avatar, TextField, Typography, Checkbox, Menu, MenuItem, Select, Divider, Button, Tooltip, IconButton, InputAdornment,
} from '@material-ui/core'
import { yujinserver, sangminserver } from '../../restfulapi';
import OrderList from './OrderList'
import { Delete } from '@material-ui/icons';
import { push } from 'connected-react-router';
import { pushToOrderList, cleanOrderList } from '../../actions/orderList';
import { Link } from 'react-router-dom';
import CartList from './CartList';
import CartItem from './CartItem';

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
    },
    avatarImage: {
      width: '3em',
      height: '3em',
    },
    textFieldQuantity: {
      width: '3em',
    },
    typoTotal: {
      width: '6em',
    },
}));

const OrderCartPage = ({pushToOrderList, cleanOrderList, push}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [edit, setEdit] = useState(false)
    const [editInfo, setEditInfo] = useState([])
    const [cartList, setCartList] = useState([])
    const [products, setProducts] = useState({})
    const [options, setOptions] = useState({})
    const [cartListComponent, setCartListComponent] = useState(null)

    useEffect(() => {
        if(loading){
            setEdit(false)
            fetch(yujinserver+"/cart",{
                credentials: "include"
            })
            .then(
                (res) => res.json(),
                (err) => console.error(err)
            )
            .then((json) => {
                setOptions(json.result2n3.result2.reduce((result = {}, item) => {
                    if(item.cnt !== 0){
                        const id = item.productId
                        if(!result[id]) result[id] = []
                        result[id] = [...result[id], {optionId: item.id, color: item.color, size: item.size, cnt: item.cnt}]
                    }
                    return result
                }, {}))
                setProducts(json.result2n3.result3.reduce((result, product) => {
                    const id = product[0].id
                    if(!result[id]) result[id] = []
                    result[id] = product[0]
                    return result
                }, {}))
                setCartList(json.cartsByUid)
                setLoading(false)
            })
        }
    }, [loading])

    const turnEditOn = () => {
        setEdit(true)
    }
    const turnEditOff = () => {
        setEdit(false)
    }

    const purchaseCart = () => {
        if(!cartList.length){
            enqueueSnackbar("먼저 옵션을 선택해주세요.",{"variant": "error"});
        }
        else{
            cleanOrderList();
            cartList.map((option) => {
            pushToOrderList({
                pid: option.productId, 
                pname: option.pname, 
                color: option.color, 
                size: option.size, 
                quantity: option.cnt,
                price: products[option.productId].price * option.cnt, 
                img: option.img
            });
            })
            push('/order/placeorder');
        }
    }

    const total = cartList.reduce((result, option) => {
        result += products[option.productId].price * option.cnt
        return result
    }, 0)

    const getEditInfo = (refs) => {
        let newArray = [...editInfo]
        newArray[refs.cartId] = refs
        setEditInfo(newArray)
    }

      const cartItems = cartList.map((order) => (
        <CartItem order={order} product={products[order.productId]} options={options[order.productId]} edit={edit} updatePage={getEditInfo} />
      ))

      const submitEdit = () => {
        // console.log(editInfo)
        editInfo.map((edit) => {
            if(edit !== undefined){
                if(edit.edited){
                    fetch(sangminserver+'/cart/'+edit.cartId, {
                        method: 'PUT',
                        headers: {
                          'Accept': 'application/json',
                          "Content-Type": "application/json",
                          'Cache': 'no-cache'
                        },
                        body: JSON.stringify({
                            color: edit.color,
                            cnt: edit.quantity,
                            size: edit.size
                        }),
                        credentials: 'include',
                    })
                    .then(
                        (res) => res.text(),
                        (error) => console.error(error)
                    )
                    .then((text) => {
                        if(text === "success"){
                            console.log("성공이요")
                            setLoading(true)
                        }
                    })
                }
            }
        })
      }

      const editButtons = (
          <Box>
              <Button variant="outlined" disabled>전체삭제</Button>
              <Button onClick={submitEdit} variant="outlined">적용하기</Button>
              <Button onClick={turnEditOff} variant="outlined">취소</Button>
          </Box>
      )

    if(loading) return (<div>로딩중이요</div>)
    else{
        return (
            <Box>
              <Box display="flex" flexDirection="row">
                <Box flexGrow={1} component={Typography} variant="h4">장바구니</Box>
                {edit?editButtons
                : <Button onClick={turnEditOn} variant="outlined">변경하기</Button>}
              </Box>
              <Divider />
            <Box>
            <Box>
                {cartItems}
            </Box>
            <Divider />
            <Typography gutterBottom>총 가격: {total}원</Typography>
            </Box>
              <Button fullWidth color="primary" variant="contained" onClick={() => purchaseCart()}>모두 구매</Button>
            </Box>
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
    pushToOrderList : (order) => dispatch(pushToOrderList(order)),
    cleanOrderList : () => dispatch(cleanOrderList()),
    push : (url) => dispatch(push(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCartPage)
