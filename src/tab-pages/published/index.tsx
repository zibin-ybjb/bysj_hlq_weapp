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

    db.collection("goods").get()
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
      {/* <Button
        className="button"
        variant="contained"
        shape="round"
        onClick={pubilsh}
      >
        发布
      </Button> */}
      <View className="button" onClick={pubilsh}>
        <View className="btn-icon">
        </View>
      </View>
    </View>
  );
}
