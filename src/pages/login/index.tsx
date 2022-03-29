import { View, Text } from "@tarojs/components";
import { Button, Cell, Field, Input, Picker, Popup } from "@taroify/core";
import { ArrowRight } from "@taroify/icons";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";

const db = Taro.cloud.database();

export interface UserInfo {
  nickName: string;
  avatarUrl: string;
  city: string;
  country: string;
  gender: number;
  language: string;
  province: string;

  userName: string;
  phone: string;
  number: number;
  schoolArea: string;
}

export default function Login() {
  const { isLogin } = useSelector((state) => state.user);
  const [userInfo, setUserInfo] = useState<UserInfo>();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [number, setNumber] = useState("");

  const [value, setValue] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const dispatch = useDispatch();

  useDidShow(() => {
    Taro.cloud
      .callFunction({
        name: "getopenid",
      })
      .then((res) => {
        console.log(res);
        let { openid } = res.result;
        db.collection("hlq-userinfo")
          .where({
            _openid: openid,
          })
          .get()
          .then((res) => {
            console.log(res.data[0]);
            Taro.setStorageSync("info", res.data[0]);
            dispatch({ type: "REQUESTLOGINSUCCESS" });
            Taro.switchTab({ url :'../../tab-pages/index/index'});
          });
      });
  });
  const getUserProfile = () => [
    Taro.getUserProfile({
      desc: "用于完善会员资料",
    })
      .then((res) => {
        const extendInfo = res.userInfo;
        dispatch({ type: "REQUESTLOGINSUCCESS" });

        db.collection("hlq-userinfo")
          .add({
            data: {
              ...userInfo,
              ...extendInfo,
              createTime: db.serverDate(), // 服务端的时间
            },
          })
          .then((res) => {
            console.log(res);
            Taro.setStorage({
              key: "userInfo",
              data: {
                ...userInfo,
                ...extendInfo,
              },
            });
          }).then(() => {
            Taro.switchTab({ url :'../../tab-pages/index/index'});
          });
      })
      .catch((error) => {
        dispatch({ type: "REQUESTLOGINFAILURE" });
        console.log(error);
      }),
  ];

  return (
    <View className="index">
      <Cell.Group inset>
        <Field label="姓名">
          <Input
            placeholder="请输入姓名"
            value={name}
            onChange={(e) => {
              setName(e.detail.value);
              setUserInfo({ ...userInfo, userName: e.detail.value });
            }}
          />
        </Field>
        <Field label="手机号">
          <Input
            type="number"
            placeholder="请输入手机号"
            value={phone}
            onChange={(e) => {
              setPhone(e.detail.value);
              setUserInfo({ ...userInfo, phone: e.detail.value });
            }}
          />
        </Field>
        <Field label="学号">
          <Input
            type="number"
            placeholder="请输入学号"
            value={number}
            onChange={(e) => {
              setNumber(e.detail.value);
              setUserInfo({ ...userInfo, number: e.detail.value });
            }}
          />
        </Field>

        <Field
          label="校区"
          rightIcon={<ArrowRight />}
          onClick={() => setOpenPicker(true)}
        >
          <Input readonly placeholder="选择校区" value={value} />
        </Field>
      </Cell.Group>

      <Popup
        open={openPicker}
        rounded
        placement="bottom"
        onClose={setOpenPicker}
      >
        <Popup.Backdrop />
        <Picker
          onCancel={() => setOpenPicker(false)}
          onConfirm={(values) => {
            setUserInfo({ ...userInfo, schoolArea: values });
            setValue(values);
            setOpenPicker(false);
          }}
        >
          <Picker.Toolbar>
            <Picker.Button>取消</Picker.Button>
            <Picker.Title>标题</Picker.Title>
            <Picker.Button>确认</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option>A区</Picker.Option>
            <Picker.Option>B区</Picker.Option>
            <Picker.Option>C区</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>

      <Button
        className="button"
        shape="round"
        size="large"
        onClick={getUserProfile}
      >
        授权
      </Button>
    </View>
  );
}
