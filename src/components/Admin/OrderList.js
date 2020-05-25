// 장바구니,상품구매에서 보는 상품목록표
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Grid,
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableRow,
    ButtonBase,
    Box,
    Typography,
    Avatar,
    Stepper,
    Step,
    StepLabel,
    Paper,
    Button,
    TextField
} from '@material-ui/core'
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yujinserver } from '../../restfulapi';

const useStyles = makeStyles((theme) => ({
    root:{
      flexGrow: 1,
      '& > *': {
        padding: theme.spacing(1),
      },
    },
    thumbnail: {
      backgroundRepeat: 'no-repeat',
      backgroundColor:
        theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    price: {
      color: theme.palette.primary.main
    },
    formControl: {
      width: '100%',
    },
    table: {

    },
    hide: {
      display: 'none',
    },
    contentPanel: {
      
    }
}));

const OrderList = ({orders, variant}) => {
  const classes = useStyles();
  const [ orderComponent, setOrderComponent ] = useState(null)
  const { register, handleSubmit, errors } = useForm();

  const statusLookup = [
    "주문접수", "입금확인", "배송준비중", "발송", "배송완료"
  ]

  

  const enterInvoiceForm = (id) => {
    const updateInvoice = (data) => {
    //   console.log(data, id)
      fetch(yujinserver+"/shop/delivery/"+id,{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          "Content-Type": "application/json",
          'Cache': 'no-cache'
        },
        body: JSON.stringify({
            invoice: data[id],
        }),
        credentials: 'include',
      })
      .then(
        (res) => res.json(),
        (error) => console.error(error)
      )
      .then((data) => {
          console.log(data)
      })
    }

    return(
        <form onSubmit={handleSubmit(updateInvoice)}>
        <TextField 
            inputRef={register()}
            required
            name={id}
            label="운송장번호"
            InputLabelProps={{
            shrink: true,
            }}
        />
        <Button variant="outlined" type="submit">송장번호 입력</Button>
        <Button variant="outlined">배송 완료처리</Button>
        </form>
    )
      
  }

  useEffect(() => {
    if(orders.length) setOrderComponent(orders.map((order) => (
      <Box p={1} flexGrow={1} display="flex" flexDirection="row" alignItems="center">
        <ButtonBase component={Link} to={"/productDetail/"+order.product.id}>
          <Avatar src={order.product.img} variant="rounded" />
        </ButtonBase>
        <Box flexGrow={1}>
          {variant === "shop"?null:<Typography gutterBottom variant="body2">{order.product.seller}</Typography>}
          <Typography gutterBottom>{order.product.pname}</Typography>
          <Typography gutterBottom variant="body2">{order.color}, {order.size} ／ {order.product.price}원 ✕ {order.cnt} ＝ {order.price}원</Typography>
        </Box>
        <Box>
          {order.t_invoice?
            <Typography gutterBottom variant="body2">{order.t_invoice}</Typography>
          :variant === "shop"?enterInvoiceForm(order.id):null}
          <Stepper activeStep={order.status-1}>
            {statusLookup.map((label, index) => {
                const completed = (index < order.status)
                return(
                <Step>
                    <StepLabel completed={completed}>{label}</StepLabel>
                </Step>
                ) 
            })}
          </Stepper>
        </Box>
      </Box>
    )))
  }, [orders]);

  return (orderComponent)
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps)(OrderList)