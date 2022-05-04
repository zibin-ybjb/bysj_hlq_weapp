import { View, Text, Button } from "@tarojs/components";
// import { chooseImage } from "@tarojs/taro";
import { useEffect, useState } from "react";
import {
  Swiper,
  Image,
  Button as Button1,
  SwipeCell,
  Cell,
} from "@taroify/core";
import Taro, {
  useDidShow,
  useRouter,
  useShareAppMessage,
  navigateTo,
} from "@tarojs/taro";
import "./index.scss";
import GoodControl from "../../components/goodControl";
import { ShareOutlined } from "@taroify/icons";
import Avatar from "@taroify/core/avatar/avatar";

const db = Taro.cloud.database();
const _ = db.command;

export default (props) => {
  const [value, setValue] = useState(0);
  const [goods, setGoods] = useState(new Array());
  const [detail, setDetail] = useState({});
  const router = useRouter();
  useShareAppMessage((res) => {
    if (res.from === "button") {
      // 来自页面内转发按钮
      console.log(res.target);
    }
    return {
      title: detail.content,
      path: `/pages/goodDetail/index?goodId=${detail.goodId}`,
      imageUrl: detail.img[0],
    };
  });
  const toDetails = (goodId: any) => {
    navigateTo({
      url: `../../pages/goodDetail/index?goodId=${goodId}`,
    });
  };
  useDidShow(() => {
    db.collection("hlq-collection")
      .get()
      .then((res) => {
        const goodIds = res.data.map((item) => item.goodId);

        const details: any = [];

        for (const item of goodIds) {
          details.push(
            Taro.cloud.callFunction({
              name: "getGoodDetail",
              data: {
                goodId: item,
              },
            })
          );
        }
        Promise.all(details).then((res) => {
          const goods = res.map((item) => {
            return item.result.data[0];
          });
          setGoods(goods);
        });
      });
  });

  return (
    <View
      className="container"
      style={{ padding: "0px 6px", background: "#f7f8fa", height: "100vh" }}
    >
      <View className="container1">
        {goods.length > 0 &&
          goods
            .filter((item) => item.auditState != 3)
            .map(({ img, goodId, content, avatarUrl, nickName, price }) => {
              return (
                <View key={goodId} onClick={() => toDetails(goodId)}>
                  <GoodControl
                    img={img[0]}
                    price={price}
                    content={content}
                  ></GoodControl>
                </View>
              );
            })}
      </View>
    </View>
  );
};
