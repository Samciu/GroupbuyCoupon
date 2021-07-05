# 权益卡分销平台

涵盖话费、视频会员、加油卡、礼品卡等多种品类折扣权益，吃、喝、玩、乐、购五大消费场景覆盖的综合权益卡券小程序，用户折扣购、平台赚佣金，个人、企业流量变现平台。

### DEMO

<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/1df50047-7a62-44d2-ae71-63b49888120c.jpeg" width="250" />

### 介绍

DCloud [2021年插件大赛](https://mp.weixin.qq.com/s/LWYTbEuMV-ixcrwSD6BMmw)一等奖项目。本仓库是小程序前端代码，[管理后台](https://ext.dcloud.net.cn/plugin?id=5196)需要在插件市场上购买授权。

### 部署指南

#### 一、部署管理后台
1. 请确保 HBuilderX 更新到最新版
2. 打开[管理后台项目](https://ext.dcloud.net.cn/plugin?id=5196)，将插件导入HBuilderX（强烈建议使用优秀且免费的阿里云）部署
3. 右键点击 uniCloud 关联云服务空间
4. 右键点击 `/database` 目录上传所有DB Schema
5. 右键点击 `/cloudfunctions` 目录上传所有云函数
5. 在HBuilderX顶部菜单点击 发行 -> 上传网站到服务器
6. 在弹出的对话框中选中将编译后的资源部署到云服务空间。
7. 点击上传，等待项目编译部署上传
8. 添加跨域配置，在uniCloud后台操作，将 `前端网页托管` -> `参数配置` 中的 `默认域名` 添加到 `跨域配置`
9. 使用该默认域名地址即可访问管理后台，创建管理员
10. 打开后台，根据引导配置小程序 appid 和 appsecret
11. 到商品管理和品牌管理页面同步商品和品牌列表

- 注意: uniCloud 选择上传所有云函数和上传选择所有schema的时候有可能失败，根据提示在cloudfunctions目录或database目录重新上传单个云函数模块和schema即可

#### 二、部署小程序前端
1. 将[权益卡分销平台-小程序端](https://ext.dcloud.net.cn/plugin?id=5197)代码，导入到 HBuilderX
2. 根目录右键创建uniCloud云开发环境，右键uniCloud目录关联到与管理后台同一个服务空间
3. 复制众佣 Appid，在 `config.js` 中配置
4. 在小程序后台，开发管理中配置服务器request合法域名：https://api.bspapp.com、https://zy-api.wxthe.com
5. 在小程序后台，`设置`->`第三方设置`->`插件管理`中，添加`支付收银台`插件
6. 在HBuilderX顶部菜单点击发行 -> 发行到微信小程序（注意鼠标先选中这个前端项目发行，不要选中后台项目哦）
7. 上传版本并提交审核

- 注意：manifest.json 中微信小程序权限配置 `位置接口` 需要勾选上
- 注意：个人主体的小程序请将`config.js`里`usePlugin`配置为`false`

#### 三、订阅消息配置
1. 更新小程序端到 1.8.8 版本及以上
2. 在小程序后台设置`开发管理`—>`开发设置`—>`消息推送`
   - URL：https://zy-api.wxthe.com/minapp/v1/mp/server/xxx (xxx为你的众佣Appid)
   - Token：zhongyong
   - EncodingAESKey：随机生成
   - 消息加密方式：明文模式
   - 数据格式：XML    
3. 在小程序后台添加 `报价/比价` 类目，订阅消息公共模板库中选用模版编号为`10969`的签到提醒模版，详细内容选中 `活动天数`、`签到天数`、`签到奖励`、`温馨提示`


<img src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/639b4ce9-84c1-42fc-9352-ab920da95f22.jpg" width="500" />

4. 复制 `模板ID`，在众佣后台 `应用管理/权益卡小程序/订阅消息` 添加

### 重要
如有任何问题请加我微信交流： `samciu`，购买授权后加入小程序玩法交流群

### FAQ

#### 为什么这个 XXX 报错？

不要怀疑项目有问题，报错都是你操作有问题。请先检查 HBuilderX 是否已经更新到最新版本，重新上传云函数。小程序项目直接发行，不要跑运行

#### 微信登录为什么授权失败？为什么提示请先平台授权？

请检查后台配置appid，appsecret配置正确；检查小程序端config.js的appid配置正确（为你的众佣appid）

#### 为什么首页空白？

请在后台商品管理和品牌管理同步数据，检查小程序后台是否已经配置合法域名： `https://api.bspapp.com`

#### 为什么iPhone上跟模拟器上展示的商品不一样？

iOS 上不能展示虚拟支付类商品，否则过不了平台审核，接口做了屏蔽处理

#### 微信审核不通过 审核不通过原因如下图所示：

![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-38bad291-5aad-4157-9cbe-615aac906e6a/a2677a70-f1a9-4809-ae2f-40c780bb4aea.png)

众佣后台=>应用管理=>吃喝玩乐小程序=>类目配置 将所有类目全部关闭 只留下餐饮。
