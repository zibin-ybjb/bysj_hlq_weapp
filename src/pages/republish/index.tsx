import { View } from "@tarojs/components";
import { chooseImage, useRouter } from "@tarojs/taro";
import { useState } from "react";
import { Uploader, Button, Input, Image, Field, Textarea } from "@taroify/core";
import { Arrow, ArrowLeft } from "@taroify/icons";
import Taro, { useDidShow, navigateBack } from "@tarojs/taro";
import { getUUID } from "../../utils/utils";

import "./index.scss";

const db = Taro.cloud.database();

export default function Publish() {
  const router = useRouter();

  const [files, setFiles] = useState<Uploader.File[]>([]);
  const [cloudImg, setcloudImg] = useState([]);
  const [content, setContent] = useState("");
  const [price, setPrice] = useState();
  const [weixin, setWeixin] = useState("");

  const [goodId, setgoodId] = useState("");

  useDidShow(() => {
    Taro.cloud
      .callFunction({
        name: "getGoodDetail",
        data: {
          goodId: router.params.goodId,
        },
      })
      .then((res) => {
        let data = res.result.data[0];
        console.log(data);
        setWeixin(data.weixin);
        setcloudImg(data.img);
        setContent(data.content);
        setPrice(data.price);
        setgoodId(data._id);
        // setDetail();
      });
  });

  const previewImage = (current) => {
    Taro.previewImage({
      current, // 当前显示图片的http链接
      urls: cloudImg, // 需要预览的图片http链接列表
    });
  };
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
    let fileIds = cloudImg;
    if (content.length === 0) {
      Taro.showToast({
        title: "请输入描述...",
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
      db.collection("goods")
        .doc(goodId)
        .update({
          data: {
            content,
            price,
            weixin,
            auditState: 0,
            img: fileIds,
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
      <View className="container">
        <Textarea
          className="desc"
          autoHeight
          placeholder="请输入描述"
          value={content}
          onChange={(e) => setContent(e.detail.value)}
        />

        <View className="imgArea">
          {cloudImg.map((item) => {
            return (
              <View key={item} onClick={() => previewImage(item)}>
                <Image
                  className="img"
                  src={item}
                  mode="aspectFill"
                  lazyLoad
                ></Image>
              </View>
            );
          })}
          <Uploader
            className="uploader"
            value={files}
            multiple
            onUpload={onUpload}
            onChange={setFiles}
          />
        </View>

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

        <View className="btng">
          <Button shape="round" className="button" onClick={sendFile}>
            修改
          </Button>
          <Button
            shape="round"
            className="button"
            onClick={() => {
              db.collection("goods")
                .doc(goodId)
                .update({
                  data: {
                    isDelete: true, //下架
                    createTime: db.serverDate(), // 服务端的时间
                  },
                }).then(()=>{
                  Taro.showToast({
                    title: "删除成功",
                    icon: "success",
                    complete: () => {
                      Taro.navigateBack();
                    },
                  });
                })
            }}
          >
            删除
          </Button>
          <Button
            shape="round"
            className="button"
            onClick={() => {
              db.collection("goods")
                .doc(goodId)
                .update({
                  data: {
                    auditState: 3, //下架
                    createTime: db.serverDate(), // 服务端的时间
                  },
                }).then(()=>{
                  Taro.showToast({
                    title: "下架成功",
                    icon: "success",
                    complete: () => {
                      Taro.navigateBack();
                    },
                  });
                })
            }}
          >
            下架
          </Button>
        </View>
      </View>
    </>
  );
}
