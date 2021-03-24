<template>
  <view class="shop">
    <view class="info animated fadeIn faster">
      <view class="left">
        <view class="title">{{ shopInfo.shopName }}</view>
        <view class="rate-cate">
          <uni-rate
            :readonly="true"
            :value="shopInfo.shopPower / 10"
            size="16"
            active-color="#e62828"
          />
          <text class="power">{{ shopInfo.shopPower / 10 }}</text>
          <view class="cate-name">{{ shopInfo.cateName }}</view>
        </view>
        <view class="address">{{ shopInfo.address }}</view>
        <view class="sale">
          <uni-icons type="flag-filled" size="16" color="#e62828"></uni-icons>
          <text class="icon-font iconfont-fire"></text>
          <text class="count">半年热销 {{ dealDetail.halfYearSale }}</text>
        </view>
      </view>
      <image class="right" :src="dealBaseInfo.defaultPic"></image>
    </view>
    <view class="how animated fadeIn faster">
      <view class="title">省钱步骤</view>
      <view class="items">
        <view class="item">
          <view class="icon">
            <image
              class="icon-image"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/7ddba667-acac-4725-aa2a-fd76603f0dbe.png"
            ></image>
          </view>
          <view class="label">
            <view>打开礼包领券</view>
            <view>用券下单</view>
          </view>
        </view>
        <image
          class="icon-dot-arrow"
          mode="widthFix"
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/158c53f7-ac1e-4cff-9eb7-8404f6e751c3.png"
        ></image>
        <view class="item">
          <view class="icon">
            <image
              class="icon-image"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/3773676f-acf6-4d95-bb46-8eb910f4281a.png"
            ></image>
          </view>
          <view class="label">
            <view>到店消费</view>
            <view>享优惠</view>
          </view>
        </view>
        <image
          class="icon-dot-arrow"
          mode="widthFix"
          src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/158c53f7-ac1e-4cff-9eb7-8404f6e751c3.png"
        ></image>
        <view class="item">
          <view class="icon">
            <image
              class="icon-image"
              src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-5421f5a2-25ab-411d-b114-90177d80d0eb/0f04c25c-8b45-46b3-aa71-c8d69bdf0625.png"
            ></image>
          </view>
          <view class="label">
            <view>24小时内同步订单</view>
            <view>返现到账</view>
          </view>
        </view>
      </view>
    </view>
    <view class="list animated fadeIn faster">
      <view class="header">
        <view class="icon">惠</view>
        <view class="title">优惠列表</view>
      </view>
      <product-list ref="productList" :list="shopList"></product-list>
    </view>
  </view>
</template>

<script>
import productList from "../../components/samciu-coupon-arrive/components/product-list";
import { getShopDetail } from "../../request";

export default {
  data() {
    return {
      shopList: [],
      shopInfo: {},
      dealDetail: {},
      dealBaseInfo: {},
    };
  },
  components: {
    productList,
  },
  onLoad: function (option) {
    const { itemInfo } = option;
    const { shopInfo, dealDetail, dealBaseInfo } = JSON.parse(
      decodeURIComponent(itemInfo)
    );
    this.shopInfo = shopInfo;
    this.dealDetail = dealDetail;
    this.dealBaseInfo = dealBaseInfo;
    this.getShopDetail();
  },
  methods: {
    async getShopDetail() {
      uni.showLoading({ title: "加载优惠中" });
      const [err, res] = await getShopDetail({
        shopIds: this.shopInfo.shopId,
      });
      this.shopList = res.data.data.records;
      uni.hideLoading();
    },
    onShareAppMessage(res) {
      return {
        title: "震惊！小明天天出来玩，竟然只花1分钱",
        path: "uni_modules/samciu-coupon-arrive/pages/arrive/arrive",
        imageUrl:
          "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-aliyun-k3gpzmwscp2i85a06d/f95fbd20-57cf-11eb-bdc1-8bd33eb6adaa.jpg",
      };
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f7f7f7;
}

.shop {
  padding: 16rpx;

  .info {
    justify-content: space-between;
    padding: 24rpx 24rpx;
    background-color: #fff;

    .left {
      width: 450rpx;

      title {
        font-size: 30rpx;
        font-weight: 700;
        color: #333;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .rate-cate {
        margin-top: 16rpx;

        .at-rate__icon--half .at-rate__left,
        .at-rate__icon--on {
          color: #fc5500;
        }

        .power {
          color: #fc5500;
          margin-right: 45rpx;
          font-size: 30rpx;
          line-height: 30rpx;
        }

        .cate-name {
          width: 139rpx;
          height: 35rpx;
          color: #999;
          font-size: 24rpx;
          line-height: 35rpx;
          border-radius: 4rpx;
          text-align: center;
          background: #f6f6f6;
        }
      }

      .address {
        margin-top: 16rpx;
        font-size: 26rpx;
        color: #666;
      }

      .sale,
      .sale .icon-font {
        display: flex;
        align-items: center;
      }

      .sale {
        margin-top: 20rpx;

        .icon-font {
          color: #fd5401;
          font-size: 36rpx;
          height: 36rpx;
          justify-content: center;
          margin-right: 10rpx;
        }

        .count {
          font-size: 26rpx;
          color: #333;
          font-weight: 600;
          height: 26rpx;
          line-height: 26rpx;
        }
      }
    }

    .right {
      width: 200rpx;
      height: 150rpx;
      border-radius: 10rpx;
    }
  }

  .info,
  .info .left .rate-cate {
    display: flex;
    align-items: center;
  }

  .how {
    margin-top: 17rpx;
    border-radius: 10rpx;
    animation-delay: 0.15s;
    background-color: #fff;
    padding: 20rpx 20rpx 30rpx;

    .title {
      font-size: 30rpx;
      line-height: 30rpx;
      font-weight: 600;
      color: #333;
    }

    .items {
      display: flex;
      align-items: center;
      justify-content: space-around;
      margin-top: 30rpx;

      .icon-font {
        color: #fc5500;
        font-size: 36rpx;
      }

      .item {
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;

        .icon {
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #f5f5f5;
          width: 70rpx;
          height: 70rpx;
          border-radius: 35rpx;
        }

        .label {
          font-size: 22rpx;
          margin-top: 15rpx;
          height: 60rpx;
        }
      }
    }

    .icon-image {
      width: 70rpx;
      height: 70rpx;
    }

    .icon-dot-arrow {
      width: 40rpx;
    }
  }

  .list {
    .header {
      display: flex;
      align-items: center;
      height: 74rpx;
      padding: 0 4rpx;

      .icon {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        width: 30rpx;
        height: 30rpx;
        font-size: 22rpx;
        line-height: 22rpx;
        margin-right: 8rpx;
        border-radius: 4rpx;
        background: #f95f04;

        image {
          width: 70rpx;
          height: 70rpx;
        }
      }

      .title {
        font-size: 30rpx;
        line-height: 30rpx;
        font-weight: 600;
        color: #333;
      }
    }
  }
}
</style>
