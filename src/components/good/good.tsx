import { View, Image } from "@tarojs/components";
import styles from './good.module.scss'
export default function Good({ img,content }) {
  return (
    <View className={styles.container}>
      <Image
        className={styles.img}
        lazyLoad
        mode="aspectFill"
        src={img}
        // placeholder="加载中..."
      />
      <View className={styles.content}>{content}</View>
    </View>
  );
};
