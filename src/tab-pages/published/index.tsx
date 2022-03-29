import { Button } from "@taroify/core";
import Taro, { navigateTo, useDidShow, useReady } from "@tarojs/taro";
import { View } from "@tarojs/components";
import { useState } from "react";
import Good from "../../components/good/good";
import "./index.scss";
import { useDispatch } from "react-redux";
const db = Taro.cloud.database();

export default function Published() {
  const [goods, setGoods] = useState(new Array());
  const dispatch = useDispatch();
  useDidShow(() => {
    dispatch({ type: "SECOND" });

    db.collection("goods")
      .skip(0)
      .orderBy("createTime", "desc")
      .get()
      .then((res) => {
        setGoods(res.data);
      });
  });
  const toDetails = (goodId: any) => {
    navigateTo({
      url: `../../pages/goodDetail/index?goodId=${goodId}`,
    });
  };
  const pubilsh = () => {
    navigateTo({
      url: "../../pages/publish/index",
    });
  };

  return (
    <View className="container global__fix_tabbar">
      {goods.length > 0 &&
        goods.map(({ img, goodId, content }) => {
          return (
            <View onClick={() => toDetails(goodId)}>
              <Good img={img[0]} content={content}></Good>
            </View>
          );
        })}
      <Button
        className="button"
        variant="contained"
        color="primary"
        shape="round"
        onClick={pubilsh}
      >
        发布
      </Button>
    </View>
  );
}
