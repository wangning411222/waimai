<template>
	<view>
		<image :src="goods.logo" mode="widthFix" ></image>
		<view class="name">{{ goods.name }}</view>
		<view class="info">
			<view class="price">￥{{ goods.price }}</view>
			<view class="slogan">{{ goods.slogan }}人付款</view>
		</view>
	</view>
</template>

<script>
    export default {
        name: "goods_box",
		props:{
			goods: {
				type: Object,
				default: {}
			}
		},
		mounted() {

		}
    }
</script>

<style lang="scss" scoped>
image {
	width: 100%;
	border-radius: 15upx 15upx 0 0;
}
.name {
	width: 100%;
	padding: 0 4%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	text-align: justify;
	overflow: hidden;
	font-size: 30upx;
}
.info {
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 100%;
	padding: 10upx 4% 10upx 4%;

	.price {
		color: #e65339;
		font-size: 30upx;
		font-weight: 600;
	}
	.slogan {
		color: #807c87;
		font-size: 24upx;
	}
}
</style>
