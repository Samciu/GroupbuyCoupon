<script>
import store from '@/store'
import ".env.js";

export default {
  onLaunch: function (e) {
    console.log("App Launch");
    store.dispatch('getStore');
    // 记录邀请来源
    const { fromUid, scene } = e.query;
    console.log("onLaunch fromUid", fromUid);
    fromUid && uni.setStorageSync("fromUid", fromUid);

    // 海报二维码方式通过 sceneXXX 方式获取 fromUid
    if (scene) {
      console.log("onLaunch scene", scene.split("fromUid")[1]);
      uni.setStorageSync("fromUid", scene.split("fromUid")[1]);
    }
  },
  onShow: function (e) {
    console.log("App Show", e);

    // 接收收银台小程序回调参数
    const [err, res] = e?.referrerInfo?.extraData?.paymentRes || [];
    if (res?.errMsg == "requestPayment:ok") {
      uni.showToast({
        title: "支付成功",
        duration: 2000,
      });
      uni.navigateTo({
        url: "/pages/product/paySuccess",
      });
    }
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
button {
  border-radius: 0;
  line-height: inherit;
  background: none;
  font-size: inherit;
  color: inherit;
  margin: initial;

  &::after {
    content: none;
  }
}

.b-b {
  position: relative;

  &::after {
    position: absolute;
    z-index: 3;
    left: 0;
    top: auto;
    bottom: 0;
    right: 0;
    height: 0;
    content: "";
    transform: scaleY(0.5);
    border-bottom: 1px solid #e5e5e5;
  }
}

.b-t {
  position: relative;

  &::after {
    position: absolute;
    z-index: 3;
    left: 0;
    top: 0;
    bottom: auto;
    right: 0;
    height: 0;
    content: "";
    transform: scaleY(0.5);
    border-top: 1px solid #e5e5e5;
  }
}

/* 布局 */
.row {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: row;
  align-items: center;
}
.column {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  flex-direction: column;
}
.center {
  /* #ifndef APP-PLUS-NVUE */
  display: flex;
  /* #endif */
  align-items: center;
  justify-content: center;
}
.fill {
  flex: 1;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }

  to {
    opacity: 1;
    transform: translateZ(0);
  }
}

.animate__animated {
  animation-duration: 0.5s;
  animation-fill-mode: both;
}

.animate__fadeInUp {
  animation-name: fadeInUp;
}
</style>
