<template>
	<view class="page_box">
		<!-- <view class="uni-card uni-border" >
			<view class="uni-card__title uni-border-bottom">
				<view class="uni-card__title-box">

					<view class="uni-card__title-header" v-if="thread.uid != userInfo.uid">
						<image :src="thread.avatar_url" class="uni-card__title-header-image" mode="scaleToFill" role="img"></image>
					</view>
					<view style="flex: 1;" :class="[ thread.uid != userInfo.uid ? 'left_arrow':'right_arrow']">
						<view class="reply_text_card">
							<text class="content-box-text">{{ thread.message }}</text>
							<view style="text-align: right; font-size: 20rpx;">{{ thread.create_date }}</view>
						</view>
					</view>
					<view class="uni-card__title-header" v-if="thread.uid == userInfo.uid">
						<image :src="thread.avatar_url" class="uni-card__title-header-image" mode="scaleToFill" role="img"></image>
					</view>
				</view>
			</view>
			
		</view> -->
		<view class="post_box" v-if="thread_reply_list.length > 0">
			<view v-for="(item,index) in thread_reply_list" :key="index">
				<view class="" style="display: flex; padding: 10px;">
					<view class="uni-card__title-header" v-if="item.uid != userInfo.uid" @click.stop="user_detail(item.uid)">
						<image :src="toavatar" class="uni-card__title-header-image" mode="scaleToFill" role="img"></image>
					</view>
					<view style="flex: 1;" :class="[ item.uid != userInfo.uid ? 'left_arrow':'right_arrow']">
						<view class="reply_text_card">
							<text class="content-box-text">{{ item.message }}</text>
							<view style="text-align: right; font-size: 20rpx;">{{ item.create_date }}</view>
						</view>
					</view>
					<view class="uni-card__title-header" v-if="item.uid == userInfo.uid">
						<image :src="userInfo.avatar_url_fmt" class="uni-card__title-header-image" mode="scaleToFill" role="img"></image>
					</view>
				</view>
			</view>
			
			<view v-if="maxpage > 1">
				<u-loadmore :status="status" />
			</view>
		</view>
		
		<view v-show="reply_model" class="bottom_btn">
			<view style="display: flex;">
				<view class="collect_left">
					<u-input v-model="reply" name="reply" type="text" :border="true" ref="replyRef" style="width: 100%;" @focus="input_focus()"/>
				</view>
				
				<view class="reply_right">
					<!-- <u-icon name="photo" color="#2979ff" size="28" @click="emoji_box()"></u-icon> -->
					<image src="../../../static/icon/xiaolian.png" mode="" style="width: 60rpx;height: 60rpx;vertical-align: middle;" @click="emoji_box()"></image>
					<text v-if="reply != ''" class="primary"  @click="comment()">发送</text>
				</view>
			</view>
			
			<view v-if="emoji_model" style="height: 300rpx; overflow-y: auto; margin-top: 25rpx;">
				<u-grid :col="8" hover-class="hover-class" :border="false">
					<u-grid-item v-for="(item, index) in emoji" :index="index" :key="index" @click="clickEmoji">
						<text class="grid-text">{{ item }}</text>
					</u-grid-item>
				</u-grid>
			</view>
			
		</view>
		<!-- <u-action-sheet :list="report_list" v-model="report_show" @click="click_sheet"></u-action-sheet> -->
		<u-toast ref="uToast" />
		<u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？" @confirm="confirm"  confirm-color="#6ee4c1"></u-modal>
		
	</view>
</template>

