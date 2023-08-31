<!-- 区域管理商铺BOX -->
<template>
	<view class="shop-box">
		<view class="nav">
			<view class="left">
				<view style="margin-right: 10rpx;">
					<image :src="goodsObj.logo" mode="aspectFill"></image>
				</view>
				<view class="address"><span>{{ goodsObj.name }}</span></view>
				<view :class="goodsObj.shopTag == 1 ? 'shop-tag-ziying' : 'shop-tag-shouquan'">
					<span>{{ goodsObj.shopTag == 1 ? '自营' : '授权店' }}</span>
				</view>
				<view class="side-tag"></view>
			</view>
			<view class="right">{{ goodsObj.distance }}</view>
		</view>
		<view style="overflow: hidden; padding-left: 15rpx; padding-top: 20rpx;" v-if="goodsObj['goods_list'] && goodsObj['goods_list'].length > 0">
			<view style="width: 229rpx; float: left; padding-right: 15rpx;" v-for="(it,ins) in goodsObj['goods_list']" :key="ins" @click.stop="toGoodsDetail(it.goods_id)">
				<image :src="it.goods_pic" mode="aspectFill" style="width: 214rpx;height: 214rpx;border-radius: 10rpx;"></image>
			</view>
		</view>
		<view class="handle-box">
			<view class="left">
				<!-- <view class="tag-box">
					<view class="single-box">
						<u-icon name="thumb-up-fill" color="#F7B374" size="28"></u-icon>
						<span>服务好</span>
					</view>
					<view class="single-box">
						<u-icon name="gift-fill" color="#F7B374" size="28"></u-icon>
						<span>种类全</span>
					</view>
				</view> -->

				<view class="address-box">
					<view class="address-detail">
						<view class="tag"><u-icon name="map-fill" color="#b2b2b2" size="28"></u-icon></view>
						<view class="text">{{ goodsObj.address }}</view>
					</view>
					<view class="call-btn">
						<u-button class="uButton" type="warning" size="mini" ripple-bg-color="#F7B374" @click.stop="toCallShop(goodsObj.companyid)">操作</u-button>
					</view>
				</view>
			</view>
			<view class="right"></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'shop-box',
	props: {
		goodsObj: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			customStyle: {
				width: '120rpx'
			}
		};
	},
	methods: {
		toCallShop(companyid) {
			console.log('====>>>>');
			this.$emit('handleShops',companyid);
		},
		toNavigation() {
			wx.openLocation({
				latitude: 23.053375,
				longitude: 113.384542,
				name: '华南师范大学(大学城校区)-学北生活区',
				address: '外环西路378号华南师范大学大学城校区外环西路387附近',
				success(res) {
					console.log('openLocation', res);
				}
			});
		},
		toGoodsDetail(id) {
			uni.navigateTo({
				url: '/pages/sub/ai_xiaopu/goods_detail?goods_id='+id
			});
		}	
	}
};
</script>

<style lang="scss" scoped>
.shop-box {
	background: #ffffff;
	padding: 20rpx;
	border-radius: 20rpx;

	.nav {
		display: flex;

		.left {
			display: flex;
			align-items: center;
			image {
				width: 80rpx;
				height: 80rpx !important;
				border-radius: 10upx;
			}
			.shop-tag-ziying {
				background: #000000;
				border-radius: 8rpx;
				padding: 3rpx 10rpx;
				color: #f7b374;
				display: flex;
				align-items: center;
				font-size: 28rpx;
			}

			.shop-tag-shouquan {
				background: linear-gradient(to right,red,orange);
				border-radius: 8rpx;
				padding: 3rpx 10rpx;
				color: #FFFFFF;
				display: flex;
				align-items: center;
				font-size: 28rpx;
			}

			.address {
				font-size: 30rpx;
				font-weight: 600;
				max-width: 450rpx;
				margin-right: 12rpx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
		}

		.right {
			flex: 1;
			display: flex;
			justify-content: flex-end;
			align-items: center;
		}
	}

	.shop-rate {
		padding-top: 10rpx;
		padding-bottom: 10rpx;
	}

	.handle-box {
		padding-top: 20rpx;
		.left {
			.tag-box {
				display: flex;
				margin-top: 15rpx;
				margin-bottom: 15rpx;
				.single-box {
					margin-right: 20rpx;
				}
			}

			.time-box {
				color: #b2b2b2;
				margin-bottom: 10rpx;
				display: flex;

				.item {
					flex: auto;
					&:first-child {
						flex-grow: 2;
					}
					&:last-child {
						flex-grow: 1;
						.uButton {
							float: right;
						}
					}
				}
			}

			.address-box {
				display: flex;
				color: #b2b2b2;

				.address-detail {
					display: flex;
					flex-grow: 2;
					flex: auto;
				}

				.call-btn {
					text-align: right;
					flex: auto;
					padding-left: 20rpx;
					
					.uButton {
						width: 50rpx;
						white-space: nowrap;
					}
				}
			}
		}
	}
}
</style>
