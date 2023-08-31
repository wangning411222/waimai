<template>
	<view class="indexContent">
		<view class="product-list" style="padding-top: 24rpx;">
			<view v-for="(item, index) in goods3" :key="index" class="goodsproduct product">
				<view class="d-flex padding-bottom-30 margin-bottom-20" style="border-bottom: 1rpx solid #eee;">
					<view class="flex-1">
						{{item.order_token}}
					</view>
					<view class="">{{item.create_date_fmt}}</view>
				</view>
				<view class="d-flex">
					<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">取货</view>
					<view>
						<view style="font-size: 34rpx;" class="font-bold margin-bottom-10">{{ item.company_name }}</view>
						<view class="name" @click.stop="openMapApp(item.company_address)" >{{ item.company_address }}<u-icon name="map" color="#0099ee" size="28"></u-icon></view>
					</view>
				</view>
			
				<view class="info" style="padding-left: 20rpx;">
					<view style="width: 0.5rpx;height: 80rpx;background-color: #eee;"></view>
				</view>
				
				<view class="d-flex">
					<view class="padding-right-20 font-bold" style="align-self: center;white-space: nowrap;">送货</view>
					<view>
						<view style="font-size: 34rpx;" class="font-bold" @click.stop="openMapApp(item.schoolinfo)">{{ item.schoolinfo }}{{ item.address }}<u-icon name="map" color="#0099ee" size="28"></u-icon></view>
					</view>
				</view>
				<view @tap="endOrder(item.orderid)" class="margin-top-30" style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #e0620d;padding: 25rpx; color: #efefef;">
					完成订单
				</view>
				<view @tap="zhuandan(item.order_token)" class="margin-top-30" style="font-size: 35rpx; border-radius: 15rpx;text-align: center;background: #0092e0;padding: 25rpx; color: #efefef;">
					转单
				</view>
			</view>
			<view v-if="goods3.length == 0">
				<view class="text-center padding-top-50">
					<u-empty text="没有相关数据" mode="order" style="margin: 0 auto;"></u-empty>
				</view>
			</view>
		</view>
		<view @tap="signfor" style="position: fixed; left: 50%; bottom: 10%; margin-left: -300rpx; width: 600rpx;padding: 30rpx 0; border-radius: 100rpx; background: #e0620d;text-align: center;">
			<u-icon name="scan" color="#fff" size="55" style="vertical-align: middle;"></u-icon>
			<text style="color: #fff; font-size: 40rpx; vertical-align: middle;margin-left: 10rpx;">扫码取餐</text>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>

import { mapGetters } from 'vuex'

