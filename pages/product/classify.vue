<template>
  <view class="container">
    <!-- <view class="header">
      <status-bar />
      <view class="nav-bar b-b">
        <view class="input-view">
          <uni-icons class="icon" type="search" size="18"></uni-icons>
          <input
            type="search"
            class="nav-bar-input"
            confirmType="search"
            placeholder="搜索更多特权优惠"
            @input="handleInput"
            @confirm="handleSearch"
            :value="keyWords"
          />
          <view class="search-clear" @click="handleClearSearch">
            <uni-icons
              v-if="keyWords.length > 0"
              type="clear"
              size="18"
              color="#666"
            ></uni-icons>
          </view>
        </view>
      </view>
    </view> -->
    <view class="classify-body">
      <view class="left">
        <view class="tab-list">
          <view
            class="tab b-b"
            :class="{ active: index == navIndex }"
            v-for="(item, index) in cate"
            :key="index"
            @click="handleNavClick(index)"
            >{{ item }}</view
          >
        </view>
      </view>
      <view class="right">
        <scroll-view
          :scroll-y="true"
          :scroll-with-animation="true"
          :scroll-into-view="`scroll-item-${clickedNavIndex}`"
          class="right-container"
          @scroll="handleListScroll"
          @touchstart="handleTouchScrollView"
        >
          <view class="goods-type-list">
            <view
              class="goods-type-item"
              v-for="(listItem, listIndex) in list"
              :key="listIndex"
              :id="`scroll-item-${listIndex}`"
            >
              <view class="title">{{ listItem.name }}</view>
              <view class="goods-list">
                <view
                  class="item"
                  v-for="(item, index) in listItem.products"
                  :key="index"
				  @click="handleItemClick(item.code)"
                >
                  <image class="pic" :src="item.logo" />
                  <view class="title">{{ item.name }}</view>
                  <view class="tip">{{item.max_discount}}折起</view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>

<script>
import { getCardCateList } from "@/request";
import statusBar from "@/uni_modules/uni-nav-bar/components/uni-nav-bar/uni-status-bar";

export default {
  components: {
    statusBar,
  },
  data() {
    return {
      cate: [],
      list: [],
      clickedNavIndex: 0,
      navIndex: 0,
      nodeInfoList: [],
      topDistance: 0,
      isTouchScrollView: false, // 是否锁定联动
    };
  },
  async onLoad() {
    uni.showLoading();
    await this.fetchCardCateList();
    this.init();
    uni.hideLoading();
  },
  methods: {
    async fetchCardCateList() {
      const [err, res] = await getCardCateList();
      console.log(res.data.data);
      this.cate = res.data.data.cate;
      this.list = res.data.data.list;
    },
    init() {
      const query = uni.createSelectorQuery();
      query
        .selectAll(".goods-type-item")
        .boundingClientRect((rect) => {
          this.nodeInfoList = rect;
        })
        .exec();
    //   query
    //     .select(".header")
    //     .boundingClientRect((rect) => {
    //       this.topDistance = rect.height + 10;
    //     })
    //     .exec();
    },
    handleNavClick(index) {
      this.isTouchScrollView = false;
      this.clickedNavIndex = index;
      this.navIndex = index;
    },
    handleListScroll(e) {
      // 侧边栏的点击导致滑动不处理
      if (!this.isTouchScrollView) return;
      const scrollTop = e.detail.scrollTop;
      console.log("scrollTop: " + scrollTop);
      const currentNavIndex = this.nodeInfoList
        .map((item, index) => ({
          index,
          ...item,
        }))
        .filter((item) => item.top <= scrollTop + this.topDistance + 10)
        .sort((a, b) => b.top - a.top)[0].index;

      console.log(currentNavIndex);
      this.navIndex = currentNavIndex;
    },
    handleTouchScrollView() {
      this.isTouchScrollView = true;
    },
	handleItemClick(code) {
		uni.navigateTo({
          url: `/pages/product/list?pcode=${code}`,
        });
	}
  },
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.nav-bar {
  padding: 0 32rpx;
  padding-bottom: 18rpx;
  padding-top: 8rpx;

  .input-view {
    padding: 12rpx 32rpx;
    display: flex;
    align-items: center;
    background: #f6f6f6;
    border-radius: 32rpx;
    width: 440rpx;

    .icon {
      margin-right: 12rpx;
    }
  }
}
.classify-body {
  flex: 1;
  display: flex;

  .left {
    .tab-list {
      .tab {
        padding: 24rpx 32rpx;
        text-align: center;
        color: #666;
        white-space: nowrap;

        &.active {
          background: #f6f6f6;
          color: #deb57d;
        }
      }
    }
  }

  .right {
    position: relative;
    flex: 1;
    background: #f6f6f6;

    .right-container {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }

    .goods-type-list {
      margin: 20rpx;

      .goods-type-item {
        background: #fff;
        padding: 20rpx;
        margin-bottom: 20rpx;
      }

      .goods-list {
        display: flex;
        flex-wrap: wrap;

        .item {
          padding-top: 38rpx;
          width: 25%;
          text-align: center;

          .title {
            padding-top: 8rpx;
            font-size: 24rpx;
          }
          .tip {
            padding-top: 4rpx;
            font-size: 24rpx;
            color: #b2b2b2;
          }
        }
        .pic {
          width: 72rpx;
          height: 72rpx;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
