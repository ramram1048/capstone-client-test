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
      textAlign: 'right'
    },
    typoTotal: {
      width: '6em',
    },
}));

const OrderCartPage = ({pushToOrderList, cleanOrderList, push}) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)

    const [cart, setCart] = useState([])
    const [products, setProducts] = useState({})
    // const [options, setOptions] = useState({})
    const [cartComponent, setCartComponent] = useState([])
    const [total, setTotal] = useState(0)
    const [cartItems, setCartItems] = useState([])
    // const [cartListComponent, setCartListComponent] = useState(null)

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

                let total = 0

                // setCart(json.cartsByUid)
                // setProductOptionTable(json.result2.result2)
                // if(json.result2.result2 !== undefined) setProductOptionTable(json.result2.result2.reduce((result = {}, item) => {
                //     const id = item.productId
                //     if(!result[id]) result[id] = []
                //     result[id] = [...result[id], {color: item.color, size: item.size, cnt: item.cnt}]
                //     return result
                // }, {}))
                const productttt = json.result2n3.result3.reduce((result = {}, product) => {
                    if(product.cnt !== 0){
                        const id = product[0].id
                        if(!result[id]) result[id] = []
                        result[id] = product[0]
                    }
                    return result
                }, {})
                setProducts(productttt)
                // setOptions(json.result2n3.result2 !== undefined? json.result2n3.result2.reduce((result = {}, item) => {
                //     if(item.cnt !== 0){
                //         const id = item.productId
                //         if(!result[id]) result[id] = []
                //         result[id] = [...result[id], {color: item.color, size: item.size, cnt: item.cnt}]
                //     }
                //     return result
                // }, {}))
                // console.log(productOptionTable)
                // const optionSelector = (pid, color, size) => {
                //     const optionMenu = productOptionTable[pid] !== undefined? productOptionTable[pid].map((option, index) => (
                //         <MenuItem value={option.color+"&"+option.size}>{option.color} / {option.size}</MenuItem>
                //     )) : <MenuItem> 없어용</MenuItem>

                //     return(
                //         <Select
                //             defaultValue={color+"&"+size}
                //             displayEmpty
                //             className={classes.selectEmpty}
                //         >
                //             {optionMenu}
                //         </Select>
                //     )
                // }
                if(json.cartsByUid !== undefined) setCart(json.cartsByUid)
                setCartComponent(json.cartsByUid.map((cartItem) => {
                    const subtotal = productttt[cartItem.productId].price * cartItem.cnt
                    total += subtotal
                    return(
                        <Box p={1} display="flex" flexDirection="row" alignItems="center">
                            <ButtonBase component={Link} to={"/productDetail/"+cartItem.productId}>
                                <Avatar
                                    variant="rounded"
                                    src={cartItem.img}
                                    className={classes.avatarImage}
                                />
                            </ButtonBase>
                            <Box flexGrow={1} component={Typography} variant="body1" gutterBottom>{cartItem.pname}</Box>
                            {/* {optionSelector(cartItem.productId, cartItem.color, cartItem.size)}
                            <TextField 
                                disabled
                                size="small" 
                                className={classes.textFieldQuantity}
                                type="number"
                                defaultValue={cartItem.cnt}
                                inputProps={{
                                    style: { textAlign: "right" },
                                    min: "1", max: "100", step: "1",
                                }}
                            /> */}
                            <Typography variant="body1" gutterBottom>{cartItem.color+" / "+cartItem.size}</Typography>
                            <Typography variant="body1" gutterBottom className={classes.textFieldQuantity}>{cartItem.cnt}</Typography>
                            <Typography variant="body2" gutterBottom align="right" className={classes.typoTotal}>{subtotal}원</Typography>
                            {/* <Tooltip title="삭제">
                                <IconButton disabled onClick={handleDelete}>
                                <Delete />
                                </IconButton>
                            </Tooltip> */}
                        </Box>
                    )
                }))
                setTotal(total)

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
              price: products[option.productId].price, 
              img: option.img

            });
            })
            push('/order/placeorder');
        }
    }

    useEffect(() => {
        console.log(cartList, products, options)
    }, [cartList])

    // const getEditInfo = (refs) => {
    //     let newArray = [...editInfo]
    //     newArray[refs.cartId] = refs
    //     setEditInfo(newArray)
    // }

      

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

              <Typography variant="h4">장바구니</Typography>
              <Divider />
              <Box>
                {cartComponent}
              </Box>
              {/* <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button variant="outlined" disabled>선택삭제</Button>
                <Button variant="outlined" disabled>전체삭제</Button>
              </Box> */}

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
