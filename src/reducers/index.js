import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import counterReducer from './counter'
import sketchDrawerReducer from './sketchDrawer'
import orderListReducer from './orderList'
import designReducer from './design'
import postReducer from './postlike'
import followReducer from './follow'
import authReducer from './auth'

const rootReducer = (history) => combineReducers({
  count: counterReducer,
  drawerOpen: sketchDrawerReducer,
  orderList: orderListReducer,
  auth: authReducer,
  design: designReducer,
  post: postReducer,
  follow: followReducer,
  router: connectRouter(history)
})

export default rootReducer
