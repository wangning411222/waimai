<template>
	<view>
		<u-sticky>
			<u-search placeholder="请输入商家或商品名称" v-model="keywordShopName" :action-style="actionStyle" action-text="搜索"
				border-color="#ff9900" search-icon-color="#ff9900" bg-color="#fff" @custom="companySearch"
				@search="companySearch" @clear="clear"></u-search>
		</u-sticky>
		<view class="shop-box">
			<view class="search-tag">
				<view class="search-top">
					<text>搜索历史</text>
					<text @click="clearTags">清除全部</text>
				</view>
				<view class="search-bottom">
					<u-tag class="u-tag" v-for="(item, index) in tagsArr" :key="index" :text="item" type="warning" plain
						@click="tagsClick(item)"></u-tag>
				</view>
			</view>
			<view class="shop-content">
				<view class="shop-list" v-if="compayList.length">
					<view class="shop-item" v-for="(item, index) in compayList" :key="index">
						<view class="item-top" @click="toShopDetail(item)">
							<view class="item-top-left">
								<image :src="item.logo"></image>
								<view class="business" v-if="item.business_status == 1">歇业</view>
							</view>
							<view class="item-top-right">
								<view class="item-top-right-name">{{ item.name }}</view>
								<view class="item-top-right-rate">
									<!-- <u-icon
                        name="star-fill"
                        color="rgb(247, 186, 42)"
                        size="28"
                      ></u-icon> -->
									<u-rate :count="count" :value="item.stars - 0" active-color="rgb(247, 186, 42)"
										:disabled="true"></u-rate>
									<text class="yello-font-20">{{ item.stars }}</text>
									<text class="gray-font-20 margin-left-10">已售:{{ item.sales }}</text>
								</view>
								<view class="item-top-right-time">
									<view>
										<text class="gray-font-20">起送:Ұ{{ item.start_delivery_rmbs }}</text>
										<text class="gray-font-20 margin-left-10">配送:Ұ{{ item.delivery_rmbs }}</text>
									</view>
									<view>
										<text class="gray-font-20">{{ item.minute }}分钟</text>
										<text class="gray-font-20 margin-left-10">{{
                      item.distance
                    }}</text>
									</view>
								</view>
							</view>
						</view>
						<view class="item-tag" @click="toShopDetail(item)">
							<u-tag :text="setText(item.enough_free_dyrmbs)" type="info" size="mini" />
						</view>
						<scroll-view scroll-x="true" class="goods_list">
							<view class="goods_item" v-for="(goodsitem, goodsindex) in item.goods_list"
								:key="goodsindex" @click="toGoodsDetail(goodsitem, item)">
								<view class="goods_item-imgbox">
									<image class="goods_img" :src="goodsitem.goods_pic"
										style="width: 150rpx; height: 150rpx"></image>
									<view>热销</view>
								</view>
								<view class="goods_item-name">{{ goodsitem.goods_name }}</view>
								<view class="goods_item-price yello-font-20">Ұ{{ goodsitem.price }}</view>
							</view>
						</scroll-view>
					</view>
				</view>
				<u-empty class="emptys" v-else text="暂无数据" mode="data"></u-empty>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywordShopName: "", //搜索关键字
				actionStyle: {
					color: "#ff9900",
					padding: "40px ,40px",
					height: "100%",
					"border-radius": "6px",
					"margin-bottom": "20rpx",
				},
				tagsArr: [],
				customStyle: {
					padding: "10rpx",
					"font-size": "12px",
					height: "60rpx",
				},
				compayList: [], //店铺列表
				catid: "",
				shopMaxpage: 0,
				shopPage: 1,
				shopStatus: "loadmore",
				count: 5,
			};
		},
		onLoad() {
			let _this = this;
			uni.getStorage({
				key: "sousuo",
				success: function(res) {
					_this.tagsArr = res.data;
					console.log(res, "res```````");
				},
			});
		},
		methods: {
			// 点击tag
			tagsClick(item) {
				this.getList(item);
			},
			// 清空搜索记录
			clearTags() {
				this.tagsArr = [];
			},
			// 清空搜索框
			clear() {
				this.keywordShopName = "";
			},
			// 点击商品
			toGoodsDetail(goodsitem, item) {
				uni.navigateTo({
					url: `/pages/sub/ai_xiaopu/shop_index?cateid=${goodsitem.cateid}&companyid=${item.companyid}`,
				});
			},
			//店铺详情
			toShopDetail(item) {
				uni.navigateTo({
					url: "/pages/sub/ai_xiaopu/shop_index?companyid=" + item.companyid,
				});
			},
			getList(keyword) {
				let _this = this;
				let data = {
					keyword: keyword,
				};
				this.$store.dispatch("ai_yujian/companySearch", data).then((res) => {
					if (res.code == 0) {
						_this.compayList = res.message.company_list;
					}
				});
			},
			// 搜索
			companySearch() {
				if (!this.keywordShopName) {
					return;
				}
				if (this.tagsArr.length >= 10) {
					this.tagsArr.unshift(this.keywordShopName);
					this.tagsArr.pop();
					uni.setStorage({
						key: "sousuo",
						data: this.tagsArr,
						success: function() {
							// console.log('success');
						},
					});
				} else {
					this.tagsArr.unshift(this.keywordShopName);
					uni.setStorage({
						key: "sousuo",
						data: this.tagsArr,
						success: function() {
							// console.log('success');
						},
					});
				}

				this.getList(this.keywordShopName);
			},
			setText(text) {
				if (text - 0 == 0) {
					return "免配送费";
				} else {
					return `满${text}免配送`;
				}
			},
		},
	};
</script>

<style lang="scss">
	page {
		padding-top: 20rpx;
	}

	.search-tag {
		padding: 10rpx 20rpx 0;
		display: flex;
		flex-direction: column;

		.search-top {
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
		}

		.search-bottom {
			display: flex;
			flex-direction: row;
			align-items: center;
			flex-wrap: wrap;

			.u-tag {
				margin-right: 10rpx;
				margin-top: 10rpx;
			}
		}
	}

	.shop-box {
		min-height: 100vh;
		background: whitesmoke;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;

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
					color: #ccc;
				}
			}
		}

		.shop-content {
			background: whitesmoke;
			padding: 0 10rpx 20rpx;
			display: flex;
			flex-direction: column;
			flex: 1;

			.shop-content-title {
				font-size: 30rpx;
				color: #000;
				font-weight: bold;
			}

			.emptys {
				margin-top: 200rpx;
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

					.goods_list {
						margin-top: 10rpx;
						height: 240rpx;
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