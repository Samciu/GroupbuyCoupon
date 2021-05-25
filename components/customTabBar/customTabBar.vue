<template>
  <view class="custom-tab-bar">
    <navigator
      class="item"
      :class="{ active: tab == 'index' }"
      open-type="switchTab"
      url="/pages/index/index"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/5e43605a-7b02-4b85-93db-5ab304b6862c.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/2d4f1b68-03e7-49dd-ab25-2c67d78bba8a.png"
      ></image>
      <text class="label">权益</text>
    </navigator>
    <navigator
      class="item"
      :class="{ active: tab == 'arrive' }"
      open-type="switchTab"
      url="/pages/arrive/arrive"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/49da8c27-e081-4dd6-b676-985ef5b0cce2.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/80d36a68-5812-4992-87a4-a59e6ba24f96.png"
      ></image>
      <text class="label">生活</text>
    </navigator>
    <navigator
      class="item"
      :class="{ active: tab == 'mall' }"
      open-type="switchTab"
      url="/pages/mall/mall"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/d6fec13a-0cc0-4b77-82c7-9fa822f8dd2f.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/0318c418-2025-44c3-b96a-255a9f3cc9ca.png"
      ></image>
      <text class="label">商城</text>
    </navigator>
    <navigator
      class="item"
      :class="{ active: tab == 'user' }"
      open-type="switchTab"
      url="/pages/user/user"
    >
      <image
        class="icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/e396d41f-d492-4276-8f6e-7bc1df7dcbcd.png"
      ></image>
      <image
        class="focus-icon"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/9d169bf8-5869-4e3b-b1a3-d2b05538b408.png"
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

  methods: {},
};
</script>

<style scoped lang="scss">
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
  flex: 1;
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
  padding: 10rpx 0 8rpx;
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

.custom-tab-bar .item {
  .label {
    padding-top: 8rpx;
    font-size: 20rpx;
    color: #999999;
    line-height: 28rpx;
  }

  &.active {
    .label {
      color: #EC5959;
    }
    
    .icon {
      display: none;
    }

    .focus-icon {
      display: block;
    }
  }
}
</style>