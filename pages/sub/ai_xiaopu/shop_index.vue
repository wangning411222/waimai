<template>
	<view class="u-wrap">
		<!-- 商家信息 -->
		<view>
			<view class="width100 d-row d-jc-centen padding-20" style=" background: #333333;">
				<view class="padding-right-20">
					<image class="s-head-img" mode="aspectFill" :src="form.logo"></image>
				</view>
				<view class="flex-1" style="align-self: center;">
					<view class="colorWhite margin-bottom-20">
						<text style="margin-right: 10rpx;">{{ form.name }}</text>
						<text v-if="form.is_admin == 1" class="shop-tag-ziying">自营</text>
						<text v-if="form.is_admin == 0" class="shop-tag-shouquan">授权店</text>
					</view>
					<view class="colorWhite">
						<u-icon name="map" color="#bbbbbb" size="24"></u-icon>
						<text style="color: #bbbbbb; font-size: 24rpx;">{{ form.address }}</text>
					</view>
				</view>
			</view>
			<view v-if="coupon_list.length > 0" class="d-row d-ai-centen padding-left-10 padding-right-10 padding-top-20 "
				style="flex-wrap: wrap;">
				<view class="flex-1 d-row" @tap="couponClick()">
					<view v-for="(item, index) in coupon_list" :key="index" class="d-row margin-right-10">
						<view class="coupon1 font28 font-bold padding-left-10 padding-right-10" style="line-height: 40rpx;">
							<text class="font22">￥</text>{{ item.rmbs }}
						</view>
						<view class="coupon2 font22 padding-left-10 padding-right-10" style="line-height: 40rpx;">领取</view>
					</view>
				</view>
				<view>
					<u-icon name="arrow-right" color="#a1a1a1" size="28"></u-icon>
				</view>

			</view>
			<view class="d-row padding-left-10 padding-right-20">
				<view class="flex-1 padding-left-30">
					<view>
						<text :class="tabcurrent == 0 ? 'active' : ''" @tap="handelTab(0)"
							class="padding-top-30 padding-bottom-30 margin-right-100 gray3"
							style="display: inline-block;">分类</text>
						<text :class="tabcurrent == 2 ? 'active' : ''" @tap="handelTab(2)"
							class="padding-top-30 padding-bottom-30 margin-right-100 gray3"
							style="display: inline-block">评价</text>
						<text :class="tabcurrent == 1 ? 'active' : ''" @tap="handelTab(1)"
							class="padding-top-30 padding-bottom-30 gray3" style="display: inline-block;">店铺</text>
					</view>
				</view>
				<view style="align-self: center;">
					<!-- <view @tap="handelShopSearch" class="gray3" style="padding: 8rpx 35rpx; border-radius: 50px; background-color: #eaeaea;">
						<u-icon name="search"></u-icon>
						<text class="margin-left-10">搜索</text>
					</view> -->
				</view>
			</view>
			<u-line color="#cccccc" />
		</view>
		<view class="u-menu-wrap" v-if="tabcurrent == 0">
			<scroll-view scroll-y scroll-with-animation class="u-tab-view menu-scroll-view" :scroll-top="scrollTop">
				<view v-for="(item, index) in cate_list" :key="index" class="u-tab-item"
					:class="[current == index ? 'u-tab-item-active' : '']" :data-current="index"
					@tap.stop="swichMenu(index)">
					<text class="u-line-1">{{ item.title }}</text>
				</view>
			</scroll-view>
			<block v-for="(item, index) in goods_list" :key="index">
				<scroll-view scroll-y class="right-box" v-show="current == index">
					<view class="page-view">
						<view class="class-item">
							<view class="item-title">
								<text>{{ item.name }}</text>
							</view>
							<view class="item-container">
								<view class="thumb-box" v-for="(item1, index1) in item.list" :key="index1">
									<image class="item-menu-image" :src="item1.goods_pic" mode="aspectFill"
										@tap="handelGoodsDetail(item1, index, index1)"></image>
									<view class="item-menu-name padding-left-20">
										<view @tap="handelGoodsDetail(item1, index, index1)">
											<view>
												<text class="font32 font-bold">{{ item1.goods_name }}</text>
											</view>
											<view class="padding-top-10">
												<text v-if="item1.goods_desc != ''" class="font24 gray3 margin-right-20">{{
													item1.goods_desc }}</text>
												<text class="font24 gray3">月售{{ item1.sales }}份</text>
											</view>
										</view>
										<view class="d-row padding-top-20" style="align-item:center">
											<view class="color-orange font38 font-bold">
                        <text class="font28">¥</text>
                        {{ item1.price }}
                      </view>
                      <view class="gray3 text-through">¥{{item1.market_price}}</view>
											<view v-if="item1.sku_fmt.length <= 0">
												<view class="d-row" v-if="Number(item1.stock) != 0">
													<view v-show="goodCartNum(item1.goods_id, -1)"
														@tap="reducShopClick(item1, -1)" class="reduc">
														<u-icon name="minus-circle" color="#cccccc" size="60"></u-icon>
													</view>
													<view v-show="goodCartNum(item1.goods_id, -1)" class="number">
														{{ goodCartNum(item1.goods_id, -1) }}</view>
													<view @tap="addShopClick(item1, 1)" class="add">
														<u-icon name="plus-circle-fill" color="#ef5f1b" size="60"></u-icon>
													</view>
												</view>

												<view v-if="Number(item1.stock) == 0"
													style="align-self: center;color: #CCCCCC;">已售罄</view>
											</view>
											<view v-if="item1.sku_fmt.length > 0">
												<view @tap="handelGoodsDetail(item1, index, index1)"
													style="position: relative; background: #ef5f1b; color: #fff; border-radius: 5rem; padding: 10rpx 20rpx; font-size: 24rpx;">
													选规格
													<text v-show="goodCartNum(item1.goods_id, -1)"
														style="position: absolute;border-radius: 5rem;background: #cc0909;top: -10rpx;width: 35rpx;height: 35rpx;text-align: center;">{{
															goodCartNum(item1.goods_id, -1) }}</text>
												</view>
											</view>

										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</scroll-view>
			</block>
		</view>
		<view class="shop-car">
			<view style="margin:0 auto;" class="width100 d-row d-jc-between d-ai-centen">
				<view class="d-row d-jc-start d-ai-centen" style="height: 105rpx;padding-left: 10rpx;">
					<view :animation="animationData" style="height: 105rpx;text-align: center; position: relative;"
						@click="shopCarPopHandle">
						<text v-show="getCartGoodsNumber > 0" class="shop-num">{{ getCartGoodsNumber }}</text>
						<image class="shop-car-img" src="/static/cars.png"></image>
					</view>
					<view class="d-clo d-jc-around" style="height: 105rpx;margin-left: 10rpx;">
						<view class="gray4 font36 font-bold" :class="{ colorWhite: getCartGoodsPrice > 0 }">
							{{ getCartGoodsPrice > 0 ? '￥' + getCartGoodsPrice : shopCarTip }}
						</view>
						<view class="gray2 font22">配送费 <text class="margin-10">¥{{ form.delivery_rmbs_fmt }}</text> |
							满￥{{ form.enough_free_dyrmbs_fmt }}免配送费</view>
					</view>
				</view>
				<view class="go gray4" style="height: 105rpx; width: 240rpx;">
					<view v-if="form.business_status == 1" class="font28 text-center"
						style="height: 105rpx;line-height: 105rpx;  background: #303030; color: #b3b3b3;">
						已打烊
					</view>
					<view v-else>
						<view v-show="!disabledPay" @tap="goPay" class="font28 text-center"
							style="height: 105rpx;line-height: 105rpx;  background: #ef5f1b; color: #FFFFFF;">
							去结算
						</view>
						<view v-show="disabledPay" class="font28 text-center"
							style="height: 105rpx;line-height: 105rpx;  background: #303030; color: #b3b3b3;">
							{{ getCartGoodsPrice > 0 ? (disabledPay ? `差${spread}元起送` : goTitle) : goTitle }}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="tabcurrent == 1" class="width100">
			<!-- <view class="font-bold font30 padding-top-30 padding-left-30 padding-bottom-20">公告</view>
			<view class="padding-left-30 padding-right-30 gray3">{{form.notice}}</view> -->
			<view class="d-row width100 padding-top-30 padding-left-30 padding-right-30">
				<view class="font-bold font30 gray2 ">营业时间</view>
				<view class="text-right flex-1">{{ form.business_time }}</view>
			</view>
			<view class="d-row width100 padding-top-30 padding-left-30 padding-right-30">
				<view class="font-bold font30 gray2 ">店铺地址</view>
				<view class="text-right flex-1">{{ form.address }}</view>
			</view>
			<view class="d-row width100 padding-top-30 padding-left-30 padding-right-30">
				<view class="font-bold font30 gray2 ">配送费</view>
				<view class="text-right flex-1">{{ form.delivery_rmbs_fmt }}</view>
			</view>
			<view class="d-row width100 padding-top-30 padding-left-30 padding-right-30">
				<view class="font-bold font30 gray2 ">起步价</view>
				<view class="text-right flex-1">{{ form.start_delivery_rmbs_fmt }}</view>
			</view>
			<view class="d-row width100 padding-top-30 padding-left-30 padding-right-30">
				<view class="font-bold font30 gray2 ">满多少免配送费</view>
				<view class="text-right flex-1">{{ form.enough_free_dyrmbs_fmt }}</view>
			</view>
		</view>
		<view v-if="tabcurrent == 2" class="u-menu-wrap">
			<scroll-view scroll-y scroll-with-animation class="menu-scroll-view" @scrolltolower="commentTobottom"
				style="padding-bottom:120rpx;">
				<hx-comment ref="comment" :companyid="companyid"></hx-comment>
			</scroll-view>
		</view>


		<u-popup v-model="goodsDetailShow" mode="center" closeable border-radius="14" width="80%" height="80%">
			<view style="display: flex;flex-direction: column;height: 100%;">
				<view>
				<image :src="goodsDetail.goods_pic" mode="aspectFill" style="height: 480rpx; width: 100%"></image>
			</view>
				<view class="padding-left-30 padding-top-20 padding-bottom-10"><text class="font-bold font36">{{
					goodsDetail.goods_name }}</text></view>
				<view class="padding-left-30"><text class="gray3 font22">月销{{ goodsDetail.sales }}份</text></view>
				<scroll-view :scroll-top="scrollTop" scroll-y="true" class="padding-left-30 padding-right-30 padding-top-30"
					style="flex: 1;height: 100%;overflow: auto;">
					<view style="font-size: 25rpx; font-weight: bold;padding-bottom: 20rpx;">规格</view>
					<view v-for="(item, index) in goodsDetail.sku_fmt" :key="index" @tap="chooseSku(index, goodsDetail)"
						:class="{ 'skuActive': goodsDetail.skuActive == index }"
						class="padding-top-10 padding-bottom-10 padding-left-20 padding-right-20 margin-right-20"
						style="display: inline-block;border: 1rpx solid #efefef;">
						{{ item.sku_name }}
					</view>
				</scroll-view>
				<view class="d-row padding-top-10 padding-left-30 padding-right-30 padding-bottom-30">
					<view class="color-orange flex-1 font34 font-bold">¥
						{{ goodsDetail.sku_fmt[goodsDetail.skuActive].sku_price }}</view>
					<view v-if="goodsDetail.stock != 0">
						<view class="d-row" v-for="(item, index) in goodsDetail.sku_fmt" :key="index"
							v-if="goodsDetail.skuActive == index">
							<view v-show="goodCartNum(goodsDetail.goods_id, index)"
								@tap="reducShopClick(goodsDetail, index)" class="reduc">
								<u-icon name="minus-circle" color="#cccccc" size="60"></u-icon>
							</view>
							<view v-show="goodCartNum(goodsDetail.goods_id, index)" class="number">{{
								goodCartNum(goodsDetail.goods_id, index) }}</view>
							<view @tap="addShopClickSku(goodsDetail, 1, index)" class="add">
								<u-icon name="plus-circle-fill" color="#ef5f1b" size="60"></u-icon>
							</view>
						</view>
					</view>
					<view v-if="goodsDetail.stock == 0" style="align-self: center;color: #CCCCCC;">已售罄</view>
				</view>
			</view>
		</u-popup>

		<u-toast ref="uToast" />
		<u-popup v-model="couponShow" mode="bottom">
			<view style="height: 60vh;position: relative;">

				<view class="padding-left-20 padding-right-20 padding-bottom-50">
					<coupon v-for="(item, index) in coupon_list" :key="index" types="carts" :have="item.is_have"
						v-bind:item="item" @receive="receive" theme="#ff6c00" color="#ffffff" solid="#ff6c00"></coupon>
				</view>
			</view>
		</u-popup>
		<u-mask :show="loadingmask">
			<view class="warp text-center d-row d-ai-centen" style="height: 100%;">
				<view class="flex-1"><u-loading size="56" color="orange"></u-loading></view>
			</view>
		</u-mask>
		<u-popup v-model="shopCarPopShow" mode="bottom" height="65%" border-radius="14">
			<view class="shop-car-box">
				<view class="shop-car-box-head">
					<text>已选商品:</text>
					<view @click="clearCart">
						<u-icon name="trash" color="#666" size="28"></u-icon>
						<text>清空购物车</text>
					</view>
				</view>
				<scroll-view scroll-y="true" style="height: 100%;overflow: auto;">
					<view class="thumb-box" v-for="(item1, index1) in cart" :key="index1">
						<image class="item-menu-image" :src="item1.goods_pic" mode="aspectFill"></image>
						<view class="item-menu-name padding-left-20">
							<view>
								<view>
									<text class="font32 font-bold">{{ item1.goods_name }}</text>
								</view>
								<view class="padding-top-10">
									<text v-if="item1.goods_desc != ''" class="font24 gray3 margin-right-20">{{
										item1.goods_desc }}</text>
									<text class="font24 gray3">月售{{ item1.sales }}份</text>
								</view>
							</view>
							<view class="d-row padding-top-20">
								<view class="color-orange flex-1 font38 font-bold"><text class="font28">¥</text>{{
									item1.price }}</view>
								<view class="d-row" v-if="Number(item1.stock) != 0">
									<view v-show="goodCartNum(item1.goods_id, -1)" @tap="reducShopClick(item1, -1)"
										class="reduc">
										<u-icon name="minus-circle" color="#cccccc" size="60"></u-icon>
									</view>
									<view v-show="goodCartNum(item1.goods_id, -1)&&item1.sku_fmt.length==0" class="number">
										{{ goodCartNum(item1.goods_id, -1) }}
                  </view>
                    <view v-show="goodCartNum(item1.goods_id, item1.skuActive)&&item1.sku_fmt.length>0" class="number">{{
								goodCartNum(item1.goods_id, item1.skuActive) }}</view>
									<view @tap="addShopClick(item1, 1)" class="add">
										<u-icon name="plus-circle-fill" color="#ef5f1b" size="60"></u-icon>
									</view>
								</view>

								<view v-if="Number(item1.stock) == 0" style="align-self: center;color: #CCCCCC;">已售罄</view>

							</view>
						</view>
					</view>
				</scroll-view>
			</view>

		</u-popup>

		<u-popup v-model="goodsDetailShowImg" mode="center" border-radius="14" width="80%" height="65%">
			<view style="width:100%;height:100%;">
				<image :src="goodsDetail.goods_pic" mode="aspectFill" style="height: 100%; width: 100%"></image>
			</view>
		</u-popup>
	</view>
