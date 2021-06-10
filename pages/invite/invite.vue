<template>
  <view class="mp-container">
    <view class="tab-bar b-b">
      <view
        class="tab-bar-item"
        :class="{ active: index == active }"
        v-for="(item, index) in list"
        :key="item"
        @click="changeTab(index)"
      >
        {{ item.name }}
      </view>
    </view>
    <view
      class="mp-share-container"
      v-for="(item, index) in list"
      :key="item"
      v-show="index == active"
    >
      <swiper
        class="mp-share-swiper"
        next-margin="100rpx"
        previous-margin="100rpx"
        @change="
          (e) => {
            onChange(e, index);
          }
        "
      >
        <swiper-item
          class="mp-share-swiper-item"
          v-for="(childItem, key) in item.list"
          :key="key"
        >
          <image
            class="mp-share-swiper-item-img"
            mode="aspectFit"
            showMenuByLongpress="true"
            :src="childItem.url"
            :class="{ active: key == current[index] }"
          ></image>
        </swiper-item>
      </swiper>
    </view>
    <view class="invite-box">
      <view class="tips">
        *
        好友扫码并成功注册登录后，Ta将成为你的粉丝，粉丝下单，你也可以获得收益哦！
      </view>
      <view class="btns">
        <view class="btn" @click="openInvite">面对面邀请</view>
        <view class="btn yellow" @click="createPoster">分享海报</view>
        <button class="btn orange" plain="true" open-type="share">
          分享小程序
        </button>
      </view>
    </view>
    <view class="canvas">
      <canvas canvasId="prefix" style="width: 750px; height: 1334px"></canvas>
    </view>
    <view class="face-invie" v-show="showFaceInvie">
      <view class="mask" @click="closeInvite"></view>
      <image :src="inviteInfo[active].qrcodeUrl"></image>
    </view>
  </view>
</template>

<script>
import getShareMessage from "@/utils/getShareMessage";
import { getInviteInfo } from "@/request";

