<template>
  <view class="page-main">
    <view class="head-picture-area">
      <uni-nav-bar
        :fixed="false"
        :status-bar="true"
        :border="false"
        backgroundColor="transparent"
      >
        <!-- <view class="choose-address" slot="left" @click="openPopup">
          <view class="icon" />
          <view class="city">广州市</view>
        </view> -->
      </uni-nav-bar>
      <image src="/static/index/banner.png" class="header-content" />
    </view>

    <loginWrap>
      <view class="coupon-top" v-if="productActivityList.length">
        <view
          class="coupon-top-item"
          v-for="(item, index) in productActivityList"
          :key="index"
          @click="jumpTo(`/pages/product/list?pcode=${item.code}`)"
        >
          <image class="pic" :src="item.logo" />
          <view class="text">{{ item.name }}</view>
        </view>
        <view
          class="coupon-top-item"
          @click="
            handleProductClick({
              type: 'page',
              path: '/pages/product/classify',
            })
          "
        >
          <image class="pic" src="/static/index/fenlei.png" />
          <view class="text">分类查找</view>
        </view>
      </view>
      <brandLoading v-else />
    </loginWrap>
    <view
      class="hot-activity"
      :class="{ layout2: layout == 2 }"
      v-if="banner.length || coupon.length"
    >
      <view class="activity-left" v-if="banner.length">
        <!-- <view class="title">1元拉新拼</view> -->
        <swiper
          :autoplay="true"
          :circular="true"
          class="swiper"
          indicatorActiveColor="#fff"
          indicatorColor="#ccc"
          :indicatorDots="true"
          v-if="banner.length > 1"
        >
          <swiper-item
            class="swiper-item"
            v-for="(banner, i) in banner"
            :key="i"
            @click="handleProductClick(banner)"
          >
            <image class="img" mode="aspectFill" :src="banner.pic.url"></image>
          </swiper-item>
        </swiper>
        <view class="swiper" v-else>
          <image class="img" mode="aspectFill" :src="banner[0].pic.url" @click="handleProductClick(banner[0])"></image>
        </view>
      </view>
      <view class="activity-right" v-if="coupon.length">
        <view class="activity-item" v-for="(coupon, i) in coupon" :key="i">
          <image
            :mode="layout == 2 ? 'aspectFill' : 'widthFix'"
            :src="coupon.pic.url"
            @click="handleProductClick(coupon)"
          />
        </view>
      </view>
    </view>

    <view class="coupon-card">
      <view class="nav-bar">
        <view class="nav-item active">精选优惠</view>
        <!-- <view class="nav-item">周边好店</view> -->
      </view>
      <loginWrap>
        <view class="coupon-card-list" v-if="productHotList.length">
          <view
            class="item"
            @click="jumpTo(`/pages/product/detail?gcode=${item.code}`)"
            v-for="(item, index) in productHotList"
            :key="index"
          >
            <view
              class="pic"
              :style="{
                background: `url(${item.bg_card}) no-repeat center/contain`,
              }"
            ></view>
            <view class="card-content">
              <view class="title"> {{ item.name }} </view>
              <view class="control">
                <view class="btn">{{ item.discountStr }}领取</view>
                <view class="earn" v-if="item.commission"
                  >赚¥{{ item.commission_str }}</view
                >
                <!-- <view class="like"></view> -->
              </view>
            </view>
          </view>
        </view>
        <cardLoading v-else />
      </loginWrap>
    </view>
    <customTabBar tab="index"></customTabBar>
    <uni-popup v-for="item,index in homePopup" :key="index" :id="item.task_alias" :ref="item.task_alias" type="top" animation="true">
      <view class="popup-content">
        <view class="mask" @click="closePopup(item.task_alias)" />
        <image :src="item.pic" mode="widthFix" @click="handlePopupClick(item)" />
        <view class="closed" @click="closePopup(item.task_alias)"></view>
      </view>
    </uni-popup>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import getShareMessage from "@/utils/getShareMessage";
import brandLoading from "./components/brandLoading";
import cardLoading from "./components/cardLoading";

