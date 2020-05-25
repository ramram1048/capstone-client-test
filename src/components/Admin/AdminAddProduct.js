// "/admin/productupload"에서 상품등록
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { goBack, push } from 'connected-react-router'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Container,
  Paper,
  Typography,
  Button,
  Divider,
  IconButton,
  TextField,
  ButtonBase,
  Avatar,
  GridList,
  GridListTile,
  Box,
  Radio,
  FormControlLabel,
  RadioGroup,
  FormControl,
} from '@material-ui/core'
import { PhotoCamera, Cancel, Check } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form'
import clsx from 'clsx'
import { useSnackbar } from 'notistack'
import { yujinserver } from '../../restfulapi'
import AdminSubheader from './AdminSubheader'

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
    },
    title: {
        flexGrow: 1,
    },
    imageContainer: {
      display: 'flex',
    },
    upImageButton: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    hide: {
        display: 'none',
    },
    gridList: {
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
      },
    previewImage: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    previewCancel: {
      border: "1px solid white",
      backgroundColor: "white",
      borderRadius: "50%",
      position: "absolute",
      top: '1px',
      right: '1px',
    },
    
  checked: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, .5)'
  }
}));

const AdminAddProduct = ({backButtonAction, dispatchPush}) => {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    // const [ loading, setLoading ] = useState(true);
    const [ colorImages, setColorImages ] = useState([]);
    
    // const [ closetData, setClosetData ] = useState([]);
    const { register, control, handleSubmit } = useForm();
    // useEffect(() => {
    //     if(loading){
    //       fetch(yujinserver+"/page/closet", { credentials: 'include', })
    //       .then(
    //         response => response.json(),
    //         error => console.log(error)
    //       )
    //       .then(json => {
    //         setClosetData(json.map((closet) => ({
    //             selected: false,
    //             closet: closet
    //         })))
    //         setLoading(false)
    //       })
    //     }
    //   }, [loading])

    const handleImageInput = (event) => {
        if(colorImages.length < 4){
          if(event.target.files[0] !== undefined){
            setColorImages([...colorImages, event.target.files[0]]);
          }
        }
      }
      const removeImage = (index) => {
        const newList = [...colorImages];
        newList.splice(index, 1);
        setColorImages(newList);
      }
      const productSubmit = (data) => {
        // console.log(data)
        let form = new FormData()
        // form.append("productname", data.productname)
        // form.append("price", data.price)
        // form.append("categoryId", data.categoryId)
        // form.append("gender", data.gender)
        // form.append("createdAt", 0)
        // // form.append("photo", data.thumbnail),
        // // form.append("photo", data.description),
        // form.append("color", [data.color]),
        // form.append("S", [data.S]),
        // form.append("M", [data.M]),
        // form.append("L", [data.L]),
        // form.append("XL", [data.XL]),
        colorImages.forEach((image) => {form.append("photo", image)})
        console.log(...form)
        
        // fetch("http://localhost:3000"+"/addproduct", {
        //     method: "POST",
        //     headers: {
        //       'Cache': 'no-cache'
        //     },
        //     body: form,
        //     credentials: 'include',
        //   })
        //   .then(
        //     response => response.text(),
        //     error => console.log(error)
        //   )
        //   .then((text) => {
        //       console.log(text)
        //     //   if(text === "success"){
        //     //     enqueueSnackbar("성공이요",{"variant": "success"});
        //     //     setOpen(false)
        //     //     // dispatchPush("/design/recent")
        //     //   }
        //     //   else{
        //     //     enqueueSnackbar("실패따리",{"variant": "error"});
        //     //   }
        //   })

        fetch("http://172.16.100.109:8001"+"/shop/img",{
            method: "POST",
            body: form,
            credentials: 'include',
          })
          .then(
            response => response.json(),
            error => console.log(error)
          )
          .then((json) => {
            const images = json;
            console.log(images)
            const sending = JSON.stringify({
                productname: data.productname,
                price: data.price,
                categoryId: data.categoryId,
                gender: data.gender,
                createdAt: 0,
                photo: images,
                color: [data.color],
                S: [data.S],
                M: [data.M],
                L: [data.L],
                XL: [data.XL]
            })
            console.log(sending)
            fetch("http://172.16.100.109:8001"+"/shop/addproduct",{
                method: "POST",
                headers: {
                  'Accept': 'application/json',
                  "Content-Type": "application/json",
                  'Cache': 'no-cache'
                },
                body: sending,
                credentials: 'include',
            })
            .then(
              response => response.text(),
              error => console.log(error)
            )
            .then((text) => {
                // if(text === "success"){
                //     enqueueSnackbar("성공이요",{"variant": "success"});
                //     dispatchPush("/community/")
                // }
                // else{
                //     enqueueSnackbar("실패따리",{"variant": "error"});
                // }
                console.log(text)
            })
          })
    }

    const imageUpload = <Grid className={classes.imageContainer}>
        {colorImages.map((image, index) => {
            return(
            <React.Fragment>
                <ButtonBase variant="rounded">
                <Avatar src={URL.createObjectURL(image)} 
                    variant="rounded"
                    className={classes.previewImage}
                />
                </ButtonBase>
                <ButtonBase onClick={() => removeImage(index)}>
                <Cancel className={classes.previewCancel}/>
                </ButtonBase>
            </React.Fragment>
            )
        })}
        <input 
            accpet="image/*"
            className={classes.hide}
            id="photo"
            name="photo"
            multiple
            type="file"
            onChange={(event) => handleImageInput(event)}
        />
        <label htmlFor="photo">
        <Avatar variant="rounded" className={clsx({
            [classes.previewImage]: true,
            [classes.hide]: colorImages.length >= 4
        })}>
            <PhotoCamera />
        </Avatar>
        </label>
    </Grid>

    const optionInput = {
        
    }

    
  return(
        <Container maxWidth="lg">
            <Grid container={Paper} className={classes.root}>
                <AdminSubheader />
                <Grid item container>
                    <Typography className={classes.title} gutterBottom variant="h4">관리자 올리기</Typography>
                    <Button onClick={backButtonAction}>돌아가</Button>
                </Grid>
                <Divider />
                <form onSubmit={handleSubmit(productSubmit)}>
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="productname"
                        name="productname"
                        label="상품명"
                        autoFocus
                    />
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="price"
                        name="price"
                        type="number"
                        label="가격"
                        autoFocus
                    />
                    <FormControl required component="fieldset">
                        <RadioGroup aria-label="categoryId" name="categoryId" >
                            <FormControlLabel 
                                inputRef={register({required: true})} value="1" control={<Radio />} label="상의" />
                            <FormControlLabel 
                                inputRef={register({required: true})} value="2" control={<Radio />} label="하의" />
                            <FormControlLabel 
                                inputRef={register({required: true})} value="3" control={<Radio />} label="신발" />
                            <FormControlLabel 
                                inputRef={register({required: true})} value="4" control={<Radio />} label="악세사리" />
                        </RadioGroup>
                    </FormControl>
                    <FormControl required component="fieldset">
                        <RadioGroup aria-label="gender" name="gender" >
                            <FormControlLabel 
                                inputRef={register({required: true})} value="M" control={<Radio />} label="남성" />
                            <FormControlLabel 
                                inputRef={register({required: true})} value="W" control={<Radio />} label="여성" />
                            <FormControlLabel 
                                inputRef={register({required: true})} value="U" control={<Radio />} label="남녀공용" />
                        </RadioGroup>
                    </FormControl>
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="color"
                        name="color"
                        label="색상1번"
                        autoFocus
                    />
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="S"
                        name="S"
                        type="number"
                        label="S사이즈재고수"
                        autoFocus
                    />
                    
                    {/* <input 
                        ref={register({required:true})}
                        required
                        accpet="image/*"
                        id="photo_thumbnail"
                        name="thumbnail"
                        type="file"
                        alt="photo_thumbnail"
                    />
                    <input 
                        ref={register({required:true})}
                        required
                        accpet="image/*"
                        id="photo_description"
                        name="description"
                        type="file"
                    /> */}
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="M"
                        name="M"
                        type="number"
                        label="M사이즈재고수"
                        autoFocus
                    />
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="L"
                        name="L"
                        type="number"
                        label="L사이즈재고수"
                        autoFocus
                    />
                    <TextField
                        inputRef={register({required: true})}
                        variant="outlined"
                        margin="normal"
                        required
                        id="XL"
                        name="XL"
                        type="number"
                        label="XL사이즈재고수"
                        autoFocus
                    />
                    {imageUpload}
                    <Box>

                    </Box>
                    <Button type="submit" fillWidth variant="contained" color="primary">Submit</Button>
                </form>
            </Grid>
        </Container>
    )
}

AdminAddProduct.propTypes = {
    //pathname: PropTypes.string,
    //search: PropTypes.string,
    //hash: PropTypes.string,
}


const mapStateToProps = state => ({
    //pathname: state.router.location.pathname,
    //search: state.router.location.search,
    //hash: state.router.location.hash,
})

const mapDispatchToProps = (dispatch) => ({
    backButtonAction: () => dispatch(goBack()),
    dispatchPush: (url) => dispatch(push(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminAddProduct)
