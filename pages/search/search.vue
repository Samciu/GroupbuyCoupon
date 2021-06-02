<template>
	<view>
		<view class="search">
			<input class="search-input" placeholder="搜索补贴优惠券" confirm-type="search" @confirm="search" v-model="keyword"/>
			<view class="search-clear" @click="handleClearSearch">
            <uni-icons
              v-if="keyword.length > 0"
              type="clear"
              size="24"
              color="#666"
            ></uni-icons>
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
				keyword: '',
				p: 1,
			};
		},
		onLoad(e) {
			this.keyword = e.keyword
			this.getGoodsJdSearch()
		},
		onReachBottom() {
			this.getGoodsJdSearch()
		},
		methods: {
			//商品列表
			getGoodsJdSearch(){
				this.$api.goodsJdSearch(this.keyword, this.p).then((res)=>{
					if(res.data.length > 0){
						this.p++
						this.goodsList = this.goodsList.concat(res.data)
					}
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			goDetail(e){
				let info = encodeURIComponent(JSON.stringify(e))
				uni.navigateTo({
				    url: `/pages/detail/detail?info=${info}`
				});
			},
			search(e){
				this.keyword = e.detail.value
				this.p = 1
				this.goodsList = []
				// this.$refs.waterfallsFlow.refresh();
				uni.pageScrollTo({
					scrollTop: 0,
					duration: 300,
				})
				this.getGoodsJdSearch()
			},
			handleClearSearch() {
				this.keyword = ""
			}
		}
	}
</script>

<style lang="scss">
	.search{
		background: #fd7436;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		padding: 20rpx;
		&-input{
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			height: 72rpx;
			width: 710rpx;
			border: 1px solid #f4f4f4;
			border-radius: 12rpx;
			background: #f4f4f4;
		}

		.search-clear {
			position: absolute;
			top: 50%;
			right: 50rpx;
			transform: translateY(-50%);
		}
	}
	.goodslist{
		margin-top: 120rpx;
		padding: 10px;
		background-color: #f8f8f8;
	}
</style>
