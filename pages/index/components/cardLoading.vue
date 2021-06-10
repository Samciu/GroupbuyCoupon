<template>
  <view class="coupon-card-list coupon-card-list-loading">
    <view
      class="item"
      v-for="(item, index) in list"
      :key="index"
      :style="{
        background: `url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-9cee0b6f-ef18-49a9-bb2f-e66723c5ceb5/fe4605af-4349-48b3-882a-e870b21d8074.png) no-repeat center/contain`,
      }"
    >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      list: Array(6),
    };
  },
};
</script>

<style lang="scss">
.coupon-card-list-loading {
  justify-content: space-between;

  .item{
    margin-bottom: 28rpx;
    width: 350rpx;
    height: 440rpx;
  }
}
</style>
