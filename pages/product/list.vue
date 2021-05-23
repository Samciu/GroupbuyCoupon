<template>
  <view class="list">
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
      <image class="banner" mode="aspectFill" :src="productDetail.cover_url" />
    </view>
    <view class="product-detail">
      <view class="head">
        <view class="logo-wrap">
          <image class="logo" :src="productDetail.logo" />
        </view>
        <view>
          <view class="title">{{ productDetail.name }}</view>
          <view class="slogan">{{ productDetail.slogan }}</view>
        </view>
      </view>
      <view
        class="content"
        :style="{ backgroundColor: productDetail.bg_color }"
      >
        <!-- <view class="title">{{productDetail.slogan}}</view> -->
        <view class="desc">{{ productDetail.describe }}</view>
      </view>
    </view>
    <view class="product-list-wrap">
      <view class="product-list-title">权益推荐</view>
      <view class="product-list">
        <view
          class="item"
          @click="jumpToDetail(item)"
          v-for="(item, index) in productDetail.goodsList"
          :key="index"
        >
          <view class="pic">
            <image mode="aspectFill" :src="item.thumb" />
            <view class="tip">{{ item.sale_num }}人已购</view>
          </view>
          <view class="content">
            <view class="title">{{ item.name }}</view>
            <view class="origin-price"
              >官方价 ¥{{ item.origin_price_str }}</view
            >
            <view class="bottom">
              <view class="current-price">
                <text class="rmb">¥</text>{{ item.price_str }}
              </view>
              <view class="tip-wrap">
                <view class="tip">{{ item.discountStr }}</view>
              </view>
              <view class="btn">{{
                item.commission ? `赚 ¥${item.commission_str}` : "立即购买"
              }}</view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getProductDetail } from "@/request";

export default {
  data() {
    return {
      productDetail: {},
    };
  },
  onLoad: function (option) {
    const { pcode } = option;
    this.fetchProductDetail(pcode);
  },
  methods: {
    jumpToDetail(item) {
      const { code } = item;
      uni.navigateTo({
        url: `/pages/product/detail?gcode=${code}`,
      });
    },

    back() {
      uni.navigateBack({
        delta: 1,
      });
    },

    async fetchProductDetail(pcode) {
      const [err, res] = await getProductDetail({ pcode });
      this.productDetail = res.data.data;
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f2f2f2;
}
.banner-box {
  position: relative;
  width: 100%;
  height: 576rpx;
}
.banner {
  position: absolute;
  top: 0;
  left: 0;
  display: block;
  width: 100%;
  height: 500rpx;
}
.product-detail {
  position: relative;
  margin: 0 auto;
  margin-top: -230rpx;
  width: 710rpx;
  color: #ffffff;

  .head {
    display: flex;
    position: absolute;
    top: -72rpx;
    left: 32rpx;

    .logo-wrap {
      border-radius: 50%;
      width: 144rpx;
      height: 144rpx;
      padding: 8rpx;
      background: #ffffff;
      overflow: hidden;
    }

    .logo {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }

    .title {
      padding-left: 32rpx;
      font-size: 48rpx;
      font-weight: 700;
      line-height: 72rpx;
    }
    .slogan {
      padding-top: 16rpx;
      padding-left: 32rpx;
      font-size: 32rpx;
      font-weight: 700;
      line-height: 44rpx;
    }
  }

  .content {
    padding: 100rpx 32rpx 32rpx;
    box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.1);
    border-radius: 20rpx;

    .title {
      font-size: 32rpx;
      font-weight: 700;
      line-height: 44rpx;
    }

    .desc {
      padding-top: 8rpx;
      font-size: 28rpx;
      line-height: 40rpx;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}

.product-list-wrap {
  padding: 32rpx 20rpx;

  .product-list-title {
    padding-left: 12rpx;
    font-size: 32rpx;
    font-weight: 700;
    color: #000000;
    line-height: 48rpx;
  }
}
.product-list {
  padding-top: 20rpx;

  .item {
    margin-bottom: 20rpx;
    padding: 32rpx;
    background: #ffffff;
    border-radius: 20rpx;
    display: flex;
    align-items: center;

    .pic {
      position: relative;
      width: 160rpx;
      height: 160rpx;

      image {
        width: 100%;
        height: 100%;
        border-radius: 8rpx;
      }

      .tip {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.65);
        font-size: 24rpx;
        color: #ffffff;
        line-height: 36rpx;
        display: flex;
        align-items: center;

        &::before {
          content: "";
          display: block;
          width: 36rpx;
          height: 36rpx;
          background: url("/static/product/hot-white.png") no-repeat
            center/contain;
        }
      }
    }

    .content {
      flex: 1;
      padding-left: 20rpx;

      .title {
        font-size: 28rpx;
        font-weight: 700;
        color: #000000;
        line-height: 44rpx;
      }

      .origin-price {
        padding-top: 14rpx;
        font-size: 24rpx;
        font-weight: 500;
        color: #d8d8d8;
        line-height: 44rpx;
      }

      .bottom {
        display: flex;
        align-items: center;

        .current-price {
          font-size: 44rpx;
          font-weight: 700;
          color: #ec5959;
          line-height: 56rpx;

          .rmb {
            padding-right: 4rpx;
            font-size: 28rpx;
            font-weight: 500;
            line-height: 48rpx;
          }
        }

        .tip-wrap {
          flex: 1;
        }
        .tip {
          position: relative;
          margin-left: 20rpx;
          padding: 0 6rpx;
          padding-left: 20rpx;
          background: rgba(236, 89, 89, 0.2);
          font-size: 20rpx;
          color: #ec5959;
          height: 30rpx;
          line-height: 30rpx;
          width: fit-content;
          border-radius: 0 6rpx 6rpx 0;

          &::before {
            position: absolute;
            top: 0;
            left: -10rpx;
            content: "";
            display: block;
            border-right: 10rpx solid rgba(236, 89, 89, 0.2);
            border-top: 15rpx solid transparent;
            border-bottom: 15rpx solid transparent;
          }

          &::after {
            position: absolute;
            top: 11rpx;
            left: 0rpx;
            content: "";
            display: block;
            border-radius: 50%;
            width: 8rpx;
            height: 8rpx;
            background: #ffffff;
          }
        }

        .btn {
          padding: 6rpx 24rpx;
          font-size: 24rpx;
          font-weight: bold;
          color: #ffffff;
          line-height: 36rpx;
          background: linear-gradient(
            315deg,
            #f77c6d 0%,
            #fda26b 60%,
            #ffbd81 100%
          );
          border-radius: 32rpx;
        }
      }
    }
  }
}
</style>
