<template>
  <view class="body_content">
    <!-- <view class="activity_top">
      <view class="activity_top_title">免费领会员</view>
      <view class="receives">
        <view class="receives_left" >
         
        </view>
        <view class="receives_rule_btn">活动规则</view>
      </view>
      <view class="card_title">打卡送会员</view>
      <view class="card_title_info"># 超级吃货卡 #</view>
      <view class="card_title_desc"
        >含<text class="card_title_desc_red">4</text>张无门槛红包</view
      >
      <view class="card_title_time">活动时间：{{ task_time }}</view>
    </view> -->
    <view class="banner-wrap">
      <view class="banner" />
    </view>
    <view class="tips-bar">
      <wyb-noticeBar
        :text="info.tips"
        type="vert"
        :show-more="false"
        class="notice-box"
        bgColor="#fcf6ea"
        color="#b03d19"
        width="343"
        height="78"
        font-size="28"
        v-if="info.tips.length"
      />
    </view>
    <view class="task">
      <view class="task_top"
        >本期活动时间：{{ info.period.monthStart }}-{{
          info.period.monthLast
        }}</view
      >
      <view class="task_content">
        <view class="task_first">
          <view class="task_first_top">
            <view class="task_first_top_left">
              <image
                class="task_first_top_icon"
                mode="aspectFill"
                src="https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/5a9bcf2f-d347-4a1e-a5f1-215b358c53b5.png"
              ></image>
              <view class="task_first_top_title">
                累计打卡<text class="task_first_top_title_red">{{
                  info.user.signAllCount
                }}</text
                >天
              </view>
              <view class="task_first_top_score">
                <text class="redcolor">{{ info.user.signMonthCount }}</text
                >/30
              </view>
            </view>
            <view v-if="user.info.isComplete" class="task_first_top_status task_first_top_status_red">已完成</view>
            <view v-else class="task_first_top_status task_first_top_status_red">未完成</view>
          </view>
          <view class="task_first_content">
            <view v-if="info.user.hasSign" class="today_title today_title_gray">今日已打卡 明日再来哦</view>
            <view v-else class="today_title">今日未打卡</view>
            <view class="today_desc"
              >点击下方立即领取，成功领取外卖红包，即打卡成功</view
            >
            <view class="part1">
              <block v-for="(item, index) in info.taskSignList" :key="index">
                <view class="line" v-if="index > 0"></view>
                <view class="item" @click="jump(item)">
                  <image class="" :src="item.logo"></image>
                  <text class="">{{ item.name }}</text>
                  <view class="btn-black">立即领取</view>
                </view>
              </block>
            </view>
          </view>
        </view>
        <!-- <view class="task_second">
          <view class="task_second_top">
            <view class="task_second_top_left">
              <image
                class="task_second_top_icon"
                mode="aspectFill"
                src="../../images/activity_icon_2.png"
              ></image>
              <view class="task_second_top_title">
                活动期间完成<text class="task_second_top_title_red">33</text
                >单
              </view>
              <view class="task_second_top_score">
                <text class="redcolor">2</text>/3
              </view>
            </view>
            <view
              class="task_second_top_status task_second_top_status_red"
              >已完成</view
            >
          </view>
          <view class="buy_three">去下单</view>
        </view> -->
      </view>
    </view>
    <view class="exchange_btn" @click="exchange">兑换会员</view>
    <view class="exchange_users"
      >已有<text class="exchange_users_red">{{ info.getNum }}</text
      >人兑换了会员</view
    >
    <view class="rules" @click="openPopup">活动规则</view>
    <uni-popup id="popup" ref="popup" type="bottom" animation="true">
      <rulesBox @closePopup="closePopup" :rules="info.rules" />
    </uni-popup>
    <uni-popup id="contact" ref="contact" type="bottom" animation="true">
      <contactBox @closeExchange="closeExchange" :rules="info.rules" />
    </uni-popup>
  </view>
</template>

<script>
import { getTaskSignInfo, getTaskSignDo } from "@/request";
import rulesBox from './components/rulesBox/rulesBox.vue'
import contactBox from './components/contactBox/contactBox.vue'

