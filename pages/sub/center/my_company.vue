<template>
	<view>
		<view v-if="JSON.stringify(company_con) != '{}'">
			<view
				style="display: flex; padding-top: 40rpx; padding-bottom: 40rpx; padding-left: 50rpx; background-color: #FFFFFF;">
				<view>
					<u-avatar :src="company_con.logo" size="170" bg-color="#FFFFFF" mode="square"></u-avatar>
				</view>
				<view style="flex: 1;padding-left: 40rpx;">
					<view class="title">
						<text style="vertical-align: middle; margin-right: 10rpx;">{{ company_con.name }}</text>
						<text v-if="company_con.is_admin == 1" class="shop-tag-ziying">自营</text>
						<text v-if="company_con.is_admin == 0" class="shop-tag-shouquan">授权店</text>
					</view>
					<view class="tag" style="color: #CCCCCC;">
						{{ company_con.catename }}
					</view>
					<view class="tag">
						<u-icon name="map" size="30"></u-icon>
						<text class="mr-2">{{ company_con.address }}</text>
					</view>
				</view>

			</view>
			<view style="background-color: #FFFFFF;">
				<u-tabs :list="tablist" :is-scroll="false" active-color="#6ee4c1" :current="current"
					@change="change"></u-tabs>
			</view>
			<view v-show="current == 0" style="padding:20rpx;">
				<view class="manage margin-bottom-20" style="background: #FFFFFF;">
					<u-grid :col="4" :border="false">
						<u-grid-item>
							<view class="item-menu-image" @click="shops_manage()"
								style="display: flex;justify-content: center;">
								<u-icon name="order" size="60" color="#6ee4c1"></u-icon>
							</view>
							<view class="grid-text">订单管理</view>
						</u-grid-item>
						<u-grid-item>
							<view class="item-menu-image" @click="goods_manage()"
								style="display: flex;justify-content: center;">
								<u-icon name="grid" size="60" color="#6ee4c1"></u-icon>
							</view>
							<view class="grid-text">分类管理</view>
						</u-grid-item>
						<u-grid-item>
							<view class="item-menu-image" @click="goods_list()"
								style="display: flex;justify-content: center;">
								<u-icon name="list-dot" size="60" color="#6ee4c1"></u-icon>
							</view>
							<view class="grid-text">商品管理</view>
						</u-grid-item>
						<u-grid-item>
							<view class="item-menu-image" @click="coupon_list()"
								style="display: flex;justify-content: center;">
								<u-icon name="coupon" size="60" color="#6ee4c1"></u-icon>
							</view>
							<view class="grid-text">优惠券管理</view>
						</u-grid-item>
						<u-grid-item>
							<view class="item-menu-image" @click="edit_detail()">
								<u-icon name="qiye" custom-prefix="custom-icon" size="60" color="#6ee4c1"></u-icon>
							</view>
							<view class="grid-text">信息编辑</view>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="margin-bottom-20" v-if="Object.keys(statistics).length > 0" style="background: #FFFFFF;">
					<view class="padding-30">

						<view class="d-flex padding-bottom-40">
							<view class="flex-1">今日订单数：{{ statistics.today_count }}</view>
							<view class="flex-1">本周订单数：{{ statistics.week_count }}</view>
						</view>
						<view class="d-flex">
							<view class="flex-1">本月订单数：{{ statistics.month_count }}</view>
							<view class="flex-1">总订单数：{{ statistics.total_count }}</view>
						</view>
					</view>
				</view>
				<view v-if="Object.keys(statistics).length > 0" style="background: #FFFFFF;">
					<view class="padding-30">

						<view class="d-flex padding-bottom-40">
							<view class="flex-1">当天收入：￥{{ statistics.today_rmbs }}</view>
							<view class="flex-1">本周收入：￥{{ statistics.week_rmbs }}</view>
						</view>
						<view class="d-flex">
							<view class="flex-1">本月收入：￥{{ statistics.month_rmbs }}</view>
							<view class="flex-1">总收入：￥{{ statistics.total_rmbs }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current == 1">
				<view class="content_box">
					<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
						<view style="flex: 1;">
							<text style="padding-left: 10rpx; font-weight: bold;">商店介绍</text>
						</view>

					</view>
					<view class="content">
						<rich-text :nodes="company_con.message_fmt"></rich-text>
						<u-grid :col="5" :border="false" hover-class="none">
							<u-grid-item v-for="(item, index) in message_img_arr" :key="index">
								<image class="item-menu-image" :src="item" mode="" @click="image_preview(index)"></image>
							</u-grid-item>
						</u-grid>
					</view>
				</view>
				<view class="content_box">
					<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
						<view style="flex: 1;">
							<text style="padding-left: 10rpx; font-weight: bold;">营业执照</text>
						</view>

					</view>
					<view class="content cert_content" style="text-align: center;">

						<image :src="company_con.cert_img_url" style="width:300rpx" mode="widthFix"
							@click="cert_image_preview(company_con.cert_img_url)"></image>
					</view>
				</view>
				<view class="content_box">
					<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
						<view style="flex: 1;">
							<text style="padding-left: 10rpx; font-weight: bold;">联系方式</text>
						</view>

					</view>
					<view class="content" style="line-height: 1.6rem;">
						<view>联系人：{{ company_con.contacts_name }}</view>
						<view>联系电话：{{ company_con.contacts_mobile }}</view>
						<view>地址：{{ company_con.address }}</view>
					</view>
				</view>
				<view class="content_box">
					<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
						<view style="flex: 1;">
							<text style="padding-left: 10rpx; font-weight: bold;">费用配置</text>
						</view>

					</view>
					<view class="content" style="line-height: 1.6rem;">
						<view>起送价：￥{{ company_con.start_delivery_rmbs_fmt }}</view>
						<view>配送费：￥{{ company_con.delivery_rmbs_fmt }}</view>
						<view>满减费：满￥{{ company_con.enough_free_dyrmbs_fmt }}减配送费</view>
					</view>
				</view>
			</view>


		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
	data() {
		return {
			tablist: [{
				name: '管理'

			}, {
				name: '商店信息'
			}],
			current: 0,

			collect: false,
			company_con: {},
			message_img_arr: [],
			statistics: {}
		}
	},
	computed: {
		...mapGetters('config', [
			'config'
		]),
		...mapGetters('user', [
			'userInfo'
		])
	},
	onShow() {
		this.postMyCompanyRead();
	},
	methods: {
		postMyCompanyRead() {
			let _this = this;
			_this.$store.dispatch('user/companyRead', {}).then((res) => {
				if (res.code == 0) {
					_this.config.shop_catelist.map(function (v, i) {
						if (v.cateid == res.message.cateid) {
							res.message.catename = v.title;
						}
					})

					_this.company_con = res.message;
					let message_img = res.message.message_img.trim();
					if (message_img.length > 0) {
						_this.message_img_arr = res.message.message_img.split(",");
					}
					_this.getCompanyStatistics(res.message.companyid)

				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		image_preview(index) {
			let _this = this;
			uni.previewImage({
				current: index,
				urls: _this.message_img_arr,
				longPressActions: {
					itemList: ['发送给朋友', '保存图片', '收藏'],
					success: function (data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function (err) {
						console.log(err.errMsg);
					}
				}
			});
		},
		cert_image_preview(message_img_arr) {
			let _this = this;
			uni.previewImage({
				urls: [message_img_arr],
				longPressActions: {
					success: function (data) {
						console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
					},
					fail: function (err) {
						console.log(err.errMsg);
					}
				}
			});
		},
		edit_detail: function () {
			uni.navigateTo({
				url: '/pages/sub/center/company_settled_edit'
			});
		},
		shops_manage() {

			uni.navigateTo({
				url: '/pages/sub/center/company_order_list'
			});
		},
		goods_manage() {
			uni.navigateTo({
				url: '/pages/sub/center/goods_class/goods_class'
			});
		},
		goods_list() {
			uni.navigateTo({
				url: '/pages/sub/center/goods_class/product_list?cateid=0'
			});
		},
		coupon_list() {
			uni.navigateTo({
				url: '/pages/sub/center/coupon/couponlist'
			});
		},
		change(index) {
			this.current = index;
		},
		getCompanyStatistics(companyid) {
			let _this = this;
			_this.$store.dispatch('user/companyStatistics', { 'companyid': companyid }).then((res) => {
				if (res.code == 0) {
					_this.statistics = res.message
					_this.statisticsShow = true;
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
				_this.loadingshow = false
			});
		},
	}
}
</script>
<style>
page {
	background-color: #f9f9f9;
}
</style>
<style lang="scss" >
.mr-2 {
	margin-right: 20rpx;
}

.font-35 {
	font-size: 35rpx;
}

.content_box {
	padding: 0 25rpx 25rpx;
	background-color: #FFFFFF;
	border-radius: 8rpx;
	margin-bottom: 10rpx;
}

.job_tag {
	font-size: 22rpx;
	padding: 0 16rpx;
	margin-right: 10rpx;
	color: #FFFFFF;
	border: 1rpx solid #FFFFFF;
}

.title {

	font-size: 38rpx;
}

.price {
	margin: 15rpx 0;
	color: red;
}

.tag,
.area {
	margin: 15rpx 0 0;
	font-size: 30rpx;
}

.content {
	padding: 0 20rpx;
	color: #666666;
}

.usertag {
	display: inline-block;
	padding: 10rpx 15rpx;
	margin-right: 15rpx;
	margin-bottom: 15rpx;
	border: 1rpx solid #cccccc;
	border-radius: 3px;
	color: #bbbbbb;
}

.item-menu-image {
	width: 100rpx;
	height: 100rpx;
}

.cert_content .u-image {
	margin: 0 auto;
}

.shop-tag-ziying {
	background: #000000;
	border-radius: 8rpx;
	padding: 3rpx 10rpx;
	color: #f7b374;
	font-size: 24rpx;
	vertical-align: middle;
}

.shop-tag-shouquan {
	background: linear-gradient(to right, red, orange);
	border-radius: 8rpx;
	padding: 3rpx 10rpx;
	color: #FFFFFF;
	font-size: 24rpx;
	vertical-align: middle;
}

.navigation {
	width: 100%;

	position: fixed;
	left: 0;
	bottom: 0;

	display: flex;
	border: solid 2rpx #efefef;
	background-color: #efefef;

	.tell {
		padding: 28rpx 0;
		color: #333333;
		font-size: 28rpx;
		flex: 1;
		// background-color: #6ee4c1;
		text-align: center;

	}

	.goodsClass {
		padding: 28rpx 0;
		color: #333333;
		font-size: 28rpx;
		flex: 1;
		// background-color: #6ee4c1;
		text-align: center;
		border-left: 1rpx solid #bbbbbb;
	}
}

.bottom_btn {
	width: 100%;
	height: 120rpx;
	padding: 0 25rpx;
	position: fixed;
	left: 0;
	bottom: 0;
	border-top: 1px solid #eee;
	background-color: #FFFFFF;
}

.collect_left {
	width: 440rpx;
	height: 120rpx;

	display: flex;
	align-items: center;

	background-color: #FFFFFF;
	color: #aaaaaa;
	float: left;
}

.bottom_btn .primary {
	width: 130rpx;
	height: 120rpx;
	line-height: 120rpx;
	overflow: hidden;
	text-align: center;
	color: #FFFFFF;

	text {
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		background-color: #ed3f14;
	}
}

.bottom_btn .default_btn {
	width: 130rpx;
	height: 120rpx;
	line-height: 120rpx;
	overflow: hidden;
	text-align: center;
	color: #FFFFFF;

	text {
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		background-color: #C0C4CC;
	}
}

.manage {

	border-radius: 10rpx;
	box-shadow: 0 0 10rpx 1rpx #f5f5f5;

	.item-menu-image {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 100%;
		background-color: #EEEEEE;
		text-align: center;
	}
}</style>