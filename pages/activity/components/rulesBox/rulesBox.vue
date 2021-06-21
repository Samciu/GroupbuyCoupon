<template>
  <view class="popup_content">
    <view class="rules_txt">
      <view class="title">活动规则</view>
      <view class="scroll">
        <scroll-view class="scroll_box" scrollY="true">
            <view v-for="item,index in rules" :key="index">
                <text>{{item}}</text>
            </view>
        </scroll-view>
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
            this.$emit("closePopup")
        }
    },
    
}
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
    width: 686rpx;
    height: 648rpx;
    border-radius: 40rpx;
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
      width: 606rpx;
      height: 440rpx;
      overflow: hidden;
    }

    .scroll_box {
      width: 618rpx;
      height: 440rpx;
      display: flex;
      align-items: center;
      overflow-y: scroll;
      transform: translate(2rpx, 0);

      text {
        font-size: 28rpx;
        line-height: 40rpx;
        color: #575757;
      }
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