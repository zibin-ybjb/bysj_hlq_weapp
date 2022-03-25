export default defineAppConfig({
  pages: [
    'pages/index/index',
    "pages/publish/publish",
    "pages/my/my",
    "pages/published/published"

  ],
  tabBar: {
    "custom": true,
    "backgroundColor":"#538ce9",
    "color": "#7A7E83",
    "selectedColor": "#3cc51f",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页"
      },
      {
        "pagePath": "pages/published/published",
        "text": "发布"
      },
      {
        "pagePath": "pages/my/my",
        "text": "我的"
      }
    ]
  },
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
  usingComponents:{}
})
