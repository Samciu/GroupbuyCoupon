
# 天天特权

## 内测中，需要后台接口和授权才能运行起来，可以 star 项目关注后续更新

吃喝玩乐美团CPS小程序项目，别人领优惠券下单，你拿推广佣金

### 介绍

源码为 uni-app 前端项目，需下载hbuilder导入项目打包，或者使用cli工具编译成微信小程序。

后台目前需要内测资格授权开通: [众佣 - 碎片化流量变现平台](http://admin.wxthe.com/)。


### 使用方法
1. 下载或者 clone 本前端项目，导入到 HBuilderX
2. 在众佣后台用户中心中初始化开发配置，获得 Appid。并在众佣后台产品中心开通两个产品
3. 复制 Appid，在 `uni_modules/samciu-coupon-arrive/config.js` 中配置
4. 在HBuilderX顶部菜单点击发行 -> 发行到微信小程序
5. 上传版本并提交审核

- 注意：手机预览、调试、发行小程序需在小程序后台配置域名白名单，在小程序开发管理中配置request合法域名: https://zy-api.wxthe.com
- 注意：manifest.json 中微信小程序权限配置 `位置接口` 需要勾选上

### 交流

如有疑问，可以提issue，或者加我微信： samciu
