<template>
  <view class="checkout">
    <view class="product-wrap">
      <view class="head" v-if="product">
        <image class="logo" :src="product.logo" />
        <view class="title">{{ product.name || "" }}</view>
      </view>
      <view class="product">
        <view class="pic">
          <image mode="aspectFill" :src="goods.thumb" />
        </view>
        <view class="content">
          <view class="info">
            <view class="title">{{ goods.name || "" }}</view>
            <view class="current-price">
              <text class="rmb">¥</text>{{ goods.price_str || "0.00" }}
            </view>
          </view>
          <view class="num">共{{ num }}件</view>
        </view>
      </view>
    </view>
    <view class="checkout-info">
      <view class="title">购买信息</view>
      <view class="list-info b-b">
        <view class="list-info-item">
          <view class="name">商品单价</view>
          <view class="price"
            ><view class="rmb">¥</view>{{ goods.price_str || "0.00" }}</view
          >
        </view>
        <view class="list-info-item">
          <view class="name">购买数量</view>
          <view class="control">
            <view class="subtract" @click="sub"></view>
            <view class="num">{{ num }}</view>
            <view class="add" @click="add"></view>
          </view>
        </view>
        <view class="list-info-item" v-if="goods.type == 2">
          <view class="name">充值账号</view>
          <view class="control b-b" style="text-align: right;padding: 12rpx 0">
            <input v-model="account" placeholder="请输入充值账号" />
          </view>
        </view>
      </view>
      <view class="total">
        合计：<view class="total-price"
          ><text class="rmb">¥</text
          >{{ goods.price ? (goods.price * num) / 100 : "0.00" }}</view
        >
      </view>
    </view>
    <!-- <pay :args="args" @paymentSuccess="paymentSuccess" @paymentFailed="paymentFailed">
      <view class="pay-btn" @click="makeOrder">提交订单</view>
    </pay> -->
    <view class="pay-btn" @click="makeOrder">去收银台</view>
  </view>
</template>

<script>
import { getOrderSku, getOrderConfirm } from "@/request";
import config from "@/config";
import { mapState } from "vuex";

