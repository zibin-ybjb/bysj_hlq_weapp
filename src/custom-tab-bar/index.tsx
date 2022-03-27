import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { CoverView, CoverImage, Button, View } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";
import IconFont from "../components/iconfont";
import "./index.scss";
const color = "#000000";
const selectedColor = "#DC143C";
const tabs = ["FIRST", "SECOND", "THIRD"];
const list = [
  {
    pagePath: "/tab-pages/index/index",
    // selectedIconPath: '../images/tabbar_home_on.png',
    // iconPath: '../images/tabbar_home.png',
    text: "首页",
  },
  {
    pagePath: "/tab-pages/published/index",
    // selectedIconPath: '../images/tabbar_cate_on.png',
    // iconPath: '../images/tabbar_cate.png',
    text: "发布",
  },
  {
    pagePath: "/tab-pages/my/index",
    // selectedIconPath: '../images/tabbar_cart_on.png',
    // iconPath: '../images/tabbar_cart.png',
    text: "我的",
  },
];

export default () => {
  const { current } = useSelector((state) => state.tabbar);
  const dispatch = useDispatch();
  const switchTab = (index, url) => {
    dispatch({ type: tabs[index] });
    Taro.switchTab({ url });
  };

  return (
    <View className="tab-bar">
      <View className="tab-bar-border"></View>
      {list.map((item, index) => {
        return (
          <View
            key={index}
            className="tab-bar-item"
            onClick={() => switchTab(index, item.pagePath)}
          >
            <View>
              <IconFont
                name="fangda"
                style={{
                  fontSize: "60Px",
                  color: index == current ? selectedColor : color,
                }}
              />
            </View>

            {/* <CoverImage
              src={selected === index ? item.selectedIconPath : item.iconPath}
            /> */}
            <View style={{ color: index == current ? selectedColor : color }}>
              {item.text}
            </View>
          </View>
        );
      })}
    </View>
  );
};
