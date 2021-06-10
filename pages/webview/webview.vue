<template>
  <view v-if="url">
    <web-view :src="url"></web-view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  onLoad: function (option) {
    const { url } = option;
    if (url) {
      this.url = decodeURIComponent(url);
    }
  },
};
</script>

<style lang="scss">
</style>
