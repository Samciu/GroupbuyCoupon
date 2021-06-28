<template>
  <view class="container">
    <view class="nav-bar">
      <view
        class="item"
        :class="{ active: item.id == tabNum }"
        v-for="(item, index) in statusBar"
        :key="index"
        @click="changeTab(item.id)"
        >{{ item.name }}</view
      >
    </view>
    <view class="order-list">
      <view class="order-list-item" v-for="(item, index) in list" :key="index">
        <view class="item-box b-b" @click="jumpToDetail(item)">
          <view class="head b-b">
            <image class="logo" mode="aspectFill" :src="item.product.logo" />
            <view class="name">{{ item.product.name }}</view>
            <view class="status" :class="{ close: item.status == 4 }">{{
              getStatusNameById(item.status)
            }}</view>
          </view>
          <view class="product">
            <image mode="aspectFill" :src="item.goods.thumb" />
            <view class="title">{{ item.goods.name }}</view>
            <view class="right">
              <view class="price">
                <text class="rmb">¥</text>{{ item.goods.price_str }}
              </view>
              <view class="num">x{{ item.num }}</view>
            </view>
          </view>
          <view class="price-info">
            <view class="price-item origin-price">
              总价
              <view class="price"
                ><text class="rmb">¥</text>{{ item.total_money_str }}</view
              >
            </view>
            <view class="price-item save-price">
              优惠
              <view class="price"
                ><text class="rmb">¥</text>{{ item.discount_money_str }}</view
              >
            </view>
            <view class="price-item total-price"
              >{{ item.status == 1 ? "需付款" : "实付款" }}
              <view class="price"
                ><text class="rmb">¥</text>{{ item.money_str }}</view
              >
            </view>
          </view>
        </view>

        <view class="footer" v-if="item.status == 1">
          <view class="btn" @click="orderCancel(item.out_trade_no)"
            >取消订单</view
          >
          <pay
            v-if="usePlugin"
            :args="args(item)"
            @paymentSuccess="paymentSuccess"
            @paymentFailed="paymentFailed"
          >
            <view class="btn btn-yellow">立即支付</view>
          </pay>
          <view v-else class="btn btn-yellow" @click="orderPay(item.out_trade_no)"
            >立即支付</view
          >
        </view>
        <view class="footer" v-if="item.status == 3">
          <view class="btn btn-yellow" @click="jumpToDetail(item)">去使用</view>
        </view>
      </view>
    </view>
    <view class="empty-box" v-if="isListEmpty">
      <empty-list text="暂无订单记录" />
    </view>
  </view>
</template>

<script>
import { getCardOrderList, getCardOrderCancel } from "@/request";
import config from "@/config";
import store from "@/store";

export default {
  data() {
    return {
      list: [],
      statusList: [
        { name: "全部", id: 0 },
        { name: "待付款", id: 1 },
        { name: "待发货", id: 2 },
        { name: "已完成", id: 3 },
        { name: "已关闭", id: 4, noShow: 1 },
        { name: "退款/售后", id: 5 },
        { name: "已退款", id: 6, noShow: 1 },
      ],
      tabNum: 0,
      p: 1,
      loading: false,
      isListEmpty: false,
      usePlugin: config.usePlugin
    };
  },
  computed: {
    getStatusNameById() {
      return (id) => this.statusList.find((item) => item.id == id).name;
    },
    statusBar() {
      return this.statusList.filter((item) => !item.noShow);
    },
    args() {
      return ({out_trade_no, money}) => ({
        fee: money, // 支付金额，单位为分
        paymentArgs: {
          out_trade_no,
          appid: config.Appid,
          token: store.state.token,
          paymentURL: `${config.baseUrl}/minapp/v1/card/order/confirm`,
        }, // 将传递到功能页函数的自定义参数
      })
    }
  },
  onLoad(option) {
    console.log("onLoad", option);
    const { status } = option;
    this.tabNum = status || 0;
    this.fetchCardOrderList();
  },
  onShow(e) {
    console.log("onShow", e);
    this.changeTab(this.tabNum);
  },
  methods: {
    async fetchCardOrderList() {
      const { p, tabNum } = this;
      const [err, res] = await getCardOrderList({
        p: 1,
        status: tabNum == 0 ? -1 : tabNum,
      });
      if (!err) {
        this.list = res.data.data;
        this.isListEmpty = res.data.data.length == 0;
      }
    },
    changeTab(index) {
      this.tabNum = index;
      this.p = 1;
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 500,
      });
      this.fetchCardOrderList();
    },

    onReachBottom() {
      this.addPage();
    },

    // 分页加载
    async addPage() {
      const { p, tabNum, loading } = this;
      if (loading) return;
      this.loading = true;
      const [err, res] = await getCardOrderList({
        p: p + 1,
        status: tabNum || -1,
      });
      if (!err) {
        this.list.push(...res.data.data);
        this.p = p + 1;
      }
      this.loading = false;
    },

    jumpToDetail({ out_trade_no }) {
      uni.navigateTo({
        url: `/pages/product/orderDetail?out_trade_no=${out_trade_no}`,
      });
    },

    async orderCancel(out_trade_no) {
      const [modalErr, modalRes] = await uni.showModal({
        title: "提示",
        content: "确定要取消订单吗？",
        confirmText: "确认",
        cancelText: "取消",
      });

      if (!modalRes.confirm) return;

      const [err, res] = await getCardOrderCancel({ out_trade_no });
      if (res.data.code == 200) {
        uni.showToast({
          title: "取消成功",
        });
        this.changeTab(this.tabNum);
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

    paymentSuccess() {
      uni.showToast({
        title: "支付成功"
      })
    },

    paymentFailed() {
      uni.showToast({
        icon: "none",
        title: "支付失败"
      })
    }
  },
};
</script>

