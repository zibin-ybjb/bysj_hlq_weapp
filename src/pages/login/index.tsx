import { View, Text } from "@tarojs/components";
import { Button, Cell, Field, Input, Picker, Popup } from "@taroify/core";
import { ArrowRight } from "@taroify/icons";
import "./index.scss";
import { useEffect, useState } from "react";
import Taro, { useDidShow } from "@tarojs/taro";
import { useDispatch, useSelector } from "react-redux";
import { isSigned } from "../../utils/utils";

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

  const [isRegist ,setRegist] = useState<Boolean>(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [number, setNumber] = useState("");

  const [value, setValue] = useState("");
  const [openPicker, setOpenPicker] = useState(false);
  const dispatch = useDispatch();

  useDidShow(() => {
    isSigned().then((res) => {
      console.log(res);
      setRegist(true);
        Taro.setStorageSync("userInfo", res);
        dispatch({ type: "REQUESTLOGINSUCCESS" });
        // const { name, phone, number ,value } = res;
        setName(res.userName);
        setPhone(res.phone);
        setNumber(res.number);
        setValue(res.schoolArea);
        const { _openid, _id, ...rest} = res;
        setUserInfo(rest);
    }).catch(()=>{

    })
    // Taro.cloud
    //   .callFunction({
    //     name: "getopenid",
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     let { openid } = res.result;
    //     db.collection("hlq-userinfo")
    //       .where({
    //         _openid: openid,
    //       })
    //       .get()
    //       .then((res) => {
    //         console.log(res.data[0]);
    //         Taro.setStorageSync("userInfo", res.data[0]);
    //         dispatch({ type: "REQUESTLOGINSUCCESS" });
    //         // Taro.switchTab({ url :'../../tab-pages/index/index'});
    //       });
    //   });
  });
  const getUserProfile = () => {
    console.log(isRegist);
    
    Taro.getUserProfile({
      desc: "????????????????????????",
    })
      .then((res) => {
        const extendInfo = res.userInfo;
        dispatch({ type: "REQUESTLOGINSUCCESS" });

        db.collection("hlq-userinfo")
          .add({
            data: {
              ...userInfo,
              ...extendInfo,
              createTime: db.serverDate(), // ??????????????????
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
      });
    };

  return (
    <View className="index">
      <Cell.Group inset>
        <Field label="??????">
          <Input
            placeholder="???????????????"
            value={name}
            onChange={(e) => {
              setName(e.detail.value);
              setUserInfo({ ...userInfo, userName: e.detail.value });
            }}
          />
        </Field>
        <Field label="?????????">
          <Input
            type="number"
            placeholder="??????????????????"
            value={phone}
            onChange={(e) => {
              setPhone(e.detail.value);
              setUserInfo({ ...userInfo, phone: e.detail.value });
            }}
          />
        </Field>
        <Field label="??????">
          <Input
            type="number"
            placeholder="???????????????"
            value={number}
            onChange={(e) => {
              setNumber(e.detail.value);
              setUserInfo({ ...userInfo, number: e.detail.value });
            }}
          />
        </Field>

        <Field
          label="??????"
          rightIcon={<ArrowRight />}
          onClick={() => setOpenPicker(true)}
        >
          <Input readonly placeholder="????????????" value={value} />
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
            <Picker.Button>??????</Picker.Button>
            <Picker.Title>??????</Picker.Title>
            <Picker.Button>??????</Picker.Button>
          </Picker.Toolbar>
          <Picker.Column>
            <Picker.Option>A???</Picker.Option>
            <Picker.Option>B???</Picker.Option>
            <Picker.Option>C???</Picker.Option>
          </Picker.Column>
        </Picker>
      </Popup>

      <Button
        className="button"
        shape="round"
        size="large"
        onClick={getUserProfile}
      >
        {isRegist ? "??????" : "??????"}
      </Button>
    </View>
  );
}
