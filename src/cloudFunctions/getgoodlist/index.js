// 云函数入口文件
const cloud = require("wx-server-sdk");

cloud.init();

const db = cloud.database();
const goodsCollection = db.collection("goods");
// 云函数入口函数
exports.main = async (event, context) => {
  const { start, count, fromWeapp } = event;
  console.log(fromWeapp, event);
//   return fromWeapp;
  if (fromWeapp) {
    return await goodsCollection
      .where({
        auditState: 4,
      })
      .skip(start)
      .limit(count)
      .orderBy("createTime", "desc")
      .get();
  } else {
    return await goodsCollection
      .skip(start)
      .limit(count)
      .orderBy("createTime", "desc")
      .get();
  }
};
