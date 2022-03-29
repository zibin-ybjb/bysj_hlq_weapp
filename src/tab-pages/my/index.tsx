import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow , useReady } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@taroify/core";
import { UserInfo } from "src/pages/login";

import UserInfoShow from "../../components/userinfo/index";

import "./index.scss";

export default function my(props) {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const [userInfo, serUserInfo] = useState<UserInfo>();
  const [positon, setPosition] = useState({});
  useDidShow(() => {
      dispatch({ type: "THIRD" });
    setPosition(Taro.getMenuButtonBoundingClientRect());
    // 如果是登录的状态或者本地存储中有，就读
    if (isLogin || Taro.getStorageSync("userInfo")) {
      Taro.getStorage({
        key: "userInfo",
      }).then((res) => {
        serUserInfo(res.data);
        console.log(res);
      });
    } else {
      Taro.redirectTo({
        url: "../../pages/login/index",
      });
    }
  });
  return (
    <View
      className="container global__fix_tabbar "
    >
      {userInfo && <UserInfoShow userInfo={userInfo}></UserInfoShow>}
    </View>
  );
}
