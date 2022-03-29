import { Avatar } from "@taroify/core";
import { View, Image } from "@tarojs/components";
import "./index.scss";

export default function UserInfoShow({userInfo}) {
  return (
    <View className="container1">
      <Avatar className="avatar" src={userInfo.avatarUrl} size="large" />
      <View className="userInfo">
        <View>{userInfo.nickName}</View>
        <View>{userInfo.number}</View>
        <View>{userInfo.phone}</View>
      </View>
    </View>
  );
}
