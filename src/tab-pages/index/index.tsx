import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro, { useDidShow } from "@tarojs/taro";

import { useEffect } from "react";

export default function Index() {
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
        console.log(res);
      })
      .catch(console.error);
  });
  useDidShow(() => {

  })
  return (
    <View className="index global__fix_tabbar">
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
