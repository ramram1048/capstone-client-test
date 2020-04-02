import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { increment, decrement } from '../actions/counter'

const Counter = ({count, increment, decrement}) => (
  <div>
    Counter: {count}
    <button onClick={increment}>+</button>
    <button onClick={decrement}>-</button>
  </div>
)

Counter.propTypes = {
  count: PropTypes.number,
  increment: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
}


const mapStateToProps = function(state){
  var search = state.router.location.search.slice(1);
  search = parseInt(search);
  if(isNaN(search)) return { count: state.count }
  else return { count: search }
}

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch(increment()),
  decrement: () => dispatch(decrement()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Counter)
