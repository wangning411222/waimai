<template>
	<view class="page_box">
		<view v-if="JSON.stringify(thread) != '{}'">
			<view class="uni-card uni-border">
				<view class="uni-card__title uni-border-bottom">
					<view class="uni-card__title-box">
						<view class="uni-card__title-header" @click="user_detail(thread.uid)">
							<image :src="thread.avatar_url" class="uni-card__title-header-image" mode="scaleToFill"
								role="img"></image>
						</view>
						<view class="uni-card__title-content">
							<view class="uni-card__title-content-title uni-ellipsis">
								{{ thread.nick_name }}
								<u-icon v-if="thread.sex == 1" name="man" size="28"></u-icon>
								<u-icon v-if="thread.sex == 2" name="woman" size="28"></u-icon>
							</view>
							<text class="uni-card__title-content-extra uni-ellipsis">{{ thread.school }}</text>
						</view>
					</view>
					<view v-if="userInfo.gid != 1 && userInfo.gid !=5" @click.stop="report_method(1,0)"
						style="color: #BBBBBB;">
						<u-icon name="warning"></u-icon> 举报
					</view>
					<view v-if="userInfo.gid == 1 || userInfo.gid==5" style="align-self: flex-start;color: #AAAAAA;"
						@click="dele_modal(thread.tid,999)">
						<u-icon name="trash"></u-icon>删除
					</view>
				</view>
				<view class="uni-card__content uni-card__content--pd">
					<view>
						<view class="content-box" style="padding-bottom: 0;">
							<text class="content-box-text">{{ thread.message }}</text>
						</view>

						<u-row style="text-align: center;" v-if="thread.img_arr.length > 0">
							<u-col span="4" text-align="center" v-for="(it, i) in thread.img_arr" :key="i">
								<image class="image" mode="aspectFill" :src="it.url" @click.stop="previewImg(i)" />
							</u-col>
						</u-row>
					</view>
				</view>
				<view class="uni-card__footer uni-border-top">
					<view class="footer-box">
						<view>{{ thread.create_date_fmt }}</view>
						<view style="text-align: right;">
							<view v-if="thread.is_like == 0" @click.stop="like(thread.tid)"
								style="margin-right: 25rpx; display: inline-block;">
								<u-icon name="heart" size="28"></u-icon>
								<text v-if="thread.likes != 0"> {{ thread.likes }}</text>
								点赞
							</view>
							<view v-if="thread.is_like != 0" @click.stop="unlike(thread.tid)"
								style="margin-right: 25rpx; display: inline-block;">
								<u-icon name="heart-fill" color="red" size="28"></u-icon>
								<text v-if="thread.likes != 0"> {{ thread.likes }}</text>
								点赞
							</view>

							<view @click.stop="footerClick('comment',thread.nick_name)" style="display: inline-block;">
								<u-icon name="chat" size="28"></u-icon><text v-if="thread.posts != 0">{{ thread.posts }}</text> 评论
							</view>
						</view>

					</view>
				</view>
			</view>
			<view style="height: 150rpx; background: #efefef;">
				<navigator open-type="redirect" :url="config.thread_img_href" style="height: 100%;">
					<image :src="config.thread_img" ></image>
				</navigator>
			</view>
			<u-gap height="12" bg-color="#eeeeee"></u-gap>
			<view class="post_box" v-if="thread_reply_list.length > 0">
				<view v-for="(item,index) in thread_reply_list" :key="index">
					<view class="uni-card uni-border">
						<view class="uni-card__title uni-border-bottom">
							<view class="uni-card__title-box" style="align-items: normal;">
								<view class="uni-card__title-header" @click="user_detail(item.fromuid)">
									<image :src="item.avatar_url" class="uni-card__title-header-image"
										mode="scaleToFill" role="img"></image>
								</view>
								<view class="uni-card__title-content" style="height: auto;">
									<view class="uni-card__title-content-title uni-ellipsis" style="display: flex;">
										<view style="flex: 1;">{{ item.nick_name }}</view>
										<!-- v-if="userInfo.gid == 1 || userInfo.gid==5" -->
										<view v-if="userInfo.gid == 1 || userInfo.gid==5" style="align-self: flex-start;color: #AAAAAA;"
											@click="dele_modal(item.replyid,index)">
											<u-icon name="trash"></u-icon>删除
										</view>
									</view>
									<view class="uni-card__title-content-extra uni-ellipsis" style="line-height: normal;">{{ item.school }}</view>
									<view class="uni-card__content uni-card__content--pd" style="padding: 0; margin: 10rpx 0;">
										<view>
											<view class="content-box" style="padding-bottom: 0;">
												<text class="content-box-text">{{ item.reply_msg }}</text>
											</view>

										</view>
									</view>
									<view class="uni-card__footer uni-border-top" style="padding: 0;">
										<view class="footer-box">
											<view>
												<text style="color: #999;">{{ item.create_date_fmt }}</text>
											</view>
											<view style="text-align: right;">
												<view v-if="item.is_like == 0"
													@click.stop="replaylike(item.replyid,index)"
													style="margin-right: 25rpx; display: inline-block;">
													<u-icon name="heart" size="28"></u-icon>
													<text v-if="item.likes != 0"> {{ item.likes }}</text>
													点赞
												</view>
												<view v-if="item.is_like != 0"
													@click.stop="replayunlike(item.replyid,index)"
													style="margin-right: 25rpx; display: inline-block;">
													<u-icon name="heart-fill" color="red" size="28"></u-icon>
													<text v-if="item.likes != 0"> {{ item.likes }}</text>
													点赞
												</view>
												<view @click.stop="reply_fun(item.replyid,item.nick_name,item.fromuid)"
													style="display: inline-block;">
													<u-icon name="chat" size="28"></u-icon> 回复
												</view>
											</view>

										</view>
									</view>
									<!-- 二层回复 -->
									<view v-if="item.current_reply_list.length > 0">
										<view v-for="(item2,index2) in item.current_reply_list" :key="index2" style="margin-top: 25rpx;">
											<view class="uni-card uni-border">
												<view class="uni-card__title uni-border-bottom uni-card__title2">
													<view class="uni-card__title-box" style="align-items: normal;">
														<view class="uni-card__title-header uni-card__title-header2" @click="user_detail(item2.fromuid)">
															<image :src="item2.avatar_url" class="uni-card__title-header-image"
																mode="widthFix" role="img" style="width: 100%;"></image>
														</view>
														<view class="uni-card__title-content" style="height: auto;">
															<view class="uni-card__title-content-title uni-ellipsis" style="display: flex;">
																<view style="flex: 1; color: #aaa;">
																{{ item2.nick_name }}
																	<text v-if="item.fromuid != item2.touid">▶{{ item2.tousername }}</text>
																</view>
																<!-- v-if="userInfo.gid == 1 || userInfo.gid==5" -->
																<view v-if="userInfo.gid == 1 || userInfo.gid==5" style="align-self: flex-start;color: #AAAAAA;"
																	@click="dele_modal(item2.replyid,index,index2)">
																	<u-icon name="trash"></u-icon>删除
																</view>
															</view>
															<!-- <view class="uni-card__title-content-extra uni-ellipsis" style="line-height: normal;">{{ item2.school }}</view> -->
															<view class="uni-card__content uni-card__content--pd" style="padding: 0; margin: 10rpx 0;">
																<view>
																	<view class="content-box" style="padding-bottom: 0;">
																		
																		<text class="content-box-text">{{ item2.reply_msg }}</text>
																	</view>
										
																</view>
															</view>
															<view class="uni-card__footer uni-border-top" style="padding: 0;">
																<view class="footer-box">
																	<view>
																		<text style="color: #999;">{{ item2.create_date_fmt }}</text>
																	</view>
																	<view style="text-align: right;">
																		<view v-if="item2.is_like == 0"
																			@click.stop="replaylike(item2.replyid,index,index2)"
																			style="margin-right: 25rpx; display: inline-block;">
																			<u-icon name="heart" size="28"></u-icon>
																			<text v-if="item2.likes != 0"> {{ item2.likes }}</text>
																			点赞
																		</view>
																		<view v-if="item2.is_like != 0"
																			@click.stop="replayunlike(item2.replyid,index,index2)"
																			style="margin-right: 25rpx; display: inline-block;">
																			<u-icon name="heart-fill" color="red" size="28"></u-icon>
																			<text v-if="item2.likes != 0"> {{ item2.likes }}</text>
																			点赞
																		</view>
																		<view @click.stop="reply_fun(item.replyid,item2.nick_name,item2.fromuid)"
																			style="display: inline-block;">
																			<u-icon name="chat" size="28"></u-icon> 回复
																		</view>
																	</view>
										
																</view>
															</view>

														</view>
													</view>
										
												</view>
										
											</view>

										</view>
										
									</view>
								</view>
							</view>

						</view>

					</view>
					<u-gap height="1" bg-color="#ebecf6"></u-gap>
				</view>

				<view v-if="maxpage > 1">
					<u-loadmore :status="status" />
				</view>
			</view>
			<view v-else class="empty_box">
				<u-empty text="暂无回复" src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
			</view>
			<view v-show="reply_model" @click="hidden_reply_model"
				style="position: fixed;top: 0;bottom: 0; left: 0; right: 0;z-index: 2; width: 100%;height: 100vh;background-color: rgba(0,0,0,0.2);">
			</view>
			<view v-show="reply_model" class="bottom_btn">
				<view class="collect_left">
					<u-input v-model="reply" :placeholder="placeholder" type="text" :border="true"
						style="width: 100%;" />
				</view>

				<view class="primary" @click="comment()">
					<text>发表</text>
				</view>
			</view>
		</view>
		<u-action-sheet :list="report_list" v-model="report_show" @click="click_sheet"></u-action-sheet>
		<u-toast ref="uToast" />
		<u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？"
			@confirm="confirm"></u-modal>
		<u-modal v-model="dele_modal_show" show-cancel-button="true" content="确定删除？" @confirm="delete_post"
			confirm-color="#6ee4c1"></u-modal>
	</view>
