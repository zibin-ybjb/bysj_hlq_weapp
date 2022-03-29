import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro, { useDidShow, useReady } from "@tarojs/taro";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { isLogin } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useDidShow(() => {
    dispatch({ type: "FIRST" });
    console.log(isLogin);
    if(!isLogin && !Taro.getStorageSync("userInfo")){
      Taro.redirectTo({
        url:'../../pages/login/index'
      })
    }
  });
  useEffect(() => {
    Taro.cloud
      .callFunction({
        name: "good",
        data: {
          abc: 1,
          adc: 2,
        },
      })
      .then((res) => {
        // console.log(res);
      })
      .catch(console.error);
  });

  return (
    <View className="container global__fix_tabbar">
      <Text>Hello world!</Text>
    </View>
  );
}
// export default class Index extends Component {

//   componentWillMount () {

//    }

//   componentDidMount () {

//     Taro.cloud
//     .callFunction({
//       name: "good",
//       data:{
//         abc:1,
//         adc:2
//       }
//     })
//     .then((res) => {
//       console.log(res);
//     })
//     .catch(console.error);
//   }

//   componentWillUnmount () { }

//   componentDidShow () { }

//   componentDidHide () { }

//   render () {
//     return (
//       <View className='index'>
//         <Text>Hello world!</Text>
//       </View>
//     )
//   }
// }
