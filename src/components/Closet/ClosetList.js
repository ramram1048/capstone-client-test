// "/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
  Grid,
} from '@material-ui/core'
import ClosetCard from './ClosetCard';

const useStyles = makeStyles((theme) => ({

}));

const ClosetList = ({fetchurl}) => {
    const [ closets, setClosets ] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        fetch(fetchurl)
        .then(response => response.json())
        .then(json => {
            setClosets(json)
        })
        .catch(error => {
        console.warn("Error:", error)
    })}, [fetchurl]);
    if(!closets) return(<div>loading.</div>)
    console.log(closets)

    const closetCards = closets.map((data) => {
        return <ClosetCard closet={data}/>
    })

    return(
        <Container maxWidth="md">
            <Grid container>
                {closetCards}
            </Grid>
        </Container>
    )
}

ClosetList.propTypes = {
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
    
})

export default connect(mapStateToProps, mapDispatchToProps)(ClosetList)
