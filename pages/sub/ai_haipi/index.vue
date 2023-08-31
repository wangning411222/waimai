<template>
	<view class="indexContent">
		<view>
			<u-tabs :list="tabs" name="title" :current="current" active-color="#6ee4c1" @change="sectionChange"></u-tabs>
		</view>
		<view class="product-list" v-if="tabs[current]['goods'] && tabs[current]['goods'].length > 0">
			<view v-for="(item, index) in tabs[current]['goods']" :key="index" class="shopproduct product" @click.stop="toGoodsPage(item.id)">

				<view class="shop-box">
					<view class="nav">
						<view class="left">
							<view style="margin-right: 10rpx;">
								<image :src="item.logo" mode="aspectFill"></image>
							</view>
							<view class="address"><span>{{ item.name }}</span></view>
							<view :class="item.shopTag == 1 ? 'shop-tag-ziying' : 'shop-tag-shouquan'">
								<span>{{ item.shopTag == 1 ? '自营' : '授权店' }}</span>
							</view>
							<view class="side-tag"></view>
						</view>
						<view class="right">{{ item.distance }}</view>
					</view>
					<view style="overflow: hidden; padding-left: 20rpx;" v-if="item['goods_list'] && item['goods_list'].length > 0">
						<view style="width: 229rpx; float: left; padding-right: 20rpx;" v-for="(it,ins) in item['goods_list']" :key="ins" @click.stop="toGoodsDetail(it.goods_id)">
							<image :src="it.goods_pic" mode="aspectFill" style="width: 214rpx;height: 214rpx;border-radius: 10rpx;"></image>
						</view>
					</view>
					<view class="handle-box">
						<view class="left">
							<view class="address-box">
								<view class="address-detail">
									<view class="tag"><u-icon name="map-fill" color="#b2b2b2" size="28"></u-icon></view>
									<view class="text">{{ item.address }}</view>
								</view>
								<view class="call-btn">
									<!-- <u-button class="uButton" type="warning" size="mini" shape="circle" ripple-bg-color="#F7B374" @click="toCallShop">联系门店</u-button> -->
									<text class="uButton" :custom-style="customStyle" type="warning" size="mini" shape="circle" ripple-bg-color="#F7B374">进店></text>
								</view>
							</view>
						</view>
						<view class="right"></view>
					</view>
				</view>
			</view>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