export default {

	data() {
		return {
			status: 2,
			tabs:{
				goods: [],
				page: 1,
				maxpage: 0
			}
		};
	},
	onShow() {
		uni.startPullDownRefresh();
	},
	onLoad() {
		
		// this.init_list3({'page':1,'status': this.status});
	},
	computed: {
		goods3() {
			return this.tabs.goods;
		}
	},
	onPullDownRefresh(){
		this.tabs.goods=[];
		this.tabs.page=1;
		if(this.goods3.length == 0) {
			this.init_list3({'page':1,'status': this.status});
		}
	},
	onReachBottom(){

		let _this = this;
		
		let maxpage = this.tabs.maxpage;
		let page = this.tabs.page;
		if(maxpage > page) {
			this.tabs.page = page+1;
			this.runnerOrderPoolList({'page':page+1,'status': 2},function(msg){
				_this.concatGoods3(msg);
			})
		} else {
			_this.$refs.uToast.show({
				title: "没有更多了",
			})
		}
	},
	methods: {
		
		init_list3:function(data,callback=()=>{}){
			let _this = this;
		
			this.runnerOrderPoolList(data,function(msg){
				_this.concatGoods3(msg);
			});
		},
		concatGoods3(msg){
			let _this = this;
			let curTab = this.tabs;
			let newGoodsData = msg.orderlist;
			curTab.maxpage = msg.maxpage;
			curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
		},
		runnerOrderPoolList(data,callback=(company_list)=>{}){
			let _this = this;
			_this.$store.dispatch('runner/runnerOrderPool',data).then((res) => {
				if(res.code == 0) {
					callback(res.message);
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
				uni.stopPullDownRefresh();
			});
		},

		// 扫码取货
		signfor(){
			let _this = this;
			// 只允许通过相机扫码
			uni.scanCode({
				scanType: ['qrCode'],
				onlyFromCamera: true,
				success: function (res) {
					console.log('条码类型：' + res.scanType);
					console.log('条码内容：' + res.result);
					_this.userScan(res.result)
				},
				fail(err){
					console.log(err)
					_this.$refs.uToast.show({
						title: '扫码失败,请稍后重试',
					})
				}
			});
		},
		userScan(result){
			let _this = this;
			_this.$store.dispatch('runner/runnerScanode',{'qrcode_token':result}).then((res) => {
				if(res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message,
					})
					uni.startPullDownRefresh();
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		zhuandan(order_token){
			let _this = this;
			_this.$store.dispatch('runner/runnerZdQrcode',{'order_token':order_token}).then((res) => {
				if(res.code == 0) {
					_this.ZdQrcodeShow = true
				} else {
					_this.ZdQrcodeShow = true
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
			
		},
		openMapApp(address){
			uni.request({
				url: 'https://apis.map.qq.com/ws/geocoder/v1/?address='+address+'&key=QBWBZ-ZT2WU-QJ3V3-4CV6X-ADCWK-JSFEH',
				data: {},
				success: (res) => {

					let location = res.data.result.location;
					let MapContext = wx.createMapContext('map');
					MapContext.openMapApp({
						longitude:location.lng,
						latitude:location.lat,
						destination: address,
						success(){
							
						},
						fail(err){
							console.log(err)
						}
					})
				}
			});
			
			
		},
		// 完成订单
		endOrder(orderid){
			uni.navigateTo({
				url:'/pages/sub/runner/completeOrder?orderid='+orderid
			})
			
		},
	}
};
</script>

<style>
page {
	background-color: #efefef;
}
#tabInList {
	background-color: #FFFFFF;
	padding: 20rpx 0 0;
}
.u-mode-center-box {
	border-radius: 20rpx !important;
}
.product {
	/* width: 100%; */
	margin-bottom: 20rpx;
}
.product.shopproduct {
	width: 100%;
}
</style>
<style lang="scss" scoped>
.indexContent {
	position: relative;
}
.u-subsection .u-item-bg {
	background-color: #FFFFFF;
	color: #6ee4c1;
}
.authorBtn {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1000;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: 0;
}

/*吸顶悬浮，上拉加载，下拉刷新组件*/
.demo-tip {
	padding: 18rpx;
	font-size: 24rpx;
	text-align: center;
}

/*吸顶悬浮，上拉加载，下拉刷新组件end*/
.box-group {
	background: #ededed;
	margin: 20rpx 20rpx;
	display: flex;
	border-radius: 20rpx;

	.single-box {
		flex: 1;
		padding: 20rpx;
		text-align: center;

		.b-image {
			position: relative;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			overflow: hidden;
			text-align: center;
			margin: 0 auto;
			background-color: #dddddd;
		}

		.title {
			margin-top: 10rpx;
			font-size: 25rpx;
			font-weight: 500;
		}
	}
}

// 商品card
.product-list {
		
		padding: 24rpx 24rpx 3vw 24rpx;
		// display: flex;
		// justify-content: space-between;
		// flex-wrap: wrap;
		
		.goodsproduct {
			width: 100%;
			padding: 30rpx;
			border-radius: 15upx;
			background-color: #fff;
			margin: 0 0 25upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				height: 300rpx;
				border-radius: 15upx 15upx 0 0;
			}
			.name {
				width: 100%;
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
				padding: 10upx 0 10upx;
			
				.price {
					color: red;
					font-size: 30upx;
					font-weight: 600;
				}
				
			}
			.slogan {
				padding: 0 4% 10upx;
				color: #807c87;
				font-size: 24upx;
			}
		}
}
.popup-content {
	border-radius: 20rpx;
	padding: 40rpx 20rpx;
	font-family: 'Microsoft YaHei UI';

	.loginTip {
		font-size: 40rpx;
		text-align: center;
	}

	.loginBtn {
		position: relative;
		display: flex;
		width: 90%;
		height: 100rpx;
		margin: 60rpx auto;
		border-radius: 20rpx;
		background-color: #c69c6c;
		justify-content: center;
		align-items: center;
		font-size: 35rpx;
		color: #ffffff;

		.item {
			flex: auto;
			&:nth-child(2) {
				padding-right: 10rpx;
			}
		}
	}
}
</style>