export default {
  data() {
    return {
      goods: {},
      product: null,
      num: 1,
      account: "",
      timeout: null, // 防抖定时器
    };
  },
  computed: {
    ...mapState(['token']),

    args() {
      const { num, goods, token, account } = this;
      return {
        fee: goods.price * num, // 支付金额，单位为分
        paymentArgs: {
          goods_price: goods.price,
          gcode: goods.code,
          num,
          account,
          appid: config.Appid,
          token,
          paymentURL: `${config.baseUrl}/minapp/v1/card/order/confirm`,
        }, // 将传递到功能页函数的自定义参数
        currencyType: "CNY", // 货币符号，页面显示货币简写 US$
      };
    },
  },
  onLoad: function (option) {
    const { gcode } = option;
    this.fetchOrderSku(gcode);
  },
  onShow(e) {
    console.log("onShow", e);
  },
  methods: {
    async fetchOrderSku(gcode) {
      const [err, res] = await getOrderSku({ gcode });
      this.goods = res.result.data.goods;
      this.product = res.result.data.product;
    },
    async makeOrder() {
      // 做个防抖
      if (this.timeout) clearTimeout(this.timeout);
      const callNow = !this.timeout;
      this.timeout = setTimeout(() => {
        this.timeout = null;
      }, 500);
      if (callNow) {
        console.log(this.args)
        if (!this.account && this.goods.type == 2) {
          uni.showToast({
            title: "请输入充值账号",
            icon: "none"
          })
          return
        }
        uni.navigateToMiniProgram({
          appId: "wx468ad252a66afc34",
          path: `pages/pay/pay?args=${encodeURIComponent(
            JSON.stringify(this.args)
          )}`,
        });
      }
    },
    sub() {
      if (this.num == 1) return;
      this.num = this.num - 1;
    },
    add() {
      this.num = this.num + 1;
    },
    paymentSuccess(data) {
      console.log("paymentSuccess1", data);
    },
    paymentFailed(data) {
      console.log("paymentFailed2", data);
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f2f2f2;
}
.checkout {
  padding: 32rpx 20rpx;
}
.product-wrap {
  margin-bottom: 20rpx;
  padding: 16rpx 32rpx 28rpx;
  background: #ffffff;
  border-radius: 20rpx;

  .head {
    display: flex;
    align-items: center;
    color: #999999;
    font-size: 28rpx;
    line-height: 44rpx;

    .logo {
      display: block;
      margin-right: 12rpx;
      width: 32rpx;
      height: 32rpx;
    }
  }
}
.product {
  display: flex;
  align-items: center;
  padding-top: 28rpx;

  .pic {
    position: relative;
    width: 160rpx;
    height: 160rpx;

    image {
      width: 100%;
      height: 100%;
      border-radius: 8rpx;
    }
  }

  .content {
    flex: 1;
    padding-left: 20rpx;
    display: flex;
    align-items: center;

    .title {
      font-size: 32rpx;
      font-weight: 700;
      color: #000000;
      line-height: 48rpx;
    }

    .current-price {
      padding-top: 32rpx;
      font-size: 56rpx;
      font-weight: 700;
      color: #ec5959;
      line-height: 72rpx;

      .rmb {
        padding-right: 4rpx;
        font-size: 32rpx;
        font-weight: 500;
        line-height: 48rpx;
      }
    }

    .info {
      flex: 1;
    }
    .num {
      font-size: 24rpx;
      color: #999999;
      line-height: 32rpx;
    }
  }
}
.checkout-info {
  margin-top: 20rpx;
  padding: 0 30rpx;
  background: #ffffff;
  border-radius: 16rpx;

  .title {
    padding-top: 36rpx;
    font-size: 30rpx;
    font-weight: 500;
    color: #000000;
    line-height: 42rpx;
  }

  .list-info {
    padding-top: 36rpx;

    &-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 32rpx;
      white-space: nowrap;

      .name {
        font-size: 28rpx;

        color: #666666;
        line-height: 40rpx;
      }

      .price {
        display: flex;

        font-size: 28rpx;
        font-weight: 500;
        color: #000000;
        line-height: 40rpx;

        .rmb {
          font-weight: 400;
        }
      }

      .control {
        display: flex;
        align-items: center;

        .num {
          margin: 0 16rpx;
          width: 72rpx;
          height: 40rpx;
          line-height: 40rpx;
          text-align: center;
          background: #f8f8f8;
          border-radius: 4rpx;
          font-size: 28rpx;
          font-weight: 500;
          color: #000000;
          line-height: 40rpx;
        }
      }
    }
  }

  .total {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 34rpx 0;

    .total-price {
      font-size: 40rpx;
      font-weight: 700;
      color: #ec5959;
      line-height: 60rpx;

      .rmb {
        padding-right: 4rpx;
        font-size: 28rpx;
      }
    }
  }
}

.add,
.subtract {
  width: 46rpx;
  height: 46rpx;
}

.add {
  // https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/ebd04270-70bb-41e0-89dc-17c12137cbd2.png
  background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/8b325d3f-5020-4f11-b192-043c10402dba.png) no-repeat center/contain;
}
.subtract {
  // https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/d388eea6-9e91-4aa4-b5af-58a45ff2fdd6.png
  background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/267a9f5f-1e1c-466e-a91f-ba48c74cba53.png) no-repeat center/contain;
}

.pay-btn {
  position: fixed;
  bottom: 80rpx;
  width: 710rpx;
  height: 80rpx;
  background: linear-gradient(315deg, #f77c6d 0%, #fda26b 50%, #ffbd81 100%);
  border-radius: 40rpx;
  text-align: center;
  line-height: 80rpx;
  color: #fff;
}
</style>