<script>
	var newList;
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import { mapGetters } from 'vuex'
	export default {
		components: {
			liuyunoTabs
		},
		computed: {
			...mapGetters('user',[
				'userInfo'
			])
		},
		data() {
			return {
				user_show:false, // 是否填写了资料
				
				touid:1,
				toavatar:'',
				
				quoteid:0,
				reply:'',
				page:1,
				maxpage:0,
				// thread:{},
				thread_reply_list:[],
				status: 'loadmore',
				reply_model: true,
				// report_list: [{
				// 	text: '垃圾信息',
				// }, {
				// 	text: '内容违规',
				// }, {
				// 	text: '不友善内容'
				// }, {
				// 	text: '内容质量低' 
				// }],
				// report_show:false,
				replyid:0,
				emoji_model:false,
				emoji:[" 😀 "," 😃 "," 😄 "," 😁 "," 😆 "," 😅 "," 🤣 "," 😂 "," 🙂 "," 🙃 "," 😉 "," 😊 "," 😇 "," 🥰 "," 😍 "," 🤩 "," 😘 "," 😗 "," ️😚 "," 😙 "," 😋 "," 😛 "," 😜 "," 🤪 "," 😝 "," 🤑 "," 🤗 "," 🤭 "," 🤫 "," 🤔 "," 🤐 "," 🤨 "," 😐 "," 😑 "," 😶 "," 😏 "," 😒 "," 🙄 "," 😬 "," 🤥 "," 😌 "," 😔 "," 😪 "," 🤤 "," 😴 "," 😷 "," 🤒 "," 🤕 "," 🤢 "," 🤮 "," 🤧 "," 🥵 "," 🥶 "," 🥴 "," 😵 "," 🤯 "," 🤠 "," 🥳 "," 😎 "," 🤓 "," 🧐 "," 😕 "," 😟 "," 🙁 "," ️😮 "," 😯 "," 😲 "," 😳 "," 🥺 "," 😦 "," 😧 "," 😨 "," 😰 "," 😥 "," 😢 "," 😭 "," 😱 "," 😖 "," 😣 "," 😞 "," 😓 "," 😩 "," 😫 "," 🥱 "," 😤 "," 😡 "," 😠 "," 🤬 "]
			}
		},
		onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
			
			uni.setNavigationBarTitle({
			    title: option.name
			});
			this.toavatar = decodeURI(option.avatar);
			
			this.init(option.uid);
			this.touid = option.uid;

			setTimeout(()=>{
				this.scroll_bottom();
			},500)
		},
		onShow(){
			let _this = this;
			// this.$store.dispatch('ai_pm/getNewnotice').then((res) => {
			// 	if(res.code == 0) {
			// 		_this.noticenums = Number(res.message.newpms) + Number(res.message.system_pms);
			// 		uni.showTabBarRedDot({
			// 			index: 3,
			// 		})
			// 	} else {
			// 		uni.hideTabBarRedDot({
			// 			index: 3,
			// 		})
			// 	}
			// });

		},
		onUnload() {
			console.log(123);
			console.log(newList);
			clearInterval(newList);
		},
		onPullDownRefresh() {
			let _this = this;
			
			console.log(this.thread_reply_list[0]['pmid']);
			let pmid = this.thread_reply_list[0]['pmid'];
			// uni.stopPullDownRefresh();
			_this.postThreadRead(this.touid,pmid,"lt",function(){
				uni.stopPullDownRefresh();
			});
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
			init:function(uid,pmid = 0){
				let _this = this;
				_this.postThreadRead(uid,pmid,"eq",function(){
					_this.new_list();
				});
			},
			postThreadRead(uid,pmid,option,callback=()=>{}){
				let _this = this;
				_this.$store.dispatch('ai_pm/postPmRead',{'uid':uid,'pmid':pmid,'op':option}).then((res) => {
					if(res.code == 0) {

						_this.thread_reply_list.unshift(...res.message);
						
						
						callback(res.message);
					} else {
						
					}
				});
			},
			postNewThreadRead(uid,pmid,callback=()=>{}){
				let _this = this;
				_this.$store.dispatch('ai_pm/postPmRead',{'uid':uid,'pmid':pmid,'op':'gt'}).then((res) => {
					if(res.code == 0) {
			
						_this.thread_reply_list.push(...res.message);
						
						
						callback(res.message);
					} else {
						
					}
				});
			},
			history_list(){
				
			},
			new_list(){
				let _this = this;
				let reply_length = this.thread_reply_list.length;
				let maxpmid = this.thread_reply_list[reply_length-1]['pmid'];
				console.log(this.thread_reply_list[reply_length-1]);
				newList = setInterval(()=>{
					this.postNewThreadRead(this.touid,maxpmid,function(msg){
						if(msg.length > 0){
							clearInterval(newList);
							_this.new_list();
						}
					});
				},10000)
			},
			comment(){
				if(!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
				clearInterval(newList);
				this.emoji_model = false;
				let _this = this;
				if(this.reply != null) {
					this.$store.dispatch('ai_pm/postPmSend',
						{'message':_this.reply,'touid':_this.touid},
					).then((res) => {
						if (res.code == 0) {
							let userInfo = uni.getStorageSync('userInfo');
							let reply_list = {
								'uid':userInfo.uid,
								'pmid':res.message.pmid,
								'message':_this.reply,
								'create_date':'刚刚'
							}
							_this.thread_reply_list.push(reply_list);
							_this.reply = '';
							// _this.reply_model = false;
							
							// 发送后终止定时，然后再开启
							
							_this.new_list();
							
							_this.scroll_bottom();
							
						} else {
							
						}
					});
				}
				
			},
			scroll_bottom(){
				uni.createSelectorQuery().select(".post_box").boundingClientRect((res)=>{
					const scrollH = res.height;
				　　uni.pageScrollTo({
				　　　　duration: 100,// 过渡时间
				　　　　scrollTop: scrollH,// 滚动的实际距离
				　　})
				}).exec()
			},
			user_detail(uid){
				uni.navigateTo({
					url: '/pages/sub/ai_user/index?uid='+uid
				});
			},
			input_focus() {
				this.emoji_model = false;
			},
			emoji_box() {
				if(this.emoji_model) {
					this.emoji_model = false;
				} else {
					this.emoji_model = true;
				}
				
			},
			insertInportTxt (insertTxt) {
				this.reply = this.reply+insertTxt;
			},
			clickEmoji(index) {
				console.log(this.emoji[index]);
				this.insertInportTxt (this.emoji[index])
			}	
		}
	}
