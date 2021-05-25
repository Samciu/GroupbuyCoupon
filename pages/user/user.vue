<template>
  <view class="container">
    <loginWrap>
      <view class="header-top">
        <view class="head">
          <view class="avatarUrl">
            <open-data type="userAvatarUrl"></open-data>
          </view>
          <view class="nickName">
            <open-data type="userNickName"></open-data>
          </view>
        </view>
      </view>

      <view class="order-box">
        <view class="title">我的订单</view>
        <view class="order-box-content">
          <view
            class="cash-detal-btn"
            @click="jump('/pages/product/orderList?status=1')"
          >
            <image
              class="icon"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/eaa0050b-4518-48f0-a2b6-ac894cdede6f.png"
            ></image
            >待付款</view
          >
          <view
            class="cash-detal-btn"
            @click="jump('/pages/product/orderList?status=3')"
          >
            <image
              class="icon"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/d20b6827-99c4-4ff5-9c65-158606f6898c.png"
            ></image
            >已完成</view
          >
          <view
            class="cash-detal-btn"
            @click="jump('/pages/product/orderList?status=2')"
          >
            <image
              class="icon"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/fc1ade0a-85aa-46d9-8040-b3d0984e457a.png"
            ></image
            >待发货</view
          >
          <view
            class="cash-detal-btn all"
            @click="jump('/pages/product/orderList?status=0')"
          >
            <image
              class="icon"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/fb21f8ef-7864-4f1f-9bb9-5a50e6a98dc4.png"
            ></image
            >全部订单</view
          >
        </view>
      </view>

      <div class="others-wrap">
        <view class="title">我的服务</view>
        <view class="others">
          <button class="item" open-type="share">
            <image class="icon" src="/static/user/share.png"></image>
            <view class="content share">
              <view>分享好友</view>
            </view>
          </button>
          <view class="item" bindtap="sponsor">
            <image class="icon" src="/static/user/user.png"></image>
            <view class="content share">
              <view>官方公众号</view>
            </view>
          </view>
          <button class="item" open-type="contact">
            <image class="icon" src="/static/user/notes.png"></image>
            <view class="content share">
              <view>我有建议</view>
            </view>
          </button>
          <button class="item" open-type="contact">
            <image class="icon" src="/static/user/about.png"></image>
            <view class="content share">
              <view>关于</view>
            </view>
          </button>
        </view>
      </div>

      <view class="version"> v1.0 </view>
    </loginWrap>

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
  padding-bottom: 180rpx;
}
.header-top {
  background: #ec5959;
  padding: 32rpx 0;

  .head {
    position: relative;
    text-align: center;
    flex-wrap: wrap;
    display: flex;
    align-items: center;
    justify-content: center;

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
        width: 50rpx;
        height: 50rpx;
        background: url("/static/user/upgrade.png") no-repeat center/contain;
      }

      .btn {
        padding-top: 10rpx;
        font-size: 22rpx;
      }
    }
    .nickName {
      padding-top: 32rpx;
      font-size: 32rpx;
      line-height: 42rpx;
      font-weight: 700;
      width: 100%;
      text-align: center;
      color: #fff;
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
  display: flex;
  background: #fff;
  justify-content: space-around;
  box-shadow: 0 0 12rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  .cash-detal-btn {
    padding: 34rpx 0 32rpx;
    display: flex;
    flex: 1;
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

.order-box {
  margin: 20rpx 32rpx;
  background: #fff;
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

  .order-box-content {
    display: flex;
    justify-content: space-around;
    padding: 36rpx 0;
  }

  .cash-detal-btn {
    position: relative;
    display: flex;
    width: 25%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 28rpx;
    color: #666666;
    line-height: 40rpx;

    &.all {
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        display: block;
        width: 2rpx;
        height: 100%;
        background: #e5e5e5;
        box-shadow: -2rpx 0 4rpx 0rpx rgba(0, 0, 0, 0.04);
      }
    }
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
  flex-wrap: wrap;

  .item {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    padding: 32rpx 0;
    width: 33.33%;

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
