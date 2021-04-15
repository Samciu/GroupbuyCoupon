<template>
  <view class="team">
    <view class="team-search">
      <view class="left">
        <uni-icons class="icon" type="search" size="24" color="#999999" />
        <input placeholder="请输入关键字" />
      </view>
      <view class="button">搜索</view>
    </view>
    <view class="nav-bar">
      <view class="nav-item">会员</view>
      <view class="nav-item">经理</view>
      <view class="nav-item">总监</view>
      <view class="nav-item">合伙人</view>
    </view>
    <view class="member-list">
      <view class="member-list-item">
        <view class="detail b-b">
          <image
            mode="aspectFix"
            class="pic"
            src="https://img1.baidu.com/it/u=1483731740,4186543320&fm=26&fmt=auto&gp=0.jpg"
          />
          <view class="desc">
            <view class="name">阿克苏河的</view>
            <view class="time">注册日期：2018-06-18</view>
          </view>
          <view class="level">总监</view>
        </view>
        <view class="income-detail">
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">今日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">昨日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">本月贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">累计贡献(元)</view>
          </view>
        </view>
      </view>
	  <view class="member-list-item">
        <view class="detail b-b">
          <image
            mode="aspectFix"
            class="pic"
            src="https://img1.baidu.com/it/u=1483731740,4186543320&fm=26&fmt=auto&gp=0.jpg"
          />
          <view class="desc">
            <view class="name">阿克苏河的</view>
            <view class="time">注册日期：2018-06-18</view>
          </view>
          <view class="level">总监</view>
        </view>
        <view class="income-detail">
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">今日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">昨日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">本月贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">累计贡献(元)</view>
          </view>
        </view>
      </view>
	  <view class="member-list-item">
        <view class="detail b-b">
          <image
            mode="aspectFix"
            class="pic"
            src="https://img1.baidu.com/it/u=1483731740,4186543320&fm=26&fmt=auto&gp=0.jpg"
          />
          <view class="desc">
            <view class="name">阿克苏河的</view>
            <view class="time">注册日期：2018-06-18</view>
          </view>
          <view class="level">总监</view>
        </view>
        <view class="income-detail">
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">今日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">昨日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">本月贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">累计贡献(元)</view>
          </view>
        </view>
      </view>
	  <view class="member-list-item">
        <view class="detail b-b">
          <image
            mode="aspectFix"
            class="pic"
            src="https://img1.baidu.com/it/u=1483731740,4186543320&fm=26&fmt=auto&gp=0.jpg"
          />
          <view class="desc">
            <view class="name">阿克苏河的</view>
            <view class="time">注册日期：2018-06-18</view>
          </view>
          <view class="level">总监</view>
        </view>
        <view class="income-detail">
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">今日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">昨日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">本月贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">0.00</view>
            <view class="tip">累计贡献(元)</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss">
.team-search {
  display: flex;
  align-items: center;
  padding: 30rpx;

  .left {
    padding: 0 16rpx;
    height: 80rpx;
    display: flex;
    background: #eee;
    flex: 1;
    align-items: center;
    border-radius: 10rpx;

    .icon {
      margin-right: 20rpx;
    }
  }

  .button {
    margin-left: 24rpx;
    padding: 0 16rpx;
    height: 80rpx;
    line-height: 80rpx;
    background: #fc622a;
    border-radius: 10rpx;
    color: #fff;
  }
}

.nav-bar {
  margin: 0 30rpx;
  display: flex;
  justify-content: space-between;

  .nav-item {
    padding: 14rpx 24rpx;
    background: #eee;
    color: #666;
    font-size: 28rpx;
  }
}

.member-list {
  padding: 30rpx;

  .member-list-item {
    margin-bottom: 30rpx;
    padding: 30rpx;
    background: #eee;

    .detail {
      padding-bottom: 30rpx;
      display: flex;
      align-items: center;

      .pic {
        margin-right: 30rpx;
        width: 100rpx;
        height: 100rpx;
        border-radius: 50%;
      }
      .desc {
        flex: 1;

        .time {
          padding-top: 14rpx;
          color: #666;
        }
      }
      .level {
        color: #666;
      }
    }
  }

  .income-detail {
    padding-top: 30rpx;
    display: flex;
    justify-content: space-between;
    text-align: center;

    .price {
      font-size: 32rpx;
    }
    .tip {
      font-size: 24rpx;
      color: #666;
    }
  }
}
</style>