<style lang="scss">
page {
  padding-bottom: 50rpx;
  background: #f2f2f2;
}
.nav-bar {
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 46rpx;
  background: #ffffff;
  z-index: 10;

  .item {
    position: relative;
    padding: 28rpx 0;
    font-size: 28rpx;

    color: #666666;
    line-height: 40rpx;

    &.active {
      color: #ec5959;

      &::after {
        position: absolute;
        content: "";
        display: block;
        height: 4rpx;
        width: 100%;
        bottom: 0;
        left: 0;
        background: linear-gradient(90deg, #ec5959 0%, #f77338 100%);
      }
    }
  }
}
.order-list {
  padding: 0 20rpx;
  padding-top: 100rpx;
}
.order-list-item {
  margin-top: 20rpx;
  background: #ffffff;
  border-radius: 20rpx;

  .head {
    display: flex;
    padding: 20rpx 32rpx;
    align-items: center;
    flex-direction: row;

    .logo {
      margin-right: 20rpx;
      width: 40rpx;
      height: 40rpx;
    }

    .name {
      flex: 1;
      font-size: 28rpx;
      color: #000000;
      line-height: 40rpx;
    }

    .status {
      padding: 0 18rpx;
      height: 36rpx;
      font-size: 24rpx;
      color: #ec5959;
      line-height: 36rpx;
      border-radius: 32rpx;
      border: 2rpx solid #ec5959;

      &.close {
        color: #999999;
        border-color: #999999;
      }
    }
  }

  .product {
    display: flex;
    padding: 0 32rpx;
    padding-top: 32rpx;

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
    display: flex;
    justify-content: flex-end;
    padding-top: 20rpx;
    padding-right: 32rpx;
    padding-bottom: 32rpx;

    .price-item {
      display: flex;
      font-size: 28rpx;
      color: #999999;
      line-height: 40rpx;

      .price {
        padding-left: 12rpx;
      }
      .rmb {
        font-size: 22rpx;
        padding-top: 2rpx;
        padding-right: 4rpx;
      }
    }
    .save-price {
      padding-left: 32rpx;
    }
    .total-price {
      padding-left: 32rpx;
      font-weight: 700;
      color: #000000;

      .price {
        color: #ec5959;
      }
    }
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    padding: 20rpx 0;
    padding-right: 32rpx;

    .btn {
      margin-left: 32rpx;
      padding: 6rpx 24rpx;
      border-radius: 32rpx;
      border: 2rpx solid #e5e5e5;
      font-size: 24rpx;
      color: #999999;
      line-height: 36rpx;

      &-yellow {
        padding: 8rpx 26rpx;
        color: #fff;
        background: linear-gradient(
          315deg,
          #f77c6d 0%,
          #fda26b 60%,
          #ffbd81 100%
        );
        border: none;
      }
    }
  }
}
</style>
