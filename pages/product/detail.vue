<template>
  <view class="main">
    <view class="banner-box">
      <uni-nav-bar
        left-icon="back"
        status-bar="true"
        :border="false"
        :fixed="true"
        title="商品详情"
        backgroundColor="transparent"
        color="#ffffff"
        @clickLeft="back"
      ></uni-nav-bar>
      <image class="banner" mode="aspectFill" :src="goodsDetail.thumb" />
    </view>
    <view class="price-detail">
      <view class="title">{{goodsDetail.name}}</view>
      <view class="desc">
        <view class="left">
          <view class="current-price"> <view class="rmb">¥</view>{{goodsDetail.price_str || '0.0'}} </view>
          <view class="offical-price"> 官方价¥{{goodsDetail.origin_price_str || '0.0'}} </view>
        </view>
        <view class="right"> <view class="icon" />{{goodsDetail.sale_num || 99}}人已购 </view>
      </view>
      <view class="label">{{goodsDetail.discountStr || ""}}</view>
    </view>
    <view class="product-desc">
      <view class="title">使用规则</view>
      <view class="content">
        <view class="text" v-for="item,index in goodsDetail.use_rules" :key="index">{{item}}</view>
      </view>
    </view>
    <view class="footer">
      <view class="btn-list">
        <view class="btn service">
          <image src="/static/commodity/service.png" mode="aspectFill" />
          客服
        </view>
        <view class="btn collect">
          <image src="/static/commodity/collect.png" mode="aspectFill" />
          收藏
        </view>
      </view>
      <view class="price"> <view class="rmb">¥</view>{{goodsDetail.price_str || "0.0"}} </view>
      <view class="buy" @click="jumpToCheckout">立即购买</view>
    </view>
  </view>
</template>

<script>
import { getGoodsDetail } from "@/request";

export default {
  data() {
    return {
      goodsDetail: {}
    };
  },
  onLoad: function (option) {
    const { gcode } = option;
    this.fetchGoodsDetail(gcode);
  },
  methods: {
    jumpToCheckout(item) {
      uni.navigateTo({
        url: `/pages/product/checkout?gcode=${this.goodsDetail.code}`,
      });
    },
    async fetchGoodsDetail(gcode) {
      const [err, res] = await getGoodsDetail({ gcode });
      this.goodsDetail = res.data.data;
      console.log(res.data.data)
    },
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>

<style lang="scss">
.banner-box {
  position: relative;
  width: 100%;
  height: 750rpx;
}
.banner {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 750rpx;
}

.price-detail {
  position: relative;
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: -128rpx;
  padding: 32rpx;
  width: 710rpx;
  background: #ffffff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  .title {
    font-size: 32rpx;
    font-weight: 700;
    color: #000000;
    line-height: 48rpx;
  }

  .desc {
    display: flex;
    justify-content: space-between;
    padding-top: 18rpx;

    .left {
      display: flex;
    }
    .right {
      display: flex;
      align-items: center;
      margin-top: 18rpx;
      font-size: 24rpx;
      color: #fa6400;
      line-height: 36rpx;

      .icon {
        width: 36rpx;
        height: 36rpx;
        background: url("/static/commodity/hot.png") no-repeat center/contain;
      }
    }
    .current-price {
      display: flex;
      color: #ec5959;
      font-size: 56rpx;
      font-weight: 700;
      line-height: 72rpx;
      padding-right: 20rpx;

      .rmb {
        margin-top: 18rpx;
        margin-right: 4rpx;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 48rpx;
      }
    }
    .offical-price {
      margin-top: 20rpx;
      font-size: 28rpx;
      font-weight: 500;
      color: #d8d8d8;
      line-height: 44rpx;
      text-decoration: line-through;
    }
  }

  .label {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 36rpx;
    padding-top: 24rpx;
    width: 64rpx;
    height: 84rpx;
    background: url("/static/commodity/label.png") no-repeat center/contain;
    font-size: 20rpx;
    font-weight: 700;
    color: #ffffff;
    line-height: 28rpx;
    text-align: center;
  }
}

.product-desc {
  box-sizing: border-box;
  margin: 32rpx auto;
  margin-bottom: 200rpx;
  padding: 32rpx;
  width: 710rpx;
  background: #ffffff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
  border-radius: 20rpx;

  .title {
    font-size: 32rpx;
    font-weight: 700;
    color: #000000;
    line-height: 48rpx;
  }
  .content {
    padding-top: 20rpx;
    font-size: 28rpx;
    color: #999999;
    line-height: 44rpx;
  }
}

.footer {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding-top: 22rpx;
  padding-bottom: calc(22rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.12),
    0 -2rpx 2rpx 0 rgba(0, 0, 0, 0.05);

  .btn-list {
    display: flex;
    padding-left: 16rpx;
    font-size: 16rpx;
    color: #999999;
    line-height: 28rpx;
  }
  .btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 24rpx;

    image {
      margin-bottom: 4rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }
  .price {
    margin-right: 20rpx;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 40rpx;
    font-weight: 700;
    color: #ec5959;
    line-height: 60rpx;

    .rmb {
      font-size: 28rpx;
    }
  }
  .buy {
    margin-right: 20rpx;
    padding: 14rpx 80rpx;
    background: linear-gradient(315deg, #f77c6d 0%, #fda26b 60%, #ffbd81 100%);
    border-radius: 32rpx;
    color: #fff;
    font-size: 24rpx;
    font-weight: 700;
    line-height: 36rpx;
  }
}
</style>
