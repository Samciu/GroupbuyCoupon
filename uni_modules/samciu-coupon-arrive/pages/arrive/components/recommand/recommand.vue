<template>
  <view class="recommand" v-if="couponList.length > 0">
    <view class="recommand-content">
      <view
        :class="['recommand-content-item', coupon.platform]"
        v-for="(coupon, i) in couponList"
        :key="i"
        @click="toCoupon(coupon)"
      >
        <image
          :src="coupon.border"
          mode=""
          class="recommand-content-item-border"
          v-if="coupon.border"
        ></image>
        <image
          :src="coupon.icon"
          mode=""
          class="recommand-content-item-img"
        ></image>
        <view class="recommand-content-item-name">
          {{ coupon.name }}
        </view>
        <view class="recommand-content-item-desc">
          {{ coupon.description }}
        </view>
        <view class="recommand-content-item-tip">
          {{ coupon.tip }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCouponList } from "../../../../request";

export default {
  data() {
    return {
      couponList: [],
    };
  },
  mounted() {
    this.getCouponList();
  },
  methods: {
    async getCouponList() {
      const [err, res] = await getCouponList();
      this.couponList = res.data.data.list
    },
    toCoupon(item) {
      console.log(item)
      uni.navigateToMiniProgram({
        appId: item.package.minapp.appid,
        path: item.package.minapp.path,
      });
    }
  },
};
</script>

<style lang="scss">
.recommand {
  display: flex;
  padding: 30rpx 30rpx 46rpx;
  position: relative;
  z-index: 5;
  background: #fff;

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 16rpx;
    bottom: 0;
    left: 0;
    background: #f8f8f8;
  }
  &-content {
    display: flex;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      display: none;
      width: 0 !important;
      height: 0 !important;
      -webkit-appearance: none;
      background: transparent;
    }
    &-item {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      flex-shrink: 0;
      width: 200rpx;
      padding: 20rpx 0;
      margin-right: 20rpx;
      border-radius: 8px;
      position: relative;
      line-height: 1;
      &.ele {
        background-color: #e2f2ff;
      }
      &.meituan {
        background-color: #fff2d2;
      }
      &-border {
        position: absolute;
        top: 0;
        right: 0;
        width: 60rpx;
        height: 60rpx;
      }
      &-img {
        width: 100rpx;
        height: 100rpx;
        border-radius: 100%;
      }
      &-name {
        width: 100%;
        margin-top: 16rpx;
        text-align: center;
        font-size: 28rpx;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      &-desc {
        margin: 16rpx 0;
        color: #e52b2b;
        font-weight: 700;
      }
      &-tip {
        font-size: 26rpx;
        color: #8e8e8e;
      }
    }
  }
}
</style>
