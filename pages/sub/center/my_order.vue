<template>
	<view>
		<view class="wrap">
			<view class="u-tabs-box">
				<u-tabs-swiper activeColor="#6ee4c1" ref="tabs" :list="list" :current="current" @change="change"
					:is-scroll="false" swiperWidth="750"></u-tabs-swiper>
			</view>
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view v-if="orderList[0].length != 0" class="order" v-for="(res, index) in orderList[0]"
								:key="res.orderid" @click="orderRead(res.orderid)">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index">
									<view class="left">
										<image :src="item.goods_pic" mode="aspectFill"></image>
									</view>
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
									<view style="flex: 1;"></view>
									<view v-if="res.status == 0" class="evaluate btn"
										@click.stop="payOrder(res.order_token)">去支付</view>
									<view v-if="res.status == 0" class="evaluate btn margin-left-20"
										@click.stop="cancelOrder(res.orderid)">取消订单</view>
									<view v-if="res.status == 4" class="evaluate btn" @click.stop="signfor()">确认收货</view>
									<!-- <view v-if="res.status == 3" class="evaluate btn" @click.stop="toevaluate(res.goods_id)">去评价</view> -->
									<view v-if="res.status == 7" class="evaluate btn"
										@click.stop="deleteOrder(res.orderid)">删除</view>
									<view v-if="(res.status == 5 || res.status == 6) && res.postid == 0"
										class="evaluate btn" @click.stop="gocomment(res)">去评价</view>

								</view>
							</view>
							<u-loadmore v-if="orderList[0].length != 0" :status="loadStatus[0]"
								bgColor="#f2f2f2"></u-loadmore>
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
							<view v-if="orderList[1].length != 0" class="order" v-for="(res, index) in orderList[1]"
								:key="res.orderid" @click="orderRead(res.orderid)">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index">
									<view class="left">
										<image :src="item.goods_pic" mode="aspectFill"></image>
									</view>
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

									<view style="flex: 1;"></view>
									<view v-if="res.status == 0" class="evaluate btn"
										@click.stop="payOrder(res.order_token)">去支付</view>
									<view v-if="res.status == 0" class="evaluate btn margin-left-20"
										@click.stop="cancelOrder(res.orderid)">取消订单</view>
									<view v-if="res.status == 3 && item.postid == 0" class="evaluate btn"
										@click.stop="gocomment(res)">去评价</view>
								</view>
							</view>
							<view v-if="orderList[1].length == 0">
								<view class="centre">
									<u-empty text="您还没有相关的订单" mode="order"></u-empty>
								</view>
							</view>
							<u-loadmore v-if="orderList[1].length != 0" :status="loadStatus[1]"
								bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;">
						<view class="page-box">
							<view v-if="orderList[2].length != 0" class="order" v-for="(res, index) in orderList[2]"
								:key="res.orderid">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index">
									<view class="left">
										<image :src="item.goods_pic" mode="aspectFill"></image>
									</view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											<!-- <view class="type">{{ item.price }}</view>
											<view class="delivery-time">发货时间 {{ item.goods_num }}</view> -->
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
									<view style="flex: 1;"></view>
									<!-- <view v-if="res.status == 0" class="evaluate btn" @click.stop="payOrder(res.order_token)">去支付</view>
									<view v-if="res.status == 2" class="evaluate btn">确认收货</view>
									<view v-if="res.status == 3" class="evaluate btn">去评价</view> -->
									<view v-if="res.status == 3 && item.postid == 0" class="evaluate btn"
										@click.stop="gocomment(res)">去评价</view>
								</view>
							</view>
							<u-loadmore v-if="orderList[2].length != 0" :status="loadStatus[2]"
								bgColor="#f2f2f2"></u-loadmore>
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
							<view v-if="orderList[3].length != 0" class="order" v-for="(res, index) in orderList[3]"
								:key="res.orderid" @click="orderRead(res.orderid)">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index">
									<view class="left">
										<image :src="item.goods_pic" mode="aspectFill"></image>
									</view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											<!-- <view class="type">{{ item.price }}</view>
											<view class="delivery-time">发货时间 {{ item.goods_num }}</view> -->
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
									<view style="flex: 1;"></view>

									<view v-if="res.status == 4" class="evaluate btn" @click.stop="signfor()">确认收货</view>
									<view v-if="res.status == 3 && item.postid == 0" class="evaluate btn"
										@click.stop="gocomment(res)">去评价</view>

								</view>
							</view>
							<u-loadmore v-if="orderList[3].length != 0" :status="loadStatus[3]"
								bgColor="#f2f2f2"></u-loadmore>
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
							<view v-if="orderList[4].length != 0" class="order" v-for="(res, index) in orderList[4]"
								:key="res.orderid" @click="orderRead(res.orderid)">
								<view class="top">
									<view class="left">
										<view class="store">订单：{{ res.orderid }}</view>
									</view>
									<view class="right">{{ res.status_fmt }}</view>
								</view>
								<view class="item" v-for="(item, index) in res.product_sku" :key="index">
									<view class="left">
										<image :src="item.goods_pic" mode="aspectFill"></image>
									</view>
									<view style="flex: 1;">
										<view class="content">
											<view class="title u-line-2">{{ item.goods_name }}</view>
											<!-- <view class="type">{{ item.price }}</view>
											<view class="delivery-time">发货时间 {{ item.goods_num }}</view> -->
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
									<view style="flex: 1;"></view>
									<view v-if="res.status == 3 && item.postid == 0" class="evaluate btn"
										@click.stop="gocomment(res)">去评价</view>
									<!-- <view v-if="res.status == 3" class="evaluate btn" @click.stop="toevaluate(res.goods_id)">去评价</view> -->
								</view>
							</view>
							<u-loadmore v-if="orderList[4].length != 0" :status="loadStatus[4]"
								bgColor="#f2f2f2"></u-loadmore>
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
		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], [], [], [], []],
			list: [
				{
					name: '全部',
					value: 99
					// count: 12
				},
				{
					name: '待付款',
					value: 0
				},
				{
					name: '待发货',
					value: 1
				},
				{
					name: '待收货',
					value: 2
				},
			],
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore', 'loadmore', 'loadmore', 'loadmore', 'loadmore'],
			page_list: [1, 1, 1, 1, 1],
			maxpage_list: [0, 0, 0, 0, 0],

		};
	},
	onShow() {
		this.orderList = [[], [], [], [], []];
		this.page_list = [1, 1, 1, 1, 1];
		this.maxpage_list = [0, 0, 0, 0, 0];
		this.getOrderList(99, 0);
	},
	onLoad() {
		// this.getOrderList(99,0);
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
		gocomment(item) {
			uni.navigateTo({
				url: `/pages/comment/comment?data=${encodeURIComponent(JSON.stringify(item))}`,
			});
		},
		reachBottom() {
			// console.log(this.current);
			// console.log(this.page_list[this.current]);
			this.loadStatus.splice(this.current, 1, "loading")
			if (this.maxpage_list[this.current] > 1 && this.page_list[this.current] <= this.maxpage_list[this.current]) {
				this.getOrderList(this.list[this.current].value, this.current);
			} else {
				this.loadStatus.splice(this.current, 1, "nomore")
			}

			// 此tab为空数据
			// if(this.current != 2) {
			// 	this.loadStatus.splice(this.current,1,"loading")
			// 	setTimeout(() => {
			// 		this.getOrderList(this.list[this.current].value,this.current);
			// 	}, 1200);
			// }
		},
		// 页面数据
		getOrderList(idx, index) {
			let _this = this;
			_this.$store.dispatch('user/orderList', { 'status': idx, 'page': _this.page_list[index] }).then((res) => {
				if (res.code == 0) {
					if (_this.maxpage_list[index] == 0) {
						_this.maxpage_list[index] = res.message.maxpage;
					}
					if (res.message.maxpage > 1 && _this.page_list[index] <= res.message.maxpage) {
						_this.loadStatus.splice(_this.current, 1, "loadmore");
						_this.page_list[index] = _this.page_list[index] + 1;
					}
					if (res.message.order_list.length > 0) {
						for (let i = 0; i < res.message.order_list.length; i++) {

							_this.orderList[index].push(res.message.order_list[i]);
						}

					}

				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});

			this.loadStatus.splice(this.current, 1, "loadmore")
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
			console.log(index)
			this.swiperCurrent = index;

		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;

			this.orderList = [[], [], [], [], []];
			this.page_list = [1, 1, 1, 1, 1];
			this.maxpage_list = [0, 0, 0, 0, 0];
			console.log(current);
			this.getOrderList(this.list[current].value, current);
		},
		orderRead(orderid) {
			uni.navigateTo({
				url: '/pages/sub/center/order_detail?orderid=' + orderid
			});
		},
		payOrder(order_token) {
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/orderPay', { 'order_token': order_token }).then((res) => {
				if (res.code == 0) {
					let data = res.message
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: data.signType,
						paySign: data.paySign,
						success: function (res) {
							_this.orderList = [[], [], [], [], []];
							_this.page_list = [1, 1, 1, 1, 1];
							_this.maxpage_list = [0, 0, 0, 0, 0];
							_this.getOrderList(_this.list[_this.current].value, _this.current);
						},
						fail: function (err) {

						}
					});
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		signfor() {
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
				fail(err) {
					console.log(err)
				}
			});
		},
		userScan(result) {
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/userScan', { 'order_token': result }).then((res) => {
				if (res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message,
					})
					_this.orderList = [[], [], [], [], []];
					_this.page_list = [1, 1, 1, 1, 1];
					_this.maxpage_list = [0, 0, 0, 0, 0];
					_this.getOrderList(_this.list[_this.current].value, _this.current);
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		cancelOrder(orderid) {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确定取消订单？',
				success: function (res) {
					if (res.confirm) {
						_this.$store.dispatch('ai_xiaopu/orderCancel', { 'orderid': orderid }).then((res) => {
							if (res.code == 0) {
								_this.$refs.uToast.show({
									title: res.message,
								})
								_this.orderList = [[], [], [], [], []];
								_this.page_list = [1, 1, 1, 1, 1];
								_this.maxpage_list = [0, 0, 0, 0, 0];
								_this.getOrderList(_this.list[_this.current].value, _this.current);
							} else {
								_this.$refs.uToast.show({
									title: res.message,
								})
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});

		},
		deleteOrder(orderid) {
			let _this = this;
			uni.showModal({
				title: '提示',
				content: '确定删除订单？',
				success: function (res) {
					if (res.confirm) {
						_this.$store.dispatch('ai_xiaopu/orderDelete', { 'orderid': orderid }).then((res) => {
							if (res.code == 0) {
								_this.$refs.uToast.show({
									title: res.message,
								})
								_this.orderList = [[], [], [], [], []];
								_this.page_list = [1, 1, 1, 1, 1];
								_this.maxpage_list = [0, 0, 0, 0, 0];
								_this.getOrderList(_this.list[_this.current].value, _this.current);
							} else {
								_this.$refs.uToast.show({
									title: res.message,
								})
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});

		},
		toevaluate(goods_id) {
			uni.navigateTo({
				url: '/pages/sub/center/go_evaluate?goods_id=' + goods_id
			});
		}

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
			color: #6ee4c1;
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
			color: #6ee4c1;
			border-color: #6ee4c1;
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