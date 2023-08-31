<template>
	<view class="padding-30 margin-center padding-bottom-150">
		<view class="d-flex">
			<view v-for="(item, index) in deliverWayTab" :key="index" @tap="changeDeliverWayTab(index)"
				:class="{ 'activeTab': index == deliverWayCurrent }"
				class="flex-1 padding-top-20 padding-bottom-20 text-center">
				{{ item }}
			</view>
		</view>
		<!-- 配送地址 -->
		<view v-if="deliverWayCurrent == 0">
			<view v-if="Object.keys(address_detail).length == 0"
				class="bg-color-white padding-20 padding-top-50 padding-bottom-50 border-radius-15">
				<view class="font30" @tap="addressClick">
					<label>请选择收货地址</label>
					<view style="float: right;">
						<u-icon name="arrow-right" color="#c1c1c1" size="28"></u-icon>
					</view>
				</view>

			</view>
			<view v-if="Object.keys(address_detail).length > 0"
				class="bg-color-white padding-20 padding-top-50 padding-bottom-50 border-radius-15">
				<view class="font34 font-bold" @tap="addressClick">
					<label>
						<u-icon name="map" color="#ef5f1b" size="35"></u-icon>
						<text class="padding-left-20">{{ address_detail.schoolinfo }}{{ address_detail.address }}</text>
					</label>
					<view style="float: right;">
						<u-icon name="arrow-right" color="#c1c1c1" size="28"></u-icon>
					</view>
				</view>
				<view class="margin-top-10 padding-left-50">{{ address_detail.real_name }} {{ address_detail.phone }}</view>

				<view class="padding-top-30 d-flex">
					<label>
						<u-icon name="car" color="#ef5f1b" size="35"></u-icon>
						<text class="padding-left-20 font-bold">立即送出</text>
					</label>
					<view class="flex-1 text-right">指定派送时间请自行备注</view>
				</view>
			</view>
		</view>
		<view v-if="deliverWayCurrent == 1">
			<view class="bg-color-white padding-left-20 padding-right-20 padding-top-50 padding-bottom-50 border-radius-15">
				<view class="font34 font-bold">
					<label>
						<u-icon name="map" color="#ef5f1b" size="35"></u-icon>
						<!-- <text>自取点：</text> -->
						<text class="padding-left-20">{{ shop_address }}</text>
					</label>

				</view>
				<view class="margin-top-10 padding-left-50"> </view>
			</view>
		</view>
		<!-- 商品清单 -->
		<view class="bg-color-white padding-20 border-radius-15 margin-top-20">
			<view class="padding-top-20 padding-bottom-30">
				<u-icon name="dianpu" custom-prefix="custom-icon" color="#ef5f1b" size="34"></u-icon>
				<text class="margin-left-10 gray3">{{ shop_name }}</text>
			</view>
			<u-line color="#f3f3f3" />
			<view class="d-row d-jc-between padding-10 padding-bottom-20" v-for="(item, index) in cart" :key="index">
				<view class="d-row">
					<view class="d-clo d-ai-centen">
						<image style="width: 100rpx;height: 100rpx;" :src="item.goods_pic" mode="aspectFill"></image>
					</view>
					<view class="d-clo padding-left-10">
						<view class="font28 font-bold margin-bottom-10">{{ item.goods_name }}</view>
						<view class="font22 gray4">{{ item.skuName }}</view>
					</view>
				</view>
				<view class="flex-1 text-right">
					<text>x{{ item.number }}</text>
				</view>
				<view class="text-right" style="width: 130rpx;">
					<text class="font-bold">¥{{ item.price }}</text>
				</view>
			</view>
			<u-line color="#f3f3f3" />
			<view v-if="deliverWayCurrent == 0" class="d-row d-jc-between padding-10 padding-bottom-20 padding-top-20">
				<view class="font-bold font28">打包盒</view>
				<view style="color: #de2406;">¥{{ box_price }}</view>
			</view>
			<view v-if="deliverWayCurrent == 0" class="d-row d-jc-between padding-10 padding-bottom-20 padding-top-20">
				<view class="font-bold font28">配送费</view>
				<view class="font-bold" v-if="Number(delivery_rmbs) == 0">免配送费</view>
				<view v-else>¥{{ delivery_rmbs }}</view>
			</view>
			<view>
				<view @tap="couponClick" class="u-cell u-border-bottom u-col-center" style="background-color: transparent;">
					<u-icon name="quan" custom-prefix="custom-icon" color="#ef5f1b" size="38"></u-icon>
					<view class="u-cell_title" style="width: auto;">优惠券</view>
					<view class="u-cell__value">
						<text v-if="coupon.length > 0">{{ activeCoupon }}</text>
						<text v-if="coupon.length == 0">暂无可用优惠券</text>
					</view>
					<u-icon name="arrow-right" color="#909399" size="26"></u-icon>
				</view>
			</view>
			<view class="d-row d-jc-between d-ai-centen padding-10 padding-top-30">
				<view class="gray3">

				</view>
				<view>共{{ numsum }}个商品，小计：<label class="font-bold font40">¥ {{ total }}</label></view>
			</view>

		</view>
		<!-- 支付方式 -->
		<view class="bg-color-white padding-20 border-radius-15 margin-top-20 font30">
			<view class="d-row d-jc-between padding-top-20 padding-bottom-30" style="border-bottom: 1rpx solid #F7F7F7;">
				<view>支付方式</view>
				<view>微信支付</view>
			</view>
			<view class="d-row d-jc-between padding-top-20 padding-bottom-20">
				<view>备注（100个字以内）</view>
				<view>
					<!-- <u-icon margin-left="10" name="arrow-right" color="#c1c1c1" size="28"></u-icon> -->
				</view>
			</view>
			<view>
				<u-input v-model="model.remark" type="textarea" maxlength="500" border="true" border-color="#f1f1f1"
					height="200" auto-height="true" />
			</view>
		</view>


		<!-- 去支付 -->
		<view class="pay">
			<view style="margin:0 auto;" class="width100 d-row d-jc-between">
				<view class="d-row d-jc-start d-ai-centen" style="padding-left: 10rpx;">
					<view class="d-ai-centen padding-left-10">
						<text style="vertical-align: middle;">合计</text>
						<text class="padding-left-10 text-bolder"
							style="vertical-align: middle;color: #ff6634;font-size: 37rpx;">¥ {{ total }}</text>
					</view>
				</view>
				<view class="go gray4">
					<view v-show="!paying" class="go gray4 font28 colorWhiteBgBlue" @tap="goPayMoney">
						提交订单
					</view>
					<view v-show="paying" class="go gray4 font28 colorWhiteBgBlue">
						提交订单
					</view>
				</view>

			</view>
		</view>


		<u-popup v-model="couponShow" mode="bottom">
			<view style="height: 60vh;position: relative;">
				<view class="padding-top-20 padding-bottom-20"
					style="background-color: #eeeeef; position: sticky; top: 0; z-index: 3;">
					<u-subsection :list="couponlist" :current="current" active-color="#ef5f1b" :animation="true"
						@change="couponTabChange"></u-subsection>
				</view>
				<view class="padding-left-20 padding-right-20 padding-bottom-50">
					<coupon v-for="(item, index) in coupon" :key="index" v-bind:item="item" @use="use" theme="#ff6c00"
						color="#ffffff" solid="#ff6c00"></coupon>
				</view>
			</view>
		</u-popup>

		<u-toast ref="uToast" />
	</view>
