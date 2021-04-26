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
            <view class="level" v-if="level"
              ><view class="level-icon" /><text>{{ level }}</text></view
            >
          </view>
          <view class="number">
            <view class="tag">粉丝: {{ baseInfo.team || 0 }}</view>
          </view>
        </view>
        <view class="head-upgrade" v-if="baseInfo.nextRole">
          <view class="head-upgrade-icon" />
          <view>
            <view class="title">{{ baseInfo.nextRole.desc }}</view>
            <view class="btn">{{ baseInfo.nextRole.income }}</view>
          </view>
        </view>
      </view>
      <view class="upgrade" v-if="baseInfo.partner">
        <view class="text">
          <image
            class="pic"
            src="/static/user/huangguan.png"
            mode="aspectFit"
          />
          {{ baseInfo.partner.desc }}
        </view>
        <view class="btn"
          >{{ baseInfo.partner.btn }}
          <uni-icons type="arrowright" size="12" color="#EC5959"></uni-icons
        ></view>
      </view>
      <view class="price-detail">
        <view class="left">
          <view class="price">余额 ¥{{ income.balance || "0.00" }}</view>
          <view class="tip">累计收益 ¥{{ income.allIncome || "0.00" }}</view>
        </view>
        <view class="btn" @click="handlePayToolShow">立即提现</view>
      </view>
    </view>

    <view class="circle">
      <view class="circle1"></view>
      <view class="circle2"></view>
    </view>
    <view class="cash-back" @click="jump('/pages/income/income')">
      <view class="cash-back-item">
        <view class="price"
          ><text class="rmb">¥</text
          >{{ income.income.yesterday || "0.00" }}</view
        >
        <view class="text">昨日收益</view>
      </view>
      <view class="line"></view>
      <view class="cash-back-item">
        <view class="price"
          ><text class="rmb">¥</text>{{ income.income.today || "0.00" }}</view
        >
        <view class="text">今日收益</view>
      </view>
      <view class="line"></view>
      <view class="cash-back-item">
        <view class="price"
          ><text class="rmb">¥</text>{{ income.income.month || "0.00" }}</view
        >
        <view class="text">本月预估</view>
      </view>
    </view>

    <view class="cash-detal-btns">
      <view class="cash-detal-btn" @click="jump('/pages/income/income')">
        <image class="icon" src="/static/user/financing.png"></image>收益</view
      >
      <view class="cash-detal-btn" @click="jump('/pages/orderList/orderList')">
        <image class="icon" src="/static/user/order.png"></image>订单</view
      >
      <view class="cash-detal-btn" @click="jump('/pages/team/team')">
        <image class="icon" src="/static/user/person.png"></image>团队</view
      >
      <view class="cash-detal-btn" @click="jump('/pages/invite/invite')">
        <image class="icon" src="/static/user/gift.png"></image>邀请</view
      >
    </view>

    <div class="others-wrap">
      <view class="title">我的服务</view>
      <view class="others">
        <view class="item">
          <image class="icon" src="/static/user/share.png"></image>
          <button class="content share" open-type="share">
            <view>分享好友</view>
          </button>
        </view>
        <view class="item" bindtap="sponsor">
          <image class="icon" src="/static/user/user.png"></image>
          <button class="content share" open-type="contact">
            <view>官方公众号</view>
          </button>
        </view>
        <view class="item">
          <image class="icon" src="/static/user/notes.png"></image>
          <button class="content share" open-type="contact">
            <view>我有建议</view>
          </button>
        </view>
        <view class="item">
          <image class="icon" src="/static/user/about.png"></image>
          <button class="content share" open-type="contact">
            <view>关于</view>
          </button>
        </view>
      </view>
    </div>

    <view class="version"> v1.0 </view>
    <login />
    <customTabBar tab="user"></customTabBar>
  </view>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import getShareMessage from "@/utils/getShareMessage";

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
    this.userInit();
  },
  onShow() {
    console.log("user onShow");
    this.userInit();
  },
  methods: {
    ...mapActions(["userInit", "getLoginStatus", "fetchPayToolUserLogin"]),

    onShareAppMessage(res) {
      return getShareMessage();
    },

    jump(url) {
      if (!this.isLogin) {
        return this.getLoginStatus();
      }
      uni.navigateTo({
        url,
      });
    },

    handlePayToolShow() {
      uni.navigateTo({
        url: "/pages/withdraw/withdraw",
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #fff;
}
.container {
  padding-bottom: 110rpx;
}
.header-top {
  background: #ec5959;
  padding: 16rpx 32rpx 0;

  .head {
    position: relative;
    text-align: center;
    flex-wrap: wrap;
    display: flex;
    align-items: center;

    .avatarUrl {
      width: 112rpx;
      height: 112rpx;
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
      display: flex;
      padding: 10rpx 18rpx;
      font-size: 26rpx;
      color: #fff;
      background: #333333;
      border-radius: 32rpx;
      line-height: 1;

      &-icon {
        display: block;
        margin-right: 8rpx;
        width: 28rpx;
        height: 28rpx;
        background: url("/static/user/upgrade.png") no-repeat center/contain;
      }

      .btn {
        padding-top: 10rpx;
        font-size: 22rpx;
      }
    }
    .nickName {
      display: flex;
      align-items: center;
      font-size: 32rpx;
      line-height: 42rpx;
      font-weight: 700;
      width: 100%;
      text-align: left;

      .level {
        display: flex;
        align-items: center;
        margin-left: 16rpx;
        padding: 4rpx 14rpx;
        height: 32rpx;
        background: #614120;
        font-size: 26rpx;
        border-radius: 18rpx;
        color: #fce272;

        &-icon {
          width: 26rpx;
          height: 26rpx;
          margin-right: 4rpx;
          background: url("/static/user/level.png") no-repeat center/contain;
        }
        text {
          line-height: 1;
        }
      }
    }
    .number {
      display: flex;
      padding-top: 12rpx;
      font-size: 28rpx;
      line-height: 36rpx;
    }
    .tag {
      padding-right: 10rpx;
    }
  }
  .upgrade {
    display: flex;
    background: #f6dea3;
    box-shadow: 0 0 12rpx 2rpx rgba(0, 0, 0, 0.1);
    border-radius: 40rpx;
    margin-top: 32rpx;
    font-size: 28rpx;
    padding: 14rpx 24rpx;
    justify-content: space-between;
    align-items: center;

    .text {
      display: flex;
      align-items: center;
      color: #333;

      .pic {
        margin-right: 12rpx;
        width: 48rpx;
        height: 48rpx;
      }
    }
    .btn {
      display: flex;
      align-items: center;
      color: #ec5959;
    }
  }
  .price-detail {
    position: relative;
    margin-top: 32rpx;
    padding: 36rpx 44rpx 88rpx;
    background: #333333;
    // box-shadow: 0 0 16rpx 4rpx rgba(0, 0, 0, 0.1);
    border-radius: 20rpx 20rpx 0 0;

    .left {
      display: flex;
      justify-content: space-between;
      color: #fff;
      font-size: 28rpx;
    }

    .tip {
      color: #f6dea3;
    }

    .btn {
      position: absolute;
      z-index: 2;
      left: 50%;
      bottom: -8rpx;
      transform: translateX(-50%);
      padding: 14rpx 32rpx;
      width: fit-content;
      background: linear-gradient(
        180deg,
        #f6dea3 0%,
        #fbf1d0 50%,
        #f6dea3 100%
      );
      box-shadow: 0 2rpx 12rpx 0 rgba(0, 0, 0, 0.15);
      border-radius: 32rpx;
      font-size: 24rpx;
    }
  }
}

.circle {
  position: relative;
  z-index: 1;
  display: flex;
  margin-top: -100rpx;

  .circle1 {
    height: 100rpx;
    width: 50%;
    background: radial-gradient(
      900rpx 160rpx at right top,
      transparent 50%,
      #fff 50%
    );
  }
  .circle2 {
    height: 100rpx;
    width: 50%;
    background: radial-gradient(
      900rpx 160rpx at left top,
      transparent 50%,
      #fff 50%
    );
  }
}

.cash-back {
  margin: 20rpx 32rpx;
  margin-top: 32rpx;
  padding: 32rpx 32rpx 36rpx;
  display: flex;
  background: #fff;
  justify-content: space-around;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  &-item {
    text-align: center;

    .price {
      display: flex;
      align-items: center;
      font-size: 36rpx;
      font-weight: 700;

      .rmb {
        margin-right: 8rpx;
        font-size: 24rpx;
      }
    }
    .text {
      padding-top: 12rpx;
      font-size: 26rpx;
      color: #999;
    }
    .tip {
      padding-top: 12rpx;
      font-size: 24rpx;
      color: #666;
    }
  }

  .line {
    height: 96rpx;
    width: 1rpx;
    background: #e5e5e5;
  }
}

.cash-detal-btns {
  margin: 20rpx 32rpx;
  padding: 0 12rpx;
  display: flex;
  background: #fff;
  justify-content: space-around;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  .cash-detal-btn {
    padding: 34rpx 0 32rpx;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;
  }
  .icon {
    margin-bottom: 12rpx;
    width: 48rpx;
    height: 48rpx;
  }
}

.others-wrap {
  background: #fff;
  margin: 20rpx 32rpx;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  .title {
    border-bottom: 1rpx solid #e5e5e5;
    padding: 18rpx 32rpx 20rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #000000;
    line-height: 42rpx;
  }
}
.others {
  display: flex;
  // justify-content: space-around;
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 32rpx 0;
    width: 228rpx;

    .icon {
      width: 48rpx;
      height: 48rpx;
    }
    .content {
      padding-top: 12rpx;
      display: flex;
      align-items: center;
      font-size: 28rpx;
      color: #666666;
      line-height: 40rpx;
    }
  }
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
