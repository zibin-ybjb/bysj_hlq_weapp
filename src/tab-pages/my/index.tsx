import { View, Text, Image } from "@tarojs/components";
import Taro, { useDidShow, useReady, navigateTo } from "@tarojs/taro";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Button } from "@taroify/core";
import { UserInfo } from "src/pages/login";

import { isSigned } from "../../utils/utils";

import UserInfoShow from "../../components/userinfo/index";

import "./index.scss";

export default function my(props) {
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state) => state.user);
  const [userInfo, serUserInfo] = useState<UserInfo>();
  const [positon, setPosition] = useState({});
  useDidShow(() => {
    dispatch({ type: "THIRD" });
    isSigned()
      .then((res) => {
        serUserInfo(res);
        Taro.setStorageSync("userInfo", res);
        dispatch({ type: "REQUESTLOGINSUCCESS" });
      })
      .catch(() => {
        toLogin();
      });
    setPosition(Taro.getMenuButtonBoundingClientRect());
  });
  const toDetails = () => {
    navigateTo({
      url: `../../pages/collection/index`,
    });
  };

  const toLogin = () => {
    Taro.redirectTo({
      url: "../../pages/login/index",
    });
  };

  return (
    <View className="container global__fix_tabbar ">
      {userInfo && (
        <View onClick={() => toLogin()}>
          <UserInfoShow userInfo={userInfo}></UserInfoShow>
        </View>
      )}

      <View
        className="my-list-item"
        onClick={() => toDetails()}
      >
        <Text>我的收藏</Text>
      </View>
    </View>
  );
}
