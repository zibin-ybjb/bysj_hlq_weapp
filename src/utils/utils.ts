import Taro from "@tarojs/taro";
const db = Taro.cloud.database();

// 生成随机uuid
export function getUUID(randomLength) {
  return Number(
    Math.random().toString().substr(2, randomLength) + Date.now()
  ).toString(36);
}

// 是否已经组册
export async function isSigned() {
  const res = await Taro.cloud.callFunction({
    name: "getopenid",
  });
  let { openid } = res.result;
  let hasSign = await db
    .collection("hlq-userinfo")
    .where({
      _openid: openid,
    })
    .get();
  if (hasSign.data.length === 0) {
    throw new Error();
  } else {
    return hasSign.data[hasSign.data.length - 1];
  }
}
