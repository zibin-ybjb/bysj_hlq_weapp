const cloud = require("wx-server-sdk");
cloud.init({
  env: "cloud1-0g0vsq9645c508fc",
});

exports.main = async (event, context) => {
  const result = await cloud.getTempFileURL({
    fileList: event.fileList,
  });
  return result.fileList;
};
