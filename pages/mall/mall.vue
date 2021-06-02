<template>
	<view class="wrapper">
		<view class="search">
			<input class="search-input" placeholder="搜索补贴优惠券" confirm-type="search" v-model="keyWords" @confirm="search"/>
			<view class="search-clear" @click="handleClearSearch">
            <uni-icons
              v-if="keyWords.length > 0"
              type="clear"
              size="24"
              color="#666"
            ></uni-icons>
          </view>
		</view>
		<view class="notice">
			<wyb-noticeBar :text="tips" type="vert" :show-more="false" class="notice-box" bgColor="rgba(0, 0, 0, 0.2)" color="#ffffff" width="345" v-if="tips.length > 0"/>
		</view>
		<view class="showcase2" v-if="showcase2.length > 0">
			<view class="showcase2-item" v-for="(item, i) in showcase2" :key="i" @click="goTheme(item.activityId)">
				<image :src="item.icon" mode="" class="showcase2-item-icon"></image>
				<view class="showcase2-item-name">
					{{item.name}}
				</view>
			</view>
		</view>
		<view class="showcase3" v-if="showcase3.people">
			<view class="showcase3-head">
				<view class="showcase3-head-title">
					超人气补贴
				</view>
				<view class="showcase3-head-title1">
					每日限量
				</view>
				<view class="showcase3-head-people">
					{{showcase3.people}}人疯抢中
				</view>
				<image src="https://funimg.pddpic.com/pincard/2020-11-20/52c0ac62-4a03-4d58-9c6d-5e6961e0983e.png?imageView2/2/w/800/q/70/format/webp" mode="" class="showcase3-head-bg"></image>
			</view>
			<view class="showcase3-list">
				<view class="showcase3-list-item" v-for="(item, i) in showcase3.goods" :key="i" @click="goShop(item.goods_id)" >
					
					<view class="showcase3-list-item-goods">
						<image :src="item.goods_thumbnail_url" class="showcase3-list-item-goods-thumb"></image>
					</view>
					<view class="showcase3-list-item-info">
						<view class="showcase3-list-item-info-title">
							{{item.goods_name}}
						</view>
						<view class="showcase3-list-item-info-sale">
							已补{{item.sale}}件
						</view>
						<view class="showcase3-list-item-info-price">
							<view class="showcase3-list-item-info-price-name">
								补贴价
							</view>
							<view class="showcase3-list-item-info-price-num">
								¥{{item.goods_coupon_price}}
							</view>
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<!--分类--排序-->
		<view :class="['optSort', optSortFix ? 'fix' : '']">
			<optList :nowOpt="nowOpt" @chooseOpt="chooseOpt"></optList>
		</view>
		<view class="goodslist">
			<goodsList :goodsList="goodsList"></goodsList>
		</view>
		<!-- <view class="my">
			<view class="my-center" @click="goCart()">
				<image src="/static/images/cart.png" mode="" class="my-center-img"></image>
				<view class="">
					购物车
				</view>
			</view>
			<view class="my-center" @click="goCenter()">
				<image src="/static/images/my.png" mode="" class="my-center-img"></image>
				<view class="">
					我的订单
				</view>
			</view>
		</view> -->
		<!-- <tabbar class="fixs" ref='commentTabbat' :actives='active'></tabbar> -->
		<view class="load-toast" v-if="showLoadTost" @click="closeLoadToast">
			<image class="load-toast-img" :src="loadMinapp.pic" mode="" @click="goLoad"></image>
			<image class="load-toast-close" src="/static/images/close.png" mode=""></image>
		</view>
		<customTabBar tab="mall"></customTabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tips: [],
				showcase1: [],
				showcase2: [],
				showcase3: {},
				nowOpt: 1,
				goodsList: [],
				p: 1,
				optTop: 0,
				cardInfo: null,
				showLoadTost: false,
				loadMinapp: {},
				keyWords: ""
			}
		},
		async onLoad() {
			this.getHomeConfig()
			this.getHomeShowcase2()
			this.getGoodsJdList()
			
		},
		onShow(){
			
		},
		onReady () {
			setTimeout(()=>{
				let view = uni.createSelectorQuery().in(this).select(".optSort")
				view.boundingClientRect(data => {
					this.optTop = data.top
				}).exec()  
			}, 1000)
		},
		onPullDownRefresh() {
			this.p = 1
			this.goodsList = []
			this.getGoodsJdList('refresh')
		},
		onReachBottom() {
			var lastGoodId = ''
			if(this.goodsList.length > 0){
				lastGoodId = this.goodsList[this.goodsList.length - 1].goods_id
			}
			this.getGoodsJdList(null, lastGoodId)
		},
		onShareAppMessage() {
			let shareConfig = {
				title: '领大额优惠券，享特权生活',
				path: '/pages/index/index',
			}
			return shareConfig
		},
		onShareTimeline() {
			let shareConfig = {
				title: '领大额优惠券，享特权生活',
				path: '/pages/index/index',
			}
			return shareConfig
		},
		methods: {
			//选择分类
			chooseOpt(e){
				this.nowOpt = e.currentTarget.dataset.optid
				this.p = 1
				this.getGoodsJdList('changeOpt')
			},
			//showcase
			getHomeShowcase1(){
				this.$api.homeShowcase1().then((res)=>{
					this.showcase1 = res.data
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			//showcase
			getHomeShowcase2(){
				this.$api.homeShowcase2().then((res)=>{
					this.showcase2 = res.data
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			//showcase
			getHomeShowcase3(){
				this.$api.homeShowcase3().then((res)=>{
					this.showcase3 = res.data
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			//商品列表
			getGoodsJdList(type = null, lastGoodId = null){
				this.$api.goodsJdList(this.p, this.nowOpt, lastGoodId).then((res)=>{
					if(type == 'refresh') {
						uni.stopPullDownRefresh();
					}
					if(res.data.length > 0){
						this.p++
						if(type == 'changeOpt'){
							this.goodsList = res.data
							uni.pageScrollTo({
								scrollTop: this.optTop,
								duration: 300,
							})
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
			
			goTheme(activityId){
				uni.navigateTo({
				    url: `/pages/theme/theme?id=${activityId}`
				});
			},
			goShop(goods_id){
				const productId = goods_id
				wx.navigateTo({
					url: `plugin-private://wx34345ae5855f892d/pages/productDetail/productDetail?productId=${productId}`,
				});
			},
			goCart(){
				wx.navigateTo({
					url: `plugin-private://wx34345ae5855f892d/pages/shoppingCart/shoppingCart`,
				});
			},
			goCenter(){
				wx.navigateTo({
					url: `plugin-private://wx34345ae5855f892d/pages/orderList/orderList`,
				});
			},
			search(e){
				let keyword = e.detail.value
				uni.navigateTo({
				    url: `/pages/search/search?keyword=${keyword}`
				});
			},
			// 此函数名称可以自定义，跟bindcustomevent绑定的保持一致
			getcoupon: function(params) {
				if(this.cardInfo != null){
					this.$api.getCardTrack(params.detail).then((res)=>{
						
					}).catch((err)=>{
						
					})
					// uni.hideToast()
					// uni.hideLoading()
					uni.showToast({
						icon: "none",
					    title: "",
					    duration: 0
					});
				}
				if(params.detail.errcode == 'OK'){
					this.cardInfo = null
				}
			},
			//获取卡券信息
			getCardInfo(){
				this.$api.cardInfo().then((res)=>{
					this.cardInfo = res.data
				}).catch((err)=>{
					
				})
			},
			//showcase
			getHomeTips(){
				this.$api.homeTips().then((res)=>{
					this.tips = res.data
				}).catch((err)=>{
					
				})
			},
			//showcase
			getHomeConfig(){
				this.$api.homeConfig().then((res)=>{
					this.showLoadTost = res.data.load.show
					this.loadMinapp = res.data.load.minapp
				}).catch((err)=>{
					
				})
			},
			//跳转开屏
			goLoad(){
				this.closeLoadToast()
				wx.navigateToMiniProgram(this.loadMinapp)
			},
			closeLoadToast(){
				this.showLoadTost = false
			},
			handleClearSearch() {
				this.keyWords = ""
			}
		}
	}
</script>

<style lang="scss">
	.search{
		position: relative;
		background: #fd7436;
		position: relative;
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
	.notice{
		background: #fd7436;
		padding-bottom: 20rpx;
		&-box{
			
		}
	}
	.safe{
		background: #fd7436;
		padding-top: 20rpx;
		&-img{
			width: 710rpx;
			height: 60rpx;
			display: block;
			margin: auto;
			border-radius: 4px;
		}
	}
	.showcase1{
		background-color: #fd7436;
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		&-item{
			width: 224rpx;
			background-color: #FFFFFF;
			text-align: center;
			border-radius: 4px;
			position: relative;
			&-title{
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 30rpx;
				color: #151516;
				font-weight: bold;
				margin-top: 20rpx;
				&-icon{
					width: 30rpx;
					height: 30rpx;
					display: block;
					margin-right: 8rpx;
				}
			}
			&-desc{
				font-size: 26rpx;
				color: #9c9c9c;
			}
			&-swiper{
				width: 192rpx;
				height: 192rpx;
				margin: 10rpx 16rpx 16rpx;
				&-item{
					position: relative;
					&-thumb{
						width: 192rpx;
						height: 192rpx;
						border-radius: 2px;
						display: block;
						
					}
					&-price{
						position: absolute;
						bottom: 10rpx;
						left: 50%;
						transform: translateX(-50%);
						background-color: rgba(0, 0, 0, 0.5);
						height: 36rpx;
						line-height: 36rpx;
						border-radius: 36rpx;
						padding: 0 12rpx;
						color: #FFFFFF;
						font-size: 26rpx;
						display: flex;
						align-items: center;
						&::before{
							content: '￥';
							font-size: 24rpx;
						}
					}
				}
			}
		}
	}
	.showcase2{
		background-color: #FFFFFF;
		display: flex;
		justify-content: space-around;
		padding: 20rpx;
		margin-top: 20rpx;
		&-item{
			text-align: center;
			&-icon{
				width: 100rpx;
				height: 100rpx;
				display: block;
				margin: auto;
			}
			&-name{
				margin-top: 14rpx;
				font-size: 26rpx;
				color: #666666;
			}
		}
	}
	.showcase3{
		background: linear-gradient(301deg,#fc3622,#ffab48);
		margin: 20rpx;
		border-radius: 4px;
		&-head{
			display: flex;
			padding: 20rpx 20rpx 0 20rpx;
			color: #FFFFFF;
			align-items: center;
			position: relative;
			&-title1{
				font-size: 26rpx;
				margin-left: 16rpx;
			}
			&-people{
				margin-left: auto;
				position: relative;
				z-index: 99;
				font-size: 24rpx;
				font-weight: 600;
				position: relative;
				z-index: 9;
				margin-top: -20rpx;
			}
			&-bg{
				position: absolute;
				top: 0;
				right: 0;
				width: 260rpx;
				height: 80rpx;
				z-index: 1;
				display: block;
			}
		}
		&-list{
			display: flex;
			width: 100%;
			overflow-x: scroll;
			padding: 20rpx;
			box-sizing: border-box;
			white-space: nowrap;
			&-item{
				display: flex;
				background-color: #FFFFFF;
				margin-right: 20rpx;
				padding: 20rpx;
				border-radius: 4px;
				&-goods{
					position: relative;
					border-radius: 4px;
					margin-right: 10rpx;
					&-thumb{
						width: 160rpx;
						height: 160rpx;
						display: flex;
						position: relative;
					}
					&::after{
						position: absolute;
						top: 0;
						right: 0;
						bottom: 0;
						left: 0;
						content: "";
						background-color: rgba(0,0,0,.04);
					}
				}
				&-info{
					display: flex;
					flex-wrap: wrap;
					flex-direction: column;
					justify-content: space-between;
					&-title{
						font-size: 26rpx;
						color: #6e6e6e;
						font-weight: 500;
						width: 100%;
					}
					&-sale{
						font-size: 24rpx;
						color: #ff7242;
						width: 100%;
					}
					&-price{
						font-size: 24rpx;
						color: #ff7242;
						display: flex;
						align-items: center;
						align-self: baseline;
						background: linear-gradient(90deg,#fff3de,#ffe6b6);
						&-name{
							height: 100%;
							display: flex;
							align-items: center;
							padding: 0 10rpx;
						}
						&-num{
							height: 100%;
							display: flex;
							align-items: center;
							padding: 0 10rpx;
							color: #FFFFFF;
							background: linear-gradient(135deg,#f33a50,#ff486d);
						}
					}
				}
			}
		}
	}
	.optSort{
		position: sticky;
		overflow-x: scroll;
		z-index: 99;
		top: 0;
		left: 0;
		background-color: #FFFFFF;
	}
	.goodslist{
		padding: 10px;
		background-color: #f8f8f8;
	}
	.my{
		position: fixed;
		bottom: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: #f6960e;
		font-size: 32rpx;
		border-radius: 4px;
		z-index: 99999;
		padding: 0 20rpx;
		width: 400rpx;
		height: 100rpx;
		border-radius: 100rpx;
		&-center{
			display: flex;
			align-items: center;
			height: 100%;
			padding: 0 20rpx;
			&-img{
				width: 40rpx;
				display: block;
				margin: auto;
				height: 40rpx;
				margin-right: 6rpx;
			}
		}
		
	}
	.fixs{
		position: fixed;
		z-index:100;
	}
	.card-view {
	    position: relative;
		background-color: #fd7436;
		padding-bottom: 20rpx;
	}
	
	.card-view .card {
	    width: 693rpx;
	    height: 141rpx;
	    margin: auto;
	    display: block;
	}
	
	@-webkit-keyframes button-data-v-7cfb5c9e {
	    from {
	        transform: scale(1.1);
	    }
	
	    to {
	        transform: scale(.9);
	    }
	}
	
	@keyframes button-data-v-7cfb5c9e {
	    from {
	        transform: scale(1.1);
	    }
	
	    to {
	        transform: scale(.9);
	    }
	}
	
	.card-view .button {
	    width: 111rpx;
	    height: 121rpx;
	    position: absolute;
	    right: 24rpx;
	    top: 10rpx;
	    animation: button-data-v-7cfb5c9e .4s;
	    animation-direction: alternate;
	    animation-iteration-count: infinite;
	}
	.load-toast{
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba($color: #000000, $alpha: 0.7);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 9999;
		flex-direction: column;
		&-img{
			display: block;
			width: 500rpx;
			height: 700rpx;
		}
		&-close{
			width: 50rpx;
			height: 50rpx;
			display: block;
			margin-top: 30rpx;
		}
	}
</style>
