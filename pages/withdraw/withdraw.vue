<template>
  <view class="wrapper">
    <view class="balance">
      <view class="balance-head">
        <view class="balance-head-title"> 余额(元) </view>
        <view class="balance-head-detail">
          余额明细
          <view class="iconfont iconiconfontjiantou2"> </view>
        </view>
      </view>
      <view class="balance-money">
        {{ balance || "0.00" }}
      </view>
    </view>
    <view class="list">
      <view class="list-head">
        <view class="list-head-title"> 选择提现金额 </view>
        <!-- <view class="list-head-detail">
					提现记录
					<view class="iconfont iconiconfontjiantou2">
						
					</view>
				</view> -->
      </view>
      <view class="list-items">
        <view
          :class="['list-items-item', index == itemIndex ? 'active' : '']"
          v-for="(item, index) in list"
          :key="index"
          @click="choose(index)"
        >
          {{ item }}元
          <view class="list-items-item-border" v-show="index == itemIndex">
            <view class="list-items-item-border-bg"></view>
            <view class="list-items-item-border-img iconfont iconxuanze"></view>
          </view>
        </view>
      </view>
      <view class="list-head list-head2">
        <view class="list-head-title"> 提现方式 </view>
      </view>
      <view class="list-type">
        <view class="list-type-wx">
          <image
            src="/static/withdraw/wechat.jpg"
            mode=""
            class="list-type-wx-icon"
          ></image>
          <view class="list-type-wx-name">微信零钱</view>
          <image
            src="/static/withdraw/withdraw-choose.jpg"
            mode=""
            class="list-type-wx-choose"
          ></image>
        </view>
      </view>
      <view class="list-btn" @click="handleWithdrawDo"> 申请提现 </view>
    </view>
    <view class="tips">
      <view class="tips-head">
        <view class="tips-head-title"> 提现说明 </view>
      </view>
      <view class="tips-items">
        <view
          class="tips-items-item"
          v-for="(item, index) in tips"
          :key="index"
        >
          {{ index + 1 }}. {{ item }}
        </view>
      </view>
    </view>
    <pay-user-info
      :show="show"
      :titleText="titleText"
      :buttonText="buttonText"
      @loginSuccess="loginSuccess"
      @loginFail="loginFail"
    ></pay-user-info>
  </view>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";
export default {
  data() {
    return {
      itemIndex: 0,
      show: false,
      titleText: "首次提现需进行登陆验证",
      buttonText: "确定",
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.withdraw.list,
      tips: (state) => state.withdraw.tips,
      balance: (state) => state.withdraw.balance,
    }),
  },
  onLoad() {
    this.fetchWithdrawInfo();
  },
  methods: {
    ...mapActions(["fetchWithdrawInfo", "withdrawDo"]),

    choose(index) {
      this.itemIndex = index;
    },
    async handleWithdrawDo() {
      console.log({ money: this.list[this.itemIndex] });
      const data = await this.withdrawDo({ money: this.list[this.itemIndex] });
      const { code } = data;
	  // 返回 401，需要跳转插件
      if (code == 401) {
        this.show = true;
      } else if (code != 200 && data.msg) {
        uni.showToast({
          icon: "none",
          title: data.msg,
          duration: 2000,
        });
      } else if (code == 200) {
        uni.showToast({
          title: "提现申请成功",
          duration: 2000,
        });
        setTimeout(() => {
          uni.redirectTo({
            url: "/pages/withdraw/withdraw",
          });
        }, 2000);
      }
    },

    async loginSuccess(res) {
      this.show = false;
      const data = await this.fetchPayToolUserLogin({ code: res.detail.code });

      if (data.data.code == 200) {
        uni.showToast({
          title: "登陆校验成功",
          duration: 2000,
        });
      }

      if (data.data.msg) {
        uni.showToast({
          icon: "none",
          title: res.msg,
          duration: 2000,
        });
      }
    },

    loginFail(res) {
      console.log("loginFail", res);
    },
  },
};
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}
.balance {
  background-color: #ffffff;
  padding: 30rpx;
  &-head {
    display: flex;
    font-size: 36rpx;
    margin-bottom: 20rpx;
    &-detail {
      color: #4e62fb;
      font-size: 32rpx;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
  &-money {
    font-size: 80rpx;
  }
}
.list {
  background-color: #ffffff;
  padding: 30rpx;
  margin-top: 30rpx;
  &-head {
    display: flex;
    font-size: 36rpx;
    margin-bottom: 20rpx;
    &-detail {
      color: #4e62fb;
      font-size: 32rpx;
      margin-left: auto;
      display: flex;
      align-items: center;
    }
  }
  &-items {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    &-item {
      width: 216rpx;
      height: 100rpx;
      border: 1px solid #d5d5d7;
      color: #959597;
      box-sizing: border-box;
      border-radius: 10rpx;
      margin-top: 20rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 500;
      position: relative;
      overflow: hidden;
      &.active {
        border-color: #4e62fb;
        color: #4e62fb;
      }
      &-border {
        position: absolute;
        top: 0;
        left: 0;
        width: 50rpx;
        height: 50rpx;
        z-index: 9;
        &-bg {
          width: 0;
          height: 0;
          border-top: 50rpx solid #4e62fb;
          border-right: 50rpx solid transparent;
        }
        &-img {
          position: absolute;
          top: 0;
          left: 0;
          z-index: 99;
          color: #ffffff;
          font-size: 28rpx;
        }
      }
    }
  }
  &-head2 {
    margin-top: 30rpx;
  }
  &-type {
    display: flex;
    &-wx {
      display: flex;
      align-items: center;
      background-color: #f8f8f8;
      height: 100rpx;
      border: 1px solid #d5d5d7;
      color: #959597;
      box-sizing: border-box;
      border-radius: 10rpx;
      padding: 0 30rpx;
      &-icon {
        width: 44rpx;
        height: 44rpx;
        display: block;
      }
      &-name {
        margin: 0 50rpx 0 5rpx;
      }
      &-choose {
        width: 30rpx;
        height: 30rpx;
        display: block;
      }
    }
  }
  &-btn {
    background: linear-gradient(90deg, #4e62fb, #7b89f5);
    height: 80rpx;
    line-height: 80rpx;
    border-radius: 80rpx;
    margin-top: 60rpx;
    text-align: center;
    color: #ffffff;
  }
}
.tips {
  background-color: #ffffff;
  padding: 30rpx;
  margin-top: 30rpx;
  &-head {
    display: flex;
    font-size: 36rpx;
    margin-bottom: 20rpx;
  }
  &-items {
    color: #9e9e9e;
    &-item {
      font-size: 30rpx;
    }
  }
}
</style>