export default {
  data() {
    return {
      current: [0, 0], // 领券 && 团队的 banner 位置
      active: 0,
      list: [
        {
          name: "领券",
          list: [
            {
              url:
                "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/2a9f072e-52dd-4c2a-811f-75521d9505eb.jpg",
              posistion: {
                x: "275",
                y: "800",
              },
              width: 200,
            },
            {
              url:
                "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/80c911a3-c205-40f0-b899-517ec25d2b0d.jpg",
              posistion: {
                x: "266",
                y: "680",
              },
              width: 220,
            },
            {
              url:
                "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/bf3be174-6fc2-4865-b73e-1e568e0a493c.png",
              posistion: {
                x: "234",
                y: "870",
              },
              width: 280,
            },
          ],
        },
        {
          name: "团队",
          list: [
            {
              url:
                "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/c20c950f-40a4-4136-8965-530e3a1c3ef8.jpg",
              posistion: {
                x: "272",
                y: "664",
              },
              width: 206,
            },
            {
              url:
                "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/25fbc4e7-0e6e-40ca-86a6-d0c0360eec15.png",
              posistion: {
                x: "238",
                y: "736",
              },
              width: 280,
            },
            {
              url:
                "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/a288b2ff-2961-4435-a300-e172faa59118.png",
              posistion: {
                x: "245",
                y: "900",
              },
              width: 260,
            },
          ],
        },
      ],
      inviteInfo: [],
      showFaceInvie: false
    };
  },
  async onLoad() {
    const [coupon, team] = await Promise.all([
      getInviteInfo({ page: "/pages/index/index", tab: "coupon" }),
      getInviteInfo({ page: "/pages/index/index", tab: "team" }),
    ]);
    this.inviteInfo = [coupon[1].data.data, team[1].data.data];
  },
  methods: {
    changeTab(index) {
      this.active = index;
    },

    onChange(e, index) {
      const {
        detail: { current },
      } = e;
      const currentArr = [...this.current];
      currentArr[index] = current;
      this.current = currentArr;
    },

    async loadImage(url) {
      const [err, res] = await uni.downloadFile({
        url,
      });
      console.log(err, res);
      return res.tempFilePath;
    },

    openInvite() {
      this.showFaceInvie = true
    },

    closeInvite() {
      this.showFaceInvie = false
    },

    async getAuthorize() {
      // 获取授权
      const [authorizeErr, authorizeRes] = await uni.authorize({
        scope: "scope.writePhotosAlbum",
      });
      console.log(authorizeErr, authorizeRes);
      // 授权失败
      if (authorizeErr) {
        const [modalErr, modalRes] = await uni.showModal({
          title: "提示",
          content: "保存到相册需获取相册权限，请允许开启权限",
          confirmText: "确认",
          cancelText: "取消",
        });

        modalRes.confirm && uni.openSetting();
        return false;
      }
      return true;
    },

    async createPoster() {
      const authorize = await this.getAuthorize();
      if (!authorize) return;

      const { active, current, list } = this;

      const currentIndex = current[active];
      const currentList = list[active].list;
      const currentItem = currentList[currentIndex];
      const currentInviteInfo = this.inviteInfo[active];

      uni.showLoading({ title: "下载中..." });

      const [prefixPath, qrcodePath] = await Promise.all([
        this.loadImage(currentItem.url),
        this.loadImage(currentInviteInfo.qrcodeUrl),
      ]);

      uni.hideLoading();

      console.log([prefixPath, qrcodePath]);

      const context = uni.createCanvasContext("prefix");
      context.drawImage(prefixPath, 0, 0, 750, 1334); //绘制首图
      context.drawImage(
        qrcodePath,
        currentItem.posistion.x,
        currentItem.posistion.y,
        currentItem.width,
        currentItem.width
      ); //绘制二维码
      context.draw(false, async () => {
        const [err, res] = await uni.canvasToTempFilePath({
          canvasId: "prefix",
        });

        console.log(err, res);
        if (err) return;
        console.log("海报图片路径：" + res.tempFilePath);

        const [saveErr, saveRes] = await uni.saveImageToPhotosAlbum({
          //保存到本地
          filePath: res.tempFilePath,
        });
        console.log(saveErr, saveRes);
        uni.showToast({
          title: saveErr ? "保存失败" : "保存成功",
          icon: saveErr ? "none" : "sucess",
        });
      });
    },

    onShareAppMessage(res) {
      const config = getShareMessage();
      const currentInviteInfo = this.inviteInfo[this.active];

      return { ...config, ...currentInviteInfo.shareConfig };
    },

    onShareTimeline(res) {
      const config = getShareMessage();
      const currentInviteInfo = this.inviteInfo[this.active];

      return { ...config, ...currentInviteInfo.shareConfig };
    },
  },
};
</script>

<style lang="scss">
page {
  background: #fff;
}

.tab-bar {
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  padding: 0 32rpx;
  width: 100%;
  height: 92rpx;
  background: #fff;

  &-item {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    height: 100%;
    width: 112rpx;
    color: #666666;
    text-align: center;

    &.active {
      color: #ec5959;
      font-weight: 700;

      &::after {
        content: "";
        display: block;
        position: absolute;
        width: 100%;
        height: 6rpx;
        left: 0;
        bottom: 0;
        background: linear-gradient(90deg, #ec5959 0%, #f77338 100%);
      }
    }
  }
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
  flex: 1;
  flex-direction: column;
}

.mp-share-swiper {
  width: 100%;
  height: 900rpx;
  flex: 1;
  margin-top: 30rpx;
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
  padding: 32rpx 0;
  background: #fff;

  .btns {
    margin: 0 24rpx;
    padding-top: 44rpx;
    display: flex;
    justify-content: space-between;
  }

  .btn {
    margin: 0;
    border: none;
    width: 202rpx;
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
    background: #ec5959;
    color: #fff;
    border-radius: 16rpx;
    font-size: 28rpx;

    &.yellow {
      background-color: #f9cb40;
    }

    &.orange {
      background-color: #f76f3e;
    }
  }

  .tips {
    padding: 0 64rpx;
    font-size: 24rpx;
    color: #000000;
    line-height: 34rpx;
  }
}
.canvas {
  position: fixed;
  left: -9999rpx;
}
.face-invie {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 99;

  .mask {
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
  }

  image {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600rpx;
    height: 600rpx;
    background: #fff;
  }
}
</style>
