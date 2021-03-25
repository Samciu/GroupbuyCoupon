<template>
  <view class="container">
    <view class="head">
      <view class="avatarUrl">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="nickName">
        <open-data type="userNickName"></open-data>
      </view>
    </view>
    <view class="others">
      <view class="item">
        <image class="icon" src="../../static/user_share.png"></image>
        <button class="content share" open-type="share">
          <view>分享好友</view>
          <image class="right" src="../../static/right_h.png"></image>
        </button>
      </view>
      <view class="item" bindtap="sponsor">
        <image class="icon" src="../../static/user_hezuo.png"></image>
        <button class="content share" open-type="contact">
          <view>我要制作</view>
          <image class="right" src="../../static/right_h.png"></image>
        </button>
      </view>
      <view class="item">
        <image class="icon" src="../../static/user_kefu.png"></image>
        <button class="content share" open-type="contact">
          <view>我有建议</view>
          <image class="right" src="../../static/right_h.png"></image>
        </button>
      </view>
    </view>
    <view class="version"> v1.0 </view>
    <customTabBar tab="user"></customTabBar>
  </view>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  onLoad() {
    // this.getUserInfo()
  },
  onShareAppMessage(res) {},
  methods: {
    /*登录 */
    onGotUserInfo(e) {
      this.userInfo = e.detail.userInfo;
    },

    async getUserInfo() {
      const [err, res] = await uni.getUserInfo();
      if (err) return;
      this.userInfo = res.userInfo;
    },

    onShareAppMessage(res) {
      return {
        title: "震惊！小明天天出来玩，竟然只花1分钱",
        path: "uni_modules/samciu-coupon-arrive/pages/arrive/arrive",
        imageUrl:
          "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/1fa7c836-b3cc-44ba-84b0-6e6e9188244b.jpg",
      };
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f8f8f8;
}
.container {
  padding-bottom: 20rpx;
}
.head {
  background: #fff;
  position: relative;
  text-align: center;
  flex-wrap: wrap;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
  height: 220rpx;
}
.head .avatarUrl {
  width: 120rpx;
  height: 120rpx;
  display: block;
  margin: auto;
  border-radius: 50%;
  overflow: hidden;
}
.head .nickName {
  margin-top: 10rpx;
  text-align: center;
  font-size: 36rpx;
  color: #333;
  width: 100%;
}
.head .loginBtn {
  text-align: center;
}
.head .loginBtn button {
  display: inline-block;
  background: #f45d4c;
  font-size: 32rpx;
  height: 70rpx;
  line-height: 70rpx;
  border: none;
  padding: 0 30rpx;
  border-radius: 35rpx;
}
.head .loginBtn button::after {
  border: none;
}
.head .lot {
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  border-top: 1px solid #f8f8f8;
  width: 690rpx;
  padding: 30rpx;
}
.head .lot > view {
  width: 50%;
  text-align: center;
}
.head .lot .num {
  color: #333;
  font-size: 32rpx;
  font-weight: 700;
}
.head .lot .name {
  color: #666;
  font-size: 28rpx;
}
.head .lot .all {
  border-right: 1px solid #f8f8f8;
  box-sizing: border-box;
}
.others {
  margin: 20rpx 0;
  background: #fff;
}
.others .item {
  display: flex;
  align-items: center;
  width: 690rpx;
  padding: 0 30rpx;
  border-bottom: 1px solid #ededf0;
}
.others .item:last-child {
  border-bottom: none;
}
.others .item .icon {
  width: 50rpx;
  height: 50rpx;
  margin-right: 30rpx;
}
.others .item .content {
  width: 620rpx;
  padding: 30rpx 0;
  display: flex;
  align-items: center;
  font-size: 34rpx;
  color: #333;
}
.others .item .content.share {
  background: none;
  text-align: left;
  border: none;
  line-height: normal;
}
.others .item .content.share::after {
  border: none;
}
.others .item .content .right {
  width: 25rpx;
  height: 25rpx;
  margin-left: auto;
}
.version {
  position: fixed;
  bottom: 20rpx;
  display: block;
  width: 100%;
  text-align: center;
  font-size: 28rpx;
  color: #666;
}
</style>