</template>
<script>
import {
	accMul, accAdd, setLocalStorage,
	getLocalStorage
} from '@/tools/utils.js'
import hxComment from "@/components/hx-comment/hx-comment.vue";
import coupon from '@/components/coolc-coupon/coolc-coupon';
export default {
	onShareAppMessage(res) {
		// let title;
		// let address_arr = getLocalStorage('address');
		// let address = address_arr['address'];
		// title = this.form.name+'-'+address;
		//    return {
		// 	title: title,
		// 	path: '/pages/store/index?companyid='+this.form.companyid+'&address='+JSON.stringify(address_arr)
		//    }
	},
	onShareTimeline(res) { },
	components: {
		coupon,
		hxComment
	},
	data() {
		return {
			loadingmask: false,
			couponShow: false,
			tabcurrent: 0,
			form: {},
			scrollTop: 0, //tab标题的滚动条位置
			current: 0, // 预设当前项的值
			menuHeight: 0, // 左边菜单的高度
			menuItemHeight: 0, // 左边菜单item的高度

			coupon_list: [],
			cate_list: [],
			goods_list: [],


			shopCarTip: '￥0.00',
			cart: [], // 购物车
			animationData: {},

			goodsIndex: '',
			goodsIndex1: '',
			goodsDetailShow: false,
			goodsDetail: {},
			companyid: "",
			shopCarPopShow: false,//购物车弹窗显示
			goodsDetailShowImg: false
		}
	},
	onShow: function () {
		this.cart = uni.getStorageSync('cart') || []
	},
	onUnload() {
		uni.setStorageSync('cart', []);
	},
	onLoad(option) {
		let _this = this;
		if (option.address) {
			setLocalStorage('address', JSON.parse(option.address))
		}
		var animation = uni.createAnimation({
			duration: 100,
			timingFunction: 'ease',
		})
		this.animation = animation
		this.companyid = option.companyid
		// type为当前项,
		if (option.type) {
			this.tabcurrent = option.type
		}
		// 通过cateid判断点击的商品还是店铺
		if (option.cateid) {
			let cateid = 0;
			cateid = option.cateid
			this.getCompanyRead({ 'companyid': option.companyid, 'cateid': cateid, 'page': 1 });
		} else {
			this.getCompanyRead({ 'companyid': option.companyid });
		}
	},

	computed: {
		goTitle() {
			if (!this.disabledPay) return "去结算"
			return "¥" + this.form.start_delivery_rmbs_fmt + "起送"
		},
		goodCartNum() { //计算单个商品添加到购物车的数量
			return (id, skuindex) => this.cart.reduce((acc, cur) => {
				if (skuindex != -1) {
					if (cur.goods_id === id && cur.skuActive == skuindex) {
						return acc += cur.number
					}
					return acc
				} else {
					if (cur.goods_id === id) {
						return acc += cur.number
					}
					return acc
				}

			}, 0)
		},
		getCartGoodsNumber() { //计算购物车总数
			return this.cart.reduce((acc, cur) => acc + cur.number, 0)
		},
		getCartGoodsPrice() { //计算购物车总价
			let numberAll = this.cart.reduce((acc, cur) => {
				return accAdd(acc, accMul(cur.number, cur.price))
			}, 0)
			return numberAll
		},
		disabledPay() { //是否达到起送价

			return ((this.getCartGoodsPrice < Number(this.form.start_delivery_rmbs_fmt)) ? true : false)
		},
		spread() { //差多少元起送
			return parseFloat(((this.form.start_delivery_rmbs_fmt - this.getCartGoodsPrice) / 2).toFixed(2))
		}
	},
	methods: {
		// 清空购物车
		clearCart() {
			this.cart = []
		},
		// 购物车弹窗
		shopCarPopHandle() {
			this.shopCarPopShow = !this.shopCarPopShow
		},
		// 评论到底了
		commentTobottom() {
			this.$refs.comment.getPostList()
		},
		getCompanyRead(data) {
			this.loadingmask = true
			this.$store.dispatch('ai_xiaopu/companyRead', data).then((res) => {

				if (res.code == 0) {
					this.form = res.message.company_info
					this.coupon_list = res.message.coupon_list || []

					if (res.message.cate_list.length > 0) {
						res.message.cate_list.map((item) => {
							this.goods_list.push({
								'name': item.title,
								'list': []
							})
						})
						this.cate_list = res.message.cate_list

						res.message.goods_list.map((item) => {
							item['skuActive'] = 0
						})


						// data.cateid判断是否是点击具体商品进入的
						if (data.cateid && data.cateid != 0) {
							const cateindex = this.cate_list.findIndex(item => item.cateid == data.cateid);

							this.goods_list[cateindex]['list'] = res.message.goods_list
							this.swichMenu(cateindex)
						} else {
							this.goods_list[this.current]['list'] = res.message.goods_list
						}


					}

					uni.setNavigationBarTitle({
						title: this.form.name
					});


				}
				this.loadingmask = false
			})
		},
		couponClick() {
			this.couponShow = true
		},
		receive(data) {
			let _this = this;

			this.$store.dispatch('ai_xiaopu/couponGet', { 'couponid': data.id }).then((res) => {
				if (res.code == 0) {
					_this.$refs.uToast.show({
						title: res.message,
						duration: 1000
					})
				} else {
					_this.$refs.uToast.show({
						title: res.message,
						duration: 1000
					})
				}
			})
		},
		handelTab(index) {
			this.tabcurrent = index
		},
		// 点击左边的栏目切换
		async swichMenu(index) {
			if (index == this.current) return;
			this.current = index;
			// 如果为0，意味着尚未初始化
			if (this.menuHeight == 0 || this.menuItemHeight == 0) {
				await this.getElRect('menu-scroll-view', 'menuHeight');
				await this.getElRect('u-tab-item', 'menuItemHeight');
			}
			// 将菜单菜单活动item垂直居中
			this.scrollTop = index * this.menuItemHeight + this.menuItemHeight / 2 - this.menuHeight / 2;


			if (this.goods_list[index]['list'].length == 0) {
				this.getCompanyRead({
					'companyid': this.form.companyid,
					'cateid': this.cate_list[index]['cateid'],
					'page': 1
				})
			}

		},
		// 获取一个目标元素的高度
		getElRect(elClass, dataVal) {
			new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query.select('.' + elClass).fields({ size: true }, res => {
					// 如果节点尚未生成，res值为null，循环调用执行
					if (!res) {
						setTimeout(() => {
							this.getElRect(elClass);
						}, 10);
						return;
					}
					this[dataVal] = res.height;
				}).exec();
			})
		},

		// 动画
		animation_fun() {
			this.animation.scale(0.8, 0.8).step()
			this.animation.scale(1.2, 1.2).step()
			this.animation.scale(1, 1).step()
			this.animationData = this.animation.export()
			setTimeout(() => {
				this.animationData = {}
			}, 150)
		},
		// 加购物车
		addShopClick(good, num, skuindex = -1) {
			const stock = Number(good.stock)
			if (stock == 0) {
				this.$refs.uToast.show({
					title: '库存不足'
				})
				return false
			}
			const index = this.cart.findIndex(item => {
				if (skuindex == -1) {
					return item.goods_id === good.goods_id
				} else {
					return item.goods_id === good.goods_id && item.skuActive == skuindex
				}
			})

			if (index > -1) {
				if (stock != -1 && Number(this.cart[index]['number']) >= stock) {
					this.$refs.uToast.show({
						title: '库存不足'
					})
					return false
				}
				this.animation_fun()
				this.cart[index].number += num
			} else {
				this.animation_fun()
				let skuName;
				if (good.sku_fmt.length == 0) {
					good.skuActive = -1;
					skuName = ''
				} else {
					skuName = good['sku_fmt'][good.skuActive]['sku_name'];
				}
				this.cart.push({
					goods_id: good.goods_id,
					goods_name: good.goods_name,
					goods_pic: good.goods_pic,
					price: good.price,
					number: num,
					goods_desc: good.goods_desc,
					skuActive: good.skuActive,
					skuName: skuName,
					sales: good.sales,
          stock:good.stock,
          sku_fmt:good.sku_fmt
				})
			}
		},
		// 加购物车 sku
		addShopClickSku(good, num, skuindex = -1) {
			good['price'] = good['sku_fmt'][good.skuActive]['sku_price'];
			this.addShopClick(good, num, skuindex)
		},
		// 移出 skuindex为-1，代表操作的不包括规格选项
		reducShopClick(good, skuindex) {
			this.animation_fun()

			const index = this.cart.findIndex(item => {
				if (skuindex == -1) {
					return item.goods_id === good.goods_id
				} else {
					return item.goods_id === good.goods_id && item.skuActive == skuindex
				}

			})
			this.cart[index].number -= 1
			if (this.cart[index].number <= 0) {
				this.cart.splice(index, 1)
			}
			if (this.getCartGoodsNumber <= 0) { }

		},
		// 去支付
		goPay() {
			uni.showLoading({ title: '加载中' })
			uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.cart)))
			uni.navigateTo({
				url: './pay?name=' + this.form.name + '&delivery_rmbs=' + this.form.delivery_rmbs_fmt + '&enough_free_dyrmbs=' + this.form.enough_free_dyrmbs_fmt + '&companyid=' + this.form.companyid + '&deliver_way=' + this.form.deliver_way + '&address=' + this.form.address,
				animationType: 'pop-in',
				animationDuration: 2000
			})
			uni.hideLoading()
		},
		// 搜索店铺
		handelShopSearch() {
			uni.setStorageSync('cart', JSON.parse(JSON.stringify(this.cart)))
			uni.navigateTo({
				url: './search?shopid=12' + this.form.name
			})
		},
		// 
		handelGoodsDetail(item, index, index1) {
			this.goodsDetail = item
			if (item.sku_fmt.length) {
				this.goodsIndex = index
				this.goodsIndex1 = index1
				this.goodsDetailShow = true
			} else {
				this.goodsDetailShowImg = true
			}

		},

		chooseSku(index, good) {
			// const cartIndex = this.cart.findIndex(item => item.goods_id === good.goods_id)
			// if(cartIndex != -1) {
			// 	this.cart.splice(cartIndex, 1)
			// }

			this.goods_list[this.goodsIndex]['list'][this.goodsIndex1]['skuActive'] = index

		}
	}
}
</script>
<style >
.u-notice-bar {
	padding: 9px 0 !important;
}
</style>
<style lang="scss" scoped>
.shop-car-box {
	padding: 20rpx 40rpx;
	display: flex;
	flex-direction: column;

	.shop-car-box-head {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		border-bottom: 1px solid #cccccc79;
		height: 40rpx;
		align-items: center;
		padding: 20rpx 0;
		box-sizing: content-box;

		&>text {
			font-size: 30rpx;
			color: #222;
		}

		&>view {
			font-size: 28rpx;
			color: #666;
			display: flex;
			flex-direction: row;
		}
	}
}