export default {
	data() {
		return {
			tabs: [],
			current:0
		};
	},
	computed: {
		
		...mapGetters('config',[
			'config'
		])
	},
	onLoad() {
		let _this = this;
		// this.tabs = this.config.shop_catelist;
		this.config.shop_catelist.map(function(item){
			// item.goods = [];
			// item.page = 1;
			_this.$set(item,'goods',[]);
			_this.$set(item,'page',1);
			_this.$set(item,'maxpage',0);
			_this.tabs.push(item);
		})
		
		uni.getStorage({
		    key: 'jingwei',
		    success: function (res) {
				_this.latitude = res.data.latitude;
				_this.longitude = res.data.longitude;
				_this.init_list(_this.tabs[0]['cateid']);
		    },
			fail(res) {
				// 如果没有经纬
				uni.authorize({
				  scope: 'scope.userLocation',
				  success() {
					uni.getLocation({
						success(res) {
							console.log(res);
							_this.latitude = res.latitude;
							_this.longitude = res.longitude;
							// 获取经纬之后
							// 存储 经纬 格式
							uni.setStorage({
								key: 'jingwei',
								data: {'latitude':res.latitude,'longitude':res.longitude},
								success: function () {
									// console.log('success');
								}
							});
							
							_this.init_list(_this.tabs[0]['cateid']);
							
						}
					})
				  }
				})
			}
		});
	},
	onPullDownRefresh(){
		// this.tabs[this.current].goods=[];
		// this.tabs[this.current].page=1;
		this.sectionChange(this.current)
	},
	onReachBottom(){
		console.log("到底部");
		console.log(this.current);
		
		
		let _this = this;
		let currTab= this.tabs[this.current];
		let maxpage = currTab.maxpage;
		let page = currTab.page;
		if(maxpage > page) {
			currTab.page = page+1;
			this.getCompanyList({'page':page+1},function(msg){
				_this.concatGoods(msg);
			})
		} else {
			_this.$refs.uToast.show({
				title: "没有更多了",
			})
		}
	},
	methods: {
		sectionChange(index) {
			let _this = this;
			this.current = index;
			console.log(index)
			this.tabs[this.current].goods=[];
			this.tabs[this.current].page=1;
			let cateid = this.tabs[index]['cateid'];
			let data = {'page':1,'cateid':cateid};
			data['latitude']= this.latitude;
			data['longitude']= this.longitude;
			this.getCompanyList(data,function(msg){
				_this.concatCompany(msg);
				uni.stopPullDownRefresh();
			})

		},
		init_list:function(cateid,callback=()=>{}){
			let _this = this;

			let data = {'page':1,'cateid':cateid};
			data['latitude']= this.latitude;
			data['longitude']= this.longitude;
			this.getCompanyList(data,function(msg){
				_this.concatCompany(msg);
			})
		},
		concatCompany(msg){
			let _this = this;
			let curTab = this.tabs[this.current];
			let newGoodsData = [];
			curTab.maxpage = msg.maxpage;
			let company_list = msg.company_list;
			for (let i = 0; i < company_list.length; i++) {
				newGoodsData.push({
					id: company_list[i]['companyid'],
					logo: company_list[i]['logo'],
					shopTag: company_list[i]['companyid'] == 0? 1: 0, // 自营 授权
					name: company_list[i]['name'],
					address: company_list[i]['address'],
					distance: company_list[i]['distance'],
					goods_list: company_list[i]['goods_list']
				});
			}
			// curPageData = newGoodsData;
			curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
			
		},
		getCompanyList(data,callback=(company_list)=>{}){
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/companyList',data).then((res) => {
				if(res.code == 0) {
					callback(res.message);
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		toGoodsPage(id) {
			uni.navigateTo({
				url: '/pages/sub/ai_xiaopu/shop_index?companyid='+id
			});
			
		},
		toGoodsDetail(id) {
			console.log(id);
			uni.navigateTo({
				url: '/pages/sub/ai_xiaopu/goods_detail?goods_id='+id
			});
		}	
	},

};
</script>

<style>
page {
	background-color: #efefef;
}

.u-mode-center-box {
	border-radius: 20rpx !important;
}
.product {
	width: 100%;
	margin-bottom: 20rpx;
}
.product.shopproduct {
	width: 100%;
}
</style>
<style lang="scss" scoped>
.indexContent {
	position: relative;
}
.u-subsection .u-item-bg {
	background-color: #FFFFFF;
	color: #FA3534;
}
.authorBtn {
	position: absolute;
	width: 100%;
	height: 100%;
	z-index: 1000;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	opacity: 0;
}

/*吸顶悬浮，上拉加载，下拉刷新组件*/
.demo-tip {
	padding: 18rpx;
	font-size: 24rpx;
	text-align: center;
}

/*吸顶悬浮，上拉加载，下拉刷新组件end*/
.box-group {
	background: #ededed;
	margin: 20rpx 20rpx;
	display: flex;
	border-radius: 20rpx;

	.single-box {
		flex: 1;
		padding: 20rpx;
		text-align: center;

		.b-image {
			position: relative;
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			overflow: hidden;
			text-align: center;
			margin: 0 auto;
			background-color: #dddddd;
		}

		.title {
			margin-top: 10rpx;
			font-size: 25rpx;
			font-weight: 500;
		}
	}
}

// 商品card
.product-list {
		
		padding: 24rpx 24rpx 3vw 24rpx;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		
		.goodsproduct {
			width: calc(50% - 12rpx)!important;
			border-radius: 15upx;
			background-color: #fff;
			margin: 0 0 25upx 0;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.1);
			image {
				width: 100%;
				height: 300rpx;
				border-radius: 15upx 15upx 0 0;
			}
			.name {
				width: 100%;
				padding: 0 4%;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				text-align: justify;
				overflow: hidden;
				font-size: 30upx;
			}
			.info {
				display: flex;
				justify-content: space-between;
				align-items: flex-end;
				width: 100%;
				padding: 10upx 4% 10upx 4%;
			
				.price {
					color: #e65339;
					font-size: 30upx;
					font-weight: 600;
				}
				.slogan {
					color: #807c87;
					font-size: 24upx;
				}
			}
		}
}
.popup-content {
	border-radius: 20rpx;
	padding: 40rpx 20rpx;
	font-family: 'Microsoft YaHei UI';

	.loginTip {
		font-size: 40rpx;
		text-align: center;
	}

	.loginBtn {
		position: relative;
		display: flex;
		width: 90%;
		height: 100rpx;
		margin: 60rpx auto;
		border-radius: 20rpx;
		background-color: #c69c6c;
		justify-content: center;
		align-items: center;
		font-size: 35rpx;
		color: #ffffff;

		.item {
			flex: auto;
			&:nth-child(2) {
				padding-right: 10rpx;
			}
		}
	}
}

.shop-box {
	background: #ffffff;
	
	border-radius: 20rpx;

	.nav {
		padding: 15rpx;
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
		padding: 15rpx;
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
