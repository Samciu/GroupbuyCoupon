<template>
  <view class="withdraw-list">
    <view class="item b-b" v-for="(item, index) in list" :key="index">
      <view class="left">
        <view class="status">{{
          ["未知", "提现成功", "提现失败", "审核中", "拒绝", "打款中"][
            item.status
          ]
        }}</view>
        <view class="time">{{ item.updated_at }}</view>
      </view>
      <view class="right">
        <view class="money" :class="{ sucess: item.status == 1 }">
          {{ item.status == 1 ? "-" : "" }}{{ item.status == 2 ? "+" : "" }}
          {{ item.realMoney }}
        </view>
      </view>
    </view>
	<view class="empty-box" v-if="isListEmpty">
		<empty-list text="暂无提现记录" />
	</view>
  </view>
</template>

<script>
import { getWithdrawList } from "@/request";
export default {
  data() {
    return {
      list: [],
      isListEmpty: false,
    };
  },
  async onLoad() {
    const [err, res] = await getWithdrawList();
    this.list = res.data.data;
    if (res.data.data.length == 0) {
      this.isListEmpty = true;
    }
  },
  methods: {},
};
</script>

<style lang="scss">
.withdraw-list {
  .item {
    display: flex;
    padding: 32rpx;
    align-items: center;
    justify-content: space-between;
  }
  .left {
    .time {
      margin-top: 8rpx;
      font-size: 28rpx;
      color: #666;
    }
  }
  .money {
    font-size: 40rpx;

    &.sucess {
      color: #ec5959;
    }
  }

  .empty-box {
	  position: fixed;
	  width: 100%;
	  height: 100%;
	  display: flex;
	  align-items: center;
	  justify-content: center;
  }
}
</style>
