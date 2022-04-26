import { View } from "@tarojs/components";
import { chooseImage } from "@tarojs/taro";
import { useState } from "react";
import { Uploader, Button, Input, Cell, Field, Textarea } from "@taroify/core";
import { Arrow, ArrowLeft } from "@taroify/icons";
import Taro, { useDidShow } from "@tarojs/taro";
import { getUUID } from "../../utils/utils";

import "./index.scss";
import "@taroify/icons/index.scss";
import "@taroify/core/index.scss";

const db = Taro.cloud.database();

export default function Publish() {
  const [files, setFiles] = useState<Uploader.File[]>([]);
  const [content, setContent] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [price, setPrice] = useState();
  const [positon, setPosition] = useState({});
  const [weixin, setWeixin] = useState('');

  useDidShow(() => {
    //   const { top } = Taro.getMenuButtonBoundingClientRect();
    Taro.getStorage({
      key: "userInfo",
    }).then((res) => {
      setUserInfo(res.data);
      console.log(res);
    });
    setPosition(Taro.getMenuButtonBoundingClientRect());
  });
  function onUpload() {
    chooseImage({
      count: 9,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
    }).then(({ tempFiles }) => {
      setFiles([
        ...files,
        ...tempFiles.map(({ path, type, originalFileObj }) => ({
          type,
          url: path,
          name: originalFileObj?.name,
        })),
      ]);
    });
  }

  function sendFile() {
    let filesList = new Array();
    let fileIds = new Array();
    if (content.length === 0) {
      Taro.showToast({
        title: "请输入描述...",
        icon: "error",
      });
      return;
    }
    if (files.length === 0) {
      Taro.showToast({
        title: "请上传图片...",
        icon: "error",
      });
      return;
    }
    if (!price) {
      Taro.showToast({
        title: "请输入价格",
        icon: "error",
      });
      return;
    }
    files?.forEach(({ url }) => {
      let currentFile = new Promise((resolve, reject) => {
        Taro.cloud.uploadFile({
          cloudPath: "goods/" + Date.now() + "-" + Math.random() * 1000,
          filePath: url as any, // 文件路径
          success: (res) => {
            fileIds = fileIds.concat(res.fileID);
            resolve(res);
          },
          fail: (err) => {
            reject(err);
          },
        });
      });
      filesList.push(currentFile);
    });
    Taro.showLoading();

    Promise.all(filesList).then(() => {
      let { _id, _openid, ...pickInfo } = userInfo;
      db.collection("goods")
        .add({
          data: {
            ...pickInfo,
            content,
            price,
            weixin,
            auditState:0,
            img: fileIds,
            goodId: getUUID(8),
            createTime: db.serverDate(), // 服务端的时间
          },
        })
        .then(() => {
          Taro.showToast({
            title: "发布成功",
            icon: "success",
            complete: () => {
              setFiles([]);
              setContent("");
              Taro.navigateBack();
            },
          });
        });
    });
  }

  return (
    <>
      <Button
        className="cancel"
        style={{
          height: `${positon.height - 6}Px`,
          top: `${positon.top - 1}Px`,
          left: `30rpx`,
        }}
        shape="round"
        variant="outlined"
        onClick={() => Taro.navigateBack()}
      >
        取消
      </Button>
      <View
        className="container"
        style={{ top: `${positon.top + positon.height}Px` }}
      >
        <Textarea
          className="desc"
          autoHeight
          placeholder="请输入描述"
          value={content}
          onChange={(e) => setContent(e.detail.value)}
        />
        <Uploader
          className="uploader"
          value={files}
          multiple
          onUpload={onUpload}
          onChange={setFiles}
        />
        <View className="input">
          <Input
            type="digit"
            placeholder="请输入价格"
            value={price}
            onChange={(e) => setPrice(e.detail.value)}
          />
        </View>
        <View className="input">
          <Input
            type="digit"
            placeholder="请输入微信"
            value={weixin}
            onChange={(e) => setWeixin(e.detail.value)}
          />
        </View>

        <Button shape="round" className="button" onClick={sendFile}>
          发布
        </Button>
      </View>
    </>
  );
}
