import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'
import sketchDrawerReducer from './sketchDrawer'

const rootReducer = (history) => combineReducers({
  count: counterReducer,
  drawerOpen: sketchDrawerReducer,
  router: connectRouter(history)
})

export default rootReducer
