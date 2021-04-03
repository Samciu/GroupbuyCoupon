<template>
  <view class="mix-product-list row">
    <view
      class="list-item"
      @click="navTo(item)"
      v-for="item,index in list"
      :key="index"
    >
      <view class="image-wrapper">
        <image :src="item.dealBaseInfo.defaultPic" mode="aspectFill"></image>
      </view>
      <view class="right column b-b">
        <text class="title clamp">{{ item.shopInfo.shopName }}</text>
        <view class="desc">
          <view class="score">
            <uni-rate
              :readonly="true"
              :value="item.shopInfo.shopPower / 10"
              size="16"
              active-color="#e62828"
            />
            <view class="star">{{ item.shopInfo.shopPower / 10 }}分</view>
          </view>
          <!-- <view class="price">单笔补 2.64-8.8</view> -->
        </view>
        <view class="address">
          <view class="address-desc">
            <text>{{ item.shopInfo.cateName }}</text>
            <text>{{ item.shopInfo.regionName }}</text>
          </view>
          <text class="distance">{{ item.shopInfo.distanceToShow }}</text>
        </view>
        <view class="coupons">
          <view class="coupon">
            <view class="icon">惠</view>
            <text>{{ item.dealBaseInfo.dealTitle }}</text>
          </view>
        </view>
        <view class="coupons-more">
          <view class="info">已抢 {{ item.dealDetail.halfYearSale }} 张</view>
          <view class="coupon-btn"
            >领券省{{ item.dealBaseInfo.maxDiscount }}元</view
          >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    baseUrl: {
      type: String,
      default: "",
    },
  },

  methods: {
    navTo(item) {
      if (this.baseUrl) {
        const { shopId } = item.shopInfo;
        uni.navigateTo({
          url: `${this.baseUrl}?shopId=${shopId}`,
        });
      } else {
        uni.navigateToMiniProgram({
          appId: item.couponInfo.package.minapp.appid,
          path: item.couponInfo.package.minapp.path,
        });
      }
    },
  },
};
</script>

<style lang="scss">
.b-b {
  position: relative;

  &::after {
    position: absolute;
    z-index: 3;
    left: 0;
    top: auto;
    bottom: 0;
    right: 0;
    height: 0;
    content: "";
    transform: scaleY(0.5);
    border-bottom: 1px solid #e0e0e0;
  }
}
.column {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
}
.center {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  justify-content: center;
}
.fill {
  flex: 1;
}

.mix-product-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #f7f7f7;

  &.is-row {
    margin-top: -4rpx;
    border-radius: 8rpx;
    box-shadow: 4rpx 4rpx 20rpx rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }
}
/* 横向列表 */
.list-item {
  display: flex;
  width: 100%;
  padding: 24rpx;
  padding-bottom: 0;
  background-color: #fff;
  font-size: 26rpx;
  color: #666;

  &:after {
    border-color: #eaeaea;
    left: 6rpx;
    right: 6rpx;
  }
  &:last-child:after {
    border: 0;
  }
  .image-wrapper {
    flex-shrink: 0;
    width: 220rpx;
    height: 165rpx;
    margin-right: 30rpx;
    border-radius: 6rpx;
    overflow: hidden;

    image {
      width: 100%;
      height: 100%;
    }
  }
  .right {
    flex: 1;
    overflow: hidden;
    padding-bottom: 24rpx;
  }
  .title {
    margin-right: 24rpx;
    font-size: 30rpx;
    color: #333;
    line-height: 40rpx;
    font-weight: 500;
  }
  .desc {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;

    .score {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .star {
      padding-left: 4rpx;
      color: #e62828;
    }
    .price {
      font-size: 20rpx;
      padding: 4rpx 8rpx;
      color: #ff9500;
      border: 1px solid #ff9500;
    }
  }

  .address {
    display: flex;
    justify-content: space-between;
    padding-top: 10rpx;

    text {
      padding-right: 14rpx;
      color: #999;
    }
  }
  .coupons {
    padding-top: 10rpx;

    .coupon {
      display: flex;
      align-items: flex-start;

      .icon {
        display: block;
        margin-right: 6rpx;
        background: #e62828;
        color: #fff;
        padding: 6rpx;
        font-size: 22rpx;
        line-height: 1;
        border-radius: 8rpx;
      }
    }
  }
  .coupons-more {
    padding-top: 12rpx;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .info {
      display: block;
      margin-right: 16rpx;
      background: #fee;
      color: #e62828;
      padding: 6rpx 14rpx;
      border-radius: 26rpx;
      font-size: 24rpx;
      height: 34rpx;
    }

    .coupon-btn {
      background: #ff536f;
      color: #fff;
      padding: 6rpx 26rpx;
      border-radius: 26rpx;
      font-size: 30rpx;
    }
  }
}
</style>
