import React, { useState, useEffect } from 'react'
import { connect } from "react-redux"
import { Box, ButtonBase, Select, MenuItem, Avatar, Typography, TextField, Tooltip, makeStyles, IconButton } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Delete } from '@material-ui/icons'

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

const CartItem = ({order, product, options, edit, updatePage}) => {
    const classes = useStyles();

    const initialOption = (options.find((option) => (option.color === order.color) && (option.size === order.size))).optionId

    const [editInfo, setEditInfo] = useState({
        cartId: order.id,
        quantity: order.cnt,
        optionId: initialOption,
        color: order.color,
        size: order.size,
    })
    const [quantity, setQuantity] = useState(order.cnt)
    const [optionValue, setOptionValue] = useState(initialOption)

    const optionMenu = options.map((option) => (
        <MenuItem value={option.optionId}>{option.color} / {option.size}</MenuItem>
    ))
    

    const optionSelector = () => {
        return(
            <Select
                value={optionValue}
                onChange={(event) => handleOptionChange(event)}
                displayEmpty
            >
                {optionMenu}
            </Select>
        )
    }

    const handleOptionChange = (event) => {
        setOptionValue(event.target.value)
        setEditInfo({
            ...editInfo,
            optionId: event.target.value,
            color: (options.find((option) => (option.optionId === event.target.value))).color,
            size: (options.find((option) => (option.optionId === event.target.value))).size
        })
    }

    const handleQuantityChange = (event) => {
        const value = event.target.value<1? 1 : event.target.value>100? 100: event.target.value
        setQuantity(value)
        setEditInfo({
            ...editInfo,
            quantity: value
        })
    }

    useEffect(() => {
        const edited = (optionValue !== initialOption) || (quantity !== order.cnt)
        updatePage({
            edited: edited,
            ...editInfo
        })
    }, [editInfo])

        

    return(
        <Box p={1} display="flex" flexDirection="row" alignItems="center">
            <ButtonBase component={Link} to={"/productDetail/"+product.id}>
                <Avatar
                    variant="rounded"
                    src={order.img}
                    className={classes.avatarImage}
                />
            </ButtonBase>
            <Box flexGrow={1} component={Typography} variant="body1" gutterBottom>{order.pname}</Box>
            {edit?optionSelector(order.color, order.size)
            : <Typography variant="body2" gutterBottom>{order.color+" / "+order.size}</Typography>}
            {edit?<TextField 
                size="small" 
                className={classes.textFieldQuantity}
                type="number"
                value={quantity}
                onChange={(event) => handleQuantityChange(event)}
                inputProps={{
                    style: { textAlign: "right" },
                    min: "1", max: "100", step: "1",
                }}
            /> : <Typography variant="body2" gutterBottom className={classes.textFieldQuantity}>{order.cnt}</Typography>}
            <Typography variant="body2" gutterBottom align="right" className={classes.typoTotal}>{product.price * quantity}원</Typography>
            {edit? //<Tooltip title="삭제안되요">
                <IconButton disabled>
                <Delete />
                </IconButton>
            //</Tooltip>
            :null}
        </Box>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(CartItem)