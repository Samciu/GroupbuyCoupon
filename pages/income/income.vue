<template>
  <view class="income">
    <view class="total-income">
      <view class="title">账户余额</view>
      <view class="money">¥ 99999</view>
    </view>
    <view class="money-list">
      <view class="money-item">
        <view class="title">未结算收益</view>
        <view class="price">¥ 999</view>
      </view>
      <view class="money-item">
        <view class="title">已提现</view>
        <view class="price">¥ 999</view>
      </view>
      <view class="money-item">
        <view class="title">累计收益</view>
        <view class="price">¥ 999</view>
      </view>
    </view>
    <view class="nav-bar">
      <view class="item active">今日</view>
      <view class="item">昨日</view>
      <view class="item">本月</view>
      <view class="item">上月</view>
      <view class="item">总计</view>
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
        <view>56</view>
        <view>¥ 999</view>
        <view>¥ 999</view>
      </view>
      <view class="price-list-item">
        <view>自推</view>
        <view>12</view>
        <view>¥ 999</view>
        <view>¥ 999</view>
      </view>
      <view class="price-list-item">
        <view>好友</view>
        <view>20</view>
        <view>¥ 999</view>
        <view>¥ 999</view>
      </view>
      <view class="price-list-item">
        <view>团队</view>
        <view>30</view>
        <view>¥ 999</view>
        <view>¥ 999</view>
      </view>
    </view>
	<charts />
  </view>
</template>

<script>
import { mapState, mapActions } from "vuex";
import charts from './components/charts/charts.vue';
export default {
  components: { charts },
  data() {
    return {};
  },
  onLoad() {
    this.inComeInit();
  },
  methods: {
    ...mapActions(["inComeInit"]),
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
</style>
