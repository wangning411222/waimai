<template>
	<view class="order-detail" v-if="JSON.stringify(order) != '{}'">
		<view class="card">
			<view> 状态：{{ order.status_fmt }} </view>
			<view v-if="order.product_sku[0]['deliver_way'] == 1 && order.status == 2" style="padding-top: 15rpx">
				运单编号：{{ order.waybill }}
				<text @click="fuzhi_yundan(order.waybill)" style="
            margin-left: 10rpx;
            padding: 0 5rpx;
            border: 1rpx solid #cccccc;
            font-size: 24rpx;
          ">复制</text>
			</view>
		</view>
		<view class="card" v-if="order.deliver_way == 1">
			<view style="margin-bottom: 15rpx">联系人：{{ order.real_name }}<text style="color:#de2406;margin-left:20rpx;"
					v-if="order.fugou>1">(已下单{{order.fugou}}次)</text> </view>
			<view style="margin-bottom: 15rpx">联系电话：<text user-select>{{ order.phone }}</text></view>
			<view>地址：{{ order.schoolinfo }}</view>
		</view>
		<view class="card" v-if="order.deliver_way == 2">
			<view style="margin-bottom: 5rpx">店铺名称：{{ order.company_name }}</view>
			<view>店铺地址：{{ order.company_address }}</view>
		</view>
		<view class="order">
			<view class="item" v-for="(item, index) in order.product_sku" :key="index">
				<view class="left">
					<image :src="item.goods_pic" mode="aspectFill"></image>
				</view>
				<view style="flex: 1">
					<view class="content">
						<view class="title u-line-2">{{ item.goods_name }}</view>
						<!-- <view class="type">{{ item.price }}</view>
						<view class="delivery-time">发货时间 {{ item.goods_num }}</view> -->
					</view>
					<view class="right">
						<view class="price"> ￥{{ item.price }} </view>
						<view class="number" style="padding: 20rpx 0">x{{ item.goods_num }}</view>
						<view class="number">
							<text v-if="item.deliver_way == 1">外卖</text>
							<text v-if="item.deliver_way == 2">店内</text>
						</view>
					</view>
				</view>
			</view>
			<view style="text-align: right">
				优惠券：<text style="color: #de2406">-￥{{ order.coupon_rmbs_fmt }}</text>
			</view>
			<view class="order-explain">
				<text>餐盒费</text>
				<text>￥{{ order.box_price }}</text>
			</view>
			<view class="order-explain">
				<text>配送费</text>
				<text>￥{{ order.delivery_rmbs }}</text>
			</view>
			<view class="total">
				共{{ order.total_nums }}件商品 合计:
				<text class="total-price"> ￥{{ order.total_rmbs_fmt }} </text>
			</view>
			<view class="bottom">
				<view style="flex: 1"></view>
				<view v-if="'1, 2, 3, 4, 5, 6, 9'.indexOf(order.status)>=0 &&order.part_refund==0"
					class="evaluate btn margin-left-10" @tap="rebates(order.orderid)">部分退款</view>
				<view v-if="'1, 2, 3, 4, 5, 6, 9'.indexOf(order.status)>=0&&order.part_refund==0"
					class="evaluate btn margin-left-10" @tap="refund(order.orderid)">全额退款</view>
				<view v-if="
            order.status == 1 ||
            order.status == 2 ||
            order.status == 3 ||
            order.status == 4
          " class="evaluate btn margin-left-10" @tap="print(order.order_token)">打印小票</view>
				<view v-if="order.status == 9" class="evaluate btn margin-left-10"
					@tap="companyOrderUpdate(order.orderid)">
					手动接单</view>
			</view>
		</view>
		<view class="card" v-if='order.remark'>
			<view>备注内容</view>
			<view class="order_msg">
				{{ order.remark }}
			</view>
		</view>
		<view class="card">
			<view>跑腿信息</view>
			<view class="order_pt" v-if="order.outer_runner_info">校外跑腿姓名：{{ order.outer_runner_info.real_name }}</view>
			<view class="order_pt" v-if="order.outer_runner_info" @click="call(order.outer_runner_info.phone)">
				联系校外跑腿：<u-icon name="phone" color="#ff9900" size="42"></u-icon>{{ order.outer_runner_info.phone }}
			</view>
			<view class="order_pt" v-if="order.outer_runner_info">校外接单时间：{{ order.outer_runner_info.date_time }}</view>
			<view class="order_pt" v-if='order.inner_runner_info'>校内跑腿姓名：{{ order.inner_runner_info.real_name }}</view>
			<view class="order_pt" v-if='order.inner_runner_info' @click="call(order.inner_runner_info.phone)">
				联系校内跑腿：<u-icon name="phone" color="#ff9900" size="42"></u-icon>{{ order.inner_runner_info.phone }}
			</view>
			<view class="order_pt" v-if='order.inner_runner_info'>校内取餐时间：{{ order.inner_runner_info.date_time }}</view>
		</view>
		<view class="card">
			<view class="estimated-revenue-top">
				<text>本单预估收入：</text>
				<text>￥{{ order.incomermbs }}</text>
			</view>
			<view class="estimated-revenue-bottom">
				<text>本单顾客支出：</text>
				<text>￥{{ order.total_rmbs_fmt }}</text>
			</view>
			<view class="estimated-revenue-bottom" v-if="order.part_refund-0>0">
				<text>(实际支出:￥{{((order.total_rmbs_fmt-0)-(order.part_refund_fmt-0)).toFixed(2)}}
					退款￥{{order.part_refund_fmt }})</text>
			</view>
		</view>
		<view class="card">
			<view>订单信息</view>
			<view class="order_msg">订单编号：{{ order.orderid }}</view>
			<!-- <view class="order_msg">创建时间：{{ order.create_time }}</view> -->
			<view class="order_msg">支付时间：{{ order.pay_date_fmt }}</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="rebatesDialogShow" @confirm="rebatesConfirm" title='请输入退款金额'>
			<view style="display:flex;flex-direction:row;padding:10rpx 20rpx;align-item:center;justify-content:center;">
				<u-input v-model="rebatesPrice" type="digit" :border="true" />
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order: {},
				rebatesDialogShow: false,
				rebatesOrderId: "",
				rebatesPrice: "",
				orderid: ""
			};
		},
		onLoad(option) {
			this.orderid = option.orderid
			this.getOrderList(option.orderid);
		},
		computed: {
			// 价格小数
			priceDecimal() {
				return (val) => {
					if (val !== parseInt(val)) return val.slice(-2);
					else return "00";
				};
			},
			// 价格整数
			priceInt() {
				return (val) => {
					if (val !== parseInt(val)) return val.split(".")[0];
					else return val;
				};
			},
		},
		methods: {
			// 部分退款确认按钮
			rebatesConfirm() {
				if (this.rebatesPrice) {
					let data = {
						'orderid': this.rebatesOrderId,
						'refund_rmbs': this.rebatesPrice
					}
					this.$store
						.dispatch('user/partRefund', data).then((res) => {
							this.$refs.uToast.show({
								title: res.message,
							});

							this.rebatesDialogShow = false
							this.rebatesPrice = ''
							this.getOrderList(this.orderid);

						})
				}
			},
			// 部分退款
			rebates(orderid) {
				this.rebatesDialogShow = true
				this.rebatesOrderId = orderid
			},
			call(phone) {
				wx.makePhoneCall({
					phoneNumber: phone,
				});
			},
			getOrderList(orderid) {
				let _this = this;
				_this.$store
					.dispatch("user/orderRead", {
						orderid: orderid
					})
					.then((res) => {
						if (res.code == 0) {
							_this.order = res.message;
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							});
						}
					});
			},
			// 总价
			totalPrice(item) {
				let price = 0;
				item.map((val) => {
					price += parseFloat(val.price);
				});
				return price.toFixed(2);
			},
			// 总件数
			totalNum(item) {
				let num = 0;
				item.map((val) => {
					num += val.number;
				});
				return num;
			},
			payOrder(order_token) {
				let _this = this;
				_this.$store
					.dispatch("ai_xiaopu/orderPay", {
						order_token: order_token
					})
					.then((res) => {
						if (res.code == 0) {} else {
							_this.$refs.uToast.show({
								title: res.message,
							});
						}
					});
			},
			cancelOrder(orderid) {
				let _this = this;
				uni.showModal({
					title: "提示",
					content: "确定取消订单？",
					success: function(res) {
						if (res.confirm) {
							_this.$store
								.dispatch("ai_xiaopu/orderCancel", {
									orderid: orderid
								})
								.then((res) => {
									if (res.code == 0) {
										_this.$refs.uToast.show({
											title: res.message,
										});
										_this.getOrderList(orderid);
									} else {
										_this.$refs.uToast.show({
											title: res.message,
										});
									}
								});
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
			fuzhi_yundan(waybill) {
				let _this = this;
				uni.setClipboardData({
					data: waybill,
					success: function() {
						_this.$refs.uToast.show({
							title: "复制成功",
						});
					},
				});
			},
			print(order_token) {
				let _this = this;
				_this.$store
					.dispatch("user/printQrcode", {
						order_token: order_token
					})
					.then((res) => {
						if (res.code == 0) {
							_this.$refs.uToast.show({
								title: res.message,
							});
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							});
						}
					});
			},
			companyOrderUpdate(orderid) {
				let _this = this;
				_this.$store
					.dispatch("user/companyOrderUpdate", {
						orderid: orderid
					})
					.then((res) => {
						if (res.code == 0) {
							_this.getOrderList(orderid);
							_this.$refs.uToast.show({
								title: res.message,
							});
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							});
						}
					});
			},
			refund(orderid) {
				let _this = this;
				uni.showModal({
					title: "提示",
					content: "确认退款？",
					success: function(res) {
						if (res.confirm) {
							_this.$store
								.dispatch("user/companyRefund", {
									orderid: orderid
								})
								.then((res) => {
									if (res.code == 0) {
										_this.getOrderList(orderid);
										_this.$refs.uToast.show({
											title: res.message,
										});
									} else {
										_this.$refs.uToast.show({
											title: res.message,
										});
									}
								});
						} else if (res.cancel) {
							console.log("用户点击取消");
						}
					},
				});
			},
		},
	};
</script>
<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>
<style lang="scss" scoped>
	.card {
		width: 710rpx;
		background-color: #ffffff;
		margin: 20rpx auto;
		border-radius: 20rpx;
		box-sizing: border-box;
		padding: 40rpx 35rpx;
		font-size: 28rpx;
	}

	.order_msg {
		font-size: 24rpx;
		margin-top: 15rpx;
	}

	.order_pt {
		font-size: 24rpx;
		margin-top: 15rpx;
		display: flex;
		align-items: center;
	}

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

		.order-explain {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			margin-top: 20rpx;
		}
	}

	.estimated-revenue-top,
	.estimated-revenue-bottom {
		display: flex;
		flex-direction: row;

		&>text:last-child {
			color: red;
		}
	}

	.estimated-revenue-top {
		font-size: 36rpx;
		font-weight: bold;
		justify-content: space-between;
		margin-bottom: 20rpx;
	}

	.estimated-revenue-bottom {
		font-size: 30rpx;
		justify-content: flex-start;
	}
</style>