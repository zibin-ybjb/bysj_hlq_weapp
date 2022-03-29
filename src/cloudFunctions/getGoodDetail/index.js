// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();
const goodsCollection = db.collection("goods");

// 云函数入口函数
exports.main = async (event, context) => {
  let res = db
    .collection("goods")
    .where({
      goodId: event.goodId,
    //   goodId: _.eq(event.goodId),
    })
    .get();
  return res;
};
