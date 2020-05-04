// "/cart"에서 확인하는 장바구니페이지
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import {
    Container,
  Grid,
} from '@material-ui/core'
import DesignCard from './DesignCard';

const useStyles = makeStyles((theme) => ({

}));

const DesignList = ({fetchurl}) => {
    const [ designs, setDesigns ] = useState([]);
    const classes = useStyles();
    useEffect(() => {
        fetch(fetchurl)
        .then(response => response.json())
        .then(json => {
            setDesigns(json)
        })
        .catch(error => {
        console.warn("Error:", error)
    })}, [fetchurl]);
    if(!designs) return(<div>loading.</div>)
    console.log(designs)

    const designCards = designs.map((data) => {
        return <DesignCard design={data}/>
    })

    return(
        <Container maxWidth="md">
            <Grid container>
                {designCards}
            </Grid>
        </Container>
    )
}

DesignList.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(DesignList)
