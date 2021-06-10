<template>
  <view class="wrapper" :class="className">
    <slot></slot>
    <view class="auth" v-if="!isLogin" @click="handleLoginClick"></view>
    <login />
  </view>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },

  props: ["className"],

  computed: {
    ...mapGetters(["isLogin"]),
  },
  methods: {

    ...mapMutations(["setLoginShow"]),

    handleLoginClick() {
      this.setLoginShow(true);
    },
  },
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

