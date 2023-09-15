<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#ff9900" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[0].length != 0" class="order" v-for="(res, index) in orderList[0]" :key="res.orderid">
								<view class="top">
									<view class="left" v-if="res.lastnum-0>0">
										<view class="store">餐号:M{{ res.lastnum }}</view>
									</view>
                  <view v-else class="left" >
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index" @click="orderRead(res.orderid)">
									<view class="left"><image :src="item.goods_pic" mode="aspectFill"></image></view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											
										</view>
										<view class="right">
											<view class="price">
												￥{{ item.price }}
											</view>
											<view class="number">x{{ item.goods_num }}</view>
										</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_nums }}件商品 合计:
									<text class="total-price">
										￥{{ res.total_rmbs_fmt }}
									</text>
								</view>

								<view class="bottom">
									<view style="flex: 1; text-align: right;">
										<text v-if="res.status == 1 || res.status == 2 || res.status == 3 || res.status == 4" class="btn evaluate margin-left-20" style="padding: 10rpx 25rpx;" @tap="print(res.order_token)">打印小票</text>
										<text v-if="res.status == 9" class="btn evaluate margin-left-20" style="padding: 10rpx 25rpx;" @tap="companyOrderUpdate(item.orderid)">手动接单</text>
										
									</view>
								</view>
							</view>
							<u-loadmore v-if="orderList[0].length != 0" :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[0].length == 0">
								<view class="centre">
									<u-empty text="您还没有相关的订单" mode="order"></u-empty>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[1].length != 0" class="order" v-for="(res, index) in orderList[1]" :key="res.orderid">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index" @click="orderRead(res.orderid)">
									<view class="left"><image :src="item.goods_pic" mode="aspectFill"></image></view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											
										</view>
										<view class="right">
											<view class="price">
												￥{{ item.price }}
											</view>
											<view class="number">x{{ item.goods_num }}</view>
										</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_nums }}件商品 合计:
									<text class="total-price">
										￥{{ res.total_rmbs_fmt }}
									</text>
								</view>
								<view class="bottom" >
									<view style="flex: 1; text-align: right;">
										<text class="btn evaluate" style="padding: 10rpx 25rpx;" @tap="print(item.order_token)">打印小票</text>
									</view>
								</view>
							</view>
							<u-loadmore v-if="orderList[1].length != 0" :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[1].length == 0">
								<view class="centre">
									<u-empty text="您还没有相关的订单" mode="order"></u-empty>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[2].length != 0" class="order" v-for="(res, index) in orderList[2]" :key="res.orderid">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index" @click="orderRead(res.orderid)">
									<view class="left"><image :src="item.goods_pic" mode="aspectFill"></image></view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											
										</view>
										<view class="right">
											<view class="price">
												￥{{ item.price }}
											</view>
											<view class="number">x{{ item.goods_num }}</view>
										</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_nums }}件商品 合计:
									<text class="total-price">
										￥{{ res.total_rmbs_fmt }}
									</text>
								</view>
								<view class="bottom">
									<view style="flex: 1; text-align: right;">
										<text class="btn evaluate" style="padding: 10rpx 25rpx;" @tap="print(item.order_token)">打印小票</text>
									</view>
								</view>
							</view>
							<u-loadmore v-if="orderList[2].length != 0" :status="loadStatus[2]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[2].length == 0">
								<view class="centre">
									<u-empty text="您还没有相关的订单" mode="order"></u-empty>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[3].length != 0" class="order" v-for="(res, index) in orderList[3]" :key="res.orderid">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index" @click="orderRead(res.orderid)">
									<view class="left"><image :src="item.goods_pic" mode="aspectFill"></image></view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											
										</view>
										<view class="right">
											<view class="price">
												￥{{ item.price }}
											</view>
											<view class="number">x{{ item.goods_num }}</view>
										</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_nums }}件商品 合计:
									<text class="total-price">
										￥{{ res.total_rmbs_fmt }}
									</text>
								</view>
								<view class="bottom">
									<view style="flex: 1; text-align: right;">
										<text class="btn evaluate" style="padding: 10rpx 25rpx;" @tap="print(item.order_token)">打印小票</text>
									</view>
								</view>
							</view>
							<u-loadmore v-if="orderList[3].length != 0" :status="loadStatus[3]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[3].length == 0">
								<view class="centre">
									<u-empty text="您还没有相关的订单" mode="order"></u-empty>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[4].length != 0" class="order" v-for="(res, index) in orderList[4]" :key="res.orderid">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index" @click="orderRead(res.orderid)">
									<view class="left"><image :src="item.goods_pic" mode="aspectFill"></image></view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											
										</view>
										<view class="right">
											<view class="price">
												￥{{ item.price }}
											</view>
											<view class="number">x{{ item.goods_num }}</view>
										</view>
									</view>
								</view>
								<view class="total">
									共{{ res.total_nums }}件商品 合计:
									<text class="total-price">
										￥{{ res.total_rmbs_fmt }}
									</text>
								</view>
								<!-- <view class="bottom">
									<view style="flex: 1;">
				
									</view>
								</view> -->
							</view>
							<u-loadmore v-if="orderList[4].length != 0" :status="loadStatus[4]" bgColor="#f2f2f2"></u-loadmore>
							<view v-if="orderList[4].length == 0">
								<view class="centre">
									<u-empty text="您还没有相关的订单" mode="order"></u-empty>
									
								</view>
							</view>
						</view>
					</scroll-view>
				</swiper-item>
				
			</swiper>
		</view>
		<view @tap="handleRefresh" style="position: fixed; right: 30rpx; bottom: 10%; width: 100rpx;height: 100rpx;border-radius: 100rpx; background: #44c8a1;display: flex;justify-content: center;">
			<u-icon name="reload" color="#fff" size="45" style="align-self: center;"></u-icon>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {

			orderList: [[], [], [],[], []],
			list: [
				{
					name: '全部',
					value: 99
					// count: 12
				},
				{
					name: '已接单',
					value: 0
				},
				{
					name: '待取餐',
					value: 1
				},
				{
					name: '配送中',
					value: 2
				},
				{
					name: '已送达',
					value: 3
				}
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore','loadmore','loadmore','loadmore'],
			page_list: [1,1,1,1,1],
			maxpage_list: [0,0,0,0,0],

		};
	},
	onLoad(options) {

		this.getOrderList(99,0);
	},
	onPullDownRefresh(){
		let _this = this;
		this.position_list = [];
		this.condition_arr['page'] = 1;
		this.getPositionList(this.condition_arr,function(){
			uni.stopPullDownRefresh();
		});
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	methods: {
		reachBottom() {
			
			this.loadStatus.splice(this.current,1,"loading")
			if(this.maxpage_list[this.current] > 1 && this.page_list[this.current] <= this.maxpage_list[this.current]) {
				this.getOrderList(this.list[this.current].value,this.current);
			} else {
				this.loadStatus.splice(this.current,1,"nomore")
			}
			
		},
		// 页面数据
		getOrderList(idx,index,callback=()=>{}) {
			let _this = this;
			_this.$store.dispatch('user/companyOrderlist',{'status':idx,'page':_this.page_list[index]}).then((res) => {
				if(res.code == 0) {
					if(_this.maxpage_list[index] == 0) {
						_this.maxpage_list[index] = res.message.maxpage;
					}
					if(res.message.maxpage > 1 && _this.page_list[index] <= res.message.maxpage) {
						_this.loadStatus.splice(_this.current,1,"loadmore");
						_this.page_list[index] = _this.page_list[index] + 1;
					}
					if(res.message.order_list.length > 0) {
						for(let i = 0; i < res.message.order_list.length; i++) {
							
							_this.orderList[index].push(res.message.order_list[i]);
						}
						
					}
					callback()
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
			
			this.loadStatus.splice(this.current,1,"loadmore")
		},
		// 总价
		totalPrice(item) {
			let price = 0;
			item.map(val => {
				price += parseFloat(val.price);
			});
			return price.toFixed(2);
		},
		// 总件数
		totalNum(item) {
			let num = 0;
			item.map(val => {
				num += val.number;
			});
			return num;
		},
		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
			
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
			
			this.orderList=[[], [], [], [], []];
			this.page_list=[1,1,1,1,1];
			this.maxpage_list=[0,0,0,0,0];

			this.getOrderList(this.list[current].value,current);
		},
		orderRead(orderid) {
			uni.navigateTo({
				url: '/pages/sub/center/company_order_detail?orderid='+orderid
			});
		},
		payOrder(order_token){
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/orderPay',{'order_token':order_token}).then((res) => {
				if(res.code == 0) {
					
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		toevaluate(goods_id){
			uni.navigateTo({
				url: '/pages/sub/center/go_evaluate?goods_id='+goods_id
			});
		},
		deliverGoods(deliver_way,orderid,index){
			let _this = this;
			if(deliver_way == 0) {
				_this.$store.dispatch('user/companyOrderupdate',{'orderid':orderid}).then((res) => {
					if(res.code == 0) {
						_this.orderList[_this.current][index]['status'] = 2;
						_this.$refs.uToast.show({
							title: "已确认发货"
						})
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			} else {
				let waybill = this.orderList[this.current][index]['waybill'];
				if(waybill == '') {
					this.$refs.uToast.show({
						title: "请输入运单号"
					})
					return false;
				}
				_this.$store.dispatch('user/companyOrderupdate',{'orderid':orderid,'waybill': waybill}).then((res) => {
					if(res.code == 0) {
						_this.orderList[_this.current][index]['status'] = 2;
						_this.$refs.uToast.show({
							title: "已确认发货"
						})
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
				
			}
			
			
		},
		print(order_token){
			let _this = this;
			_this.$store.dispatch('user/printQrcode',{'order_token':order_token}).then((res) => {
				if(res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message
					})
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		companyOrderUpdate(orderid){
			let _this = this;
			_this.$store.dispatch('user/companyOrderUpdate',{'orderid':orderid}).then((res) => {
				if(res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message
					})
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		
		handleRefresh(){
			let _this = this;
			this.orderList=[[], [], [], [], []];
			this.page_list=[1,1,1,1,1];
			this.maxpage_list=[0,0,0,0,0];
			
			this.getOrderList(this.list[this.current].value,this.current,()=>{
				_this.$refs.uToast.show({
					title: "刷新成功",
				})
				
			});
		},
		
	}
};
</script>

<style>
/* #ifndef H5 */
page {
	height: 100%;
	background-color: #f2f2f2;
}
/* #endif */
</style>

<style lang="scss" scoped>
.order {
	width: 710rpx;
	background-color: #ffffff;
	margin: 20rpx auto;
	border-radius: 20rpx;
	box-sizing: border-box;
	padding: 20rpx;
	font-size: 28rpx;
	.top {
		display: flex;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.store {
				margin: 0 10rpx;
				font-size: 32rpx;
				font-weight: bold;
			}
		}
		.right {
			color: #ff9900;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 200rpx;
				height: 200rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			.title {
				font-size: 28rpx;
				line-height: 50rpx;
			}
			.type {
				margin: 10rpx 0;
				font-size: 24rpx;
				color: $u-tips-color;
			}
			.delivery-time {
				color: #e5d001;
				font-size: 24rpx;
			}
		}
		.right {
			margin-left: 10rpx;
			padding-top: 20rpx;
			text-align: right;
			.decimal {
				font-size: 24rpx;
				margin-top: 4rpx;
			}
			.number {
				color: $u-tips-color;
				font-size: 24rpx;
			}
		}
	}
	.total {
		margin-top: 20rpx;
		text-align: right;
		font-size: 24rpx;
		.total-price {
			font-size: 32rpx;
		}
	}
	.bottom {
		display: flex;
		margin-top: 40rpx;
		padding: 0 10rpx;
		justify-content: space-between;
		align-items: center;
		.btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: #ff9900;
			border-color: #ff9900;
		}
	}
}
.centre {
	text-align: center;
	margin: 200rpx auto;
	font-size: 32rpx;
	image {
		width: 164rpx;
		height: 164rpx;
		border-radius: 50%;
		margin-bottom: 20rpx;
	}
	.tips {
		font-size: 24rpx;
		color: #999999;
		margin-top: 20rpx;
	}
	.btn {
		margin: 80rpx auto;
		width: 200rpx;
		border-radius: 32rpx;
		line-height: 64rpx;
		color: #ffffff;
		font-size: 26rpx;
		background: linear-gradient(270deg, rgba(249, 116, 90, 1) 0%, rgba(255, 158, 1, 1) 100%);
	}
}
.wrap {
	display: flex;
	flex-direction: column;
	height: calc(100vh - var(--window-top));
	width: 100%;
}
.swiper-box {
	flex: 1;
}
.swiper-item {
	height: 100%;
}
</style>