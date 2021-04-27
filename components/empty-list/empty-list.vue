<template>
  <view class="empty">
    <image
      class="empty-image"
      mode="widthFix"
      src="/static/img_empty.png"
    ></image>
    <view class="empty-text">{{ text }}</view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["text"],

  methods: {},
};
</script>

<style lang="scss">
.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32rpx;

  .empty-image {
    width: 300rpx;
  }
  .empty-text {
    padding-top: 30rpx;
    color: #666;
    font-size: 30rpx;
  }
}
</style>