</template>

<script>
import coupon from '@/components/coolc-coupon/coolc-coupon';
import {
	mapState,
	mapMutations
} from 'vuex'
import { accMul, accAdd } from '@/tools/utils.js'
export default {
	components: {
		coupon
	},
	data() {
		return {
			paying: false,

			couponShow: false,
			shop_name: '',
			delivery_rmbs: 0, // 运费
			box_price: 0, // 打包盒
			deliver_way: '', // 配送方式
			deliverWayTab: ['外卖', '店内'], // 配送tab
			deliverWayCurrent: 0, // 当前选择得方式
			shop_address: '', // 自提地址
			cart: [],

			total: 0,

			couponlist: [{
				name: '可用优惠券'
			}],
			current: 0,
			coupon: [],
			activeCoupon: '选择优惠券',
			activeCouponNum: '',
			model: {
				goods_ids: '',
				goods_nums: '',
				sku_indexes: '',
				addressid: 0,
				couponid: 0,
				remark: ''
			},
			address_detail: {}
		}
	},
	props: {
		index: 'index'
	},
	computed: {
		...mapState(['orderType', 'address', 'store']),
		numsum() {
			return this.cart.reduce((acc, cur) => acc + cur.number, 0)
		},
		// total() {
		// 	let total = this.cart.reduce((acc, cur) => {
		// 		return accAdd(acc,accMul(cur.number,cur.price))
		// 	}, 0)
		// 	total = Number(total)

		// 	// 判断是否选择优惠券
		// 	if(Number(this.activeCouponNum) > 0) {
		// 		total = total - Number(this.activeCouponNum)
		// 	}
		// 	// 判断金额是否符合免运费
		// 	let enough_free_dyrmbs_fmt = Number(this.enough_free_dyrmbs)
		// 	if(total < enough_free_dyrmbs_fmt) {
		// 		total = accAdd(total,Number(this.delivery_rmbs))
		// 	}
		// 	if(total < 0) {
		// 		total = 0
		// 	}
		// 	return total
		// },
		amount() {
			return this.cart.reduce((acc, cur) => acc + cur.number * cur.price, 0)
		}
	},
	onLoad(option) {
		this.shop_name = option.name
		this.companyid = option.companyid
		this.shop_address = option.address
		this.deliver_way = option.deliver_way
		if (this.deliver_way == 1) {
			this.deliverWayCurrent = 0
		} else if (this.deliver_way == 2) {
			this.deliverWayCurrent = 1
		}

		this.cart = uni.getStorageSync('cart') || []
		console.log(this.cart)
		let goods_ids = []
		let goods_nums = []
		let sku_indexes = []
		this.cart.map((item) => {
			goods_ids.push(item.goods_id)
			goods_nums.push(item.number)
			sku_indexes.push(item.skuActive)
		})
		this.model.goods_ids = goods_ids.toString()
		this.model.goods_nums = goods_nums.toString()
		this.model.sku_indexes = sku_indexes.toString()

		this.model.deliver_way = Number(this.deliverWayCurrent) + 1 // 当前选择的什么配送方式

		this.addressdefault()
		this.mycoupon()

		this.calculatePrice()
	},
	methods: {
		// 获取默认地址
		addressdefault() {
			let _this = this;
			this.$store.dispatch('address/addressdefault', {}).then((res) => {
				if (res.code == 0) {
					let data = res.message;
					this.address_detail = data
					// console.log(this.address_detail)
					this.model.addressid = data.addressid
				}

				console.log(this.model)
			})
		},
		// 选择配送方式
		changeDeliverWayTab(index) {
			if (this.deliver_way == 1 && index == 1) {
				this.$refs.uToast.show({
					title: '不支持外卖',
					duration: 1000
				})
				return false
			} else if (this.deliver_way == 2 && index == 0) {
				this.$refs.uToast.show({
					title: '不支持自提',
					duration: 1000
				})
				return false
			}
			this.deliverWayCurrent = index

			this.model.deliver_way = Number(this.deliverWayCurrent) + 1
			this.calculatePrice()
		},
		mycoupon() {

			let _this = this;
			this.$store.dispatch('ai_xiaopu/mycoupon', { 'companyid': this.companyid }).then((res) => {
				if (res.code == 0) {
					this.coupon = res.message.coupon_list
					this.maxpage = res.message.maxpage
				}
			})
		},
		// 计算价格
		calculatePrice() {
			let _this = this;
			this.$store.dispatch('ai_xiaopu/calculatePrice', this.model).then((res) => {
				if (res.code == 0) {
					this.total = res.message.total_rmbs
					this.delivery_rmbs = res.message.delivery_rmbs
					this.box_price = res.message.box_price_fmt
				}
			})
		},
		// 去选择地址
		addressClick() { // pages/sub/ai_xiaopu/address/index
			uni.navigateTo({
				url: './address/index?type=1',
				animationType: 'pop-in',
				animationDuration: 2000
			})
		},
		// 返回后渲染选择的地址
		chooseAddress(data) {
			this.address_detail = data
			this.model.addressid = data.addressid
		},
		goPayMoney() {

			if (this.model.addressid == 0) {
				this.$refs.uToast.show({
					title: '请选择地址',
					duration: 1000
				})
				return false
			}
			// uni.switchTab({
			// 	url: '../order/order-list',
			// 	animationType: 'pop-in',
			// 	animationDuration: 2000
			// })
			this.paying = true;
			this.$store.dispatch('ai_xiaopu/orderAdd', this.model).then((res) => {
				if (res.code == 0) {
					this.toPay(res.message)
				} else {
					this.paying = false;
					this.$refs.uToast.show({
						title: res.message,
						duration: 1000
					})
				}
			})

		},
		toPay(token) {
			let _this = this;
			this.$store.dispatch('ai_xiaopu/orderPay', { 'order_token': token }).then((res) => {
				uni.setStorageSync('cart', []);
				if (res.code == 0) {
					let data = res.message
					_this.paying = false;
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: data.timeStamp,
						nonceStr: data.nonceStr,
						package: data.package,
						signType: data.signType,
						paySign: data.paySign,
						success: function (res) {
							_this.paying = false;
							uni.reLaunch({
								url: '/pages/sub/center/my_order'
							})
						},
						fail: function (err) {
							_this.paying = false;
							uni.reLaunch({
								url: '/pages/sub/center/my_order'
							})
						}
					});
				} else {
					uni.reLaunch({
						url: '/pages/sub/center/my_order'
					})
					_this.paying = false;
					_this.$refs.uToast.show({
						title: res.message,
						duration: 1000
					})
				}
			}).catch(() => {
				_this.paying = false;
				uni.reLaunch({
					url: '/pages/sub/center/my_order'
				})
			})
		},
		couponClick() {
			if (this.coupon.length > 0) {
				this.couponShow = true
			}
		},
		couponTabChange(index) {
			this.current = index;
		},
		use(data) {

			if (this.total < Number(data.need_rmbs)) {
				this.$refs.uToast.show({
					title: '未满足优惠券使用要求',
					duration: 1000
				})
				return false
			}

			this.activeCoupon = '￥' + data.rmbs
			this.activeCouponNum = data.rmbs

			this.model.couponid = data.id

			this.couponShow = false

			this.calculatePrice()
		}
	}
}
</script>

