// "/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid, Box, Button, ButtonBase, Avatar,
} from '@material-ui/core'
import { sangminserver } from '../../restfulapi';
import { sketchResetItems } from '../../actions/sketch';
// import fabric from 'fabric'
const fabric = window.fabric

const useStyles = makeStyles((theme) => ({
  paletteImage: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  }
}));

const SketchComponent = ({ sketchItems, sketchResetItems }) => {
  const classes = useStyles();
  const [canvas, setCanvas] = useState(null)
  const [ sketchItemComponents, setSketchItemComponents ] = useState(null)
  const canvasRef = useRef(null)

  useEffect(() => {
    if(canvasRef !== null){  
    //   const fabricCanvas = new fabric.Canvas(canvasRef)
    //   fabricCanvas.
    //   setCanvas(fabricCanvas)
    }
  }, [canvasRef])

  useEffect(() => {
    setSketchItemComponents(sketchItems.map((product) => {
        return(
            <Box>
                <ButtonBase>
                    <Avatar className={classes.paletteImage} src={product} />
                </ButtonBase>
                <Button variant="outlined" onClick={() => storebasket(product)}>장바구니 담아~</Button>
            </Box>
        )
    }))
  }, [sketchItems])

  const storebasket = (src) => { //버튼클릭하면 해당 상품 장바구니 DB로 연결
    console.log(src);
    // fetch(sangminserver+'/toolbarAdd/',{
    //  method: "POST",
    //  body: "imgurl="+src,
    //  headers:{
    //    'Content-Type': 'application/x-www-form-urlencoded', //서버에 데이터 보내는 또다른 방법 data타입별로 해더가 총 3가지 종류있다.
    //  }),
   }

  const restart = () => {
    sketchResetItems()
  }

  return(
    <Box>
      <Box>
        <Button variant="outlined">캔버스 캡처뜨기와 구성품보내기</Button>
        <Button variant="outlined">캔버스 선택된이미지 삭제하기</Button>
      </Box>
      <canvas ref={canvasRef}/>
      {canvas}
      <Box>
        <Button variant="outlined" onClick={restart}>리스트 초기화</Button>
        {sketchItemComponents}
      </Box>
    </Box>
  )
}

SketchComponent.propTypes = {
  //pathname: PropTypes.string,
  //search: PropTypes.string,
  //hash: PropTypes.string,
}


const mapStateToProps = state => ({
  sketchItems: state.sketch.list
  //pathname: state.router.location.pathname,
  //search: state.router.location.search,
  //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
  sketchResetItems: () => dispatch(sketchResetItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(SketchComponent)