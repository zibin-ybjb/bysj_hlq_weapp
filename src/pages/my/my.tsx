import { View, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";

export default function my(props) {
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
  return (
    <View className="index">
      <Text>Hello world!</Text>
    </View>
  );
}