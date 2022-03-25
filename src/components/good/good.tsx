import { View, Image } from "@tarojs/components";
import './good.scss'
export default function Good({ pic,des }) {
  return (
    <View className="container">
      <Image
        className="pic"
        src={pic}
      />
      1111111
      <View className="des">{des}</View>
    </View>
  );
};
