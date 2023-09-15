<template>
	<view class="indexContent">
		<swiper indicator-dots style="min-height: 300rpx" autoplay="true" interval="3000" duration="300" circular="true">
			<swiper-item v-for="(item, index) in bannerlist" :key="index"><image style="width: 100%;height: auto;" :src="item.image" mode="widthFix" /></swiper-item>
		</swiper>
		<!-- <view>
			<u-grid :col="3">
				<u-grid-item>
					<image src="../../../static/cars.png" mode="widthFix" style="width: 100rpx;"></image>
					<view class="grid-text">图片</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="lock" :size="46"></u-icon>
					<view class="grid-text">锁头</view>
				</u-grid-item>
				<u-grid-item>
					<u-icon name="hourglass" :size="46"></u-icon>
					<view class="grid-text">沙漏</view>
				</u-grid-item>
			</u-grid>
		</view> -->
		<view id="tabInList">
			<u-tabs :list="tabs" :is-scroll="false" :current="current" active-color="#e0620d" @change="sectionChange"></u-tabs>
		</view>
		<view v-if="current == 0" class="product-list">
			<view v-for="(item, index) in goods" :key="index" class="goodsproduct product" @click.stop="toGoodsPage(0,item)">
				<image :src="item.logo" mode="aspectFill" ></image>
				<view class="name">{{ item.name }}</view>
				<view class="info">
					<view class="price">￥{{ item.price }}</view>
					<view class="slogan"><text style="text-decoration: line-through;">￥{{ item.market_price }}</text></view>
				</view>
				<view class="slogan">{{ item.slogan }}人付款</view>
				<view style="padding: 0 4% 10rpx; font-size: 24rpx; display: flex;">
					<view  @click.stop="toShop(item.companyid)">{{ item.company_name }} 进店></view>
				</view>
				
			</view>

			<view v-if="goods.length == 0" class="empty_box">
				<u-empty text="暂无数据" src="/static/imgs/empty.png" icon-size="300"></u-empty>
			</view>
		</view>
		<view v-if="current == 1" class="product-list">
			<view v-for="(item, index) in goods_all" :key="index" class="goodsproduct product" @click.stop="toGoodsPage(0,item)">
				<image :src="item.logo" mode="aspectFill" ></image>
				<view class="name">{{ item.name }}</view>
				<view class="info">
					<view class="price">￥{{ item.price }}</view>
					<view class="slogan"><text style="text-decoration: line-through;">￥{{ item.market_price }}</text></view>
				</view>
				<view class="slogan">{{ item.slogan }}人付款</view>
				<view style="padding: 0 4% 10rpx; font-size: 24rpx; display: flex;">
					<view  @click.stop="toShop(item.companyid)">{{ item.company_name }} 进店></view>
				</view>
			</view>
			<view v-if="goods_all.length == 0" class="empty_box">
				<u-empty text="暂无数据" src="/static/imgs/empty.png" icon-size="300"></u-empty>
			</view>
		</view>
		<view v-if="current == 2" style="padding-top: 24rpx;">
			<view v-for="(item, index) in shop" :key="index" class="shopproduct product" @click.stop="toGoodsPage(1,item)">
				<shop-box :goodsObj="item"></shop-box>
			</view>
			<view v-if="shop.length == 0" class="empty_box">
				<u-empty text="暂无数据" src="/static/imgs/empty.png" icon-size="300"></u-empty>
			</view>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>

import shopBox from '@/pages/sub/ai_xiaopu/component/shop_box.vue';

import { mapGetters } from 'vuex'

