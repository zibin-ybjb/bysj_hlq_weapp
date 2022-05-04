
import { useGlobalIconFont } from './components/iconfont/helper';
export default defineAppConfig({
  pages: [
    'tab-pages/index/index',
    "tab-pages/published/index",
    "tab-pages/my/index",

    "pages/publish/index",
    "pages/republish/index",
    "pages/goodDetail/index",
    "pages/login/index",
    "pages/collection/index",
  ],
  tabBar: {
    "custom": true,
    // "backgroundColor":"#538ce9",
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "list": [
      {
        "pagePath": "tab-pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "tab-pages/published/index",
        "text": "发布"
      },
      {
        "pagePath": "tab-pages/my/index",
        "text": "我的"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
    "navigationStyle":"default"
  },
  usingComponents:{
    ...Object.assign(useGlobalIconFont())
  }
})
