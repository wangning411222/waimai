<template>
	<view>
		<view v-if="JSON.stringify(center_detail) != '{}'" style="padding-bottom: 130rpx; background-color: #FFFFFF;">
			<view style="background-color: #ff9900; color: #FFFFFF;">
				<view style="display: flex; padding-top: 40rpx; padding-bottom: 40rpx; padding-left: 50rpx;">
					<view>
						<u-avatar :src="center_detail.avatar_url_fmt" size="170" bg-color="#FFFFFF" mode="square"></u-avatar>
					</view>
					<view style="flex: 1;padding-left: 40rpx;">
						<view class="title">{{ center_detail.nick_name }}
						<u-icon size="30" :name="center_detail.sex == 1 ? 'man':'woman'" :color="userInfo.sex == 1 ? '#FFFFFF':'#FFFFFF'"></u-icon>
						</view>
						
						<view v-if="center_detail.is_cert == 1" style="margin: 15rpx 0 0;font-size: 0;">
							<text v-if="center_detail.is_cert == 1" style="color: #ff9900; border-radius: 5rpx; padding: 3rpx 5rpx; font-size: 20rpx; background-color: #FFFFFF; vertical-align: middle;">{{ center_detail.is_cert_fmt }}</text>
						</view>
						<view class="area">
							<text class="job_tag">{{ center_detail.school }}</text>
							<!-- <text class="job_tag">{{ center_detail.city }}</text> -->
						</view>
						
					</view>
					
					
				</view>
				<view class="user-box u-p-b-30 text-white" style="display: flex;text-align: center;">
					<view style="width: 180rpx;">
						<view style="font-weight: bold;">{{ center_detail.follows }}</view>
						关注
					</view>
					<view style="width: 180rpx;">
						<view style="font-weight: bold;">{{ center_detail.fans }}</view>
						粉丝
					</view>
				</view>
			</view>
			<view style="text-align: center;">
				<u-tabs :list="tabslist" :current="current" @change="change" font-size="36" active-color="#ff9900" bar-width="100" bar-height="4"></u-tabs>
			</view>
			<view>
				<view v-if="center_detail.thread_list.length > 0">
					<view class="thread_list" v-for="(item,index) in center_detail.thread_list" :key="index" @click="clickCard(item.tid)" style="padding: 20rpx 30rpx; border-bottom: 1rpx solid #eeeeee;">
						<view style="display: flex; margin-bottom: 10rpx;">
							<view style="flex:1; font-size: 36rpx;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.message }}</view>
							<view style="font-size: 22rpx;">{{ item.create_date_fmt }}</view>
						</view>
						<u-row style="text-align: center;" v-if="item.img_arr.length > 0">
							<u-col span="4" text-align="center" v-for="(it, i) in item.img_arr" :key="i">
							<image class="image" mode="aspectFill" :src="it.url" @click="clickCard(item.tid)"/>
							</u-col>
						</u-row>
						<view style="padding-top: 20rpx;">
							<view style="font-size: 30rpx; color: #CCCCCC;">
								<u-icon name="eye" size="28"></u-icon><text style="margin-right: 20rpx;">{{ item.views }}</text>
								<u-icon name="heart" size="28"></u-icon>
								<text style="margin-right: 20rpx;">{{ item.likes }}</text>
								<u-icon name="chat" size="28"></u-icon>{{ item.posts }} 
							</view>
						</view>
					</view>
				</view>
				<view v-else style="padding-top: 80rpx;">
					<u-empty text="暂无发布"  src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
				</view>
			</view>
		</view>
	
		<view class="navigation">
			<view class="tell btn u-line-1" v-if="center_detail.follow_status == 2 || center_detail.follow_status == 0" @click="follow(center_detail.uid)" style="border-right: 1rpx solid #FFFFFF;">+ 关注</view>
			<view class="tell btn u-line-1" v-if="center_detail.follow_status == 1" @click="follow(center_detail.uid)" style="border-right: 1rpx solid #FFFFFF;">已关注</view>
			<view class="tell btn u-line-1" v-if="center_detail.follow_status == 3" @click="follow(center_detail.uid)" style="border-right: 1rpx solid #FFFFFF;">已互关</view>
			<view class="tell btn u-line-1" @click="getWechat(center_detail.uid,center_detail.nick_name,center_detail.avatar_url_fmt)">查看微信号</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？" @confirm="confirm"  confirm-color="#ff9900"></u-modal>
		
	</view>
	
</template>

