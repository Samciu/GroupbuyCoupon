<template>
  <view class="mp-container">
    <view class="mp-share-container">
      <swiper
        class="mp-share-swiper"
        next-margin="100rpx"
        previous-margin="100rpx"
        @change="onChange"
      >
        <swiper-item
          class="mp-share-swiper-item"
          v-for="(item, index) in list"
          :key="index"
        >
          <image
            class="mp-share-swiper-item-img"
            mode="aspectFill"
            showMenuByLongpress="true"
            :src="item"
            :class="{ active: index == current }"
          ></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="invite-box">
      <view class="btns">
        <view class="btn">面对面邀请</view>
        <view class="btn yellow">分享海报</view>
      </view>
      <view class="tips">
        *好友扫码并成功注册登陆后，Ta将成为你的粉丝，粉丝下单，你也可以获得收益哦！
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      current: 0,
      list: [
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2368036948,1393196369&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2368036948,1393196369&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2368036948,1393196369&fm=26&gp=0.jpg",
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2368036948,1393196369&fm=26&gp=0.jpg",
      ],
    };
  },
  methods: {
    onChange(e) {
      const {
        detail: { current },
      } = e;
      this.current = current;
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.mp-container {
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mp-container,
.mp-share-container {
  width: 100%;
  display: flex;
}

.mp-share-container {
  padding-bottom: 30rpx;
  flex: 1;
  flex-direction: column;
}

.mp-share-swiper {
  width: 100%;
  height: 850rpx;
  flex: 1;
  margin: 30rpx 0;
}

.mp-share-swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  overflow: unset;
}

.mp-share-swiper-item-img {
  width: 100%;
  height: 100%;
  z-index: 1;
  transition: all 0.2s ease-out 0.1s;
  z-index: 20;
  transform: scale(0.8);

  &.active {
    transform: scale(1);
  }
}

.invite-box {
  margin: 0 30rpx;
  padding: 30rpx;
  background: #fff;

  .btns {
    display: flex;
    justify-content: center;
    padding-bottom: 20rpx;
  }

  .btn {
    padding: 12rpx 20rpx;
    background: #ff5b73;
    color: #fff;

    &.yellow {
      margin-left: 60rpx;
      background-color: #fcd530;
    }
  }

  .tips {
    font-size: 28rpx;
    color: #666;
  }
}
</style>
