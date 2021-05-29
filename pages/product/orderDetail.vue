<template>
  <view class="container">
    <view class="banner-box" :class="{ close: detail.status == 4 }">
      <uni-nav-bar
        left-icon="back"
        status-bar="true"
        :border="false"
        :fixed="true"
        title="商品详情"
        :backgroundColor="
          detail.status != 4
            ? 'linear-gradient(180deg, #f8856b 0%, #fa8e6b 100%)'
            : 'linear-gradient(180deg, #e5e5e5 0%, #e5e5e5 0%, #d9d9d9 100%)'
        "
        color="#ffffff"
        @clickLeft="back"
      ></uni-nav-bar>
      <view class="order-status">
        <view class="status">{{
          ["未知", "待付款", "待发货", "已完成", "已关闭"][detail.status]
        }}</view>
      </view>
      <image
        class="pic"
        src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/ea480afb-a831-4f69-b9e9-0bde4d510871.png"
      />
    </view>
    <view class="product-container">
      <view
        class="card-code"
        v-for="(cardItem, index) in detail.card_code"
        :key="index"
      >
        <view class="title">卡号</view>
        <view class="code" @click="copy(cardItem.card_number)">{{cardItem.card_number}}</view>
        <view v-if="cardItem.card_pwd" style="margin-top: 32rpx">
          <view class="title">密码</view>
          <view class="code" @click="copy(cardItem.card_pwd, '密码')">{{cardItem.card_pwd}}</view>
        </view>
        <view class="time" v-if="cardItem.card_deadline">有效期至：{{ cardItem.card_deadline }}</view>
        <view class="btn" @click="copy(cardItem.card_number)">复制</view>
      </view>
      <view class="product-info">
        <view class="head b-b">
          <image class="logo" :src="detail.product.logo" />
          <view class="name">{{ detail.product.name }}</view>
        </view>
        <view class="product">
          <image mode="aspectFill" :src="detail.goods.thumb" />
          <view class="title">{{ detail.goods.name }}</view>
          <view class="right">
            <view class="price"
              ><text class="rmb">¥</text>{{ detail.goods.price_str }}</view
            >
            <view class="num">x{{ detail.num }}</view>
          </view>
        </view>
        <view class="price-info">
          <view class="price-info-item">
            <view class="name">商品总价：</view>
            <view class="price"
              ><text>¥</text>{{ detail.total_money_str }}</view
            >
          </view>
          <view class="price-info-item">
            <view class="name">优惠：</view>
            <view class="price coupon-price"
              >- <text> ¥</text>{{ detail.discount_money_str }}</view
            >
          </view>
        </view>
        <view class="footer b-t">
          <view class="name">{{
            detail.status == 1 ? "需付款" : "实付款"
          }}</view>
          <view class="price"
            ><text class="rmb">¥</text>{{ detail.money_str }}</view
          >
        </view>
      </view>
      <view class="order-info">
        <view class="head b-b">订单信息</view>
        <view class="order-info-list">
          <view class="order-info-item" v-if="detail.account">
            <view class="name">充值帐号：</view>
            <view class="desc">{{ detail.account }}</view>
          </view>
          <view class="order-info-item">
            <view class="name">订单编号：</view>
            <view class="desc">{{ detail.out_trade_no }}</view>
          </view>
          <view class="order-info-item">
            <view class="name">下单时间</view>
            <view class="desc">{{ detail.created_at }}</view>
          </view>
          <view class="order-info-item" v-if="detail.pay_at">
            <view class="name">支付时间：</view>
            <view class="desc">{{ detail.pay_at }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="btn-list" :class="{ finished: detail.status == 3 }">
      <view
        class="btn btn-cancel"
        v-if="detail.status == 1"
        @click="orderCancel(detail.out_trade_no)"
        >取消订单</view
      >
      <view
        class="btn btn-enter"
        v-if="detail.status == 1"
        @click="orderPay(detail.out_trade_no)"
        >立即支付</view
      >
      <view
        class="btn btn-enter"
        v-if="detail.status != 1"
        @click="jumpToGoodsDetail"
        >再来一单</view
      >
    </view>
  </view>
</template>

<script>
import { getCardOrderDetail, getCardOrderCancel } from "@/request";
import config from "@/config";
import store from "@/store";

export default {
  data() {
    return {
      detail: {},
    };
  },
  onLoad(option) {
    const { out_trade_no } = option;
    this.fetchCardOrderDetail({ out_trade_no });
  },
  methods: {
    async fetchCardOrderDetail(payload) {
      const [err, res] = await getCardOrderDetail(payload);
      this.detail = res.data.data;
    },
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },
    copy(code, name = "卡号") {
      uni.setClipboardData({
        data: code,
        success: function () {
          uni.showToast({
            title: `复制${name}成功`,
            icon: "none",
          });
        },
      });
    },
    async orderCancel(out_trade_no) {
      const [err, res] = await getCardOrderCancel({ out_trade_no });
      if (res.data.code == 200) {
        uni.showToast({
          title: "取消成功",
        });
        this.fetchCardOrderDetail({ out_trade_no });
      }
    },
    orderPay(out_trade_no) {
      const args = {
        paymentArgs: {
          out_trade_no,
          appid: config.Appid,
          token: store.state.token,
          paymentURL: `${config.baseUrl}/minapp/v1/card/order/confirm`,
        }, // 将传递到功能页函数的自定义参数
      };
      console.log(args);
      uni.navigateToMiniProgram({
        appId: "wx468ad252a66afc34",
        envVersion: "trial",
        path: `pages/pay/pay?args=${encodeURIComponent(JSON.stringify(args))}`,
      });
    },
    jumpToGoodsDetail() {
      uni.navigateTo({
        url: `/pages/product/checkout?gcode=${this.detail.goods.code}`,
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f2f2f2;
  padding-bottom: 50rpx;
}
.banner-box {
  position: relative;
  height: 360rpx;
  background: linear-gradient(360deg, #ffbd81 0%, #fda26b 0%, #f77c6d 100%);

  &.close {
    background: linear-gradient(360deg, #e5e5e5 0%, #e5e5e5 0%, #d9d9d9 100%);

    .order-status .status {
      color: #999999;
    }
  }

  .pic {
    position: absolute;
    right: 18rpx;
    bottom: 0;
    width: 182rpx;
    height: 182rpx;
  }
}
.order-status {
  padding: 20rpx 32rpx;

  .status {
    font-size: 40rpx;
    font-weight: 700;
    color: #ffffff;
    line-height: 56rpx;
  }
}
.product-container {
  position: relative;
  z-index: 1;
  margin-top: -28rpx;
  padding: 0 20rpx;
}
.card-code {
  margin-bottom: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;
  padding: 20rpx 32rpx;
  .title {
    font-size: 28rpx;
    color: #000000;
    line-height: 40rpx;
  }
  .code {
    margin-top: 22rpx;
    padding: 16rpx 32rpx;
    font-size: 42rpx;
    // font-weight: 700;
    color: #000000;
    line-height: 72rpx;
    background: rgba(247, 115, 56, 0.05);
    border-radius: 20px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .time {
    padding-top: 20rpx;
    font-size: 24rpx;
    color: #999999;
    line-height: 36rpx;
    text-align: center;
  }
  .btn {
    margin: 32rpx auto 0;
    width: 144rpx;
    height: 56rpx;
    line-height: 56rpx;
    background: linear-gradient(315deg, #f77c6d 0%, #fda26b 60%, #ffbd81 100%);
    border-radius: 28rpx;
    text-align: center;
    font-size: 24rpx;
    font-weight: 700;
    color: #ffffff;
  }
}
.product-info {
  background: #ffffff;
  border-radius: 20rpx;

  .head {
    display: flex;
    align-items: center;
    padding: 20rpx 32rpx;

    .logo {
      margin-right: 20rpx;
      width: 40rpx;
      height: 40rpx;
    }
  }

  .product {
    display: flex;
    padding: 32rpx 32rpx 0;

    image {
      margin-right: 20rpx;
      width: 160rpx;
      height: 160rpx;
      border-radius: 12rpx;
    }

    .title {
      flex: 1;
      padding-top: 6rpx;
      font-size: 28rpx;
      font-weight: 700;
      color: #000000;
      line-height: 44rpx;
    }
    .right {
      text-align: right;
    }
    .price {
      font-size: 36rpx;
      font-weight: 700;
      color: #000000;
      line-height: 56rpx;

      .rmb {
        font-size: 24rpx;
        padding-right: 4rpx;
        font-weight: 500;
        color: #000000;
        line-height: 48rpx;
      }
    }
    .num {
      font-size: 24rpx;
      color: #999999;
      line-height: 36rpx;
    }
  }

  .price-info {
    padding: 32rpx;
  }
  .price-info-item {
    padding-bottom: 20rpx;
    display: flex;
    justify-content: space-between;
    color: #999999;
    font-size: 24rpx;
    line-height: 36rpx;

    &:last-of-type {
      padding-bottom: 0;
    }

    .coupon-price {
      color: #ec5959;
    }
  }
  .footer {
    display: flex;
    padding: 24rpx 32rpx;
    font-size: 28rpx;
    font-weight: 700;
    color: #000;
    line-height: 40rpx;
    align-items: center;
    justify-content: flex-end;

    .price {
      padding-left: 12rpx;
      color: #ec5959;

      .rmb {
        font-size: 20rpx;
        padding-right: 4rpx;
      }
    }
  }
}
.order-info {
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;

  .head {
    padding: 20rpx 32rpx;
    font-size: 28rpx;
    color: #000000;
    line-height: 40rpx;
  }
  .order-info-list {
    padding: 32rpx;
    font-size: 28rpx;
    color: #999999;
    line-height: 36rpx;
  }
  .order-info-item {
    display: flex;
    justify-content: space-between;
    padding-bottom: 20rpx;

    &:last-of-type {
      padding-bottom: 0;
    }
  }
}
.btn-list {
  display: flex;
  padding-top: 32rpx;
  margin: 0 auto;
  width: 710rpx;

  &.finished {
    padding-top: 20rpx;
  }

  .btn {
    box-sizing: border-box;
    flex: 1;
    border-radius: 40px;
    height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    font-weight: 500;
  }
  .btn-cancel {
    margin-right: 32rpx;
    line-height: 78rpx;
    border: 1px solid #999999;
    color: #999999;
  }
  .btn-enter {
    line-height: 80rpx;
    background: linear-gradient(315deg, #f77c6d 0%, #fda26b 50%, #ffbd81 100%);
    color: #ffffff;
  }
}
</style>
