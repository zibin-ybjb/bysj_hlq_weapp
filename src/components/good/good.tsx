import { View, Image } from "@tarojs/components";
import styles from "./good.module.scss";
export default function Good({ img, content, avatarUrl, nickName, price }) {
  return (
    <View className={styles.container}>
      <Image
        className={styles.img}
        lazyLoad
        // mode="widthFix"
        src={img}
        // placeholder="加载中..."
      />
      <View className={styles.content}>{content}</View>
      <View className={styles.price}>{`¥${price}`} </View>
      <View className={styles.userinfo}>
        <Image
          className={styles.avatar}
          lazyLoad
          mode="aspectFill"
          src={avatarUrl}
        />

        <View className={styles.name}>{nickName}</View>
      </View>
    </View>
  );
}
