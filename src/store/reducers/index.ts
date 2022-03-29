import { combineReducers } from 'redux'
import counter from './counter'
import tabbar from './tabbar'
import user from './user'

export default combineReducers({
  counter,
  tabbar,
  user
})