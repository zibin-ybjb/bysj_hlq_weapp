import { Button } from "@taroify/core";
import Taro, { navigateTo, useDidShow } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useState } from "react";
import Good from "../../components/good/good";
import "./index.scss";
const db = Taro.cloud.database();

export default function Published() {
  const [goods, setGoods] = useState(new Array());

  useDidShow(() => {
    db.collection("goods")
      .orderBy("createTime", "asc")
      .get()
      .then((res) => {
        setGoods(res.data);
      });
  });

  const pubilsh = () => {
    navigateTo({
      url: "../../pages/publish/index",
    });
  };

  return (
    <View className="container">
      {goods.length > 0 && goods.map(({ img, content }) => {
        return <Good img={img} content={content}></Good>;
      })}
      <Button className = 'button' onClick={pubilsh}>发布</Button>
    </View>
  );
}
