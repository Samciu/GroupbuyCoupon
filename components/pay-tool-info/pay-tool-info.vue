<template>
  <view>
    <user-pay-info :extraProps="extraProps"></user-pay-info>
  </view>
</template>

<script>
import { getPayToolUserLogin } from "@/request";

export default {
  data() {
    return {};
  },

  computed: {
    extraProps() {
      console.log("extraProps", this.show);

      return {
        show: this.show,
        titleText: "即将进行身份验证",
        buttonText: "确定",
        loginSuccess: res => {
          console.log("loginSuccess", res);
        },
        loginFail: res => {
          console.log("loginFail", res);
        }
      };
    },
  },

  props: ["show"],

  methods: {
    loginSuccess(res) {
      console.log("loginSuccess", res);
      // getPayToolUserLogin();
    },

    loginFail(res) {
      console.log("loginFail", res);
    },
  },
};
</script>

<style lang="scss">
</style>