export default {

	components: { shopBox },
	data() {
		return {
			bannerlist: [{
				image: '/static/default.png',
				title: 'Ai校园'
			}],
			tabs: [
				{
					name: '推荐商品', 
					goods: [], 
					page: 1,
					maxpage: 0
				}, 
				{
					name: '全部商品', 
					goods: [], 
					page: 1,
					maxpage: 0
				},
				{
					name: '所有小铺',
					goods: [],
					page: 1,
					maxpage: 0
				}
			],
			current:0
		};
	},

	onLoad() {
		let _this = this;
		uni.getStorage({
		    key: 'jingwei',
		    success: function (res) {
				_this.latitude = res.data.latitude;
				_this.longitude = res.data.longitude;
				_this.init_list({'page':1});
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
							
							_this.init_list({'page':1});
							
						}
					})
				  }
				})
			}
		});
		this.bannerlist = this.config.banner_list;
	},
	computed: {
		goods() {
			return this.tabs[0].goods;
		},
		goods_all() {
			return this.tabs[1].goods;
		},
		shop() {
			return this.tabs[2].goods;
		},
		...mapGetters('config',[
			'config'
		])
	},
	onPullDownRefresh(){
		this.tabs[0].goods=[];
		this.tabs[0].page=1;
		this.tabs[1].goods=[];
		this.tabs[1].page=1;
		this.tabs[2].goods=[];
		this.tabs[2].page=1;
		this.sectionChange(this.current)
	},
	onReachBottom(){
		console.log("到底部");
		console.log(this.current);
		
		
		let _this = this;
		if(this.current == 0){
			let maxpage = this.tabs[0].maxpage;
			let page = this.tabs[0].page;
			if(maxpage > page) {
				this.tabs[0].page = page+1;
				this.goods_recommend_list({'page':page+1},function(msg){
					_this.concatGoods(msg);
				})
			} else {
				_this.$refs.uToast.show({
					title: "没有更多了",
				})
			}
		}
		
		if(this.current == 1){
			let maxpage = this.tabs[1].maxpage;
			let page = this.tabs[1].page;
			if(maxpage > page) {
				this.tabs[1].page = page+1;
				this.goods_all_list({'page':page+1},function(msg){
					_this.concatGoods2(msg);
				})
			} else {
				_this.$refs.uToast.show({
					title: "没有更多了",
				})
			}
		}
		if(this.current == 2){
			let maxpage = this.tabs[2].maxpage;
			let page = this.tabs[2].page;
			if(maxpage > page) {
				this.tabs[2].page = page+1;
				this.getCompanyList({'page':page+1},function(msg){
					_this.concatCompany(msg);
				})
			} else {
				_this.$refs.uToast.show({
					title: "没有更多了",
				})
			}
		}
	},
	methods: {
		sectionChange(index) {
			let _this = this;
			this.current = index;
			
			if(this.goods.length == 0 && index == 0 ) {
				_this.init_list({'page':1});
			}
			if(this.goods_all.length == 0 && index == 1 ) {
				_this.init_list2({'page':1});
			}
			if(this.shop.length == 0 && index == 2 ) {
				let data = {'page':1};
				data['latitude']= this.latitude;
				data['longitude']= this.longitude;
				this.getCompanyList(data,function(msg){
					_this.concatCompany(msg);
					uni.stopPullDownRefresh()
				})
			}

		},
		init_list:function(data,callback=()=>{}){
			let _this = this;

			// let data = {'page':1};
			this.goods_recommend_list(data,function(msg){
				_this.concatGoods(msg);
				uni.stopPullDownRefresh()
			});
		},
		init_list2:function(data,callback=()=>{}){
			let _this = this;
		
			// let data = {'page':1};
			this.goods_all_list(data,function(msg){
				_this.concatGoods2(msg);
				uni.stopPullDownRefresh()
			});
		},
		concatGoods(msg){
			let _this = this;
			let curTab = this.tabs[0];
			let newGoodsData = [];
			let goods_list = msg.goods_list;
			curTab.maxpage = msg.maxpage;
			for (let i = 0; i < goods_list.length; i++) {
				newGoodsData.push({
					id: goods_list[i]['goods_id'],
					logo:goods_list[i]['goods_pic'],
					name: goods_list[i]['goods_name'],
					price: goods_list[i]['price'],
					market_price: goods_list[i]['market_price'],
					slogan:goods_list[i]['sales'],
					company_name:goods_list[i]['company_name'],
					companyid:goods_list[i]['companyid'],
					cateid:goods_list[i]['cateid'],
					boxType: _this.tabIndex == 0 ? 'goods' : 'shops'
				});
			}
			// curPageData = newGoodsData;
			curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
		},
		concatGoods2(msg){
			let _this = this;
			let curTab = this.tabs[1];
			let newGoodsData = [];
			let goods_list = msg.goods_list;
			curTab.maxpage = msg.maxpage;
			for (let i = 0; i < goods_list.length; i++) {
				newGoodsData.push({
					id: goods_list[i]['goods_id'],
					logo:goods_list[i]['goods_pic'],
					name: goods_list[i]['goods_name'],
					price: goods_list[i]['price'],
					market_price: goods_list[i]['market_price'],
					slogan:goods_list[i]['sales'],
					company_name:goods_list[i]['company_name'],
					companyid:goods_list[i]['companyid'],
					cateid:goods_list[i]['cateid'],
					boxType: _this.tabIndex == 0 ? 'goods' : 'shops'
				});
			}
			// curPageData = newGoodsData;
			curTab.goods = curTab.goods.concat(newGoodsData); //追加新数据
		},
		goods_recommend_list(data,callback=(company_list)=>{}){
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/goods_recommend_list',data).then((res) => {
				if(res.code == 0) {
					
					
					callback(res.message);
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		
		goods_all_list(data,callback=(company_list)=>{}){
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/goods_all_list',data).then((res) => {
				if(res.code == 0) {
					
					
					callback(res.message);
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		},
		concatCompany(msg){
			let _this = this;
			let curTab = this.tabs[2];
			let newGoodsData = [];
			let company_list = msg.company_list;
			for (let i = 0; i < company_list.length; i++) {
				newGoodsData.push({
					id: company_list[i]['companyid'],
					logo: company_list[i]['logo'],
					shopTag: company_list[i]['is_admin'] == 1? 1: 0, // 自营 授权
					name: company_list[i]['name'],
					address: company_list[i]['address'],
					distance: company_list[i]['distance'],
					sales: company_list[i]['sales'],
					minute: company_list[i]['minute'],
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
		toGoodsPage(type,it) {
			console.log(it)
			if(type == 0) {
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/shop_index?goods_id='+it.id+'&cateid='+it.cateid+'&companyid='+it.companyid
				});
			} else if(type == 1){
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/shop_index?companyid='+it.id
				});
			}
			
		},
		toShop(id) {
			uni.navigateTo({
				url: '/pages/sub/ai_xiaopu/shop_index?companyid='+id
			});
		}
	},

	onPageScroll(e) {
		/*吸顶悬浮，上拉加载，下拉刷新组件*/
		if (e.scrollTop >= this.navTop) {
			this.isShowSticky = true; // 显示悬浮菜单
		} else {
			this.isShowSticky = false; // 隐藏悬浮菜单
		}
		/*吸顶悬浮，上拉加载，下拉刷新组件end*/
	}
};
</script>

<style>
	.empty_box {
		width: 100%;
	}
	
page {
	background-color: #efefef;
}
#tabInList {
	background-color: #FFFFFF;
	padding: 20rpx 0 0;
}
.u-mode-center-box {
	border-radius: 20rpx !important;
}
.product {
	/* width: 100%; */
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
	color: #ff9900;
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
					color: red;
					font-size: 30upx;
					font-weight: 600;
				}
				
			}
			.slogan {
				padding: 0 4% 10upx;
				color: #807c87;
				font-size: 24upx;
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
</style>
