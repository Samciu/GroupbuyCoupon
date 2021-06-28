<template>
  <view class="popup_content">
    <view class="rules_txt">
      <view class="title">联系客服</view>
      <view class="scroll">
        <view class="content">请联系客服领取会员卡</view>
        <button class="button" open-type="contact">联系客服</button>
      </view>
    </view>
    <view class="closed" @click="close"></view>
  </view>
</template>

<script>
export default {
  props: ["rules"],
  methods: {
    close() {
      this.$emit("closeExchange");
    },
  },
};
</script>

<style lang="scss">
.popup_content {
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  .rules_txt {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 580rpx;
    border-radius: 12rpx;
    background: #fff;
    box-sizing: border-box;
    padding: 60rpx 40rpx;
    overflow: hidden;
    justify-content: space-between;

    .title {
      font-weight: bolder;
      font-size: 40rpx;
      line-height: 56rpx;
      text-align: center;
      color: #000;
    }

    .scroll {
      overflow: hidden;
      text-align: center;
    }

    .content {
      padding-top: 30rpx;
      text-align: center;
    }

    .button {
    display: block;
    margin: 0 auto;
    margin-top: 40rpx;
      width: 224rpx;
      height: 84rpx;
      border-radius: 46rpx;
      line-height: 84rpx;
      font-size: 32rpx;
      text-align: center;
      background: #ec5959;
      color: #fff;
    }
  }

  .closed {
    width: 80rpx;
    height: 80rpx;
    margin-top: 16rpx;
    background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/ca54adf5-12bf-43ae-9515-02140eaba5ec.png")
      no-repeat;
    background-size: 100%;
  }
}
</style>