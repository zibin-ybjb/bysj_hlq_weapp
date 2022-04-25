import { View, Text } from "@tarojs/components";
import "./index.scss";
import Taro, { navigateTo, useDidShow, useReady } from "@tarojs/taro";
import Good from "../../components/good/good";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Index() {
  const { isLogin } = useSelector((state) => state.user);
  const [goods, setGoods] = useState(new Array());
  const dispatch = useDispatch();
  useDidShow(() => {
    dispatch({ type: "FIRST" });
    console.log(isLogin);

    Taro.cloud
      .callFunction({
        name: "getgoodlist",
        data: {
          start: 0,
          count: 20,
          fromWeapp: true
        },
      })
      .then((res) => {
        setGoods(res.result.data);
      });
    // if(isLogin){
    //   Taro.redirectTo({
    //     url:'../../pages/login/index'
    //   })
    // }
  });
  useEffect(() => {});
  const toDetails = (goodId: any) => {
    navigateTo({
      url: `../../pages/goodDetail/index?goodId=${goodId}`,
    });
  };
  return (
    <View className="container global__fix_tabbar">
      {goods.length > 0 &&
        goods.map(({ img, goodId, content, avatarUrl, nickName, price }) => {
          return (
            <View onClick={() => toDetails(goodId)}>
              <Good
                img={img[0]}
                nickName={nickName}
                avatarUrl={avatarUrl}
                price={price}
                content={content}
              ></Good>
            </View>
          );
        })}
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
