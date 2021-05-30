<template>
  <view class="coupon-top coupon-top-loading">
    <view class="coupon-top-item" v-for="item,index in list" :key="index">
      <view class="pic" :src="item.logo" />
      <view class="text"></view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: Array(10),
    };
  },
};
</script>

<style lang="scss">
.coupon-top-loading {
  .coupon-top-item {
    .pic {
      background: #f9f6f2;
    }
    .text {
      background: #f9f6f2;
      width: 94rpx;
      height: 24rpx;
    }
  }
}
</style>
