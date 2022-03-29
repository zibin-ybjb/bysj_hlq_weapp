import { View, Text } from "@tarojs/components";
// import { chooseImage } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { Swiper, Image } from "@taroify/core";
import Taro, { useDidShow, useRouter } from "@tarojs/taro";
import "./index.scss";

const db = Taro.cloud.database();
const _ = db.command;

export default (props) => {
  const [value, setValue] = useState(0);
  const [detail, setDetail] = useState({});
  const router = useRouter();
  useDidShow(() => {

    Taro.cloud.callFunction({
      name:'getGoodDetail',
      data:{
        goodId:router.params.goodId
      }
    }).then((res) => {
      setDetail(res.result.data[0]);
    })
  });
  const previewImage = (current) => {
    Taro.previewImage({
      current, // 当前显示图片的http链接
      urls: detail.img, // 需要预览的图片http链接列表
    });
  };

  return (
    <View className="container">
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


    </View>
  );
};
