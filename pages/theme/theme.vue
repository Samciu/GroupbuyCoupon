<template>
	<view class="wrapper">
		<image :src="banners[nowOpt]" mode="" class="banner"></image>
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
				p: 1,
				nowOpt: 33,
				banners: {
					'33' : 'http://cjtk-1251006315.cossh.myqcloud.com/wxapp/onsale_banner.png',
					'129' : 'http://cjtk-1251006315.cossh.myqcloud.com/wxapp/brandgoods_banner.png',
					'112' : 'http://cjtk-1251006315.cossh.myqcloud.com/wxapp/big_banner.png',
					'22' : 'http://cjtk-1251006315.cossh.myqcloud.com/wxapp/onsale_banner.png',
					'32' : 'http://cjtk-1251006315.cossh.myqcloud.com/wxapp/onsale_banner.png',
				}
			};
		},
		onLoad(e) {
			this.nowOpt = e.id
			this.getGoodsJdList()
		},
		onPullDownRefresh() {
			this.p = 1
			this.goodsList = []
			this.$refs.waterfallsFlow.refresh();
			this.getGoodsJdList('refresh')
		},
		onReachBottom() {
			this.getGoodsJdList()
		},
		methods: {
			//商品列表
			getGoodsJdList(type = null){
				this.$api.goodsJdList(this.p, this.nowOpt).then((res)=>{
					if(type == 'refresh') {
						uni.stopPullDownRefresh();
					}
					if(res.data.length > 0){
						this.p++
						if(type == 'changeOpt'){
							this.goodsList = res.data
							setTimeout(() => {
								uni.pageScrollTo({
									scrollTop: this.optTop,
									duration: 300,
								})
							}, 300)
						}else{
							this.goodsList = this.goodsList.concat(res.data)
						}
						
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
		}
	}
</script>

<style lang="scss">
	.banner{
		width: 750rpx;
		height: 280rpx;
		display: block;
	}
	.goodslist{
		padding: 10px;
		background-color: #f8f8f8;
	}
</style>
