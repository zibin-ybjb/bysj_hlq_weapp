import "./app.scss";
import "@taroify/icons/index.scss";
import "@taroify/core/index.scss";
import Taro from "@tarojs/taro";
import { Provider } from "react-redux";
import configStore from "./store";
const store = configStore();

Taro.cloud.init({
  env: "cloud1-0g0vsq9645c508fc",
});

function App({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default App;
