import { View, Text, Button } from "@tarojs/components";
// import { chooseImage } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Swiper, Image, Button as Button1, Notify } from "@taroify/core";
import Taro, { useDidShow, useRouter, useShareAppMessage } from "@tarojs/taro";
import "./index.scss";
import { ShareOutlined, LikeOutlined } from "@taroify/icons";
import Avatar from "@taroify/core/avatar/avatar";

const db = Taro.cloud.database();
const _ = db.command;

export default (props) => {
  const [notify, setNotify] = useState(false);
  const [value, setValue] = useState(0);
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
  useDidShow(() => {
    Taro.cloud
      .callFunction({
        name: "getGoodDetail",
        data: {
          goodId: router.params.goodId,
        },
      })
      .then((res) => {
        console.log(res);

        setDetail(res.result.data[0]);
      });
  });
  const previewImage = (current) => {
    Taro.previewImage({
      current, // 当前显示图片的http链接
      urls: detail.img, // 需要预览的图片http链接列表
    });
  };

  const addCollection = () => {
    db.collection("hlq-collection").add({
      data:{
        goodId:detail.goodId
      }
    }).then(()=>{
      setNotify(true);
    })
    
  };

  return (
    <View
      className="container"
      style={{ padding: "0px 6px", background: "#f7f8fa", height: "100vh" }}
    >
      <Notify color="success" duration={1000} open={notify} onClose={setNotify}>
        收藏成功
      </Notify>
      <View className="container1">
        {/* <Avatar className="avatar" src={userInfo.avatarUrl} size="large" /> */}
        <View className="userInfo">{/* <View>{detail.nickName}</View> */}</View>
      </View>

      <Swiper autoplay={4000} onChange={setValue}>
        {detail.img?.map((current) => {
          return (
            <Swiper.Item onClick={() => previewImage(current)}>
              <Image
                className="img"
                src={current}
                mode="aspectFill"
                lazyLoad
              ></Image>
            </Swiper.Item>
          );
        })}

        <Swiper.Indicator className="custom-indicator">
          {value + 1}/{detail.img?.length}
        </Swiper.Indicator>
      </Swiper>

      <View>{detail.content}</View>

      <View className="good-action">
        <Button
          className="btn"
          openType="share"
          style={{
            position: "absolute",
            left: "10rpx",
            border: "none",
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "120rpx",
            width: "120rpx",
          }}
          plain={true}
        >
          <ShareOutlined className="btn-icon" />
          <Text className="btn-text">分享</Text>
        </Button>
        <Button
          className="btn"
          style={{
            position: "absolute",
            left: "130rpx",
            border: "none",
            background: "transparent",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: "120rpx",
            width: "120rpx",
          }}
          plain={true}
          onClick={() => addCollection()}
        >
          <LikeOutlined className="btn-icon" />
          <Text className="btn-text">收藏</Text>
        </Button>

        <Button1
          className="getWeixin"
          variant="contained"
          color="primary"
          shape="round"
          onClick={() => {
            Taro.setClipboardData({
              data: detail.weixin,
            }).then(() => {
              console.log(111);
            });
          }}
        >
          获取联系方式
        </Button1>
      </View>
    </View>
  );
};
