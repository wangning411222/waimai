<template>
	<view class="page_box">
		<view style="display: flex; padding: 25rpx">
			<view style="flex: 1">
				<u-icon name="map"></u-icon>
				<view @click="get_location" style="display: inline-block">
					{{ location }}
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view style="width: max-content; text-align: right" :class="[noticenums != 0 ? 'text-red' : '']">
				<u-icon name="bell" size="34" style="vertical-align: middle"></u-icon>
				<text v-if="noticenums != 0" style="vertical-align: middle">{{
          noticenums
        }}</text>
			</view>
		</view>
		<view style="padding: 20rpx">
			<u-swiper :list="config.banner_list" @click="swiperclick"></u-swiper>
			<view v-if="config.notice != ''">
				<u-notice-bar mode="horizontal" :list="[config.notice]"></u-notice-bar>
			</view>
			<view v-if="config.isshow == 1" class="dnwmBox">
				<view class="shop-box">
					<u-search placeholder="请输入商家名称" v-model="keywordShopName" :action-style="actionStyle"
						action-text="搜索" border-color="#ff9900" search-icon-color="#ff9900" bg-color="#fff"
						@custom="companySearch" @search='companySearch' @clear="clear()"></u-search>
					<view class="shop-tabs">
						<view class="shop-tabs-item" v-for="(item, index) in config.shop_catelist" :key="index"
							@click="cateHandle(item)">
							<u-image width="100%" height="auto" mode="widthFix" :src="item.img"
								:lazy-load="true"></u-image>
							<text>{{ item.title }}</text>
						</view>
					</view>
					<view class="shop-content">
						<!-- <text class="shop-content-title">附近商家</text> -->
						<view class="select-box">
							<u-button v-for="(item, index) in selectArr" :key="index" :custom-style="customStyle" plain
								:type="selectIndex == index ? 'warning' : 'default'" @click="selecthandle(index)">{{ item.name
                }}</u-button>
						</view>
						<view class="shop-list" v-if="compayList.length">
							<view class="shop-item" v-for="(item, index) in compayList" :key="index">
								<view class="item-top" @click="toShopDetail(item)">
									<view class="item-top-left">
										<image :src="item.logo" mode="aspectFill"></image>
										<view class="business" v-if="item.business_status == 1">歇业</view>
									</view>
									<view class="item-top-right">
										<view class="item-top-right-name">{{ item.name }}</view>
										<view class="item-top-right-rate">
											<u-rate :count="count" :value="item.stars - 0"
												active-color="rgb(247, 186, 42)" :disabled="true"></u-rate>
											<text class="yello-font-20">{{ item.stars }}</text>
											<text class="gray-font-20 margin-left-10">月售:{{ item.sales }}</text>
										</view>
										<view class="item-top-right-time">
											<view>
												<text class="gray-font-20">起送:Ұ{{ item.start_delivery_rmbs }}</text>
												<text
													class="gray-font-20 margin-left-10">配送:Ұ{{ item.delivery_rmbs }}</text>
											</view>
											<view>
												<text class="gray-font-20">{{ item.minute }}分钟</text>
												<text class="gray-font-20 margin-left-10">{{ item.distance }}</text>
											</view>
										</view>
									</view>
								</view>
								<view class="item-tag" @click.stop="toShopDetail(item)">
									<u-tag :text="setText(item.enough_free_dyrmbs)" type="info" size="mini" />
								</view>
								<scroll-view scroll-x="true" class="goods_list"
									:class="item.goods_list.length ? 'list-height' : 'list-height-0'">
									<view class="goods_item" v-for="(goodsitem, goodsindex) in item.goods_list"
										:key="goodsindex" @click="toGoodsDetail(goodsitem, item)">
										<view class="goods_item-imgbox">
											<image class="goods_img" :src="goodsitem.goods_pic"
												style="width:150rpx;height:150rpx" mode="aspectFill"></image>
											<view>热销</view>
										</view>
										<view class="goods_item-name">{{ goodsitem.goods_name }}</view>
										<view class="goods_item-price yello-font-20 ">
											Ұ{{ goodsitem.price }}</view>
									</view>
								</scroll-view>
							</view>
							<u-divider textColor="#000" v-if="shopPage>shopMaxpage" text="暂无更多">暂无更多</u-divider>
						</view>
						<u-empty v-else text="暂无数据" mode="data" style='margin-top:80rpx;'></u-empty>
					</view>
				</view>
			</view>
		</view>
		<u-toast ref="uToast" />
		<u-popup v-model="infoSHow" mode="center" border-radius="14" width="80%" height="65%" :closeable="true">
			<view class="info-image">
				<image :src="config.tips_img" mode="scaleToFill" />
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from "vuex";
	// 在页面中定义激励视频广告
	let videoAd = null;
	export default {
		data() {
			return {
				location: "选择位置",
				noticenums: '',
				user_show: false,
				choose_tid: 0,
				choose_index: 0,

				status: "loadmore",
				current: 1,

				area: 1,
				orderby: 0,
				page: 1,
				maxpage: 0,
				address_state: false,
				keywordShopName: "", //搜索关键字
				actionStyle: {
					color: "#ff9900",
					padding: "40px ,40px",
					height: "100%",
					"border-radius": "6px",
				},
				selectArr: [{
						name: "综合排序",
						value: 0,
					},
					{
						name: "免配送费",
						value: 1,
					},
					{
						name: "领券活动",
						value: 2,
					},
				], //筛选按钮
				selectIndex: 0, //筛选选中
				customStyle: {
					padding: "10rpx",
					"font-size": "12px",
					height: "60rpx",
				},
				compayList: [], //店铺列表
				count: 5,
				value: 5,
				shopMaxpage: 0,
				shopPage: 1,
				shopStatus: 'loadmore',
				infoSHow: false
			};
		},
		computed: {
			...mapGetters("user", ["userInfo"]),
			...mapGetters("config", ["config"]),
		},
		onReachBottom() {
			let _this = this;
			// 店铺下拉加载更多
			if (this.shopPage != 0) {
				if (this.shopMaxpage > 1 && this.shopPage <= this.shopMaxpage) {
					this.getShopList('loading')
				} else {
					_this.shopStatus = "nomore";
				}
			}
		},

		onShow() {
			var _this = this;
			uni.getStorage({
				key: "getSchoolLocation",
				success: function(res) {
					_this.SchoolLocation = res.data;
					_this.shopPage = 1;
					_this.getShopList()
					// 如果第二次获取到了地址，发出请求
					if (_this.address_state) {
						_this.getThreadRanks(0, _this.area);
					}
				},
				fail() {
					_this.address_state = true;
					_this.$refs.uToast.show({
						title: "请先选择学校",
						type: "error",
						url: "pages/sub/location/location",
					});
				},
			});
			this.$store.dispatch("ai_pm/getNewnotice").then((res) => {
				if (res.code == 0) {
					_this.noticenums =
						Number(res.message.newpms) + Number(res.message.system_pms);

					uni.showTabBarRedDot({
						index: 1,
					});
				} else {
					_this.noticenums = 0;
					uni.hideTabBarRedDot({
						index: 1,
					});
				}
			});
		},
		onLoad() {
			let _this = this;
			this.$store.dispatch("login/checkLogin").then((res) => {
				if (res && res.code != 0) {
					_this.$refs.uToast.show({
						title: "登录失败",
					});
				} else {
					let userInfo = uni.getStorageSync("userInfo");
					_this.user();
				}
			});
			// 获取位置变化
			uni.getStorage({
				key: "getSchoolLocation",
				success: function(res) {
					_this.SchoolLocation = res.data;
					_this.location = res.data.schoolname;
				},
			});
			// 监听位置变化
			uni.$on("getLocation", (e) => {
				_this.SchoolLocation = e;
				_this.location = e.location_name;
				this.getThreadList(this.active_nav, this.area, 0, 1);
			});
			setTimeout(() => {
				console.log(this.config, this.config.tips_img, 'config.tips_imgconfig.tips_img')
				if (this.config.tips_img) {
					this.infoSHow = true
				}
			}, 100)
		},
		onUnload() {
			uni.$off("shuaxin");
		},
		methods: {
			// 清空搜索框
			clear() {
				this.shopPage = 1
				this.getShopList()
			},
			// 获取店铺列表
			getShopList(load) {
				if (this.shopStatus == 'loading') {
					return
				}
				this.shopStatus = 'loading'
				let _this = this
				let schoolid = _this.SchoolLocation.schoolid;
				let data = {
					page: this.shopPage,
					schoolid: schoolid,
					orderby: this.selectIndex,
					cateid: 0
				}
				this.$store.dispatch("ai_yujian/companyList", data).then((res) => {
					if (res.code == 0) {
						_this.shopMaxpage = res.message.maxpage;
						if (load == 'loading') {
							_this.compayList = [..._this.compayList, ...res.message.company_list]
						} else {
							_this.compayList = res.message.company_list
						}

						if (_this.shopMaxpage > 1 && _this.shopPage <= _this.shopMaxpage) {
							_this.shopPage++;
						}
						_this.shopStatus = 'loadmore'
					}
				});
			},
			//店铺详情
			toShopDetail(item) {
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/shop_index?companyid=' + item.companyid
				});

			},
			// 点击商品
			toGoodsDetail(goodsitem, item) {
				uni.navigateTo({
					url: `/pages/sub/ai_xiaopu/shop_index?cateid=${goodsitem.cateid}&companyid=${item.companyid}`
				});
			},
			// 搜索
			companySearch() {
				let _this = this
				let data = {
					keyword: this.keywordShopName
				}
				this.$store.dispatch("ai_yujian/companySearch", data).then((res) => {
					if (res.code == 0) {
						_this.compayList = res.message.company_list
					}
				});
			},
			// 切换店铺筛选
			selecthandle(index) {
				this.selectIndex = index
				this.shopPage = 1
				this.getShopList()
			},
			// 跳转分类页面
			cateHandle(item) {
				uni.navigateTo({
					url: `/pages/sub/cateShopList/cateShopList?catid=${item.cateid}&title=${item.title}`,
				});
			},
			setText(text) {
				if (text - 0 == 0) {
					return "免配送费"
				} else {
					return `满${text}免配送`
				}

			},
			...mapMutations(["user/setUserInfo"]),
			user() {
				let _this = this;
				this.$store.dispatch("user/getRead").then((res) => {
					if (res.code == 0) {
						_this.company_status = res.message.company_status;
						_this.is_cert = res.message.is_cert;
						_this.uid = res.message.uid;
						_this["user/setUserInfo"](res.message);
						if (_this.is_cert == 1) {
							_this.cert = "#FF7925";
						}
					}
				});
			},
			get_location() {
				uni.navigateTo({
					url: "/pages/sub/location/location",
				});
			},
			swiperclick: function(index) {
				if (this.config.banner_list[index]["url"]) {
					uni.navigateTo({
						url: this.config.banner_list[index]["url"],
					});
				}
			},
		},
		onShareAppMessage() {},
		onShareTimeline() {},
	};
