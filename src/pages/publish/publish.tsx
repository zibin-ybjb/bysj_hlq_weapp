import { View } from "@tarojs/components";
import { chooseImage } from "@tarojs/taro";
import { useState } from "react";
import { Uploader, Button } from "@taroify/core";
import Taro,{useDidHide} from "@tarojs/taro";
const db = Taro.cloud.database();
import "./publish.scss";
// function BasicUploader() {

//   }
export default function Publish() {
  const [files, setFiles] = useState<Uploader.File[]>([
    // {
    //   url: "https://img01.yzcdn.cn/vant/leaf.jpg",
    //   status: "uploading",
    //   message: "上传中...",
    // },
    // {
    //   url: "https://img01.yzcdn.cn/vant/tree.jpg",
    //   status: "failed",
    //   message: "上传失败",
    // },
  ]);
  useDidHide(() => {
    setFiles([])
  })
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
    files?.forEach(({ url }) => {
      console.log(url);
      let currentFile = new Promise((resolve, reject) => {
        Taro.cloud.uploadFile({
          cloudPath: "goods/" + Date.now() + "-" + Math.random() * 1000,
          filePath: url as any, // 文件路径
          success: (res) => {
            fileIds = fileIds.concat(res.fileID)
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
      db.collection("faxian")
        .add({
          data: {
            // ...userInfo,
            // content,
            img: fileIds,
            createTime: db.serverDate(), // 服务端的时间
          },
        })
        .then(() => {
          Taro.hideLoading();

        }).then(()=>{
          Taro.showToast({
            title: "发布成功",
            icon:'success',
            complete: ()=>{
              // Taro.switchTab({
              //   url:'/pages/index/index'
              // });
              setFiles([])
            }
          });

        })
    });

  }

  return (
    <View>
      <Uploader
        value={files}
        multiple
        onUpload={onUpload}
        onChange={setFiles}
      />
      <Button
        size="large"
        shape="round"
        color="primary"
        className="button"
        onClick={sendFile}
      >
        提交
      </Button>
    </View>
  );
}