.coupon1 {
	border-radius: 6rpx;
	border: 1rpx solid #ff8b87;
	border-right-style: dashed;
	color: #ff756f;
	background-color: rgba(255, 159, 156, 0.3);
}

.coupon2 {
	border-radius: 6rpx;
	border: 1rpx solid #ff8b87;
	border-left: unset;
	color: #ff756f;
	background-color: rgba(255, 159, 156, 0.3);
}


.active {
	font-weight: bold;
	color: #767676;
	border-bottom: 3rpx solid #ef5f1b;
}

.s-head-img {
	width: 120rpx;
	height: 120rpx;
}

.u-wrap {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - var(--window-top));
	/* #endif */
	display: flex;
	flex-direction: column;
}



.u-menu-wrap {
	flex: 1;
	display: flex;
	overflow: hidden;
}



.u-tab-view {
	width: 200rpx;
	height: 100%;
	padding-bottom: 150rpx;
}

.u-tab-item {
	height: 110rpx;
	background: #f6f6f6;
	box-sizing: border-box;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 26rpx;
	color: #444;
	font-weight: 400;
	line-height: 1;
}

.u-tab-item-active {
	position: relative;
	color: #000;
	font-size: 30rpx;
	font-weight: 600;
	background: #fff;
}

.u-tab-item-active::before {
	content: "";
	position: absolute;
	border-left: 4px solid #ef5f1b; //  $u-theme-color
	height: 32rpx;
	left: 0;
	top: 39rpx;
}

