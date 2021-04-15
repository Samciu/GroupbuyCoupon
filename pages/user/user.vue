<template>
  <view class="container">
    <view class="header-top">
      <view class="head">
        <view class="avatarUrl">
          <open-data type="userAvatarUrl"></open-data>
        </view>
        <view class="detail">
          <view class="nickName">
            <open-data type="userNickName"></open-data>
            <view class="level">{{ level }}</view>
          </view>
          <view class="number">
            <view class="tag">粉丝: {{ baseInfo.team || 0 }}</view>
          </view>
        </view>
        <view class="head-upgrade" v-if="baseInfo.nextRole">
          <view>{{ baseInfo.nextRole.desc }}</view>
          <view class="btn">{{ baseInfo.nextRole.income }}</view>
        </view>
      </view>
      <view class="upgrade" v-if="baseInfo.partner">
        <view class="text">{{ baseInfo.partner.desc }}</view>
        <view class="btn">{{ baseInfo.partner.btn }} ></view>
      </view>
      <view class="price-detail">
        <view class="left">
          <view class="price">余额 ¥{{ income.balance || "0.00" }}</view>
          <view class="tip">累计收益 ¥{{ income.allIncome || "0.00" }}</view>
        </view>
        <view class="btn">立即提现</view>
      </view>
    </view>

    <view class="cash-back" @click="toOrderList">
      <view class="cash-back-item">
        <view class="price">¥{{ income.income.yesterday || "0.00" }}</view>
        <view class="text">昨日收益</view>
      </view>
      <view class="cash-back-item">
        <view class="price">¥{{ income.income.today || "0.00" }}</view>
        <view class="text">今日收益</view>
      </view>
      <view class="cash-back-item">
        <view class="price">¥{{ income.income.month || "0.00" }}</view>
        <view class="text">本月预估</view>
      </view>
    </view>

    <view class="cash-detal-btns">
      <view class="cash-detal-btn" @click="toIncome"
        ><view class="icon"></view>收益</view
      >
      <view class="cash-detal-btn" @click="toOrderList"
        ><view class="icon"></view>订单</view
      >
      <view class="cash-detal-btn"><view class="icon"></view>团队</view>
      <view class="cash-detal-btn"><view class="icon"></view>邀请</view>
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
    <login />
    <customTabBar tab="user"></customTabBar>
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapState({
      income: (state) => state.user.income,
      baseInfo: (state) => state.user.baseInfo,
      info: (state) => state.user.info,
      isLogin: (state) => state.isLogin,
    }),
    ...mapGetters(["level"]),
  },
  onLoad() {
    // this.init();
  },
  onShow() {
    console.log("user onShow");
    this.userInit();
  },
  methods: {
    ...mapActions(["userInit", "getLoginStatus"]),

    onShareAppMessage(res) {
      return {
        title: "震惊！小明天天出来玩，竟然只花1分钱",
        path: "pages/arrive/arrive",
        imageUrl:
          "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/1fa7c836-b3cc-44ba-84b0-6e6e9188244b.jpg",
      };
    },

    toOrderList() {
      if (!this.isLogin) {
        return this.getLoginStatus();
      }
      uni.navigateTo({
        url: "/pages/orderList/orderList",
      });
    },

    toIncome() {
      if (!this.isLogin) {
        return this.getLoginStatus();
      }
      uni.navigateTo({
        url: "/pages/income/income",
      });
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
.header-top {
  background: #f5405e;

  .head {
    position: relative;
    text-align: center;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    padding: 0 20px;

    .avatarUrl {
      width: 100rpx;
      height: 100rpx;
      display: block;
      border-radius: 50%;
      overflow: hidden;
    }
    .detail {
      flex: 1;
      padding-left: 20rpx;
      color: #fff;
    }
    .head-upgrade {
      font-size: 30rpx;
      color: #fff;

      .btn {
        margin-top: 4rpx;
        padding: 4rpx 10rpx;
        font-size: 26rpx;
        background: #ead777;
        color: #333;
        border-radius: 10rpx;
      }
    }
    .nickName {
      display: flex;
      font-size: 30rpx;
      width: 100%;
      text-align: left;

      .level {
        padding-left: 10rpx;
      }
    }
    .number {
      display: flex;
      padding-top: 18rpx;
      font-size: 26rpx;
    }
    .tag {
      padding-right: 10rpx;
    }
  }
  .upgrade {
    display: flex;
    background: #ead777;
    margin: 30rpx 34rpx;
    font-size: 26rpx;
    padding: 14rpx 24rpx;
    justify-content: space-between;
    align-items: center;
    border-radius: 30rpx;

    .text {
      color: #333;
    }
    .btn {
      font-size: 24rpx;
      color: #b9360de8;
    }
  }
  .price-detail {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 30rpx;
    padding: 20rpx;
    border-radius: 30rpx 30rpx 0 0;
    background: #1d0e0e;
    color: #fff;

    .tip {
      padding-top: 4rpx;
      font-size: 24rpx;
    }

    .btn {
      padding: 12rpx 14rpx;
      font-size: 24rpx;
      background: #ead777;
      color: #333;
      border-radius: 14rpx;
    }
  }
}

.cash-back {
  margin: 16rpx 30rpx;
  padding: 12rpx;
  display: flex;
  background: #fff;
  justify-content: space-around;

  &-item {
    text-align: center;

    .price {
      font-size: 36rpx;
    }
    .text {
      padding-top: 8rpx;
      font-size: 24rpx;
      color: #666;
    }
    .tip {
      padding-top: 12rpx;
      font-size: 24rpx;
      color: #666;
    }
  }
}

.cash-detal-btns {
  margin: 16rpx 30rpx;
  padding: 26rpx 12rpx;
  display: flex;
  background: #fff;
  justify-content: space-around;

  .cash-detal-btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 26rpx;
  }
  .icon {
    margin-bottom: 10rpx;
    width: 40rpx;
    height: 40rpx;
    background: #999;
  }
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
