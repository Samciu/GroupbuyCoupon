<template>
  <view class="income">
    <view class="income-bg">
      <uni-nav-bar
        left-icon="back"
        title="收益"
        status-bar="true"
        :border="false"
        :fixed="true"
        backgroundColor="linear-gradient(180deg, #ec5959 0%, #F06453 49%, #f16752 100%)"
        color="#ffffff"
        @clickLeft="back"
      ></uni-nav-bar>
      <view class="income-header">
        <view class="total-income">
          <view class="title">账户余额</view>
          <view class="money" @click="handlePayToolShow"
            >¥ {{ overview.balance || "0.00" }}
            <uni-icons type="arrowright" size="16" color="#fffff"></uni-icons
          ></view>
        </view>
        <view class="money-list">
          <view class="money-item">
            <view class="title">未结算收益</view>
            <view class="price">¥ {{ overview.waitIncome || "0.00" }}</view>
          </view>
          <view class="line"></view>
          <view class="money-item">
            <view class="title">已提现</view>
            <view class="price">¥ {{ overview.hasWithdraw || "0.00" }}</view>
          </view>
          <view class="line"></view>
          <view class="money-item">
            <view class="title">累计收益</view>
            <view class="price">¥ {{ overview.allIncome || "0.00" }}</view>
          </view>
        </view>
      </view>
    </view>
    <view class="circle">
      <view class="circle1"></view>
      <view class="circle2"></view>
    </view>
    <view class="income-table">
      <view class="nav-bar">
        <view
          class="item"
          :class="{ active: item.value == activeTab }"
          v-for="item in tabList"
          :key="item.value"
          @click="switchTab(item.value)"
          >{{ item.name }}</view
        >
      </view>
      <view class="price-list">
        <view class="price-list-item bold">
          <view style="opacity: 0">0</view>
          <view>累计</view>
          <view>自推</view>
          <view>好友</view>
          <view>团队</view>
        </view>
        <view class="price-list-item">
          <view>订单数</view>
          <view class="bold">{{ sum.all.order_num || 0 }}</view>
          <view class="bold">{{ sum.self.order_num || 0 }}</view>
          <view class="bold">{{ sum.low.order_num || 0 }}</view>
          <view class="bold">{{ sum.team.order_num || 0 }}</view>
        </view>
        <view class="price-list-item">
          <view>销售额</view>
          <view>¥ {{ sum.all.order_money || "0.00" }}</view>
          <view>¥ {{ sum.self.order_money || "0.00" }}</view>
          <view>¥ {{ sum.low.order_money || "0.00" }}</view>
          <view>¥ {{ sum.team.order_money || "0.00" }}</view>
        </view>
        <view class="price-list-item">
          <view>收益</view>
          <view>¥ {{ sum.all.income_money || "0.00" }}</view>
          <view>¥ {{ sum.self.income_money || "0.00" }}</view>
          <view>¥ {{ sum.low.income_money || "0.00" }}</view>
          <view>¥ {{ sum.team.income_money || "0.00" }}</view>
        </view>
      </view>
    </view>
    <view class="chart-title">七日收益走势</view>
    <charts />
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import charts from "./components/charts/charts.vue";
export default {
  components: { charts },
  data() {
    return {};
  },
  computed: {
    ...mapState({
      sum: (state) => state.income.incomeSum,
      overview: (state) => state.income.incomeOverview,
      tabList: (state) => state.income.tabList,
      activeTab: (state) => state.income.activeTab,
    }),
  },
  onLoad() {
    this.inComeInit();
  },
  methods: {
    ...mapActions(["inComeInit", "switchTab"]),
    
    back() {
      uni.navigateBack({
        delta: 1,
      });
    },

    handlePayToolShow() {
      uni.navigateTo({
        url: "/pages/withdraw/withdraw",
      });
    }
  },
};
</script>

<style lang="scss">
.income {
  padding-bottom: 60rpx;
}

.income-bg {
  background: linear-gradient(180deg, #ec5959 0%, #f56f4f 49%, #ff8743 100%);
}

.income-header {
  margin: 24rpx 32rpx 0;
  padding: 30rpx 16rpx 50rpx;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30rpx 30rpx 0 0;
  color: #ffffff;
}

.total-income {
  display: flex;
  flex-direction: column;
  align-items: center;

  .title {
    font-size: 32rpx;
    line-height: 44rpx;
  }

  .money {
    padding-top: 14rpx;
    display: flex;
    align-items: center;
    font-size: 56rpx;
    font-weight: 700;
    line-height: 80rpx;
  }
}

.money-list {
  margin-top: 26rpx;
  display: flex;
  justify-content: space-around;

  .money-item {
    text-align: center;

    .title {
      font-size: 28rpx;
      line-height: 40rpx;
    }
    .price {
      padding-top: 10rpx;
      font-size: 32rpx;
      font-weight: 700;
      line-height: 44rpx;
    }
  }
  .line {
    width: 1rpx;
    background: #fff;
  }
}

.circle {
  position: relative;
  z-index: 1;
  display: flex;
  margin-top: -100rpx;

  .circle1 {
    height: 100rpx;
    width: 50%;
    background: radial-gradient(
      900rpx 160rpx at right top,
      transparent 50%,
      #fff 50%
    );
  }
  .circle2 {
    height: 100rpx;
    width: 50%;
    background: radial-gradient(
      900rpx 160rpx at left top,
      transparent 50%,
      #fff 50%
    );
  }
}

.income-table {
  margin: 32rpx;
  padding: 32rpx 30rpx;
  padding-top: 0;
  background: #fff3f3;
  border: 2rpx solid #ff9e9e;
  box-shadow: 0 6rpx 6rpx rgba(0, 0, 0, 0.1);
  border-radius: 30rpx;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  font-size: 26rpx;
  line-height: 36rpx;
  color: #666666;
  border-bottom: 1rpx solid #ffcece;

  .item {
    padding: 32rpx 16rpx;
    padding-bottom: 14rpx;
  }

  .active {
    color: #ec5959;
    border-bottom: 1rpx solid #ec5959;
  }
}

.price-list {
  margin-top: 10rpx;
  display: flex;
  justify-content: space-between;
  font-size: 28rpx;
  line-height: 40rpx;
  color: #333333;

  &-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;

    > view {
      padding-top: 20rpx;
    }
  }

  .bold {
    font-weight: 700;
  }
}

.chart-title {
  margin-top: 40rpx;
  font-size: 30rpx;
  font-weight: 700;
  line-height: 42rpx;
  color: #333333;
  text-align: center;
}
</style>