.u-tab-view {
	height: 100%;
}

.right-box {
	background-color: rgb(250, 250, 250);
}

.page-view {
	padding: 16rpx;
}

.class-item {
	margin-bottom: 130rpx;
	background-color: #fff;
	padding: 16rpx;
	border-radius: 8rpx;
}

.class-item:last-child {
	// min-height: 100vh;
}

.item-title {
	font-size: 26rpx;
	color: $u-main-color;
	font-weight: bold;
}

.item-menu-name {
	flex: 1;
	font-weight: normal;
	font-size: 24rpx;
	color: $u-main-color;
}

.item-container {
	display: flex;
	flex-wrap: wrap;
}

.thumb-box {
	padding: 15rpx;

	width: 100%;
	display: flex;

	// margin-top: 10rpx;
}

.item-menu-image {
	width: 150rpx;
	height: 150rpx;
}


.shop-car {
	background-color: #333333;
	width: 100%;
	height: 105rpx;
	margin: 0 auto;
	position: fixed;
	bottom: 0;
	left: 0%;
	z-index: 1000;
}

.shop-num {

	position: absolute;
	top: -22rpx;
	right: -10rpx;
	z-index: 3;
	width: 40rpx;
	height: 40rpx;
	line-height: 40rpx;
	border-radius: 50rpx;
	background: #FFBF65;
	color: #e84b16;
}

.shop-car-img {
	width: 120rpx;
	height: 120rpx;

	position: relative;
	top: -30rpx;
}

.colorWhiteBgBlue {
	background-color: #007AFF !important;
	color: #FFFFFF !important;
}

.reduc {

	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 60rpx;

}

.number {
	width: 60rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
}

.add {

	width: 60rpx;
	height: 60rpx;
	border-radius: 50%;
	text-align: center;
	line-height: 60rpx;
}

.shop-tag-ziying {
	background: #000000;
	border-radius: 8rpx;
	padding: 3rpx 10rpx;
	color: #f7b374;
	font-size: 24rpx;
}

.shop-tag-shouquan {
	background: linear-gradient(to right, red, orange);
	border-radius: 8rpx;
	padding: 3rpx 10rpx;
	color: #FFFFFF;
	font-size: 24rpx;
}

.skuActive {
	border: 1rpx solid #ef5f1b !important;
	background: rgba(255, 151, 151, 0.1);
	color: #ef5f1b;
}
</style>
