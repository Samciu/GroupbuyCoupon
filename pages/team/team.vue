<template>
  <view class="team">
    <view class="team-header">
      <view class="team-search">
        <view class="left">
          <uni-icons class="icon" type="search" size="24" color="#999999" />
          <input placeholder="请输入关键字" v-model="value" />
          <view class="search-clear" @click="handleClearSearch">
            <uni-icons
              v-if="value.length > 0"
              type="clear"
              size="18"
              color="#666"
            ></uni-icons>
          </view>
        </view>
        <view class="button" @click="handleSearch">搜索</view>
      </view>
      <view class="nav-bar">
        <view
          class="nav-item"
          :class="{ active: index == role }"
          v-for="(item, index) in levelList"
          :key="index"
          @click="handleRoleClick(index)"
          >{{ item }}</view
        >
      </view>
    </view>

    <view class="member-list">
      <view class="member-list-item" v-for="(item, index) in list" :key="index">
        <view class="detail b-b">
          <image mode="aspectFix" class="pic" :src="item.avatarUrl" />
          <view class="desc">
            <view class="name">{{ item.nickName }}</view>
            <view class="time">注册日期：{{ item.created_at }}</view>
          </view>
          <view class="level">{{ levelList[item.role] }}</view>
        </view>
        <view class="income-detail">
          <view class="income-detail-item">
            <view class="price">{{ item.income.today }}</view>
            <view class="tip">今日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">{{ item.income.yesterday }}</view>
            <view class="tip">昨日贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">{{ item.income.month }}</view>
            <view class="tip">本月贡献(元)</view>
          </view>
          <view class="income-detail-item">
            <view class="price">{{ item.income.all }}</view>
            <view class="tip">累计贡献(元)</view>
          </view>
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
      value: "",
    };
  },
  computed: {
    ...mapState({
      list: (state) => state.team.list,
      levelList: (state) => state.team.levelList,
      role: (state) => state.team.role,
    }),
  },
  onLoad() {
    this.fetchTeamList();
  },
  methods: {
    ...mapActions([
      "fetchTeamList",
      "switchRole",
      "addPage",
      "fetchTeamSearch",
    ]),

    onReachBottom() {
      this.addPage();
    },

    handleRoleClick(role) {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 500,
      });
      this.switchRole(role);
    },

    handleSearch() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 500,
      });
      this.fetchTeamSearch(this.value);
    },

    handleClearSearch() {
      this.value = "";
      this.fetchTeamSearch("");
    },
  },
};
</script>

<style lang="scss">
.team-header {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 12;
  width: 100%;
  padding-bottom: 30rpx;
  background: #fff;
}

.team-search {
  display: flex;
  align-items: center;
  padding: 30rpx;

  .left {
    position: relative;
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

    .search-clear {
      position: absolute;
      right: 16rpx;
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

    &.active {
      color: #fff;
      background: #fc622a;
    }
  }
}

.member-list {
  padding: 30rpx;
  padding-top: 240rpx;

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