<script> 
	import { mapState,mapGetters } from 'vuex'
	// 在页面中定义激励视频广告
	let videoAd = null
	export default {
		data() {
			return {
				user_show:false, // 是否填写了资料
				uid:0,
				current: 0,
				center_detail:{},
				tabslist: [{
					name: '他的发布'
				}]
			}
		},
		computed: {
			...mapGetters('user',[
				'userInfo'
			])
		},
		onLoad(option) {
			let _this = this;
			this.uid = option.uid;
			// #ifdef MP-WEIXIN
			// 在页面onLoad回调事件中创建激励视频广告实例
			if (wx.createRewardedVideoAd) {
			  videoAd = wx.createRewardedVideoAd({
			    adUnitId: 'adunit-8230f2e7e5ee5725'
			  })
			  videoAd.onLoad(() => {})
			  videoAd.onError((err) => {})
			  videoAd.onClose((res) => {
					// 用户点击了【关闭广告】按钮
					if (res && res.isEnded) {
						// 正常播放结束，可以下发游戏奖励
						_this.$store.dispatch('user/getWechat',{'cuid':_this.uid}).then((res) => {
							console.log(res.message)
							_this.$refs.uToast.show({
								title: res.message,
							})
							if(res.code == 0) {
								uni.setClipboardData({
									data: res.message,
									success: function () {
										console.log('success');
									}
								});
							}
							
						})
						
					} else {
						// 播放中途退出，不下发游戏奖励
					}
			  })
			}
			
			// #endif
		},
		onShow() {

		},
		mounted() {
			this.postMyCompanyRead(this.uid);
		},
		methods: {
			improve_data(is_cert) {
				if(is_cert == 0) {
					this.user_show = true;
					return false;
				} else {
					return true;
				}
			},
			confirm(){
				uni.navigateTo({
					url: '/pages/sub/center/userinfo_add'
				});
			},
			postMyCompanyRead(cuid){
				let _this = this;
				_this.$store.dispatch('user/userCenter',{'cuid':cuid}).then((res) => {
					if(res.code == 0) {
						_this.center_detail = res.message;
						
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			change(index) {
				this.current = index;
			},
			clickCard(tid) {
				uni.navigateTo({
					url: '/pages/sub/ai_yujian/yujian_comment?tid='+tid
				});
			},
			follow(followed_uid){
				if(!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
				
				let _this = this;
				_this.$store.dispatch('user/userFollow',{'followed_uid':followed_uid}).then((res) => {
					if(res.code == 0) {
						if(res.message == "关注成功") {
							_this.center_detail.follow_status = 1;
						}
						
						_this.$refs.uToast.show({
							title: res.message,
						})
					} else if(res.code == 1) {
						if(res.message == "取消关注成功") {
							_this.center_detail.follow_status = 2;
						}
						_this.$refs.uToast.show({
							title: res.message,
						})
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			getWechat(){
				if(this.center_detail.ispublic == 1) {
					// #ifdef MP-WEIXIN
					// 用户触发广告后，显示激励视频广告
					if (videoAd) {
					  videoAd.show().catch(() => {
					    // 失败重试
					    videoAd.load()
					      .then(() => videoAd.show())
					      .catch(err => {
					        console.log('激励视频 广告显示失败')
					      })
					  })
					}
					// #endif
					
				} else {
					this.$refs.uToast.show({
						title: '隐私状态，无法查看',
					})
					return false
				}
				
			}
		}
	}
</script>

<style lang="scss" >

	.mr-2 {
		margin-right: 20rpx;
	}
	.font-35 {
		font-size: 35rpx;
	}
	.content_box {
		padding: 0 25rpx 25rpx;
		background-color: #FFFFFF;
		border-radius: 8rpx;
		margin-bottom: 10rpx;
	}
	.job_tag {
		font-size: 22rpx;
		padding: 5rpx 16rpx;
		margin-right: 10rpx;
		color: #FFFFFF;
		border: 1rpx solid #FFFFFF;
	}
	.title {
		
		font-size: 38rpx;
	}
	.price {
		margin: 15rpx 0;
		color: red;
	}
	.tag, .area {
		margin: 15rpx 0 0;
		font-size: 30rpx;
	}
	.content {
		padding: 0 20rpx;
		color: #666666;
	}
	.usertag {
		display: inline-block;
		padding: 10rpx 15rpx;
		margin-right: 15rpx;
		margin-bottom: 15rpx;
		border: 1rpx solid #cccccc;
		border-radius: 3px;
		color: #bbbbbb;
	}
	.item-menu-image {
		width: 100rpx;
		height: 100rpx;
	}
	.cert_content .u-image {
		margin: 0 auto;
	}
	.navigation {
		width: 100%;
		
		position: fixed;
		left: 0;
		bottom: 0;
		
		display: flex;
		border: solid 2rpx #ff9900;
		background-color: #ffffff;
		
		
		.tell {
			padding: 28rpx 0;
			color: #FFFFFF;
			font-size: 28rpx;
			flex: 1;
			background-color: #ff9900;
			text-align: center;
		}
	}
	.bottom_btn {
		width: 100%;
		height: 120rpx;
		padding: 0 25rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		border-top: 1px solid #eee;
		background-color: #FFFFFF;
	}
	.collect_left {
		width: 440rpx;
		height: 120rpx;
		
		display: flex;
		align-items: center;
		
		background-color: #FFFFFF;
		color: #aaaaaa;
		float: left;
	}
	.bottom_btn .primary {
		width: 130rpx;
		height: 120rpx;
		line-height: 120rpx;
		overflow: hidden;
		text-align: center;
		color: #FFFFFF;
		text {
			padding: 10rpx 20rpx;
			border-radius: 5rpx;
			background-color: #ed3f14;
		}
	}
	.bottom_btn .default_btn {
		width: 130rpx;
		height: 120rpx;
		line-height: 120rpx;
		overflow: hidden;
		text-align: center;
		color: #FFFFFF;
		text {
			padding: 10rpx 20rpx;
			border-radius: 5rpx;
			background-color: #C0C4CC;
		}
	}
	.thread_list .image {
		
		width: 210rpx;
		height: 210rpx;
		
	}
</style>