</template>

<script>
	import liuyunoTabs from "@/components/liuyuno-tabs/liuyuno-tabs.vue";
	import {
		mapGetters
	} from 'vuex'
	
	export default {
		components: {
			liuyunoTabs
		},
		data() {
			return {
				user_show: false, // 是否填写了资料

				dele_modal_show: false,
				choose_tid: 0,
				choose_index: 0,

				tid: 1,
				quoteid: 0,
				reply: '',
				page: 1,
				maxpage: 0,
				thread: {},
				thread_reply_list: [],
				status: 'loadmore',
				reply_model: false,
				report_list: [{
					text: '垃圾信息',
				}, {
					text: '内容违规',
				}, {
					text: '不友善内容'
				}, {
					text: '内容质量低'
				}],
				report_show: false,
				replyid: 0,
				placeholder: '',
				activeUsername: '',
				activeUid:''
			}
		},
		computed: {
			...mapGetters('user', [
				'userInfo'
			]),
			...mapGetters('config', [
				'config'
			])
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.tid = option.tid;
		},
		onReady() {
			this.init(this.tid);
		},

		onReachBottom() {
			let _this = this;
			this.status = 'loading';

			if (this.maxpage > 1 && _this.page <= _this.maxpage) {

				this.postThreadRead(_this.tid, _this.page, function() {
					_this.status = 'loadmore';
				});
			} else {
				_this.status = 'nomore';
			}

		},
		methods: {
			improve_data(is_cert) {
				if (is_cert == 0) {
					this.user_show = true;
					return false;
				} else {
					return true;
				}
			},
			confirm() {
				uni.navigateTo({
					url: '/pages/sub/center/userinfo_add'
				});
			},
			init: function(tid) {

				this.postThreadRead(tid, this.page);
			},
			postThreadRead(tid, page, callback = () => {}) {
				let _this = this;
				_this.$store.dispatch('ai_yujian/getThreadRead', {
					'tid': tid,
					'page': page
				}).then((res) => {
					if (res.code == 0) {
						if (res.message.thread && res.message.thread.length == 0) {
							_this.$refs.uToast.show({
								title: '内容不存在'
							})
							setTimeout(()=>{
								uni.navigateBack()
							},1000)
							return false;
						}
						if (res.message.thread && page == 1) {
							_this.thread = res.message.thread;
						}
						// _this.thread_reply_list = res.message.thread_reply_list;
						_this.thread_reply_list = _this.thread_reply_list.concat(res.message.thread_reply_list);
						
						_this.maxpage = res.message.maxpage;
						if (_this.maxpage > 1 && _this.page <= _this.maxpage) {
							_this.page++;
						}
						callback();
					} else {
						
					}
				});
			},
			footerClick(types, username) {
				if (types == 'comment') {
					if (!this.improve_data(this.userInfo.is_cert)) {
						return false;
					}
					this.placeholder = '回复' + username;
					this.activeUsername = username;
					this.quoteid = 0;
					this.show_reply_model()
				}
			},
			reply_fun(quoteid, username, touid) {
				this.quoteid = quoteid;
				this.placeholder = '回复' + username;
				this.activeUsername = username;
				this.activeUid = touid;

				this.show_reply_model()
			},
			show_reply_model() {
				this.reply_model = true;
			},
			hidden_reply_model() {
				this.placeholder = '';
				this.reply_model = false;
			},
			comment() {
				let _this = this;
				if (this.reply != null) {
					this.$store.dispatch('ai_yujian/postThreadReply', {
						'reply': _this.reply,
						'tid': _this.tid,
						'quoteid': _this.quoteid,
						'touid': _this.activeUid
					}, ).then((res) => {
						if (res.code == 0) {
							let userInfo = uni.getStorageSync('userInfo');
							let reply_list = {
								'avatar_url': userInfo.avatar_url_fmt,
								'nick_name': userInfo.nick_name,
								'city': userInfo.city,
								'school': userInfo.school,
								'fromuid': userInfo.uid,
								'replyid': res.message,
								'quoteid': _this.quoteid,
								'reply_msg': _this.reply,
								'create_date_fmt': '刚刚',
								'tousername': _this.activeUsername,
								'touid': _this.activeUid,
								'tid': _this.thread.tid,
								'is_like': 0,
								'likes': "0"
							}
							// _this.thread_reply_list.unshift(reply_list);
							_this.reply_model = false;
							_this.reply = '';
							_this.init(_this.tid);
						} else {
							_this.$refs.uToast.show({
								title: res.message
							})
						}
					});
				}

			},
			report_method(type, rid) {
				this.report_show = true;
				if (type == 1) {
					this.replyid = 0;
				} else if (type == 2) {
					this.replyid = rid;
				}

			},
			click_sheet(index) {
				let _this = this;
				this.$store.dispatch('ai_yujian/postThreadReport', {
					'tid': _this.tid,
					'replyid': _this.replyid,
					'type': index
				}, ).then((res) => {
					if (res.code == 0) {
						_this.$refs.uToast.show({
							title: "举报已提交",
						})
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			like() {
				if (!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}

				let _this = this;
				this.$store.dispatch('ai_yujian/postThreadLike', {
					'tid': _this.tid
				}, ).then((res) => {
					if (res.code == 0) {
						let likes = _this.thread['likes'];
						_this.thread['likes'] = Number(likes) + 1;
						_this.thread['is_like'] = 1;
					} else {

					}
				});
			},
			unlike() {
				if (!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}

				let _this = this;
				this.$store.dispatch('ai_yujian/postThreadUnlike', {
					'tid': _this.tid
				}, ).then((res) => {
					if (res.code == 0) {
						let likes = _this.thread['likes'];
						_this.thread['likes'] = Number(likes) - 1;
						_this.thread['is_like'] = 0;
					} else {

					}
				});
			},
			dele_modal(tid, index) {
				this.dele_modal_show = true;
				this.choose_tid = tid;
				this.choose_index = index;
			},
			delete_post() {
				let _this = this;
				let data = {};
				if (this.choose_index == 999) {
					data = {
						'tid': this.choose_tid
					};
				} else {
					data = {
						'tid': this.thread.tid,
						'replyid': this.choose_tid
					};
				}
				_this.$store.dispatch('user/deleThread', data).then((res) => {
					if (res.code == 0) {
						if (_this.choose_index != 999) {
							_this.thread_reply_list.splice(_this.choose_index, 1);
						} else {
							uni.navigateTo({});
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
			user_detail(uid) {
				uni.navigateTo({
					url: '/pages/sub/ai_user/index?uid=' + uid
				});
			},
			previewImg(photoIndex) {

				let imgArr = []
				this.thread.img_arr.forEach(res => {
					imgArr.push(res.url)
				})
				uni.previewImage({
					current: photoIndex,
					urls: imgArr
				});
			},
			replaylike(replyid, index, index2 = '') {
				if (!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}

				let _this = this;
				
				this.$store.dispatch('ai_yujian/postReplyLike', {
					'replyid': replyid
				}, ).then((res) => {
					if (res.code == 0) {
						if(index2 === '') {
							let likes = _this.thread_reply_list[index]['likes'];
							_this.$set(_this.thread_reply_list[index], 'likes', Number(likes) + 1);
							_this.$set(_this.thread_reply_list[index], 'is_like', 1);
						} else {
							let likes = _this.thread_reply_list[index]['current_reply_list'][index2]['likes'];
							_this.$set(_this.thread_reply_list[index]['current_reply_list'][index2], 'likes', Number(likes) + 1);
							_this.$set(_this.thread_reply_list[index]['current_reply_list'][index2], 'is_like', 1);
						}
						
					} else {

					}
				});
			},
			replayunlike(replyid, index, index2 = '') {
				if (!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}

				let _this = this;
				this.$store.dispatch('ai_yujian/postReplyUnlike', {
					'replyid': replyid
				}, ).then((res) => {
					if (res.code == 0) {

						if(index2 === '') {
							let likes = _this.thread_reply_list[index]['likes'];
							_this.$set(_this.thread_reply_list[index], 'likes', Number(likes) - 1);
							_this.$set(_this.thread_reply_list[index], 'is_like', 0);
						} else {
							let likes = _this.thread_reply_list[index]['current_reply_list'][index2]['likes'];
							_this.$set(_this.thread_reply_list[index]['current_reply_list'][index2], 'likes', Number(likes) - 1);
							_this.$set(_this.thread_reply_list[index]['current_reply_list'][index2], 'is_like', 0);
						}
					} else {

					}
				});
			},
		},
		onShareAppMessage() {
			console.log(this.thread)
			let data = {
				title: this.thread.message,
				path: '/pages/sub/ai_yujian/yujian_comment?tid='+ this.thread.tid
			}
			if(this.thread.img_arr.length > 0) {
				data['imageUrl'] = this.thread.img_arr[0].url
			}
			return data
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
		padding-top: 80rpx;
		/* position: absolute;
		left: 0;
		top: 35%; */
	}

	.uni-card {
		margin: 0 !important;
	}



	.image {

		width: 210rpx;
		height: 210rpx;

	}

	.content-box {
		font-size: 38rpx;
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
		color: #aaa;
	}

	.footer-box__item {
		align-items: center;
		padding: 2px 0;
		font-size: 12px;
		color: #666;
	}

	.post_box .uni-border-top:after {
		border-top: unset !important;
	}


	.bottom_btn {
		width: 100%;
		height: 120rpx;
		padding: 0 25rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 3;
		border-top: 1px solid #eee;
		background-color: #FFFFFF;
	}

	.collect_left {
		width: 550rpx;
		height: 120rpx;

		display: flex;
		align-items: center;

		float: left;
		background-color: #FFFFFF;
		color: #aaaaaa;
	}

	.bottom_btn .primary {
		width: 150rpx;
		height: 120rpx;
		line-height: 120rpx;
		overflow: hidden;
		text-align: center;
		color: #FFFFFF;

	}

	.bottom_btn .primary text {
		padding: 10rpx 20rpx;
		border-radius: 5rpx;
		background-color: #6ee4c1;
	}
	.uni-card__title-header {
		width: 35px;
		height: 35px;
	}
	.uni-card__title-header2 {
		width: 25px;
		height: 25px;
	}
	.uni-card__title2 {
		padding: 0;
	}
	


</style>