</script>

<style>
	@charset "UTF-8";
	page {
		background-color: #FFFFFF;
	}
	.page_box {
		/* padding: 0 20rpx 25rpx; */
	}
	
	.empty_box {
		width: 100%;
		position: absolute;
		left: 0;
		top: 35%;
	}
	.uni-card {
			margin: 0!important;
	}



	.image {
		
		width: 210rpx;
		height: 210rpx;
		
	}

	.content-box {
		padding-bottom: 20rpx;
	}

	.content-box-text {
		font-size: 32rpx;
		line-height: 22px;
		word-break: break-all;
	}

	.footer-box {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		justify-content: space-between;
		flex-direction: row;

	}

	.footer-box__item {
		align-items: center;
		padding: 2px 0;
		font-size: 12px;
		color: #666;
	}
	.post_box {
		padding-bottom: 120rpx;
	}
	.post_box .uni-border-top:after {
		border-top: unset !important;
	}
	
	
	.bottom_btn {
		width: 100%;
		/* height: 120rpx;
	   line-height: 120rpx; */
		padding: 25rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 3;
		border-top: 1px solid #eee;
		background-color: #FFFFFF;
	}
	.collect_left {
		flex: 1;
		align-self: center;
		/* width: 550rpx;
		height: 120rpx;
		
		display: flex;
		align-items: center;
		
		float: left; 
		background-color: #FFFFFF;
		color: #aaaaaa; */
	}
	.bottom_btn .reply_right {
		align-self: center;
		padding: 0 0 0 20rpx;
		/* width: 150rpx;
		height: 120rpx;
		line-height: 120rpx;
		overflow: hidden;
		text-align: center;
		color: #FFFFFF; */
		
	}
	.bottom_btn .primary {
		margin-left: 20rpx;
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		background-color: #18B566;
		color: #FFFFFF;
	}
	
	.reply_text_card {
		border-radius: 10rpx;
		padding: 20rpx;
		max-width: 400rpx;
		min-height: 40rpx;
	}
	.grid-text {
		font-size: 32rpx;
	}
	
	
</style>
<style lang="scss">
	.left_arrow {
		background: url(../../../static/icon/left_arrow.png) no-repeat;
		background-position: left 10rpx;
		background-size: 20rpx;
		padding-left: 18rpx;
		.reply_text_card {
			background-color: #EEEEEE;
			margin: 0 auto 0 0;
		}
	}
	.right_arrow {
		background: url(../../../static/icon/right_arrow.png) no-repeat;
		background-position: right 10rpx;
		background-size: 20rpx;
		padding-right: 18rpx;
		.reply_text_card {
			background-color: #18B566;
			margin: 0 0 0 auto;
		}
	}
</style>