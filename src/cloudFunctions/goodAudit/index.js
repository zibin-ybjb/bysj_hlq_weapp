const cloud = require("wx-server-sdk");
cloud.init({
  env: "cloud1-0g0vsq9645c508fc",
});
const db = cloud.database();
const goodsCollection = db.collection("goods");

exports.main = async (event) => {
  const res = await goodsCollection.doc(event._id).update({
    data: {
        auditState:4
    },
  });
  return res;
};
