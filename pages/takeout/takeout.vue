<template>
  <view class="take-out">
    <view class="banner">
      <view class="bg">
        <view class="up-space"></view>
        <view class="down-space"></view>
      </view>
      <view class="hover">
        <swiper
          :autoplay="true"
          :circular="true"
          class="swiper"
          indicatorActiveColor="#fff"
          indicatorColor="#ccc"
          :indicatorDots="true"
        >
          <swiper-item
            class="swiper-item"
            :key="i"
            @click="handleClickBanner(banner)"
          >
            <image
              class="img"
              mode="aspectFill"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/fa46653b-44a7-41c3-9bca-c733c6e7536e.png"
            ></image>
          </swiper-item>
        </swiper>
      </view>
    </view>
    <view>{{ text }}</view>
    <view class="list">
      <view
        @click="jumpCoupon(item)"
        v-for="(item, index) in indexCoupons"
        :key="index"
        class="item animated fadeIn"
      >
        <view class="left">
          <image class="label ele" mode="widthFix" :src="item.labelPic"></image>
          <image class="mark ele" mode="heightFix" :src="item.markPic"></image>
          <view class="content">
            <view class="title">{{ item.name }}</view>
            <view class="info">
              <text class="price">{{ item.money }}</text>
              <text class="unit">元</text>
              <text class="tip">{{ item.description }}</text>
            </view>
          </view>
        </view>
        <view class="right">
          <view class="btn" :class="item.platform == 'ele' ? 'red' : 'yellow'"
            >免费领取</view
          >
        </view>
      </view>
    </view>

    <view class="shop-recommand-wrap" v-if="recommandList.length">
      <view class="shop-recommand-title">大家都在吃</view>
      <view class="shop-recommand">
        <view
          class="shop-recommand-item"
          v-for="(item, index) in recommandList"
          :key="index"
          @click="handleRecommandClick(item)"
        >
          <image :src="item.shopLogo" mode="aspectFill" class="pic"></image>
          <view class="desc">
            <view class="shop-name">{{ item.shopName }}</view>
            <view class="discount">{{ item.discount }}</view>
            <!-- <text class="tip">预估返1元</text> -->
          </view>
        </view>
      </view>
    </view>

    <login />
    <customTabBar tab="takeout"></customTabBar>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import login from '../../components/login/login.vue';
import getShareMessage from "@/utils/getShareMessage";