export default {
  components: { brandLoading, cardLoading },
  data() {
    return {
      popupIndex: 0 // 弹窗数组下标
    };
  },
  computed: {
    ...mapState({
      productActivityList: (state) => state.index.productActivityList,
      productHotList: (state) => state.index.productHotList,
      banner: (state) => state.index.banner,
      coupon: (state) => state.index.coupon,
      layout: (state) => state.index.layout,
      homePopup: (state) => state.index.homePopup
    }),
  },
  async onLoad(option) {
    // this.initLocation();
    this.fetchProductActivity();
    this.fetchProductHot();
    this.fetchCardProductRecommand();
    await this.fetchHomePopup()
    this.openPopup()
    if (option.path) {
      this.jumpTo(option.path);
    }
  },
  methods: {
    ...mapActions([
      "getAuthorize",
      "fetchProductActivity",
      "fetchProductHot",
      "fetchCardProductRecommand",
      "fetchHomePopup"
    ]),

    async initLocation() {
      const authorize = await this.getAuthorize();
      if (!authorize) return;

      uni.showLoading({ title: "加载优惠中" });

      const [locationErr, locationRes] = await uni.getLocation();
      const { latitude, longitude } = locationRes;
      // await this.fetchShopRecommand({
      //   lat: latitude,
      //   lng: longitude,
      // });

      uni.hideLoading();
    },

    openPopup() {
      const alias = this.homePopup[this.popupIndex]?.task_alias
      if (!alias) return
      this.$refs[alias][0].open();
      this.popupIndex = this.popupIndex + 1 // 弹窗数组下标 +1
    },

    closePopup(ref) {
      this.$refs[ref][0].close();
      this.openPopup()
    },

    jumpTo(payload) {
      try {
        const path = decodeURIComponent(payload);
        uni.navigateTo({
          url: path,
        });
      } catch (e) {}
    },

    handlePopupClick(data) {
      this.closePopup(data.task_alias)
      this.handleProductClick({...data, type: data.target})
    },

    handleProductClick(data) {
      const { type, appId, path, url } = data;

      if (type == "page") {
        uni.navigateTo({
          url: path,
        });
      }
      if (type == "tab") {
        uni.switchTab({
          url: path,
        });
      }
      if (type == "miniapp") {
        uni.navigateToMiniProgram({
          appId,
          path,
        });
      }
      if (url) {
        uni.navigateTo({
          url: `/pages/webview/webview?url=${encodeURIComponent(url)}`,
        });
      }
    },

    onShareAppMessage(res) {
      return getShareMessage();
    },

    onShareTimeline() {
      return getShareMessage();
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f2f2f2;
}

.head-picture-area {
  position: relative;
  background: #ffffff;

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    display: block;
    height: 248rpx;
    width: 100%;
    background: linear-gradient(180deg, #ffa1a1 0%, #fad2d6 47%, #ffffff 100%);
  }
}

.choose-address {
  display: flex;
  align-items: center;
  padding-left: 26rpx;
  font-size: 30rpx;
  line-height: 42rpx;
  color: #333333;
  white-space: nowrap;

  .icon {
    margin-right: 12rpx;
    width: 32rpx;
    height: 36rpx;
    background: url(/static/index/icon.png) no-repeat center/contain;
  }
}

.header-content {
  position: relative;
  display: block;
  margin: 0 auto;
  width: 686rpx;
  height: 182rpx;
}

.coupon-top {
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  padding: 0 24rpx;
  padding-top: 44rpx;
  background: #ffffff;

  &-item {
    padding-bottom: 40rpx;
    width: 20%;
    text-align: center;
    display: flex;
    align-items: center;
    flex-direction: column;

    .pic {
      display: block;
      width: 80rpx;
      height: 80rpx;
      border-radius: 50%;
    }
    .text {
      margin-top: 18rpx;
      font-size: 24rpx;
      line-height: 34rpx;
      color: #333333;
    }
  }
}

.hot-activity {
  background: #f2f2f2;
  display: flex;
  flex-direction: column;
  padding: 20rpx 32rpx;
  justify-content: space-between;
  box-shadow: 0 -2rpx 120rpx rgba(236, 89, 89, 0.1);

  &.layout2 {
    flex-direction: row;
    justify-content: space-between;

    .activity-left {
      margin-bottom: 0;
      height: 428rpx;
      width: 334rpx;

      .swiper {
        height: 100%;
        width: 100%;
      }

      image {
        height: 100%;
        width: 100%;
      }
    }

    .activity-right {
      justify-content: space-between;
      margin-right: 0;
      flex-direction: column;

      .activity-item {
        flex: initial;
        margin-right: 0;
        height: 204rpx;
        width: 332rpx;
      }

      image {
        width: 100;
        height: 100%;
      }
    }
  }

  .swiper {
    height: 160rpx;
  }

  .title {
    font-size: 32rpx;
    font-weight: 800;
    line-height: 44rpx;
    color: #333333;
  }

  .activity-left {
    margin-bottom: 20rpx;
    text-align: center;
    image {
      // margin-top: 18rpx;
      display: block;
      width: 100%;
      height: 160rpx;
    }
  }

  .activity-right {
    display: flex;
    margin-right: -20rpx;
    flex-wrap: wrap;

    .activity-item {
      flex: 1;
      margin-right: 20rpx;
    }

    image {
      // margin-top: 18rpx;
      display: block;
      width: 100%;
      height: 152rpx;
    }
  }
}

.coupon-card {
  background: #fbf6f2;
  border-radius: 40rpx 40rpx 0 0;
  padding-top: 40rpx;
  padding-bottom: 160rpx;

  .nav-bar {
    display: flex;
    padding: 0 32rpx;
    color: #333333;
    align-items: center;

    .nav-item {
      margin-right: 40rpx;
      font-size: 30rpx;
      font-weight: 700;
      line-height: 42rpx;
      color: #999999;

      &::after {
        content: "";
        // display: block;
        margin: 14rpx auto 0;
        width: 46rpx;
        height: 6rpx;
        background: transparent;
      }

      &.active {
        font-size: 36rpx;
        font-weight: 800;
        line-height: 50rpx;
        color: #333333;

        &::after {
          background: #ec5959;
        }
      }
    }
  }

  &-list {
    display: flex;
    flex-wrap: wrap;
    padding: 26rpx 25rpx;

    .item {
      box-sizing: border-box;
      margin-bottom: 4rpx;
      width: 350rpx;
      height: 456rpx;
      background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/0ba920fc-465a-4a39-9c16-e6dbd436ea79.png)
        no-repeat center/contain;

      .pic {
        display: block;
        height: 218rpx;
        margin: 0 20rpx;
      }

      .card-content {
        padding: 0 42rpx;
      }

      .title {
        padding-top: 34rpx;
        font-size: 28rpx;
        font-weight: 700;
        line-height: 40rpx;
        color: #333333;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .control {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-top: 58rpx;

        .btn {
          padding: 0 22rpx;
          height: 58rpx;
          line-height: 58rpx;
          background: #fbeae5;
          border-radius: 30px;
          text-align: center;
          font-weight: 700;
          color: #ec5959;
          font-size: 26rpx;
        }

        .like {
          width: 32rpx;
          height: 30rpx;
          background: url(/static/index/collect.png) no-repeat center/contain;
        }

        .earn {
          // padding: 6rpx 6rpx;
          color: #fa6400;
          font-size: 24rpx;
          // background: #fbeae5;
        }
      }
    }
  }
}

.popup-content {
  position: relative;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;

  .mask {
    position: absolute;
    width: 100vw;
    height: 100vh;
    z-index: 0;
  }

  image {
    position: relative;
    z-index: 1;
    width: 680rpx;
  }

  .closed {
    position: relative;
    z-index: 1;
    width: 80rpx;
    height: 80rpx;
    margin-top: 16rpx;
    background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/ca54adf5-12bf-43ae-9515-02140eaba5ec.png) no-repeat;
    background-size: 100%;
  }
}
</style>
