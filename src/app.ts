import './app.scss'
import "@taroify/icons/index.scss"
import "@taroify/core/index.scss"
import Taro from '@tarojs/taro'

Taro.cloud.init({
  env: 'cloud1-0g0vsq9645c508fc'
})

function App(props){
  return props.children
}

export default App
