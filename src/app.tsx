import "./app.scss";
import "@taroify/icons/index.scss";
import "@taroify/core/index.scss";
import Taro,{useDidShow} from "@tarojs/taro";

import { Provider } from "react-redux";
import configStore from "./store";
const store = configStore();

import { useSelector, useDispatch } from "react-redux";
import { Component } from "react";



Taro.cloud.init({
  env: "cloud1-0g0vsq9645c508fc",
});

function App({ children }) {


  return <Provider store={store}>{children}</Provider>;
}
// class App extends Component {
//   // 可以使用所有的 React 生命周期方法
//   componentDidMount () {
//     console.log(111111);
    
//   }

//   // 对应 onLaunch
//   onLaunch () {
//     console.log(2222222);
    
//   }

//   // 对应 onShow
//   componentDidShow () {}

//   // 对应 onHide
//   componentDidHide () {}

//   render () {
//     // 在入口组件不会渲染任何内容，但我们可以在这里做类似于状态管理的事情
//     return (
//       <Provider store={store}>
//         {this.props.children}
//       </Provider>
//     )
//   }
// }

export default App;