export default {
  components: { login },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      indexCoupons: (state) => state.takeout.indexCoupons,
      recommandList: (state) => state.takeout.recommandList,
    }),
  },
  onLoad(e) {
    this.initLocation();
    this.fetchIndexCoupons();
  },
  methods: {
    ...mapActions(["getAuthorize", "fetchIndexCoupons", "fetchShopRecommand"]),

    async initLocation() {
      const authorize = await this.getAuthorize();
      if (!authorize) return;

      uni.showLoading({ title: "加载优惠中" });

      const [locationErr, locationRes] = await uni.getLocation();
      const { latitude, longitude } = locationRes;
      await this.fetchShopRecommand({
        lat: latitude,
        lng: longitude,
      });

      uni.hideLoading();
    },

    handleRecommandClick(item) {
      uni.navigateToMiniProgram({
        appId: item.package.minapp.appid,
        path: item.package.minapp.path,
      });
    },

    jumpCoupon(item) {
      uni.navigateToMiniProgram({
        appId: item.package.minapp.appid,
        path: item.package.minapp.path,
      });
    },

    onShareAppMessage(res) {
      return getShareMessage()
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.take-out {
  padding-bottom: 200rpx;

  .banner {
    position: relative;
    background-color: #fff;

    .bg {
      height: 100%;
      position: absolute;
      width: 100%;

      .up-space {
        height: 55%;
        background-color: #ff536f;
      }

      .down-space {
        height: 40rpx;
        background-color: #ff536f;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
      }
    }

    .hover {
      top: 0;
      right: 0;
      left: 0;
      padding: 20rpx 0 0;

      .swiper {
        height: 250rpx;

        .swiper-item {
          padding: 0 25rpx;
          box-sizing: border-box;
          height: 250rpx;

          .img {
            display: block;
            width: 700rpx;
            height: 250rpx;
            border-radius: 30rpx;
          }
        }
      }
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    padding: 0 25rpx;
    margin-top: 28rpx;

    .item {
      display: flex;
      flex-wrap: nowrap;
      border-radius: 28rpx;
      margin-bottom: 20rpx;
      -ms-flex-align: center;
      align-items: center;
      overflow: hidden;
      height: 180rpx;

      .left {
        width: 72%;
        height: 180rpx;
        position: relative;
        background-color: #fff;

        &::before,
        &::after {
          content: "";
          position: absolute;
          right: -12rpx;
          width: 24rpx;
          height: 24rpx;
          border-radius: 50%;
          background-color: #f3f3f3;
        }

        &::before {
          top: -12rpx;
        }

        &::after {
          bottom: -12rpx;
        }

        .label {
          position: absolute;
          top: 0;
          left: 0;

          &.ele {
            width: 106rpx;
            height: 106rpx;
          }

          &.mt {
            width: 107rpx;
            height: 107rpx;
          }
        }

        .mark {
          position: absolute;
          bottom: 0;
          left: 0;

          &.ele {
            height: 68rpx;
          }
          &.mt {
            width: 119rpx;
          }
        }

        .content {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
          height: 180rpx;
          z-index: 1;
          display: -ms-flexbox;
          display: flex;
          flex-direction: column;
          -ms-flex-pack: center;
          justify-content: center;
          padding-left: 84rpx;

          .title {
            display: flex;
            align-items: center;
            font-weight: 600;
            font-size: 30rpx;

            .corner {
              width: 5rpx;
              height: 7rpx;
              margin: 0 7rpx;
              position: relative;

              &.left-top {
                top: -10rpx;
              }
              &.right-bottom {
                top: 10rpx;
              }
            }

            .new {
              width: 71rpx;
              height: 30rpx;
              margin-left: 2rpx;
              position: relative;
              top: -11rpx;
            }
          }
          .info {
            font-size: 26rpx;

            .price {
              color: #ff304d;
              font-size: 52rpx;
              font-weight: 700;
              position: relative;
              top: 4rpx;
              margin-right: 6rpx;
              font-family: PingFang SC;
            }

            .unit {
              color: #ff304d;
              margin-right: 6rpx;
            }

            .tip {
              background-color: #ffebe3;
              padding: 4rpx 8rpx;
              border-radius: 4rpx;
              color: #aa1e3b;
            }
          }
        }
      }

      .right {
        display: flex;
        align-items: center;
        width: 28%;
        height: 180rpx;
        position: relative;
        background-color: #fff;
        border-left: 4rpx dashed #eee;
        justify-content: center;

        &::before,
        &::after {
          content: "";
          position: absolute;
          left: -12rpx;
          width: 24rpx;
          height: 24rpx;
          border-radius: 50%;
          background-color: #f3f3f3;
        }

        &::before {
          top: -12rpx;
        }

        &::after {
          bottom: -12rpx;
        }

        .btn {
          width: 80%;
          height: 64rpx;
          line-height: 64rpx;
          border-radius: 32rpx;
          font-size: 26rpx;
          text-align: center;

          &.red {
            background-color: #ff5b73;
            color: #fff;
          }

          &.yellow {
            background-color: #fcd530;
            color: #666;
          }
        }
      }
    }
  }

  .shop-recommand-title {
    padding: 20rpx 25rpx;
    font-size: 32rpx;
    color: #333;
    font-weight: 500;
  }

  .shop-recommand-wrap {
    margin: 0 25rpx;
    margin-top: 8rpx;
    background: #fff;
  }

  .shop-recommand {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 0 25rpx;

    &-item {
      margin-bottom: 36rpx;
      width: 200rpx;
      box-shadow: 0 4rpx 10rpx rgba(0, 0, 0, 0.2);
      background: #fff;
      border-radius: 12rpx;
      overflow: hidden;

      .pic {
        display: block;
        width: 200rpx;
        height: 150rpx;
      }

      .shop-name {
        font-size: 28rpx;
        height: 80rpx;
        font-weight: 500;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }

      .desc {
        padding: 14rpx 10rpx 20rpx;
      }

      .discount {
        padding: 12rpx 0 8rpx;
        font-size: 30rpx;
        color: #ff536f;
        font-weight: 600;
      }

      .tip {
        font-size: 24rpx;
        background-color: #ffebe3;
        padding: 4rpx 8rpx;
        border-radius: 4rpx;
        color: #aa1e3b;
      }
    }
  }
}
</style>
