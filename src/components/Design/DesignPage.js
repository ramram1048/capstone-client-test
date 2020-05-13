// "/design"에서 확인하는 추천코디페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Typography,
  Divider,
  Button
} from '@material-ui/core'

import DesignList from './DesignList'
import DesignWrite from './DesignWrite'
import {yujinserver} from '../../restfulapi'

import { designSetLikeList } from '../../actions/design'


const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1
    }
}));

const DesignPage = ({ designSetLikeList }) => {
    const classes = useStyles();
    const [ loading, setLoading ] = useState(true);
    const [ fullDesigns, setFullDesigns ] = useState([]);
    const [ bestDesigns, setBestDesigns ] = useState([]);
    const [ writeDialogOpened, setWriteDialogOpened] = useState(false)
    useEffect(() => {
        // design & 
        fetch(yujinserver+"/design/best", {credentials: 'include',})
        .then(response => response.json(),
            error => console.error(error))
        .then(json => {
            setBestDesigns(json)
        })
        fetch(yujinserver+"/page/design", {credentials: 'include',})
        .then(response => response.json(),
            error => console.error(error))
        .then(json => {
            setFullDesigns(json.designs)
            const likeList = json.likeInfo.map((like) => {
                return like.designId
            })
            designSetLikeList(likeList)
        })
        setLoading(false)
    }, []);

    const handleWriteButton = () => {
        setWriteDialogOpened(true)
    }

    if(loading) return(<div>로딩중요</div>)
    else return(
        <Grid container direction="column">
            <Grid item container>
                <Typography className={classes.title} variant="h4">BEST 코디</Typography>
                <DesignWrite />
            </Grid>
            <Divider />
            <DesignList designs={bestDesigns} />
            <Typography variant="h4">모두가 올린 코디</Typography>
            <Divider />
            <DesignList designs={fullDesigns} />
        </Grid>
    )
}

DesignPage.propTypes = {
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
    designSetLikeList: (designs) => dispatch(designSetLikeList(designs))
})

export default connect(mapStateToProps, mapDispatchToProps)(DesignPage)
