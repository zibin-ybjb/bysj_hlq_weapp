import Taro, {
  navigateTo,
  useDidShow,
  usePullDownRefresh,
  useReady,
} from "@tarojs/taro";
import { View } from "@tarojs/components";
import { Fragment, useState } from "react";
import { Tabs } from "@taroify/core";
import GoodControl from "../../components/goodControl";
import "./index.scss";
import { useDispatch } from "react-redux";

const db = Taro.cloud.database();

export default function Published() {
  const [goods, setGoods] = useState(new Array());
  const [value, setValue] = useState(0);
  const dispatch = useDispatch();
  const fetchData = async () => {
    return await db.collection("goods")
      .orderBy("createTime", "desc")
      .get()
      .then((res) => {
        console.log(res);
        setGoods(res.data);
      });
  };
  useDidShow(() => {
    fetchData();
    dispatch({ type: "SECOND" });
  });
  usePullDownRefresh(() => {
    // Taro.startPullDownRefresh({
    //   complete: () => {
        fetchData().then(()=>{
          Taro.stopPullDownRefresh();
        })

    //   },
    // });
  });

  const toDetails = (goodId: any) => {
    navigateTo({
      url: `../../pages/republish/index?goodId=${goodId}`,
    });
  };
  const pubilsh = () => {
    navigateTo({
      url: "../../pages/publish/index",
    });
  };

  return (
    <View className="container global__fix_tabbar">
      <Tabs className="tabs" value={value} onChange={setValue}>
        <Tabs.TabPane title="在卖">
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
        </Tabs.TabPane>
        <Tabs.TabPane title="已下架">
          {goods.length > 0 &&
            goods
              .filter((item) => item.auditState == 3)
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
        </Tabs.TabPane>
      </Tabs>

      <View className="button" onClick={pubilsh}>
        <View className="btn-icon"></View>
      </View>
    </View>
  );
}
