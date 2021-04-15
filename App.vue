<script>
export default {
  onLaunch: function () {
    console.log("App Launch");
  },
  onShow: function () {
    console.log("App Show");
  },
  onHide: function () {
    console.log("App Hide");
  },
};
</script>

<style lang="scss">
/*每个页面公共css */
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
    border-bottom: 1px solid #ddd;
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
  animation-duration: .5s;
  animation-fill-mode: both;
}

.animate__fadeInUp {
  animation-name: fadeInUp;
}
</style>
