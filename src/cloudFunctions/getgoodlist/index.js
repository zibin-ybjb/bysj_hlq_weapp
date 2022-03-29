// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init();

const db = cloud.database();
const goodsCollection = db.collection("goods");
// 云函数入口函数
exports.main = async (event, context) => {
    let good = await goodsCollection
    .skip(event.start)
    .limit(event.count)
    .orderBy("createTime", "desc")
    .get()

    return good;
}