<template>
  <view class="main">
    <view class="banner-box">
      <uni-nav-bar
        left-icon="back"
        status-bar="true"
        :border="false"
        :fixed="true"
        title="会员充值"
        backgroundColor="transparent"
        color="#ffffff"
        @clickLeft="back"
      ></uni-nav-bar>
      <view class="banner">
        <image
          mode="aspectFill"
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/39df0d64-8aac-4332-8f3e-9dd3ba631c52.png"
        />
      </view>
    </view>
    <view class="product-box">
      <view class="product-header">
        <image
          mode="aspectFill"
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/b8d3095d-e275-4c90-8046-c6d7ebf02ef9.png"
        />
        <view class="name">腾讯视频VIP充值</view>
      </view>
      <view class="product-form">
        <view class="module account">
          <view class="title">充值账号</view>
          <input placeholder="请输入您的QQ号" />
        </view>
        <view class="module type">
          <view class="title">充值类型</view>
          <view class="type-list">
            <view class="item active">腾讯视频VIP</view>
            <view class="item">超级影视VIP</view>
            <view class="item">NBA会员</view>
          </view>
        </view>
        <view class="module spec-box">
          <view class="title">选择规格</view>
          <view class="spec-list">
            <view class="item active">
              <view class="discount">67折</view>
              <view class="title">周卡</view>
              <view class="price"> <view class="rmb">¥</view>18 </view>
              <view class="offical-price">官方价 ¥12</view>
            </view>
            <view class="item">
              <view class="discount">67折</view>
              <view class="title">周卡</view>
              <view class="price"> <view class="rmb">¥</view>18 </view>
              <view class="offical-price">官方价 ¥12</view>
            </view>
            <view class="item">
              <view class="discount">67折</view>
              <view class="title">周卡</view>
              <view class="price"> <view class="rmb">¥</view>18 </view>
              <view class="offical-price">官方价 ¥12</view>
            </view>
            <view class="item">
              <view class="discount">67折</view>
              <view class="title">周卡</view>
              <view class="price"> <view class="rmb">¥</view>18 </view>
              <view class="offical-price">官方价 ¥12</view>
            </view>
          </view>
        </view>
        <view class="module notice-box">
          <view class="title">购买须知</view>
          <view class="desc">请输入QQ号进行充值</view>
        </view>
      </view>
      <view class="pay-btn"> ￥8 立即充值 </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
page {
  background: #f2f2f2;
}
.banner-box {
  position: relative;
  width: 100%;
  height: 320rpx;
}
.banner {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 320rpx;
  background: linear-gradient(135deg, #000000 0%, #666666 100%);

  image {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 256rpx;
    height: 222rpx;
  }
}
.product-box {
  position: relative;
  z-index: 1;
  margin-top: -124rpx;
  padding: 0 20rpx;
}
.product-header {
  display: flex;
  align-items: center;

  image {
    margin-right: 12rpx;
    width: 64rpx;
    height: 64rpx;
  }

  .name {
    font-size: 28rpx;
    color: #ffffff;
    line-height: 40rpx;
  }
}
.product-form {
  margin-top: 32rpx;
  padding: 32rpx;
  background: #ffffff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  .module {
    padding-bottom: 48rpx;

    &:last-of-type {
      padding-bottom: 0;
    }

    .title {
      font-size: 32rpx;
      font-weight: 700;
      color: #000000;
      line-height: 48rpx;
    }
  }
  .account {
    input {
      margin-top: 12rpx;
      padding: 20rpx 0;
      font-size: 40rpx;
      line-height: 60rpx;
      border-bottom: 2rpx solid #f2f2f2;
    }
  }

  .type {
    .type-list {
      display: flex;

      .item {
        margin-top: 32rpx;
        margin-right: 32rpx;
        padding: 12rpx 20rpx;
        border-radius: 8rpx;
        border: 2rpx solid #d8d8d8;
        font-size: 28rpx;
        color: #000000;
        line-height: 40rpx;
        white-space: nowrap;

        &.active {
          border-color: #dfb54f;
          background: #dfb54f;
          color: #fff;
        }
      }
    }
  }

  .spec-box {
    .spec-list {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-top: 4rpx;
    }
    .item {
      position: relative;
      width: 196rpx;
      height: 196rpx;
      margin-top: 28rpx;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 8rpx;
      border: 2rpx solid #dfb54f;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;

      &.active {
        background: rgba(223, 181, 79, 0.2);
      }

      .discount {
        position: absolute;
        top: 0;
        left: 0;
        padding: 2rpx 8rpx;
        background: #dfb54f;
        border-radius: 8rpx 0 8rpx 0;
        font-size: 20rpx;
        color: #ffffff;
        line-height: 28rpx;
      }

      .title {
        padding-top: 14rpx;
        font-size: 28rpx;
        color: #000000;
        line-height: 40rpx;
      }

      .price {
        display: flex;
        font-size: 56rpx;
        font-weight: 700;
        color: #dfb54f;
        line-height: 84rpx;

        .rmb {
          margin-top: 36rpx;
          font-size: 28rpx;
          font-weight: 700;
          line-height: 32rpx;
        }
      }

      .offical-price {
        text-decoration: line-through;
        font-size: 28rpx;
        color: #999999;
        line-height: 44rpx;
      }
    }
  }

  .notice-box {
    .desc {
      margin-top: 18rpx;
      font-size: 28rpx;
      color: #666666;
      line-height: 44rpx;
    }
  }
}
.pay-btn {
  margin-top: 56rpx;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #dfb54f;
  border-radius: 40rpx;
  font-size: 30rpx;
  font-weight: 500;
  color: #ffffff;
}
</style>
