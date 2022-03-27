import { FIRST, SECOND, THIRD } from '../constants/tabbar'

const INITIAL_STATE = {
  current: 0
}

export default function tabbar (state = INITIAL_STATE, action) {
  switch (action.type) {
    case FIRST:
      return {
        ...state,
        current: 0
      }
    case SECOND:
      return {
        ...state,
        current: 1
      }
    case THIRD:
      return {
        ...state,
        current: 2
      }
    default:
      return state
  }
}