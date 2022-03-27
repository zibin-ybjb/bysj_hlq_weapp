import { combineReducers } from 'redux'
import counter from './counter'
import tabbar from './tabbar'

export default combineReducers({
  counter,
  tabbar
})