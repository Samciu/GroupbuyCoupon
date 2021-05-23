<template>
  <view class="order-list">
    <view class="nav-bar row">
      <view
        v-for="item in statusList"
        :key="item.name"
        class="item row center"
        :class="{ active: status == item.value }"
        @click="changeStatus(item.value)"
        >{{ item.name }}</view
      >
    </view>
    <view class="list">
      <view class="item" v-for="(item, index) in list" :key="index">
        <view class="head b-b">
          <view class="num">订单号：{{ item.detail.order_no }}</view>
          <view class="time">{{ item.detail.pay_time }}</view>
        </view>
        <view class="detail">
          <view class="pic">
            <image :src="item.detail.pic" mode="widthFix"></image>
            <view class="tips">{{ item.incomeStatus }}</view>
          </view>
          <view class="desc">
            <view class="title">{{ item.detail.title }}</view>
            <view class="price-list">
              <view class="price-list-item">
                <view class="price-title">¥{{ item.detail.pay_price }}</view>
                <view class="tip">付款</view>
              </view>
              <view class="price-list-item">
                <view class="price-title">¥{{ item.income_money }}</view>
                <view class="tip">返现</view>
              </view>
            </view>
          </view>
        </view>
        <view class="footer">
          <view class="time"
            ><view v-if="item.income_at"
              >结算时间: {{ item.income_at }}</view
            ></view
          >
          <view class="type">{{ item.incomeType }}订单</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      page: 1,
      status: -1,
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.orderList.list,
      statusList: (state) => state.orderList.statusList,
    }),
  },
  onLoad() {
    this.orderListInit();
  },
  async onPullDownRefresh() {
    await this.changeStatus(this.status);
    uni.stopPullDownRefresh();
  },
  methods: {
    ...mapActions(["orderListInit", "fetchOrderList"]),

    /**
     * 页面上拉触底事件的处理函数
     */
    async onReachBottom() {
      await this.fetchOrderList({
        p: this.page + 1,
        status: this.status,
        push: true,
      });
      this.page++;
    },

    changeStatus(status) {
      this.page = 1;
      this.status = status;
      this.fetchOrderList({
        p: this.page,
        status,
      });
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 500,
      });
    },
  },
};
</script>

<style lang="scss">
page {
  background: #f3f3f3;
}

.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  justify-content: space-around;
  height: 76rpx;
  padding: 4rpx 0 4rpx;
  background-color: #fff;
  z-index: 10;

  .item {
    flex: 1;
    height: 100%;
    font-size: 32rpx;
    font-weight: 600;
    color: #333;
    position: relative;
    overflow: hidden;

    &.active {
      color: #ff536f;
      font-weight: 700;

      &:after {
        position: absolute;
        left: 50%;
        bottom: 0;
        transform: translateX(-28rpx);
        content: "";
        width: 56rpx;
        height: 4rpx;
        background-color: #ff536f;
        border-radius: 10px;
      }
      .mix-icon.active {
        color: #ff536f;
      }
    }
    /* #ifdef MP */
    &.last:before {
      content: "";
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 2rpx;
      height: 40rpx;
      box-shadow: 0 0 16rpx rgba(0, 0, 0, 0.6);
    }
    /* #endif */
  }
  .icon-wrap {
    display: flex;
    flex-direction: column;
    padding-left: 8rpx;
  }
  .mix-icon {
    font-size: 14rpx;
    color: #bbb;
  }
  .btn {
    height: 68rpx;
    padding-left: 16rpx;
    padding-right: 20rpx;

    .icon-hengxiangliebiao,
    .icon-shuxiangliebiao {
      font-size: 40rpx;
      color: #333;
    }
  }
}

.list {
  padding-top: 92rpx;

  .item {
    margin: 16rpx 24rpx;
    padding: 0 24rpx;
    background: #fff;
    font-size: 28rpx;

    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 8rpx 0;
      color: #666;
      font-size: 24rpx;
    }

    .detail {
      padding-top: 16rpx;
      display: flex;
      justify-content: space-between;

      .pic {
        position: relative;
        margin-right: 20rpx;
        width: 160rpx;
        height: 160rpx;

        image {
          width: 100%;
        }

        .tips {
          position: absolute;
          top: 0;
          left: 0;
          padding: 2rpx 8rpx;
          background: #ff304d;
          color: #fff;
          font-size: 24rpx;

          &.wait {
            background: #1ba71b;
          }
        }
      }

      .desc {
        flex: 1;

        .title {
          font-weight: 500;
        }

        .price-list {
          margin-top: 8rpx;
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: #f4f4f4;

          &-item {
            padding: 16rpx 0;
            text-align: center;

            .tip {
              padding-top: 8rpx;
              font-size: 24rpx;
            }
            .price-title {
              color: #ff304d;
              font-size: 28rpx;
            }
          }
        }
      }
    }

    .footer {
      padding-top: 20rpx;
      padding-bottom: 12rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .type,
      .time {
        font-size: 24rpx;
        color: #666;
      }
    }
  }
}
</style>
