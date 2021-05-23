<template>
  <view class="wrapper">
    <slot></slot>
    <view class="auth"></view>
    <login />
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .auth {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0;
    top: 0;
    left: 0;
    z-index: 20;
  }
}
</style>

