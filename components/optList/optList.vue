<template>
	<scroll-view class="optList" scroll-with-animation scroll-x :scroll-into-view="'o' + nowOpt">
		<view :class="['optItem', item.optId == nowOpt ? 'on' : '']" v-for="(item, i) in optList" :id="'o' + item.optId" :key="i" :data-optId="item.optId" @click="chooseOpt">
			<view>{{ item.optName }}</view>
		</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'optList',
	data() {
		return {
			optList: [
				{
					optId: 1,
					optName: '精选50元券',
					priority: 17
				},
				{
					optId: 10,
					optName: '9.9包邮',
					priority: 16
				},
				{
					optId: 23,
					optName: '为你推荐',
					priority: 15
				},
				{
					optId: 27,
					optName: '家具日用',
					priority: 14
				},
				{
					optId: 24,
					optName: '数码家电',
					priority: 13
				},
				{
					optId: 25,
					optName: '超市',
					priority: 12
				},
				{
					optId: 28,
					optName: '美妆穿搭',
					priority: 11
				},
			]
		};
	},
	props: {
		// 整体配置参数
		nowOpt: {
			type: Number,
			default: -1
		},
	},
	methods: {
		chooseOpt(e){
			this.$emit('chooseOpt', e)
		}
	}
};
</script>

<style>
.optList {
	white-space: nowrap;
	overflow-x: scroll;
	background: #fff;
	border-bottom: 1px solid #eeeeee;
	padding-left: 20rpx;
	width: 730rpx;
}
.optList .optItem {
	display: inline-block;
	margin: 0 20rpx;
}
.optList .optItem.on {
	margin-top: 2px;
	border-bottom: 2px solid #fd7436;
}
.optList .optItem view {
	padding: 20rpx 0;
	box-sizing: border-box;
	color: #333333;
	font-size: 32rpx;
}
.optList .optItem.on view {
	color: #fd7436;
}
</style>