<style>
page {
	background-color: #f7f7f7;
}

.pay {
	background-color: #ffffff;
	width: 100%;
	height: 105rpx;
	margin: 0 auto;

	position: fixed;
	bottom: 0;
	left: 0;
	z-index: 1000;

	box-shadow: 0px -1px 3px #ececec;
}

.go {
	width: 240rpx;
	height: 105rpx;
	line-height: 105rpx;
	background: linear-gradient(to right, #fbab7c, #de2406);
	color: #cecece !important;
	text-align: center;

}

.colorWhiteBgBlue {
	background-color: #007AFF !important;
	color: #FFFFFF !important;
}

.u-cell {
	display: flex;
	flex-direction: row;
	align-items: center;
	position: relative;
	box-sizing: border-box;
	width: 100%;
	padding: 26rpx 0;
	font-size: 22rpx;
	line-height: 45rpx;

	background-color: #fff;
	text-align: left;
}

.u-cell_title {
	padding-left: 15rpx;
	font-size: 28rpx;
}

.u-cell__value {
	flex: 1;
	overflow: hidden;
	text-align: right;
	vertical-align: middle;
	color: #909399;
	font-size: 26rpx;
}

.activeTab {
	background: #fff;
	border-top: 1rpx solid #fff;
	border-left: 1rpx solid #fff;
	border-right: 1rpx solid #fff;
	border-radius: 15rpx 15rpx 0 0;
}</style>
