<template>
	<view>
		<u-tabs :list="CateList" name="title" :is-scroll="false" :current="current" @change="change"></u-tabs>
		<view v-if="data.length > 0" style="padding-bottom: 106rpx">
			<view class="list_card u-padding-top-20 u-padding-bottom-20 u-padding-left-20 u-padding-right-20"
				v-for="(item, index) in data" :key="index">
				<view class="uni-list">
					<view class="uni-thumb shop-picture">
						<image :src="item.goods_pic" mode="aspectFill" :class="item.ischeck == 0 ? 'filter' : ''">
						</image>
						<text>{{ item.ischeck }}</text>
					</view>
					<view class="shop">
						<view>
							<view class="uni-title">
								<text class="uni-ellipsis-2">{{ item.goods_name }}</text>
								<view class="is-recommend">
									<text>是否热销:</text>
									<u-switch :value="item.is_recommend-0==0?false:true" @change="isRecommend(item)"
										active-color="#fa3534" size="30"></u-switch>
								</view>
							</view>

							<view>
								<text v-if="item.is_own_business == 1" class="shop-tag-ziying">
									自营
								</text>
								<text v-if="item.is_own_business == 0" class="shop-tag-shouquan">
									授权店
								</text>
								<text class="uni-tag">{{ item.cate_title }}</text>
							</view>
						</view>
						<view>
							<view style="display: flex; align-items: flex-end">
								<view class="shop-price">
									<text>¥</text>
									<text class="shop-price-text">{{ item.price }}</text>
								</view>
								<view style="flex: 1; text-decoration: line-through; color: #bbbbbb">
									<text>¥</text>
									<text class="">{{ item.market_price }}</text>
								</view>
							</view>
							<view class="sales-box">
								<view class="uni-note">销量 {{ item.sales }}</view>
								<view v-if="item.stock == 0" class="sales-end">已售完</view>
								<view class="text-center rank-box uni-note" style="color: #aaa" @click="setStock(item)">
									设置库存:{{item.stock==-1?'无限':item.stock}}</view>
								<view class="text-center rank-box uni-note" @click="setRank(item)" style="color: #aaa">
									<text>点击排序</text><text>{{item.rank}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<u-row class="u-padding-top-25" style="display: block">
					<u-col span="4">
						<view class="text-center" @click="goods_edit(item.goods_id)" style="color: #aaa">编辑</view>
					</u-col>
					<u-col span="4">
						<view v-if="item.ischeck == 0" class="text-center"
							@click="goods_updown(item.goods_id, 1, index)" style="color: green">上架</view>
						<view span="4" v-if="item.ischeck == 1" class="text-center"
							@click="goods_updown(item.goods_id, 0, index)" style="color: red">下架</view>
					</u-col>
					<u-col span="4">
						<view class="text-center" @click="goods_delete(item.goods_id, index)" style="color: #aaa">删除
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<view v-else class="empty_box">
			<u-empty text="暂无数据" src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
		</view>
		<view class="navigation">
			<view class="tell btn u-line-1" @click="add_goods()">添加商品</view>
			<!-- <view class="goodsClass btn u-line-1" @click="drag_sort()">排序</view> -->
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="deleModel_show" content="确定删除？" show-cancel-button="true" @confirm="confirm"
			confirm-color="#ff9900"></u-modal>
		<u-modal v-model="rankDialogShow" @confirm="Rankconfirm" title='当前排序'>
			<view style="display:flex;flex-direction:row;padding:10rpx 20rpx;align-item:center;justify-content:center;">
				<u-input v-model="rankValue" type="number" :border="true" />
			</view>
		</u-modal>
    <u-modal v-model="StockDialogShow" @confirm="stockconfirm" title='设置库存,-1表示无限库存'>
			<view style="display:flex;flex-direction:row;padding:10rpx 20rpx;align-item:center;justify-content:center;">
				<u-input v-model="StockvValue" type="number" :border="true" />
			</view>
		</u-modal>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				cateid: 0,
				data: [],
				status: "loadmore",
				condition_arr: [],

				deleModel_show: false,
				active_goods_id: 0,
				active_index: 0,
				CateList: [],
				current: 0,
				catid: "",
				rankDialogShow: false,
				rankValue: '',
				rankGoodsId: '',
        StockDialogShow:false,
        StockvValue:"",
        StockGoodId:""
			};
		},
		onPullDownRefresh() {
			let _this = this;
			this.init_list(_this.catid, function() {
				uni.stopPullDownRefresh();
			});
		},
		onLoad(option) {
			this.getCateList();
			this.init_list(this.catid);
		},
		methods: {
      // 库存确认按钮
      stockconfirm(){
        let data = {
					goods_id: this.StockGoodId,
					stock: this.StockvValue
				}
				this.$store.dispatch("user/goodsStock", data).then((res) => {
					if (res.code == 0) {
						this.init_list(this.catid)
					} else {
						this.$refs.uToast.show({
							title: res.message,
						});
					}
				});
      },
      // 设置库存
      setStock(item){
        this.StockDialogShow=true
        this.StockvValue = item.stock
				this.StockGoodId = item.goods_id
      },
			Rankconfirm() {
				let data = {
					goods_id: this.rankGoodsId,
					rank: this.rankValue
				}
				this.$store.dispatch("user/goodsRank", data).then((res) => {
					if (res.code == 0) {
						this.init_list(this.catid)
					} else {
						this.$refs.uToast.show({
							title: res.message,
						});
					}
				});
			},
			setRank(item) {
				this.rankDialogShow = true
				this.rankValue = item.rank
				this.rankGoodsId = item.goods_id
			},
			change(index) {
				this.current = index;
				this.catid = this.CateList.filter((item1, index1) => {
					if (index == index1) {
						return item1;
					}
				})[0].cateid;
				this.init_list(this.catid)
			},
			getCateList() {
				this.$store.dispatch("user/cateList").then((res) => {
					if (res.code == 0) {
						this.CateList = res.message;
					} else {
						this.$refs.uToast.show({
							title: res.message,
						});
					}
				});
			},
			recommendValue(value) {
				return value - 0 == 0 ? false : true;
			},
			//是否热销切换
			isRecommend(item) {
				let isRecommend = !this.recommendValue(item.is_recommend);
				let value = isRecommend ? 1 : 0;
				let data = {
					goods_id: item.goods_id,
					is_recommend: value,
				};
				let _this = this;
				_this.$store.dispatch("user/isRecommend", data).then((res) => {
					if (res.code == 0) {
						_this.$refs.uToast.show({
							title: res.message,
						});
						_this.init_list(_this.catid);
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						});
					}
				});
			},
			init_list: function(cateid, callback = () => {}) {
				let _this = this;
				_this.data = [];

				let data = {
					cateid: cateid
				};
				this.condition_arr = data;

				this.getList(data, callback);
			},
			getList(data, callback = () => {}) {
				let _this = this;
				_this.$store.dispatch("user/goodsMylist", data).then((res) => {
					if (res.code == 0) {
						_this.data = _this.data.concat(res.message.goods_list);

						_this.data = _this.data.sort((a, b) => {
							return b.ischeck - a.ischeck;
						});
						callback();
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						});
					}
				});
			},
			add_goods() {
				uni.navigateTo({
					url: "/pages/sub/center/goods_class/add_goods?cateid=" + this.cateid,
				});
			},
			goods_recommend(goods_id, is_recommend, index) {
				let _this = this;
				_this.$store
					.dispatch("user/goodsIsRecommend", {
						goods_id: goods_id,
						is_recommend: is_recommend,
					})
					.then((res) => {
						if (res.code == 0) {
							_this.data[index]["is_recommend"] = is_recommend;
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
			goods_edit(goods_id) {
				uni.navigateTo({
					url: "/pages/sub/center/goods_class/edit_goods?goods_id=" + goods_id,
				});
			},
			goods_delete(goods_id, index) {
				this.active_goods_id = goods_id;
				this.active_index = index;
				this.deleModel_show = true;
			},
			confirm() {
				let _this = this;
				_this.$store
					.dispatch("user/goodsDelete", {
						goods_id: this.active_goods_id
					})
					.then((res) => {
						if (res.code == 0) {
							_this.data.splice(_this.active_index, 1);
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
			goods_updown(goods_id, ischeck, index) {
				let _this = this;
				_this.$store
					.dispatch("user/goodsIscheck", {
						goods_id: goods_id,
						ischeck: ischeck
					})
					.then((res) => {
						if (res.code == 0) {
							if (_this.data[index].ischeck == 1) {
								_this.data[index].ischeck = 0;
								_this.$refs.uToast.show({
									title: "下架成功",
								});
							} else {
								_this.data[index].ischeck = 1;
								_this.$refs.uToast.show({
									title: "上架成功",
								});
							}
							_this.data = _this.data.sort((a, b) => {
								return b.ischeck - a.ischeck;
							});
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							});
						}
					});
			},
		},
	};
</script>

<style lang="scss">
	@import "@/common/uni-ui.scss";

	page {
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		// background-color: #efeff4;
		min-height: 100%;
		height: auto;
	}

	.text-center {
		text-align: center;
	}

	.rank-box {
		display: flex;
		flex-direction: row;

	}

	.filter {
		filter: grayscale(100%);
	}

	.list_card {
		border-bottom: 8rpx solid #efefef;
	}

	.uni-list {
		// padding: 10rpx;
		// border-bottom: 1rpx solid #EFEFEF;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		background-color: #ffffff;

		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;

		/* 略缩图 */
		.uni-thumb {
			-webkit-flex-shrink: 0;
			flex-shrink: 0;
			margin-right: 20rpx;
			width: 125px;
			height: 75px;
			border-radius: 12rpx;
			overflow: hidden;
			border: 1px #f5f5f5 solid;
		}

		.shop-picture {
			width: 110px;
			height: 110px;
		}

		.uni-thumb image {
			width: 100%;
			height: 100%;
		}

		.shop {
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			-webkit-box-orient: vertical;
			-webkit-box-direction: normal;
			-webkit-flex-direction: column;
			flex-direction: column;
			-webkit-box-pack: justify;
			-webkit-justify-content: space-between;
			justify-content: space-between;
		}

		/* 标题 */
		.uni-title {
			display: -webkit-box;
			display: -webkit-flex;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 16rpx;
			font-size: 32rpx;
			font-weight: bold;
			color: #3b4144;

			.is-recommend {
				display: flex;
				flex-direction: row;
				align-items: center;

				text {
					margin-right: 10rpx;
					font-weight: normal;
					font-size: 28rpx;
				}
			}
		}

		.uni-ellipsis-2 {
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
		}

		.uni-tag {
			-webkit-flex-shrink: 0;
			flex-shrink: 0;
			padding: 0 5px;
			border: 1px #c8c7cc solid;
			margin-right: 10px;
			border-radius: 6rpx;
			background: #f8f8f8;
			color: #333;
			font-size: 24rpx;
		}

		.hot-tag {
			background: #ff5a5f;
			border: none;
			color: #fff;
		}

		.shop-tag-ziying {
			-webkit-flex-shrink: 0;
			flex-shrink: 0;
			margin-right: 10px;
			padding: 1px 5px;
			border-radius: 6rpx;
			font-size: 24rpx;
			background: #000000;
			color: #f7b374;
		}

		.shop-tag-shouquan {
			-webkit-flex-shrink: 0;
			flex-shrink: 0;
			margin-right: 10px;
			padding: 1px 5px;
			border-radius: 6rpx;
			font-size: 24rpx;
			background: linear-gradient(to right, red, orange);
			color: #ffffff;
		}

		.shop-price {
			font-size: 12px;
			color: #ff5a5f;
		}

		.sales-box {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			.uni-note {
				margin-top: 10px;
				color: #999;
				font-size: 24rpx;
			}

			.sales-end {
				color: red;
				font-size: 28rpx;
			}
		}

		.shop-price-text {
			font-size: 16px;
		}
	}

	.empty_box {
		width: 100%;
		position: absolute;
		left: 0;
		top: 35%;
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
			// background-color: #ff9900;
			text-align: center;
			border-right: 1rpx solid #bbbbbb;
		}

		.goodsClass {
			padding: 28rpx 0;
			color: #333333;
			font-size: 28rpx;
			flex: 1;
			// background-color: #ff9900;
			text-align: center;
		}
	}
</style>