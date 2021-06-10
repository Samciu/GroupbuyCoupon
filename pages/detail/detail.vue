<template>
	<view class="wrapper">
		<swiper indicator-dots autoplay interval="3000" duration="500" class="gallery">
			<swiper-item v-for="(item, i) in detail.goods_gallery_urls" :key="i" class="gallery-item">
				<image :src="item" mode="" class="gallery-item-img"></image>
			</swiper-item>
		</swiper>
		<view class="info">
			<view class="info-price">
				<view class="info-price-d">
					￥
				</view>
				<view class="info-price-num">
					{{info.goods_coupon_price}}
				</view>
				<view class="info-price-origin">
					￥{{info.goods_price}}
				</view>
				<view class="info-price-sale">
					<view class="info-price-sale-name">
						已抢
					</view>
					<view class="info-price-sale-num">
						{{info.grab}}件
					</view>
				</view>
			</view>
			<view class="info-title">
				<view class="info-title-type">
					<view class="info-title-type-name">
						京东
					</view>
				</view>
				{{info.goods_name}}
			</view>
			<view class="info-coupon" @click="getGoodsJdPromote">
				<view class="info-coupon-info">
					<view class="info-coupon-info-num">
						{{info.coupon_discount}}元
					</view>京东补贴券
				</view>
				<image src="https://h5.chuxingyouhui.com/slime/assets/cps-butie-bg.png" mode="" class="info-coupon-bg"></image>
			</view>
		</view>
		<view class="detail">
			<view class="detail-title">
				商品详情
			</view>
			<view class="detail-intro">
				<image :src="item" mode="widthFix" class="detail-intro-img" v-for="(item, i) in detail.goods_detail" :key="i"></image>
			</view>
		</view>
		<view class="promote">
			<view class="promote-btn" @click="getGoodsJdPromote">
				抢{{info.coupon_discount}}元补贴券
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info: {},
				detail: {},
			};
		},
		onLoad(e) {
			this.info = JSON.parse(decodeURIComponent(e.info))
			this.getGoodsJdDetail()
		},
		methods:{
			//商品列表
			getGoodsJdDetail(){
				this.$api.goodsJdDetail(this.info.goods_id).then((res)=>{
					this.detail = res.data
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
			//商品推广
			getGoodsJdPromote(){
				uni.showToast({
					icon: 'none',
				    title: '正在抢券',
				    duration: 2000
				});
				this.$api.goodsJdPromote(this.info.materialUrl, this.info.coupon_link).then((res)=>{
					uni.hideToast()
					wx.navigateToMiniProgram({
						appId: res.data.appId,
						path: res.data.path,
						success(res) {
							console.log(res)
						}
					})
				}).catch((err)=>{
					uni.showToast({
						icon: 'none',
					    title: err.msg,
					    duration: 2000
					});
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F8F8F8;
	}
	.gallery{
		width: 750rpx;
		height: 750rpx;
		&-item{
			&-img{
				width: 100%;
				height: 100%;
			}
		}
	}
	.info{
		margin: 20rpx;
		padding: 20rpx;
		background-color: #FFFFFF;
		border-radius: 8px;
		&-price{
			display: flex;
			align-items: flex-end;
			width: 100%;
			line-height: 1;
			font-weight: 500;
			&-d{
				font-size: 30rpx;
				color: #e02e24;
				width: 26rpx;
			}
			&-num{
				font-size: 44rpx;
				color: #e02e24;
			}
			&-origin{
				font-size: 30rpx;
				margin-left: 10rpx;
				text-decoration: line-through;
				display: flex;
				align-items: flex-end;
				color: #9c9c9c;
			}
			&-sale{
				display: flex;
				margin-left: auto;
				font-size: 28rpx;
				color: #666666;
			}
		}
		&-title{
			font-size: 32rpx;
			font-weight: 500;
			color: #333333;
			line-height: 50rpx;
			margin-top: 10rpx;
			&-type{
				display: inline-block;
				position: relative;
				width: 66rpx;
				
				&-name{
					position: absolute;
					bottom: -5rpx;
					left: 0;
					background: #e02e24;
					border-radius: 4px;
					height: 30rpx;
					line-height: 30rpx;
					padding: 0 6rpx;
					color: #FFFFFF;
					font-size: 20rpx;
				}
			}
		}
		&-coupon{
			margin-top: 20rpx;
			position: relative;
			&-info{
				position: absolute;
				top: 20rpx;
				left: 40rpx;
				font-weight: 500;
				display: flex;
				font-size: 30rpx;
				&-num{
					color: #fd7436;
				}
			}
			&-bg{
				width: 670rpx;
				height: 140rpx;
				display: block;
			}
		}
	}
	.detail{
		&-title{
			position: relative;
			text-align: center;
			margin-bottom: 20rpx;
			color: #a0a0a0;
			font-size: 28rpx;
			&::before, &::after {
				content: '';                 /*CSS伪类用法*/
				position: absolute;         /*定位背景横线的位置*/
				top: 50%;
				transform: translateY(-50%);
				background: #cccccc;       /*宽和高做出来的背景横线*/
				width: 9%;
				height: 1px;
			}
			&::before{
				left: 30%;        /*调整背景横线的左右距离*/
			}
			&::after {
				right: 30%;
			}
		}
		&-intro{
			background-color: #FFFFFF;
			&-img{
				width: 750rpx;
				height: 750rpx;
				display: block;
			}
		}
	}
	.promote{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		background-color: #FFFFFF;
		&-btn{
			margin: 30rpx;
			height: 80rpx;
			line-height: 80rpx;
			padding: 0 26rpx;
			text-align: center;
			background: linear-gradient(90deg, #f28f62, #fd7436);
			color: #fff;
			border-radius: 40px;
			font-size: 34rpx;
			font-weight: 500;
		}
	}
</style>
