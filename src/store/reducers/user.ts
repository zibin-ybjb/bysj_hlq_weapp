import { REQUESTLOGIN, REQUESTLOGINSUCCESS, REQUESTLOGINFAILURE } from '../constants/user'
import Taro from "@tarojs/taro";

const INITIAL_STATE = {
    isLogin: Taro.getStorageSync("userInfo") ? true :false,
    loading: false,
    name: '',
    error: '',
}

export default function counter (state = INITIAL_STATE, action) {
  switch (action.type) {
    case REQUESTLOGIN:
      return {
        ...state,
        loading: true,
      }
    case REQUESTLOGINSUCCESS:
      return {
        ...state,
        isLogin: true,
        loading: false,
      }
    case REQUESTLOGINFAILURE:
      return {
        ...state,
        isLogin: false,
        loading: false,
      }
    default:
      return state
  }
}