<template>
	<view class="wrapper">
		<view class="goodsList">
			<view class="goodsList-item" v-for="(item, i) in goodsList" :key="i" @click="goDetail(item)">
				<image class="goodsList-item-thumb" :src="item.goods_thumbnail_url"></image>
				<view class="goodsList-item-bd">
					<view class="goodsList-item-bd-title">
						<view class="goodsList-item-bd-title-type">
							<view class="goodsList-item-bd-title-type-name">
								{{item.goods_type == 'self' ? '自营':'京东'}}
							</view>
						</view>
						{{item.goods_name}}
					</view>
					<view class="goodsList-item-bd-info">
						<view class="goodsList-item-bd-info-discount">
							<view class="goodsList-item-bd-info-discount-coupon">
								<view class="goodsList-item-bd-info-discount-coupon-name">
									补贴券
								</view>
								<view class="goodsList-item-bd-info-discount-coupon-num">
									<view class="goodsList-item-bd-info-discount-coupon-num-d">
										￥
									</view>{{item.coupon_discount}}
								</view>
							</view>
							<view class="goodsList-item-bd-info-discount-num">
								{{item.coupon_discount_rate}}折
							</view>
							<view class="goodsList-item-bd-info-discount-sale">
								<view class="goodsList-item-bd-info-discount-sale-name">
									已抢
								</view>
								<view class="goodsList-item-bd-info-discount-sale-num">
									{{item.grab}}件
								</view>
							</view>
						</view>
						<view class="goodsList-item-bd-info-price">
							<view class="goodsList-item-bd-info-price-d">
								￥
							</view>
							<view class="goodsList-item-bd-info-price-num">
								{{item.goods_coupon_price}}
							</view>
							<view class="goodsList-item-bd-info-price-origin">
								￥{{item.goods_price}}
							</view>
						</view>
					</view>
<!-- 					<view class="goodsList-item-bd-label">
						<view class="goodsList-item-bd-label-item" v-if="item.label.good">
							好店
						</view>
						<view class="goodsList-item-bd-label-item" v-if="item.label.fxg">
							放心购
						</view>
						<view class="goodsList-item-bd-label-item" v-if="item.label.jx">
							优选
						</view>
					</view> -->
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"goodsList",
		data() {
			return {
				
			};
		},
		props: {
		  goodsList: { type: Array, required: true },
		},
		methods: {
			goDetail(e){
				if(e.goods_type == 'self'){
					this.goShop(e.goods_id)
					return
				}
				let info = encodeURIComponent(JSON.stringify(e))
				uni.navigateTo({
				    url: `/pages/detail/detail?info=${info}`
				});
			},
		}
	}
</script>

<style lang="scss">
	.wrapper{
		background-color: #F8F8F8;
	}
	.goodsList{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		&-item{
			width: 346rpx;
			border-radius: 6px;
			overflow: hidden;
			background-color: #FFFFFF;
			margin-bottom: 20rpx;
			&-thumb{
				width: 346rpx;
				height: 346rpx;
			}

			&-bd{
				padding: 20rpx;
				color: #333333;
				&-title{
					font-size: 28rpx;
					font-weight: 500;
					color: #333333;
					word-break: break-all;
					text-overflow: clip;
					/* 定义为自适应布局   */
					display: -webkit-box;       
					/* 超出部分隐藏 */
					overflow: hidden;
					/* 竖直方向的超出隐藏 */
					-webkit-box-orient: vertical;  
					/* 限制最多2行 */
					-webkit-line-clamp: 2;
					line-height: 40rpx;
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
				&-info{
					font-size: 28rpx;
					&-discount{
						display: flex;
						width: 100%;
						align-items: center;
						margin-top: 10rpx;
						&-coupon{
							background-color: #fd7436;
							display: flex;
							align-items: center;
							font-size: 22rpx;
							color: #FFFFFF;
							border-radius: 2px;
							padding: 0 6rpx;
							height: 44rpx;
							font-weight: 500;
							margin-right: 10rpx;
							&-num{
								display: flex;
								align-items: center;
								&-d{
									width: 20rpx;
								}
							}
						}
						&-num{
							border: 1px solid #fd7436;
							display: flex;
							align-items: center;
							font-size: 22rpx;
							color: #fd7436;
							border-radius: 2px;
							padding: 0 6rpx;
							height: 44rpx;
							font-weight: 500;
							box-sizing: border-box;
						}
						&-sale{
							margin-left: auto;
							font-size: 20rpx;
							line-height: 1;
							display: flex;
							align-items: center;
							flex-direction: column;
							justify-content: space-between;
							height: 44rpx;
						}
					}
					&-price{
						display: flex;
						align-items: flex-end;
						width: 100%;
						margin-top: 20rpx;
						line-height: 1;
						&-d{
							font-size: 30rpx;
							color: #e02e24;
							width: 26rpx;
						}
						&-num{
							font-size: 36rpx;
							color: #e02e24;
						}
						&-origin{
							font-size: 26rpx;
							margin-left: 10rpx;
							text-decoration: line-through;
							display: flex;
							align-items: flex-end;
							color: #9c9c9c;
						}
					}
				}
				&-label{
					margin-top: 20rpx;
					display: flex;
					align-items: center;
					&-item{
						border: 1px solid #6f92dc;
						display: flex;
						align-items: center;
						font-size: 22rpx;
						color: #6f92dc;
						border-radius: 2px;
						padding: 0 4rpx;
						height: 30rpx;
						font-weight: 500;
						box-sizing: border-box;
						margin-right: 8rpx;
					}
				}
			}
		}
	}
</style>
