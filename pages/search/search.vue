<template>
  <view>
    <view class="search">
      <view class="search-wrap">
        <input
          class="search-input"
          placeholder="搜索补贴优惠券"
          confirm-type="search"
          @confirm="search"
          v-model="keyword"
        />
        <view class="search-clear" @click="handleClearSearch" v-if="keyword.length > 0">
          <uni-icons
            type="clear"
            size="24"
            color="#666"
          ></uni-icons>
        </view>
      </view>
    </view>
    <view class="goodslist">
      <goodsList :goodsList="goodsList"></goodsList>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsList: [],
      keyword: "",
      p: 1,
    };
  },
  onLoad(e) {
    this.keyword = e.keyword;
    this.getGoodsJdSearch();
  },
  onReachBottom() {
    this.getGoodsJdSearch();
  },
  methods: {
    //商品列表
    getGoodsJdSearch() {
      this.$api
        .goodsJdSearch(this.keyword, this.p)
        .then((res) => {
          if (res.data.length > 0) {
            this.p++;
            this.goodsList = this.goodsList.concat(res.data);
          }
        })
        .catch((err) => {
          uni.showToast({
            icon: "none",
            title: err.msg,
            duration: 2000,
          });
        });
    },
    goDetail(e) {
      let info = encodeURIComponent(JSON.stringify(e));
      uni.navigateTo({
        url: `/pages/detail/detail?info=${info}`,
      });
    },
    search(e) {
      this.keyword = e.detail.value;
      this.p = 1;
      this.goodsList = [];
      // this.$refs.waterfallsFlow.refresh();
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      });
      this.getGoodsJdSearch();
    },
    handleClearSearch() {
      this.keyword = "";
    },
  },
};
</script>

<style lang="scss">
.search {
  background: #fd7436;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  padding: 20rpx;
  box-sizing: border-box;
  width: 100%;
  &-wrap {
	position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background: #f4f4f4;
    border: 1px solid #f4f4f4;
    width: 100%;
    height: 72rpx;
    border-radius: 12rpx;
  }
  &-input {
    height: 100%;
    width: 530rpx;
  }

  .search-clear {
    position: absolute;
    top: 50%;
    right: 10rpx;
    transform: translateY(-50%);
    width: 80rpx;
    height: 80rpx;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.goodslist {
  margin-top: 120rpx;
  padding: 10px;
  background-color: #f8f8f8;
}
</style>
