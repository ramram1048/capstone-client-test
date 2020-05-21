// "/order/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Box, ButtonBase, Avatar, TextField, Typography, Checkbox, Menu, MenuItem, Select, Divider, Button, Tooltip, IconButton, InputAdornment,
} from '@material-ui/core'
import { yujinserver } from '../../restfulapi';
import OrderList from './OrderList'
import { Delete } from '@material-ui/icons';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({

}));

const OrderCartPage = ({ push, }) => {
    const classes = useStyles();
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    // const [productOptionTable, setProductOptionTable] = useState(null)

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
                // setCart(json.cartsByUid)
                // setProductOptionTable(json.result2.result2)
                // if(json.result2.result2 !== undefined) setProductOptionTable(json.result2.result2.reduce((result = {}, item) => {
                //     const id = item.productId
                //     if(!result[id]) result[id] = []
                //     result[id] = [...result[id], {color: item.color, size: item.size, cnt: item.cnt}]
                //     return result
                // }, {}))
                const productOptionTable = json.result2.result2 !== undefined? json.result2.result2.reduce((result = {}, item) => {
                    const id = item.productId
                    if(!result[id]) result[id] = []
                    result[id] = [...result[id], {color: item.color, size: item.size, cnt: item.cnt}]
                    return result
                }, {}) : {}
                // console.log(productOptionTable)
                const optionSelector = (pid, color, size) => {
                    const optionMenu = productOptionTable[pid] !== undefined? productOptionTable[pid].map((option, index) => (
                        <MenuItem value={option.color+"&"+option.size}>{option.color} / {option.size}</MenuItem>
                    )) : <MenuItem> 없어용</MenuItem>

                    return(
                        <Select
                            defaultValue={color+"&"+size}
                            displayEmpty
                            className={classes.selectEmpty}
                        >
                            {optionMenu}
                        </Select>
                    )
                }
                if(json.cartsByUid !== undefined) setCart(json.cartsByUid.map((cartItem) => {
                    return(
                        <Box display="flex" flexDirection="row" alignItems="center">
                            <Checkbox />
                            <ButtonBase onClick={() => push("/product/"+cartItem.productId)}>
                                <Avatar
                                    variant="rounded"
                                    src={cartItem.img}
                                />
                            </ButtonBase>
                            <Typography>{cartItem.pname}</Typography>
                            {optionSelector(cartItem.productId, cartItem.color, cartItem.size)}
                            <TextField 
                                type="number"
                                inputProps={{
                                    min: "1", max: "100", step: "1",
                                    endAdornment: <InputAdornment position="end">개</InputAdornment>
                                }}
                            />
                            <Typography>가격</Typography>
                            <Tooltip title="삭제">
                                <IconButton>
                                <Delete />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    )
                }))
                setLoading(false)
            })
        }
    }, [loading])

    // useEffect(() => {
    //     if(productOptionTable){
    //         console.log(productOptionTable)
    //     }
    // }, [productOptionTable])

    if(loading) return (<div>로딩중이요</div>)
    else{
        return (
            <Box>
              <Typography variant="h4">장바구니</Typography>
              <Divider />
              <Box>
                {cart}
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="flex-end">
                <Button variant="outlined">선택삭제</Button>
                <Button variant="contained">전체삭제</Button>
              </Box>
              <Divider />
              <Typography>총 가격: 얼마얼마원</Typography>
              <Button fullWidth color="primary" variant="contained">모두 구매</Button>
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
    push: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCartPage)
