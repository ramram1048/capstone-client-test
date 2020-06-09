// "/order"에서 배송,결제정보 입력하고 결제버튼누르는페이지.
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { useForm } from "react-hook-form";

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
  TextField,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  FormControlLabel,
  Container,
  Checkbox
} from '@material-ui/core'

import OrderList from './OrderList'
import { useSnackbar } from 'notistack';
import { yujinserver } from '../../restfulapi';
import { push } from 'connected-react-router';

const useStyles = makeStyles((theme) => ({
    root:{
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(3)
    }
}));
const IMP = window.IMP;
const code = 'imp52620503';  // FIXME: 가맹점 식별코드

const OrderPlacePage = ({orderList, authStore, push}) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const { register, handleSubmit, errors } = useForm();
  
  const [ sameAsPurchaser, setSameAsPurchaser ] = useState(false)
  const [ isPurchasing, setIsPurchasing ] = useState(false)

  useEffect(() => {
    console.log(orderList)
    
  }, [orderList]);
  if(!orderList) return(<div />)

  let total = 0;
  orderList.map((order) => {
    total += order.price * order.quantity
  })

  const orderSubmit = (data) => {
    if(data.checkout_method === "card"){
      IMP.init(code);
      setIsPurchasing(true)
      // console.log(data.checkout_method)
      const pname = orderList.length <= 1?orderList[0].pname : orderList[0].pname+" 외 "+orderList.length-1+"개"
      const reducedPrice = Math.ceil(total/1000)*10
      const deliveryInfo = sameAsPurchaser?{
        name: data.purchaser_name,
        email: data.purchaser_email,
        phone: data.purchaser_phone,
      } : {
        email: data.delivery_email,
        name: data.delivery_name,
        phone: data.delivery_phone,
      }
      IMP.request_pay({
        // name과 amount만 있어도 결제 진행가능
        //pg와 pay_method는 테스트 버전에선 필요X
        merchant_uid : '멋쟁이마당' + new Date().getTime(), // 가맹점에서 생성/관리하는 고유 주문번호
        name : pname,
        amount : reducedPrice,
        buyer_email : data.purchaser_email,
        buyer_name : data.purchaser_name,
        buyer_tel : data.purchaser_phone,
        m_redirect_url : 'https://www.yourdomain.com/payments/complete'
      }, function(rsp) {
        if ( rsp.success ) {
          var msg = '결제가 완료되었습니다.';
          msg += '고유ID : ' + rsp.imp_uid;
          msg += '상점 거래ID : ' + rsp.merchant_uid;
          msg += '결제 금액 : ' + rsp.paid_amount;
          msg += '카드 승인번호 : ' + rsp.apply_num;
          console.log(msg)

          ///
          fetch(yujinserver+"/order",{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              "Content-Type": "application/json",
              'Cache': 'no-cache'
            },
            body: JSON.stringify({
              ordererInfo: {
                name: data.purchaser_name,
                email: data.purchaser_email,
                phone: data.purchaser_phone,
                phone2: (data.purchaser_phone2 || ""),
              },
              orderProductInfo: orderList.map((order) => ({
                id: order.pid,
                size: order.size,
                color: order.color,
                cnt: order.quantity,
                price: order.price,
              })),
              deliveryInfo: {
                ...deliveryInfo,
                addr1: data.delivery_address1,
                addr2: data.delivery_address2,
                zipCode: data.delivery_zipcode,
                message: (data.delivery_message || "")
              }
            }),
            credentials: 'include',
          })
          .then(
            response => response.text(),
            error => console.log(error)
          )
          .then((text) => {
            if(text === "success"){
              enqueueSnackbar(pname+" 구매 완료되었습니다.",{"variant": "success"});
              push("/order/myorder")
            }
            else{
              enqueueSnackbar("내부 에러입니다. 관리자에게 문의하세요",{"variant": "error"});
              setIsPurchasing(false)
            }
          })
        }
        else {
          var msg = '결제에 실패하였습니다. 에러내용 : ' + rsp.error_msg
          console.log(msg)
          setIsPurchasing(false)
        }
        // alert(msg);
      });
    }
  }

  return(
    <Container width="sm" component={Grid} container className={classes.root} direction="column">
      <Paper className={classes.paper}>
        <Typography variant="h6" gutterBottom>주문상세내역</Typography>
        <OrderList orders={orderList} edit={false} />
      </Paper>
      <form onSubmit={handleSubmit(orderSubmit)}>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h6" gutterBottom>주문자 정보</Typography>
          <Divider variant="middle"/>
          <Grid container direction="column">
            <TextField
              inputRef={register({required: true})}
              margin="normal"
              required
              name="purchaser_name"
              defaultValue={authStore.currentUser}
              label="이름"
              autoComplete="name" />
            <TextField
              inputRef={register({required: true})}
              margin="normal"
              required
              name="purchaser_email"
              label="이메일 주소"
              autoComplete="email" />
            <TextField
              inputRef={register({required: true})}
              margin="normal"
              required
              name="purchaser_phone"
              label="전화번호"
              type="number" inputProps={{ min: "0", step: "1" }}
              autoComplete="phone" />
            <TextField
              inputRef={register()}
              margin="normal"
              name="purchaser_phone2"
              label="추가 전화번호"
              type="number" inputProps={{ min: "0", step: "1" }}
              autoComplete="phone2" />
          </Grid>
        </Paper>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h6" gutterBottom>배송 정보</Typography>
          <FormControlLabel control={<Checkbox 
          checked={sameAsPurchaser} 
          onChange={() => setSameAsPurchaser(!sameAsPurchaser)} 
          inputProps={{ 'aria-label': '주문자와 동일' }} />}
          label="주문자와 동일" />
          <Divider variant="middle"/>
          <Grid container direction="column">
            <TextField
              disabled={sameAsPurchaser}
              inputRef={register({required: !sameAsPurchaser})}
              margin="normal"
              required
              name="delivery_name"
              defaultValue={authStore.currentUser}
              label="이름"
              autoComplete="name" />
            <TextField
              disabled={sameAsPurchaser}
              inputRef={register({required: !sameAsPurchaser})}
              margin="normal"
              required
              name="delivery_email"
              label="이메일 주소"
              autoComplete="email" />
            <TextField
              disabled={sameAsPurchaser}
              inputRef={register({required: !sameAsPurchaser})}
              margin="normal"
              required
              name="delivery_phone"
              label="전화번호"
              type="number" inputProps={{ min: "0", step: "1" }}
              autoComplete="phone" />
            <TextField
              inputRef={register({required: true})}
              margin="normal"
              required
              name="delivery_zipcode"
              label="우편번호"
              autoComplete="zipcode" />
            <TextField
              inputRef={register({required: true})}
              margin="normal"
              required
              name="delivery_address1"
              label="배송지 정보1"
              autoComplete="address1" />
            <TextField
              inputRef={register({required: true})}
              margin="normal"
              required
              name="delivery_address2"
              label="배송지 정보2"
              autoComplete="address2" />
            <TextField
              inputRef={register({})}
              variant="outlined"
              margin="normal"
              name="delivery_message"
              label="택배 기사님께 메시지"
              autoComplete="message" />
            
          </Grid>
        </Paper>
        <Paper elevation={0} className={classes.paper}>
          <Typography variant="h6" gutterBottom>결제 정보</Typography>
          <Divider variant="middle"/>
          <Grid container direction="column">
            <Typography variant="h6" gutterBottom>결제 금액: {total}원</Typography>
            <Typography variant="h6" gutterBottom>결제 수단:</Typography>
            <FormControl component="fieldset">
              <RadioGroup aria-label="gender" name="checkout_method" >
                <FormControlLabel 
              inputRef={register({})} value="card" control={<Radio />} label="카드" />
                {/* <FormControlLabel 
              inputRef={register({})} value="cash" control={<Radio />} label="무통장?" />
                <FormControlLabel 
              inputRef={register({})} value="disabled" disabled control={<Radio />} label="(Disabled option)" /> */}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Paper>
        <Paper  className={classes.paper} >
          <Button disabled={isPurchasing} type="submit" fullWidth variant="contained" color="primary">결제하기</Button>

        </Paper>
      </form>
    </Container>
  )
}

const mapStateToProps = (state) => ({
  orderList : state.orderList,
  authStore: state.auth,
})

const mapDispatchToProps = (dispatch) => ({
  push: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderPlacePage)