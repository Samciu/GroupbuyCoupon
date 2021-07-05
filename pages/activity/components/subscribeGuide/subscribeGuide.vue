<template>
  <view>
    <view class="subscribe-guide-bg"></view>
    <view class="subscribe-guide is-show">
      <view class="img-box">
        <image
          class=""
          mode="widthFix"
          src="https://h5.chuxingyouhui.com/shop/assets/y-project/8efd35a49d786a1e6612da3d1375db69.png"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>

.img-box {
    display: block;
    width: 696rpx;
    height: 380rpx;
    overflow: hidden;
}

image {
  display: block;
  width: 26448rpx;
  animation: image-play 2.5s steps(37) infinite;
}

.subscribe-guide {
  position: fixed;
  bottom: 60%;
  left: 50%;
  margin-left: -348rpx;
  z-index: 9999;
}

.subscribe-guide-bg {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 9999;
}

.subscribe-guide-animation-box {
  width: 696rpx;
  height: 380rpx;
}

.subscribe-guide-animation {
  height: 100%;
  background: url(https://h5.chuxingyouhui.com/shop/assets/y-project/8efd35a49d786a1e6612da3d1375db69.png)
    no-repeat 0 top;
  background-size: 26448rpx 100%;
  animation: play 2.5s steps(37) infinite;
}

@keyframes play {
  0% {
    background-position-x: 0;
  }

  100% {
    background-position-x: -25752rpx;
  }
}

@keyframes image-play {
  100% {
    transform: translate3d(-25752rpx, 0, 0);
  }
}
</style>