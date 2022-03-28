import { useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { CoverView, Image, Button, View } from "@tarojs/components";
import { useSelector, useDispatch } from "react-redux";
import IconFont from "../components/iconfont";
import indexIcon from '../static/image/index.svg';
import indexIcons from '../static/image/index-selected.svg';
import myIcon from '../static/image/my.svg';
import myIcons from '../static/image/my-selected.svg';
import publishedIcon from '../static/image/published.svg';
import publishedIcons from '../static/image/published-selected.svg';




import "./index.scss";
const color = "#ececec";
const selectedColor = "#5463FF";
const tabs = ["FIRST", "SECOND", "THIRD"];
const list = [
  {
    pagePath: "/tab-pages/index/index",
    selectedIconPath: indexIcons,
    iconPath: indexIcon,
    text: "首页",
  },
  {
    pagePath: "/tab-pages/published/index",
    selectedIconPath: publishedIcons,
    iconPath: publishedIcon,
    text: "发布",
  },
  {
    pagePath: "/tab-pages/my/index",
    selectedIconPath: myIcons,
    iconPath: myIcon,
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
            <Image
            // src={png}
              src={ index == current ? item.selectedIconPath : item.iconPath}
            />
            <View style={{ color: index == current ? selectedColor : color }}>
              {item.text}
            </View>
          </View>
        );
      })}
    </View>
  );
};
