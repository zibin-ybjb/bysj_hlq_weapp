import { Component, useState } from "react";
import Taro from "@tarojs/taro";
import { CoverView, CoverImage } from "@tarojs/components";

import "./index.scss";

class Index extends Component {
  state = {
    selected: 0,
    color: "#000000",
    selectedColor: "#DC143C",
    list: [
      {
        pagePath: "/pages/index/index",
        // selectedIconPath: '../images/tabbar_home_on.png',
        // iconPath: '../images/tabbar_home.png',
        text: "首页",
      },
      {
        pagePath: "/pages/published/index",
        // selectedIconPath: '../images/tabbar_cate_on.png',
        // iconPath: '../images/tabbar_cate.png',
        text: "发布",
      },
      {
        pagePath: "/pages/my/index",
        // selectedIconPath: '../images/tabbar_cart_on.png',
        // iconPath: '../images/tabbar_cart.png',
        text: "我的",
      },
      //   {
      //     pagePath: '/pages/my/index',
      //     // selectedIconPath: '../images/tabbar_my_on.png',
      //     // iconPath: '../images/tabbar_my.png',
      //     text: '个人中心'
      //   }
    ],
  };

  switchTab(index, url) {
    this.setSelected(index);
    Taro.switchTab({ url });
  }

  setSelected(idx: number) {
    this.setState({
      selected: idx,
    });
  }

  render() {
    const { list, selected, color, selectedColor } = this.state;

    return (
      <CoverView className="tab-bar">
        <CoverView className="tab-bar-border"></CoverView>
        {list.map((item, index) => {
          return (
            <CoverView
              key={index}
              className="tab-bar-item"
              onClick={this.switchTab.bind(this, index, item.pagePath)}
            >
              <CoverImage
                src={selected === index ? item.selectedIconPath : item.iconPath}
              />
              <CoverView
                style={{ color: selected === index ? selectedColor : color }}
              >
                {item.text}
              </CoverView>
            </CoverView>
          );
        })}
      </CoverView>
    );
  }
}
export default () => {
  const [selected, setSelected] = useState(0);
  const color = "#000000";
  const selectedColor = "#DC143C";
  const list = [
    {
      pagePath: "/tab-pages/index/index",
      // selectedIconPath: '../images/tabbar_home_on.png',
      // iconPath: '../images/tabbar_home.png',
      text: "首页",
    },
    {
      pagePath: "/tab-pages/published/index",
      // selectedIconPath: '../images/tabbar_cate_on.png',
      // iconPath: '../images/tabbar_cate.png',
      text: "发布",
    },
    {
      pagePath: "/tab-pages/my/index",
      // selectedIconPath: '../images/tabbar_cart_on.png',
      // iconPath: '../images/tabbar_cart.png',
      text: "我的",
    },
    //   {
    //     pagePath: '/pages/my/index',
    //     // selectedIconPath: '../images/tabbar_my_on.png',
    //     // iconPath: '../images/tabbar_my.png',
    //     text: '个人中心'
    //   }
  ];

  const switchTab = (index, url) => {
    Taro.switchTab({ url });
    setSelected(index);
    
  };

  return (
    <CoverView className="tab-bar">
      <CoverView className="tab-bar-border"></CoverView>
      {list.map((item, index) => {
        return (
          <CoverView
            key={index}
            className="tab-bar-item"
            onClick={() => switchTab(index, item.pagePath)}
          >
            {/* <CoverImage
              src={selected === index ? item.selectedIconPath : item.iconPath}
            /> */}
            <CoverView
              style={{ color: selected === index ? selectedColor : color }}
            >
              {item.text}
            </CoverView>
          </CoverView>
        );
      })}
    </CoverView>
  );
};
