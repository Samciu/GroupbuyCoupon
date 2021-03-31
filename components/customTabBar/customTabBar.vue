<template>
  <view class="custom-tab-bar">
     <navigator
      class="item"
      :class="{active: tab == 'takeout'}"
      open-type="switchTab"
      url="/pages/takeout/takeout"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/f8eca960-f22d-4b74-995c-85a9cd19c6b0.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/e09a27a3-8d50-4ea7-8903-4939681fcf8a.png"
      ></image>
      <text class="label">点外卖</text>
    </navigator>
    <navigator
      class="item"
      :class="{active: tab == 'arrive'}"
      open-type="switchTab"
      url="/pages/arrive/arrive"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/5676c92d-62d5-4565-850b-c6b9990c1364.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/b0c61e2e-1637-4cfb-a3bc-5421cca1d6a7.png"
      ></image>
      <text class="label">到店吃</text>
    </navigator>
    <navigator
      class="item"
      :class="{active: tab == 'user'}"
      open-type="switchTab"
      url="/pages/user/user"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/7fba17f2-ba9c-4bd5-a955-02718a1af3c2.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/bffac7d9-f289-4a2a-8349-4d5d055ac2ec.png"
      ></image>
      <text class="label">我的</text>
    </navigator>
  </view>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: ["tab"],

  methods: {
    
  },
};
</script>

<style scoped>
.custom-tab-bar,
.custom-tab-bar .item {
  display: flex;
  box-sizing: border-box;
}

.custom-tab-bar {
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: #fff;
  z-index: 1000;
}

.custom-tab-bar .item {
  height: 100rpx;
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding: 8rpx 0;
  border-top: 1rpx solid #eee;
}

.custom-tab-bar .item .icon {
  width: 50rpx;
  height: 50rpx;
  display: block;
}

.custom-tab-bar .item .focus-icon {
  width: 50rpx;
  height: 50rpx;
  display: none;
}

.custom-tab-bar .item .label {
  font-size: 20rpx;
}

.custom-tab-bar .item.active .icon {
  display: none;
}

.custom-tab-bar .item.active .focus-icon {
  display: block;
}
</style>