export default {
  data() {
    return {
      info: {},
    };
  },
  components: {
    rulesBox, contactBox
  },
  onLoad() {
    
  },
  onShow(e) {
    console.log("onShow", e);
    this.getTaskSignInfo();
  },
  methods: {
    async getTaskSignInfo() {
      const [err, res] = await getTaskSignInfo();
      this.info = res.data.data;
    },

    async getTaskSignDo(data) {
      const [err, res] = await getTaskSignDo(data);
    },

    async jump(item) {
      const [err, res] = await uni.navigateToMiniProgram({
        appId: item.package.minapp.appid,
        path: item.package.minapp.path,
      });
      if (res?.errMsg == "navigateToMiniProgram:ok") {
        this.getTaskSignDo({
          taskScene: item.platform,
        });
      }
    },

    openPopup() {
      this.$refs.popup.open();
    },
    closePopup() {
      this.$refs.popup.close();
    },

    exchange() {
      if (this.info.user.isComplete) {
        this.$refs.contact.open();
      } else {
        uni.showToast({
          title: "条件尚不满足",
          icon: "none"
        })
      }
    },

    closeExchange() {
      this.$refs.contact.close();
    }
  },
};
</script>

<style lang="scss">
page {
  background: #f9f9f9;
  height: 100%;
}

.banner-wrap {
  padding-top: 100rpx;
}
.banner {
  width: 750rpx;
  height: 216rpx;
  background: url(https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/fff3c9c9-1605-4a86-b3ee-243ec92bf015.png)
    no-repeat center/contain;
}
.body_content {
  min-height: 100vh;
  background: url("https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf26384b-87c0-45b4-a7e2-8a03c1243555/e3e48879-f9bb-4245-a436-21f19bd5d8ea.jpg")
    no-repeat;
  background-size: 100%;
  background-color: #fe7853;
  padding-bottom: calc(env(safe-area-inset-bottom) + 48rpx);
}

.tips-bar {
  box-sizing: border-box;
  margin: 0 auto;
  margin-top: 40rpx;
  box-shadow: 0 0 24rpx rgba(0, 0, 0, 0.06);
}

.rules {
    padding: 6rpx 24rpx;
    position: fixed;
    top: 50rpx;
    right: 0;
    background: #ffe8ac;
    color: #b03d19;
    font-size: 26rpx;
}

.task {
  width: 686rpx;
  height: auto;
  margin: 40rpx auto 0;
  border-radius: 36rpx;
  overflow: hidden;
  box-shadow: 0 0 24rpx rgba(0, 0, 0, 0.06);
}
.task_top {
  color: #ab6700;
  font-size: 32rpx;
  display: flex;
  justify-content: center;
  background: #ffe8ac;
  height: 88rpx;
  padding-top: 12rpx;
}
.task_content {
  background: #fff;
  border-radius: 24rpx 24rpx 5rpx 5rpx;
  padding: 30rpx;
  margin-top: -30rpx;
  box-shadow: 0 0 24rpx rgba(0, 0, 0, 0.06);
}
.task_first {
  display: flex;
  flex-direction: column;
}
.task_first_top {
  justify-content: space-between;
}
.task_first_top,
.task_first_top_left {
  display: flex;
  align-items: center;
}
.task_first_top_left {
  .task_first_top_icon {
    width: 32rpx;
    height: 32rpx;
  }
  .task_first_top_title {
    display: flex;
    align-items: center;
    // color: #1d1d60;
    font-size: 30rpx;
    font-weight: 700;
    margin-left: 20rpx;
    .task_first_top_title_red {
      color: #ec5959;
      font-weight: 700;
      padding: 0 6rpx;
    }
  }
  .task_first_top_score {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    margin-left: 20rpx;
    font-weight: 400;
  }
}
.task_first_top_status {
  color: #999;
  font-size: 28rpx;
}
.task_first_top_status_red {
  color: #ec5959;
}
.task_first_content {
  display: flex;
  flex-direction: column;
  align-items: center;
  // background: linear-gradient(90deg,#f5f7fa,#c3cfe2);
  border-radius: 10rpx;
  margin-top: 30rpx;
}
.today_title {
  // color: #1d1d60;
  font-size: 48rpx;
  font-weight: 700;
  margin-top: 20rpx;
}
.today_title_gray {
  opacity: 0.4;
  filter: alpha(opacity=40);
}
.today_desc {
  padding-top: 8rpx;
  color: #999;
  font-size: 24rpx;
}

