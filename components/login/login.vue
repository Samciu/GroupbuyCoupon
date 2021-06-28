<template>
  <view
    class="container"
    @click="closeModal"
    @touchmove.stop="handle"
    v-if="loginShow && !isLogin"
  >
    <view
      class="content animate__animated animate__fadeInUp"
      @click.stop="handle"
    >
      <view class="content-intro">
        <view class="content-intro-img">
          <open-data type="userAvatarUrl"></open-data>
        </view>
        <view class="content-intro-tips">
          <open-data type="userNickName"></open-data>
        </view>
      </view>
      <view class="content-bottom">
        <button
          type="primary"
          size="default"
          class="content-bottom-btn"
          lang="zh_CN"
          @click="getUserProfile"
        >
          <!-- <image
            src="/static/share.png"
            class="content-bottom-btn-img"
          ></image> -->
          微信一键登录
        </button>
      </view>
      <view class="content-agree">授权登录即表示已阅读并同意《隐私协议》</view>
    </view>
  </view>
</template>

<script>
import { mapMutations, mapActions, mapState, mapGetters } from "vuex";
import { getUserLogin } from "../../request";

function getCurrentPageUrlWithArgs() {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const url = currentPage.route;
  const options = currentPage.options;
  const urlWithArgs =
    `/${url}?` +
    Object.keys(options)
      .map((key) => `${key}=${options[key]}`)
      .join("&");
  return urlWithArgs;
}

export default {
  name: "login",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      loginShow: (state) => {
        console.log("loginShow", state.loginShow);
        return state.loginShow;
      },
    }),

    ...mapGetters(["isLogin"]),
  },
  mounted() {
    // this.getLoginStatus();
  },
  methods: {
    ...mapMutations(["setLoginShow"]),

    ...mapActions(["setUserData", "getLoginStatus"]),

    handle() {
      return;
    },

    closeModal() {
      this.setLoginShow(false);
    },

    /**
     * 获取token，以及用户信息
     */
    async getUserProfile() {
      const [userProfile, login] = await Promise.all([
        uni.getUserProfile({
          desc: "用于完善会员资料",
        }),
        uni.login(),
      ]);
      
      const [userProfileErr, userProfileRes] = userProfile;
      if (userProfileErr) return;
      const [loginErr, loginRes] = login;
      const fromUid = uni.getStorageSync("fromUid"); // 邀请来源
      console.log("getUserLogin fromUid:", fromUid);
      const [err, res] = await getUserLogin({
        code: loginRes.code,
        iv: userProfileRes.iv,
        encryptedData: userProfileRes.encryptedData,
        fromUid,
      });

      console.log("getUserLogin:", res.data);

      if (err || res.data.code != 200) {
        uni.showToast({
          icon: "none",
          title: err?.msg || res?.data?.msg,
          duration: 2000,
        });
        return;
      }

      const { token, user } = res.data.data;
      this.setUserData({ token, user });
      this.setLoginShow(false);
      uni.reLaunch({ url: `${getCurrentPageUrlWithArgs()}` });
    },
  },
};
</script>

<style lang="scss">
.container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(000, 000, 000, 0.5);
  z-index: 1001;
}
.content {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 30rpx;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 16rpx 16rpx 0 0;
  --animate-duration: 0.5s;
  &-intro {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    font-size: 30rpx;
    color: #666666;
    &-img {
      margin-top: 30rpx;
      width: 140rpx;
      height: 140rpx;
      border-radius: 50%;
      overflow: hidden;
    }

    &-tips {
      margin-top: 20rpx;
      line-height: 72rpx;
      text-align: center;
    }
  }

  &-bottom {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0 40rpx;
    margin: 40rpx 0 60rpx;
    &-btn {
      width: 100%;
      border-radius: 50rem !important;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 20rpx 0;

      &-img {
        width: 36rpx;
        height: 30rpx;
        margin-right: 10rpx;
      }
    }
  }
  &-agree {
    padding-bottom: calc(env(safe-area-inset-bottom));
    font-size: 26rpx;
    text-align: center;
    color: #919293;
  }
}
</style>
