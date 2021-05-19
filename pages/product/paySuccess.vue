<template>
  <view class="container">
    <image
      class="logo"
      src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/a2b38fad-7c64-464b-a94d-355fc59536d0.png"
    />
    <view class="title">支付成功</view>
    <view class="button" @click="jump">完成</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    jump() {
      uni.navigateTo({
        url: "/pages/product/orderList",
      });
    },
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.logo {
  width: 150rpx;
  height: 150rpx;
}
.title {
  padding-top: 32rpx;
  font-size: 36rpx;
}
.button {
  border-radius: 48rpx;
  margin-top: 150rpx;
  text-align: center;
  width: 600rpx;
  padding: 24rpx 0;
  font-size: 36rpx;
  color: #fff;
  background: linear-gradient(180deg, #ec5959 0%, #f56f4f 49%, #ff8743 100%);
}
</style>
