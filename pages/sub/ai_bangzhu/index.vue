<template>
	<view class="page_box">
		<view style="padding: 0 20rpx;">
			<view style="padding: 10rpx 0;">
				<view style="height: 80rpx;">
					<ren-dropdown-filter :filterData="filterData" :defaultIndex="defaultIndex" @onSelected="onSelected" ref="dropdown"></ren-dropdown-filter>
				</view>
			</view>
		</view>
		<view v-if="thread_list.length > 0" style="padding-top: 20rpx;">
			<view v-for="(item, index) in thread_list" :key="index">
				<view class="uni-card uni-border" >
					<view class="uni-card__title uni-border-bottom">
						<view class="uni-card__title-box">
							<view class="uni-card__title-header" @click="user_detail(item.uid)">
								<image :src="item.avatar_url" class="uni-card__title-header-image" mode="scaleToFill" role="img"></image>
							</view>
							<view class="uni-card__title-content">
								<view class="uni-card__title-content-title uni-ellipsis">
									{{ item.nick_name }}
									<u-icon v-if="item.sex == 1" name="man" size="28"></u-icon>
									<u-icon v-if="item.sex == 2" name="woman" size="28"></u-icon>
								</view>
								<text class="uni-card__title-content-extra uni-ellipsis">{{ item.city + ' | ' + item.school }}</text>
							</view>
						</view>
						<!-- <view @click.stop="report_method(1,0)" style="color: #BBBBBB;">
							<u-icon name="warning"></u-icon> 举报
						</view> -->
					</view>
					<view @click="clickCard(item.tid)" class="uni-card__content uni-card__content--pd">
						<view>
							<view class="content-box">
								<text class="content-box-text">{{ item.message }}</text>
							</view>
							<u-row style="text-align: center;" v-if="item.img_arr.length > 0">
								<u-col span="4" text-align="center" v-for="(it, i) in item.img_arr" :key="i"><image class="image" mode="aspectFill" :src="it.url" /></u-col>
							</u-row>
						</view>
					</view>
					<view class="uni-card__footer uni-border-top">
						<view class="footer-box">
							<view>{{ item.fid_fmt }} | {{ item.create_date_fmt }}</view>
							<view>
								
								<view style="margin-right: 25rpx; display: inline-block;">
									<u-icon name="eye" size="28"></u-icon>
									<text>{{ item.views }}</text>
								</view>
								<view v-if="item.is_like == 0" @click.stop="like(item.tid, index)" style="margin-right: 25rpx; display: inline-block;">
									<u-icon name="heart" size="28"></u-icon>
									<text v-if="item.likes != 0">{{ item.likes }}</text>
									点赞
								</view>
								<view v-if="item.is_like != 0" @click.stop="unlike(item.tid, index)" style="margin-right: 25rpx; display: inline-block;">
									<u-icon name="heart-fill" color="red" size="28"></u-icon>
									<text v-if="item.likes != 0">{{ item.likes }}</text>
									点赞
								</view>
						
								<view @click.stop="footerClick('comment',item.tid)" style="display: inline-block;">
									<u-icon name="chat" size="28"></u-icon>
									<text v-if="item.posts != 0">{{ item.posts }}</text>
									评论
								</view>
							</view>
						</view>
					</view>
				</view>

				<u-gap height="12" bg-color="#d7d7e0" v-if="index < thread_list.length - 1"></u-gap>
			</view>

			<view v-if="maxpage > 1" style="padding-bottom: 50rpx;"><u-loadmore :status="status" /></view>
		</view>
		<view class="empty_box" v-if="thread_list.length == 0">
			<u-empty text="暂无数据"  src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
		</view>
		<view @click="send_page" style="width: 100rpx; height: 100rpx; line-height: 96rpx; text-align: center; border-radius: 100%; overflow: hidden; background-color: #ff9900; position: fixed; bottom: 80rpx; right: 30rpx; z-index: 999;">
			<u-icon name="plus" color="#ffffff" size="64" style="vertical-align: middle;"></u-icon>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？" @confirm="confirm"  confirm-color="#ff9900"></u-modal>
	</view>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	data() {
		return {
			user_show:false,// 是否填写了资料
			status: 'loadmore',

			filterData: [
				[{ text: 'Ai同城', value: 0 }], 
				[{ text: '时间', value: 0 }, { text: '热度', value: 1 }],
			],
			defaultIndex: [0, 0],

			current: 3,
			
			// rank_type:0, //热度
			
			active_nav: 3, // 选择除热度外的 选项卡
			area: 0,
			orderby: 0,
			
			thread_list: [],
			page:1,
			maxpage: 0,
			
			address:''
		};
	},
	computed: {
		...mapGetters('user',[
			'userInfo'
		])
	},
	onPullDownRefresh() {
		let _this = this;
		if(this.current != 0){
			this.init();
			this.getThreadList(this.active_nav, 0, 0,this.page, function() {
				uni.stopPullDownRefresh();
			});
		}
		
	},
	onReachBottom(){
		let _this = this;
		this.status = 'loading';
		if(this.current != 0){
			if(this.maxpage > 1 && _this.page <= _this.maxpage) {
				
				this.getThreadList(this.active_nav,this.area,this.orderby,this.page,function(){
					_this.status = 'loadmore';
				});
			} else {
				_this.status = 'nomore';
			}
		}
	},
	onShow() {
		var _this = this;
		uni.getStorage({
		    key: 'getLocation_key',
		    success: function (res) {
				_this.address = res.data;
				console.log(_this.address);
		    },
			fail() {
				_this.$refs.uToast.show({
					title: "请先选择所在位置",
					type: 'error',
					url:'pages/sub/location/location'
					
				})
			}
		});
		
		
		uni.$on('shuaxin',(e)=>{
			if(e.status == 1){
				_this.init();
				setTimeout(function(){
					_this.getThreadList(_this.active_nav, 0, 0,_this.page);
				},1)
				
			}
		})
	},
	onReady() {
		var _this = this;
		this.getThreadList(_this.active_nav, 0, 0,_this.page);
	},
	onLoad() {
		// var _this = this;
		// this.getThreadList(_this.active_nav, 0, 0,_this.page);
		
		// this.getThreadRanks({'rank_type':0});
	},
	onUnload() {
		uni.$off('shuaxin');
	},
	methods: {
		init(){
			this.thread_list = [];
			// this.rank_type = 0;
			this.page = 1;
			this.area = 0;
			this.orderby = 0;
			this.defaultIndex=[0, 0];
			this.$refs.dropdown.initial([0, 0]);

		},
		onSelected(res) {
			if(this.current == 0) {
				// this.thread_list = [];
				// this.page = 1;
				
				// let rank_type = res[0][0]['value'];
				// let area = res[1][0]['value'];
				// this.getThreadRanks({'rank_type':rank_type});
			} else {
				this.thread_list = [];
				this.page = 1;
				this.area = res[0][0]['value'];
				this.orderby = res[1][0]['value'];
				
				this.getThreadList(this.active_nav, this.area, this.orderby,this.page);
			}
			
		},
		
		getThreadList(fid, area, orderby, page, callback = () => {}) {

			var _this = this;
			var data_arr = { 'orderby': orderby, 'fid': fid, 'area': area,'page':page };
			if (area == 0) {
				console.log(_this.address);
				let arr = _this.address.split('-');
				data_arr.province = arr[0];
				data_arr.city = arr[1];
			}

			_this.maxpage = 0;
			this.$store.dispatch('ai_yujian/getThreadList', data_arr).then(res => {
				if (res.code == 0) {
					_this.thread_list = _this.thread_list.concat(res.message.thread_list);
					
					_this.maxpage = res.message.maxpage;
					if(_this.maxpage > 1 && _this.page <= _this.maxpage){
						_this.page++;
					}
					callback();
				} else {
				}
			});
		},
		
		user_detail(uid){
			uni.navigateTo({
				url: '/pages/sub/ai_user/index?uid='+uid
			});
		},
		clickCard(tid) {
			uni.navigateTo({
				url: '/pages/sub/ai_yujian/yujian_comment?tid='+tid
			});
		},
		footerClick(types,tid) {
			if (types == 'comment') {
				uni.navigateTo({
					url: '/pages/sub/ai_yujian/yujian_comment?tid='+tid
				});
			}
		},
		send_page() {
			if(this.userInfo.is_cert == 0) {
				this.user_show = true;
				return false;
			}
			uni.navigateTo({
				url: '/pages/sub/ai_yujian/send?type=1'
			});
		},
		confirm(){
			uni.navigateTo({
				url: '/pages/sub/center/userinfo_add'
			});
		},
		like(tid, index) {
			let _this = this;
			this.$store.dispatch('ai_yujian/postThreadLike', { tid: tid }).then(res => {
				if (res.code == 0) {
					let likes = _this.thread_list[index]['likes'];
					_this.thread_list[index]['likes'] = Number(likes) + 1;
					_this.thread_list[index]['is_like'] = 1;
				} else {
				}
			});
		},
		unlike(tid, index) {
			let _this = this;
			this.$store.dispatch('ai_yujian/postThreadUnlike', { tid: tid }).then(res => {
				if (res.code == 0) {
					let likes = _this.thread_list[index]['likes'];
					_this.thread_list[index]['likes'] = Number(likes) - 1;
					_this.thread_list[index]['is_like'] = 0;
				} else {
				}
			});
		}
	}
};
</script>

<style>
@charset "UTF-8";
page {
	background-color: #ffffff;
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
	}
</style>
