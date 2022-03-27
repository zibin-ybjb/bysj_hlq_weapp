import { View } from "@tarojs/components";
import { chooseImage } from "@tarojs/taro";
import { useState } from "react";
import { Uploader, Button, Cell, Field, Textarea } from "@taroify/core";
import { Arrow, ArrowLeft } from "@taroify/icons";
import Taro, { useDidShow } from "@tarojs/taro";
import { getUUID } from "../../utils/utils";

import "./index.scss";

const db = Taro.cloud.database();

export default function Publish() {
  const [files, setFiles] = useState<Uploader.File[]>([]);
  const [content, setContent] = useState("这是我新买的，还没怎么用");
  const [positon, setPosition] = useState({});
  useDidShow(() => {
  //   const { top } = Taro.getMenuButtonBoundingClientRect();
  setPosition(Taro.getMenuButtonBoundingClientRect());
  console.log( Taro.getMenuButtonBoundingClientRect());
  
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
      db.collection("goods")
        .add({
          data: {
            // ...userInfo,
            content,
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
          height: `${positon.height-6}Px`,
          top: `${positon.top-1 }Px`,
          left:`8Px`
        }}
        shape="round"
        variant="outlined"
        onClick={() => Taro.navigateBack()}
      >取消
      </Button>
      <View className="container" style={{ top: `${positon.top + positon.height}Px`}}>
        {/* <Button.Group variant="contained" color="primary" shape="round" >
        <Button>
          {" "}
          <ArrowLeft /> 取消
        </Button>
        <Button  onClick={sendFile}>
          发布 <Arrow />
        </Button>
      </Button.Group> */}

        {/* <View >
        取消
      </View> */}
        <Textarea
          className="desc"
          autoHeight
          placeholder="请输入留言"
          value={content}
          onChange={(e) => setContent(e.detail.value)}
        />
        <Uploader
          value={files}
          multiple
          onUpload={onUpload}
          onChange={setFiles}
        />
        {/* <Button
        size="large"
        shape="round"
        color="primary"
        className="button"
       
      >
        发布
      </Button> */}
      </View>
    </>
  );
}
