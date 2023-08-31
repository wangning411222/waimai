<template>
	<view>
		<view class="wrap">
			<!-- <view class="u-tabs-box">
				<u-tabs-swiper activeColor="#6ee4c1" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" :offset="[5,130]" swiperWidth="750"></u-tabs-swiper>
			</view> -->
			<swiper class="swiper-box" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
				<!-- <swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[0]" :key="res.uid" @click="detail_card(res.uid,res.username,res.avatar_url,index)">
								<view class="item">
									<view class="left"><image :src="res.avatar_url" mode="aspectFill" @click.stop="user_detail(res.uid)"></image></view>
									<view class="content">
										<view class="title u-line-1">
											{{ res.username }}
											<text style="float: right;font-size: 26rpx; color: #AAAAAA;">{{ res.last_date }}</text>
										</view>
										<view v-if="res.count > 0" class="type u-line-2">{{ res.count }}未读</view>
										<view v-if="res.count == 0" class="type u-line-2">消息已读</view>
									</view>
									
								</view>
								
							</view>
							<u-loadmore :status="loadStatus[0]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item> -->
				<swiper-item class="swiper-item">
					<scroll-view scroll-y style="height: 100%;width: 100%;" @scrolltolower="reachBottom">
						<view class="page-box">
							<view class="order" v-for="(res, index) in orderList[1]" :key="index"  @click.stop="detail(res.target_url)">
								<view class="item">
									<view class="left"><image :src="res.avatar" mode="aspectFill"></image></view>
									<view class="content">
										<view class="title u-line-1">
											{{ res.from_username }}
											<text style="float: right;font-size: 26rpx; color: #AAAAAA;">{{ res.last_date }}</text>
										</view>
										<view class="type u-line-2">{{ res.type_fmt }}
										<text style="color: #000000; text-weight:bold;">{{ res.subject }}</text>
										</view>
									</view>
									
								</view>
								
							</view>
							<u-loadmore :status="loadStatus[1]" bgColor="#f2f2f2"></u-loadmore>
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			orderList: [[], []],
			maxpage: [1, 1],
			page: [1, 1],

			list: [
				{
					name: '私信',
					count: 0
				},
				{
					name: '通知',
					count: 0
				}
			],
			current: 1,
			swiperCurrent: 1,
			tabsHeight: 0,
			dx: 0,
			loadStatus: ['loadmore','loadmore'],
		};
	},
	onShow() {
		let _this = this;
		this.$store.dispatch('ai_pm/getNewnotice').then((res) => {
			if(res.code == 0) {
				_this.list[0]['count'] = Number(res.message.newpms);
				_this.list[1]['count'] = Number(res.message.system_pms);
			}
		});
	},
	onLoad() {

		this.getOrderList(0,1);
		this.getOrderList(1,1);
	},
	computed: {
		// 价格小数
		priceDecimal() {
			return val => {
				if (val !== parseInt(val)) return val.slice(-2);
				else return '00';
			};
		},
		// 价格整数
		priceInt() {
			return val => {
				if (val !== parseInt(val)) return val.split('.')[0];
				else return val;
			};
		}
	},
	methods: {
		reachBottom() {
			// 此tab为空数据
			if(this.current != 2) {
				if(this.maxpage[this.current] > 1 && this.page[this.current] <= this.maxpage[this.current]) {
					this.loadStatus.splice(this.current,1,"loading")
					setTimeout(() => {
						this.getOrderList(this.current,this.page[this.current]);
					}, 1200);
				} else {
					this.loadStatus.splice(this.current,1,"nomore")
				}
				
			}
		},
		// 页面数据
		getOrderList(idx,page) {
			let _this = this;
			if(idx == 0){
				this.$store.dispatch('ai_pm/postPmList',{'page':this.page[idx]}).then((res) => {
					if(res.code == 0) {
						_this.orderList[idx].push(...res.message);
						
						_this.maxpage[idx] = res.message.maxpage;
						if(_this.maxpage[idx] > 1 && _this.page[idx] <= _this.maxpage[idx]){
							_this.page[idx]++;
						}
					}
					
				});
			} else if(idx == 1){
				this.$store.dispatch('ai_pm/postNoticelist',{'page':this.page[idx]}).then((res) => {
					if(res.code == 0) {
						_this.orderList[idx].push(...res.message.notice_list);
						
						_this.maxpage[idx] = res.message.maxpage;
						if(_this.maxpage[idx] > 1 && _this.page[idx] <= _this.maxpage[idx]){
							_this.page[idx]++;
						}
					}
					
				});
			}
			this.loadStatus.splice(this.current,1,"loadmore")
		},

		// tab栏切换
		change(index) {
			this.swiperCurrent = index;
		},
		transition({ detail: { dx } }) {
			this.$refs.tabs.setDx(dx);
		},
		animationfinish({ detail: { current } }) {
			this.$refs.tabs.setFinishCurrent(current);
			this.swiperCurrent = current;
			this.current = current;
		},
		detail_card(uid,name,avatar_url,index){
			this.list[0]['count'] = 0;
			this.orderList[0][index]['count'] = 0;
			let url = encodeURI(avatar_url);
			uni.navigateTo({
				url: '/pages/sub/ai_news/details?uid='+uid+'&name='+name+'&avatar='+url
			});
		},
		user_detail(uid){
			uni.navigateTo({
				url: '/pages/sub/ai_user/index?uid='+uid
			});
		},
		detail(url){
			uni.navigateTo({
				url:'/'+url
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
			color: $u-type-warning-dark;
		}
	}
	.item {
		display: flex;
		margin: 20rpx 0 0;
		.left {
			margin-right: 20rpx;
			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 10rpx;
			}
		}
		.content {
			flex: 1;
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
			color: $u-type-warning-dark;
			border-color: $u-type-warning-dark;
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