</script>
<style lang="scss">
	@charset "UTF-8";

	page {
		background-color: #eeeeee;
	}

	.info-image {
		width: 100%;
		height: 100%;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.u-col-4 {
		padding: 0 !important;
	}

	.page_box {
		/* padding: 0 20rpx 25rpx; */
	}

	.uni-card {
		margin: 0 !important;
	}

	.image {
		width: 210rpx;
		height: 210rpx;
	}

	.content-box {
		padding-bottom: 20rpx;
	}

	.content-box-text {
		font-size: 12px;
		line-height: 22px;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

		/* text-align: right; */
		color: #aaaaaa;
	}

	.footer-box__item {
		align-items: center;
		padding: 2px 0;
		font-size: 12px;
		color: #666;
	}

	.empty_box {
		width: 100%;

		padding-top: 60rpx;
		background: #fff;
	}

	.dnwmBox {
		display: flex;
		background: #fff;
		margin-top: 20rpx;
		border-radius: 20rpx;
	}

	.dnwmItem {
		flex: 1;
		padding: 30rpx 30rpx 20rpx 40rpx;
	}

	.dnwmItem .title {
		font-size: 42rpx;
		font-weight: bold;
	}

	.dnwmItem .brief {
		color: #a9a7a7;
		margin: 25rpx 0;
	}

	.reply_box {
		display: flex;
		padding: 15rpx 24rpx;
		margin-bottom: 10rpx;
	}

	.reply_box .reply_user {
		width: max-content;
		color: #36deac;
	}

	.reply_box .reply_con {
		flex: 1;
		color: #aaaaaa;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.uni-border-top:after {
		border-top-color: #eee !important;
	}

	.shop-box {
		flex: 1;
		padding-top: 30rpx;

		.shop-tabs {
			padding: 20rpx 20rpx;
			margin-top: 40rpx;
			display: flex;
			flex-direction: row;
			flex-flow: wrap;

			.shop-tabs-item {
				display: flex;
				flex-direction: column;
				justify-content: space-evenly;
				align-items: center;
				flex: 0 0 25%;
				// margin-right:60rpx;
				margin-bottom: 20rpx;

				u-image {
					width: 80rpx;
					height: 80rpx;
				}

				text {
					margin-top: 10rpx;
					color: #999;
				}
			}
		}

		.shop-content {
			background: whitesmoke;
			padding: 20rpx 10rpx;
			display: flex;
			flex-direction: column;

			.shop-content-title {
				font-size: 30rpx;
				color: #000;
				font-weight: bold;

			}

			.u-empty {
				display: 1;
			}

			.select-box {
				display: flex;
				flex-direction: row;
				justify-content: flex-start;
				align-items: center;
				margin-top: 20rpx;

				u-button {
					flex: 0 0 20%;
					margin-right: 20rpx;
				}
			}

			.shop-list {
				background: whitesmoke;
				border-radius: 4px;
				margin-top: 30rpx;

				.shop-item {
					background: #fff;
					margin-bottom: 20rpx;
					padding: 20rpx;

					.item-top {
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						align-items: center;

						.item-top-left {
							width: 200rpx;
							height: 150rpx;
							border: 1px solud #ccc;
							border-radius: 4px;
							border: 1px solid #ccc;
							position: relative;

							.business {
								position: absolute;
								bottom: 0;
								width: 100%;
								background: #2f2d2d90;
								color: #fff;
								height: 40rpx;
								line-height: 40rpx;
								text-align: center;
								left: 0;

							}

							image {
								width: 100%;
								height: 100%;
							}
						}

						.item-top-right {
							margin-left: 20rpx;
							flex: 1;

							.item-top-right-name {
								font-size: 30rpx;
								color: #000;
								font-weight: bold;
							}

							.item-top-right-rate {
								margin: 5rpx 0;
							}

							.item-top-right-time {
								display: flex;
								flex-direction: row;
								justify-content: space-between;
								align-items: center;
							}

							.gray-font-20 {
								color: gray;
								font-size: 24rpx;
							}

							.yello-font-20 {
								color: rgb(247, 186, 42);
								font-size: 26rpx;
								font-weight: bold;
							}

							.margin-left-10 {
								margin-left: 10rpx;
							}
						}
					}

					.item-tag {
						margin-left: 220rpx;
						display: flex;
						flex-direction: row;

						u-tag {
							margin-right: 10rpx;
						}
					}

					.list-height {
						height: 240rpx;
					}

					.list-height-0 {
						height: 0;
					}

					.goods_list {
						margin-top: 10rpx;

						width: 100%;
						overflow: hidden;
						white-space: nowrap;
						flex-direction: row;

						.goods_item {
							float: left;
							margin-right: 20rpx;
							display: flex;
							flex-direction: column;
							max-width: 150rpx;

							.goods_item-imgbox {
								position: relative;

								.goods_img {
									width: 150rpx;
									height: 150rpx;

								}

								view {
									position: absolute;
									left: 0rpx;
									bottom: 0rpx;
									width: 60rpx;
									height: 30rpx;
									color: #fff;
									background: rgb(247, 186, 42);
									border-radius: 3px;
									font-size: 18rpx;
									line-height: 30rpx;
									text-align: center;
								}
							}

							.goods_item-name {
								color: #666;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}

							.yello-font-20 {
								color: rgb(247, 186, 42);
								font-size: 26rpx;
								font-weight: bold;
							}

						}

					}
				}
			}
		}
	}
</style>