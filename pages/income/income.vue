<template>
  <view class="income">
    <view class="total-income">
      <view class="title">账户余额</view>
      <view class="money">¥ {{ overview.balance || "0.00" }}</view>
    </view>
    <view class="money-list">
      <view class="money-item">
        <view class="title">未结算收益</view>
        <view class="price">¥ {{ overview.waitIncome || "0.00" }}</view>
      </view>
      <view class="money-item">
        <view class="title">已提现</view>
        <view class="price">¥ {{ overview.hasWithdraw || "0.00" }}</view>
      </view>
      <view class="money-item">
        <view class="title">累计收益</view>
        <view class="price">¥ {{ overview.allIncome || "0.00" }}</view>
      </view>
    </view>
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
      <view class="price-list-item">
        <view></view>
        <view>订单数</view>
        <view>销售额</view>
        <view>收益</view>
      </view>
      <view class="price-list-item">
        <view>累计</view>
        <view>{{ sum.all.order_num || 0 }}</view>
        <view>¥ {{ sum.all.order_money || "0.00" }}</view>
        <view>¥ {{ sum.all.income_money || "0.00" }}</view>
      </view>
      <view class="price-list-item">
        <view>自推</view>
        <view>{{ sum.self.order_num || 0 }}</view>
        <view>¥ {{ sum.self.order_money || "0.00" }}</view>
        <view>¥ {{ sum.self.income_money || "0.00" }}</view>
      </view>
      <view class="price-list-item">
        <view>好友</view>
        <view>{{ sum.low.order_num || 0 }}</view>
        <view>¥ {{ sum.low.order_money || "0.00" }}</view>
        <view>¥ {{ sum.low.income_money || "0.00" }}</view>
      </view>
      <view class="price-list-item">
        <view>团队</view>
        <view>{{ sum.team.order_num || 0 }}</view>
        <view>¥ {{ sum.team.order_money || "0.00" }}</view>
        <view>¥ {{ sum.team.income_money || "0.00" }}</view>
      </view>
    </view>
    <view class="title">七日收益走势</view>
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
  },
};
</script>

<style lang="scss">
.total-income {
  padding: 30rpx;
  text-align: center;

  .money {
    font-size: 36rpx;
  }
}

.money-list {
  display: flex;
  justify-content: space-around;

  .money-item {
    text-align: center;
  }
}

.nav-bar {
  margin-top: 30rpx;
  display: flex;
  justify-content: space-around;

  .active {
    color: #ff536f;
    border-bottom: 1rpx solid #ff536f;
  }
}

.price-list {
  margin-top: 30rpx;
  display: flex;
  flex-direction: column;

  &-item {
    padding-bottom: 14rpx;
    display: flex;
    justify-content: space-around;
  }
}

.title {
  text-align: center;
  padding-top: 30rpx;
}
</style>
