<template>
	<view>
		<view class="wrap">
			<view class="page-box">
				<view v-if="orderList.length != 0" class="order" v-for="(res, index) in orderList" :key="res.orderid">
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
			
				</view>
				<u-loadmore v-if="orderList.length != 0" :status="loadStatus" bgColor="#f2f2f2"></u-loadmore>
				<view v-if="orderList.length == 0">
					<view class="centre">
						<u-empty text="您还没有相关的订单" mode="order"></u-empty>
						
					</view>
				</view>
			</view>
		</view>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
export default {
	data() {
		return {
			companyid:0,
			orderList: [],
			
			current: 0,
			swiperCurrent: 0,
			tabsHeight: 0,
			dx: 0,
			loadStatus: 'loadmore',
			page: 1,
			maxpage: 0,

		};
	},
	onLoad(options) {
		console.log(options)
		this.companyid = options.companyid
		this.getOrderList();
	},
	onReachBottom(){
		this.loadStatus = "loading"
		if(this.maxpage > 1 && this.page <= this.maxpage) {
			this.getOrderList();
		} else {
			
			this.loadStatus = "nomore"
		}
	},
	methods: {

		// 页面数据
		getOrderList(callback=()=>{}) {
			let _this = this;
			_this.$store.dispatch('user/companyOrderlist',{'companyid':_this.companyid,'page':_this.page}).then((res) => {
				if(res.code == 0) {
					_this.maxpage = res.message.maxpage;
					if(res.message.maxpage > 1 && _this.page <= res.message.maxpage) {
						_this.loadStatus = "loadmore";
						_this.page = _this.page + 1;
					}
					if(res.message.order_list.length > 0) {
						for(let i = 0; i < res.message.order_list.length; i++) {
							
							_this.orderList.push(res.message.order_list[i]);
						}
						
					}
					callback()
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
			
			this.loadStatus = "loadmore"
		},



		orderRead(orderid) {
			uni.navigateTo({
				url: '/pages/sub/center/company_order_detail?orderid='+orderid
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