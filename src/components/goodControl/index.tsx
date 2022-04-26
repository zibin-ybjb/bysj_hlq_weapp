import { View, Image } from "@tarojs/components";
import styles from "./index.module.scss";
function index({ img, content, price }) {
  return (
    <View className={styles.goodContainer}>
      <Image
        className={styles.img}
        lazyLoad
        // mode="widthFix"
        src={img}
        // placeholder="加载中..."
      />
      <View className={styles.content}>{content}</View>
      <View className={styles.price}>{`¥${price}`} </View>
    </View>
  );
}

export default index;