.task_second {
  display: flex;
  flex-direction: column;
  margin-top: 50rpx;
}
.task_second_top {
  justify-content: space-between;
}
.task_second_top,
.task_second_top_left {
  display: flex;
  align-items: center;
}
.task_second_top_left {
  .task_second_top_icon {
    width: 32rpx;
    height: 32rpx;
  }
  .task_second_top_title {
    display: flex;
    align-items: center;
    color: #1d1d60;
    font-size: 30rpx;
    font-weight: 700;
    margin-left: 20rpx;
    .task_second_top_title_red {
      color: #ec5959;
      font-weight: 700;
    }
  }
  .task_second_top_score {
    display: flex;
    align-items: center;
    color: #999;
    font-size: 28rpx;
    margin-left: 20rpx;
    font-weight: 400;
  }
}
.task_second_top_status {
  color: #999;
  font-size: 28rpx;
}
.task_second_top_status_red {
  color: #ec5959;
}
.task_second_content {
  padding: 0;
  outline: none;
  border: 0;
  background: #fff;
  justify-content: space-between;
  margin: 40rpx 0 0;
  &::after {
    outline: none;
    border: none;
  }
}
.task_second_content,
.task_second_content_users {
  display: flex;
  align-items: center;
}
.task_second_content_users {
  .task_second_content_users_avatar {
    width: 80rpx;
    height: 80rpx;
    border-radius: 40rpx;
    margin-right: 50rpx;
  }
}
.task_second_content_btn {
  padding: 0;
  margin: 0;
  outline: none;
  color: #1d1d60;
  font-size: 30rpx;
  font-weight: 700;
  width: 144rpx;
  height: 64rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rpx;
  border: 2rpx solid #1d1d60;
  background: #fff;
}
.task_second_content_btn_gray {
  background: #eee;
  color: #ccc;
  border: 2rpx solid #eee;
  &:active {
    opacity: 0.8;
    filter: alpha(opacity=80);
  }
}
.exchange_btn {
  margin: 0 auto;
  margin-top: 40rpx;
  width: 686rpx;
  height: 100rpx;
  line-height: 100rpx;
  text-align: center;
  background: linear-gradient(180deg, #ffe8ac, #ffd875);
  border-radius: 50rpx;
  font-weight: 700;
  font-size: 36rpx;
  color: #ab6700;
  box-shadow: 0 0 24rpx rgba(0, 0, 0, 0.06);
  &:active {
    opacity: 0.8;
    filter: alpha(opacity=80);
  }
}
.exchange_users {
  color: #fff;
  font-size: 28rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30rpx;
}
.exchange_users_red {
  // color: #ec5959;
  font-size: 28rpx;
  font-weight: 700;
  padding: 0 6rpx;
}
.buy_three {
  width: 100%;
  height: 65rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5rpx;
  font-size: 28rpx;
  border: 1rpx solid #1a1b60;
  color: #1a1b60;
  margin-top: 30rpx;
}
.redcolor {
  color: #ec5959;
}

.part1 {
  display: flex;
  padding: 40rpx 0 20rpx;
  width: 100%;
  // background-color: #fff;

  justify-content: space-between;
  box-sizing: border-box;

  .item {
    display: flex;
    align-items: center;
    flex-direction: column;

    justify-content: center;

    flex: 1;
    image {
      width: 144rpx;
      height: 144rpx;
    }
    text {
      font-weight: 700;
      font-size: 36rpx;
      line-height: 50rpx;
      color: #000;
      margin: 16rpx 0;
    }
    .btn-black {
      width: 224rpx;
      height: 84rpx;
      border-radius: 46rpx;
      line-height: 84rpx;
      font-size: 32rpx;
      text-align: center;
      background: #ec5959;
      color: #fff;
    }
  }
  .line {
    width: 1rpx;
    height: 350rpx;
    background-color: #e8e8e8;
  }
}
</style>
