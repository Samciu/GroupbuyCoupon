<template>
  <view class="main">
    <view class="banner-box">
      <uni-nav-bar
        status-bar="true"
        :border="false"
        :fixed="true"
        title="商品详情"
        backgroundColor="transparent"
        color="#ffffff"
        @clickLeft="back"
      >
        <view class="left-icon" slot="left" />
      </uni-nav-bar>
      <image class="banner" mode="aspectFill" :src="goodsDetail.thumb" />
    </view>
    <view class="price-detail">
      <view class="title">{{ goodsDetail.name }}</view>
      <view class="desc">
        <view class="left">
          <view class="current-price">
            <text class="rmb">¥</text>{{ goodsDetail.price_str || "0.0" }}
          </view>
          <view class="offical-price">
            官方价¥{{ goodsDetail.origin_price_str || "0.0" }}
          </view>
        </view>
        <view class="right">
          <view class="icon" />{{ goodsDetail.sale_num || 99 }}人已购
        </view>
      </view>
      <view class="label">{{ goodsDetail.discountStr || "" }}</view>
    </view>
    <view class="product-desc">
      <view class="title">使用规则</view>
      <view class="content">
        <view
          class="text"
          v-for="(item, index) in goodsDetail.use_rules"
          :key="index"
          >{{ item }}</view
        >
      </view>
    </view>

    <view class="footer">
      <loginWrap className="footer-wrap">
        <view class="btn-list">
          <button class="btn service" open-type="contact">
            <image src="/static/commodity/service.png" mode="aspectFill" />
            客服
          </button>
          <!-- <view class="btn collect">
          <image src="/static/commodity/collect.png" mode="aspectFill" />
          收藏
        </view> -->
        </view>
        <view class="price">
          <text class="rmb">¥</text>{{ goodsDetail.price_str || "0.0" }}
        </view>
        <view class="btn-group">
          <button
            class="button button-share"
            open-type="share"
            v-if="goodsDetail.commission"
          >
            <view class="title">分享</view>
            <view class="tip">赚 ¥{{ goodsDetail.commission_str }}</view>
          </button>
          <view class="button buy" @click="jumpToCheckout">
            <view class="title">购买</view>
            <view class="tip"
              >省 ¥{{ goodsDetail.allDiscount_str || "0.00" }}</view
            >
          </view>
        </view>
      </loginWrap>
    </view>
  </view>
</template>

<script>
import { getGoodsDetail } from "@/request";

export default {
  data() {
    return {
      goodsDetail: {},
    };
  },
  onLoad: function (option) {
    const { gcode } = option;
    this.fetchGoodsDetail(gcode);
  },
  methods: {
    jumpToCheckout(item) {
      if (!this.goodsDetail.code) return
      uni.navigateTo({
        url: `/pages/product/checkout?gcode=${this.goodsDetail.code}`,
      });
    },
    async fetchGoodsDetail(gcode) {
      uni.showLoading({ title: "加载优惠中" });
      const [err, res] = await getGoodsDetail({ gcode });
      this.goodsDetail = res.result.data;
      console.log(res.result.data);
      uni.hideLoading()
    },
    back() {
      const pages = getCurrentPages()
      if (pages.length > 1) {
        uni.navigateBack({
          delta: 1,
        });
      } else {
        uni.switchTab({
          url: '/pages/index/index',
        });
      }
    },
    onShareAppMessage() {
      const userInfo = uni.getStorageSync("userInfo");
      const path = encodeURIComponent(
        `/pages/product/detail?gcode=${this.goodsDetail.code}`
      );
      console.log(`fromUid=${userInfo.id || ""}&path=${path}`);
      return {
        title: `${userInfo.nickName} 送你一个 ${this.goodsDetail.name} 特价购买资格`,
        path: `pages/index/index?fromUid=${userInfo.id || ""}&path=${path}`,
      };
    },
    onShareTimeline() {
      const userInfo = uni.getStorageSync("userInfo");
      const path = encodeURIComponent(
        `/pages/product/detail?gcode=${this.goodsDetail.code}`
      );
      console.log(`fromUid=${userInfo.id || ""}&path=${path}`);
      return {
        title: `${userInfo.nickName} 送你一个 ${this.goodsDetail.name} 特价购买资格`,
        path: `pages/index/index?fromUid=${userInfo.id || ""}&path=${path}`,
      };
    },
  },
};
</script>

<style lang="scss">
.banner-box {
  position: relative;
  width: 100%;
  height: 750rpx;

  .left-icon {
    margin-left: 20rpx;
    width: 64rpx;
    height: 64rpx;
    background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/9234b422-b7d1-4401-984c-21bd8712b421.png) no-repeat center/contain;
  }
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
  padding-top: 22rpx;
  padding-bottom: calc(22rpx + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 0 20rpx 0 rgba(0, 0, 0, 0.12),
    0 -2rpx 2rpx 0 rgba(0, 0, 0, 0.05);

  .footer-wrap {
    display: flex;
    align-items: center;
  }

  .btn-list {
    display: flex;
    padding-left: 16rpx;
    font-size: 22rpx;
    color: #999999;
    line-height: 32rpx;
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
    margin-right: 32rpx;
    flex: 1;
    display: flex;
    justify-content: flex-end;
    font-size: 40rpx;
    font-weight: 700;
    color: #ec5959;
    line-height: 60rpx;

    .rmb {
      margin-top: 4rpx;
      margin-right: 4rpx;
      font-size: 28rpx;
    }
  }
  .btn-group {
    display: flex;
    margin-right: 20rpx;
    border-radius: 48rpx;
    overflow: hidden;
  }
  .button {
    padding: 14rpx 42rpx;
    text-align: center;

    .title {
      font-size: 32rpx;
      line-height: 36rpx;
    }
    .tip {
      padding-top: 2rpx;
      font-size: 24rpx;
    }
  }
  .button-share {
    background: #f6dea3;
    color: #333;
  }
  .buy {
    background: linear-gradient(315deg, #f77c6d 0%, #fda26b 60%, #ffbd81 100%);
    color: #fff;
  }
}
</style>
