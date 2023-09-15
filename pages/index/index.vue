<template>
	<view>
		<view style="display: flex; padding: 25rpx;">
			<view style="flex: 1;">
				<u-icon name="map"></u-icon>
				<view @click="get_location" style="display: inline-block;">
					{{ location }}
					<u-icon name="arrow-right"></u-icon>
				</view>
			</view>
			<view style="flex: 1; text-align: right;" :class="[noticenums != 0 ?'text-red':'']">
				<u-icon name="bell" size="34" @click="news" style="vertical-align: middle;"></u-icon>
				<text v-if="noticenums != 0" style="vertical-align: middle;">{{ noticenums }}</text>
			</view>
			
		</view>
		<view class="content_box">
			<view>
				<u-swiper :height="426" :list="swiperList" :title="banner_title" :effect3d="effect3d" :indicator-pos="indicatorPos" :mode="mode" :interval="3000" @click="swiperclick"></u-swiper>
			</view>
			<view class="pt-2">
				<u-grid :col="5" :border="false">
					<u-grid-item v-for="(item,index) in nav_conf" :key="index" @tap="tab_nav(item.ptype)">
						<image class="item-menu-image" :src="item.img" mode="" ></image>
						<view class="grid-text">{{ item.text }}</view>
					</u-grid-item>
					
				</u-grid>
			</view>
			<view class="py-2" v-if="noticeList.length > 0">
				<u-notice-bar type="success" mode="vertical" :list="noticeList"></u-notice-bar>
			</view>
			<view class="card" style="padding-top: 25rpx;">
				<u-section :title="ttitle" :right="right" :font-size='32' :bold="bold" :color="color" :show-line="false" @click="detail(1)"></u-section>
				<view class="fixed-container" v-if="article_list.length > 0">
					<view class="kuaibao_card" v-for="(item,index) in article_list" :key="index" @click="kuaibao_detail(item.articleid)">
						<image class="card_image image" mode="aspectFill" :src="item.pic" />
						<view class="kuaibao_card_right">
							<view>
								<view class="kuaibao_title" style="font-size: 30rpx;">
									<text v-if="item.istop == 1" style="color: red; vertical-align: middle; border: 1rpx solid red; border-radius: 6rpx; font-size: 20rpx;padding: 0 6rpx; margin-right: 10rpx;">置顶</text>
									{{ item.title }}
								</view>
								<view class="kuaibao_brief">{{ item.brief }}</view>
								<view>
									<u-icon v-for="(it,i) in Number(item.star_nums)" name="star-fill" color="#ff9900" size="28" :key="i"></u-icon>
								</view>
							</view>
							<view class="kuaibao_time" style="font-size: 24rpx;">
								{{ item.create_date_fmt }}
							</view>
						</view>
					</view>
				</view>
			</view>
			<u-gap height="14" bg-color="#f3f3f3"></u-gap>
			<view class="card" style="padding-top: 25rpx;">
				<u-section :title="ytitle" :right="right" :font-size='32' :bold="bold" :color="color" :show-line="false" @click="detail(2)"></u-section>
				<view class="yujian-container" v-if="thread_list.length > 0">
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
							<view @click="yujianclickCard(item.tid)" class="uni-card__content uni-card__content--pd">
								<view>
									<view class="content-box">
										<text class="content-box-text">{{ item.message }}</text>
									</view>
									<u-row style="text-align: center;" v-if="item.img_arr.length > 0">
										<u-col span="4" text-align="center" v-for="(it, i) in item.img_arr" :key="i"><image class="image" mode="aspectFill" :src="it.url" /></u-col>
									</u-row>
								</view>
							</view>
							<view class="uni-card__footer">
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
						<u-gap height="1" bg-color="#d7d7e0" v-show="index < thread_list.length - 1"></u-gap>
					</view>
				</view>
			</view>
			<u-gap height="14" bg-color="#f3f3f3"></u-gap>
			<view class="card" style="padding-top: 25rpx;">
				<u-section :title="btitle" :right="right" :font-size='32' :bold="bold" :color="color" :show-line="false" @click="detail(3)"></u-section>
				<view class="yujian-container" v-if="help_list.length > 0">
					<view v-for="(item, index) in help_list" :key="index">
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
							<view @click="yujianclickCard(item.tid)" class="uni-card__content uni-card__content--pd">
								<view>
									<view class="content-box">
										<text class="content-box-text">{{ item.message }}</text>
									</view>
									<u-row style="text-align: center;" v-if="item.img_arr.length > 0">
										<u-col span="4" text-align="center" v-for="(it, i) in item.img_arr" :key="i"><image class="image" mode="aspectFill" :src="it.url" /></u-col>
									</u-row>
								</view>
							</view>
							<view class="uni-card__footer">
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
						<u-gap height="1" bg-color="#d7d7e0" v-show="index < thread_list.length - 1"></u-gap>
					</view>
				</view>
			</view>
			<u-gap height="14" bg-color="#f3f3f3"></u-gap>
			<view class="card" style="margin-top: 20rpx;">
				<u-section :title="ctitle" :right="right" :font-size='32' :bold="bold" :color="color" :show-line="false" @click="detail(4)"></u-section>
				<view class="product-list" v-if="goods_list.length > 0">
					<view v-for='(item,index) in goods_list' :key='index' class="goodcard" @click="goods_detail(item.goods_id)">
						<view>
							<image mode="aspectFill" :src="item.goods_pic"></image>
							<view class="name">{{ item.goods_name }}</view>
							<view class="info">
								<view class="price">￥{{ item.price }}<text style="text-decoration: line-through; font-size: 24rpx; color: #82848A;"> ￥{{ item.market_price }}</text></view>
							</view>
							<view class="slogan">{{ item.sales }}人付款</view>
							<view style="padding: 0 4% 10rpx; font-size: 24rpx; display: flex;">
								<view  @click.stop="toShop(item.companyid)">{{ item.company_name }} 进店></view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
			<u-gap height="14" bg-color="#f3f3f3"></u-gap>
			<view class="card" style="margin-top: 20rpx;">
				<u-section :title="htitle" :right="right" :font-size='32' :bold="bold" :color="color" :show-line="false" @click="detail(5)"></u-section>
				<view class="product-list" v-if="goods_list_haipi.length > 0">
					<view v-for='(item,index) in goods_list_haipi' :key='index' class="goodcard" @click="goods_detail(item.goods_id)">
						<view>
							<image mode="aspectFill" :src="item.goods_pic"></image>
							<view class="name">{{ item.goods_name }}</view>
							<view class="info">
								<view class="price">￥{{ item.price }}<text style="text-decoration: line-through; font-size: 24rpx; color: #82848A;"> ￥{{ item.market_price }}</text></view>
							</view>
							<view class="slogan">{{ item.sales }}人付款</view>
							<view style="padding: 0 4% 10rpx; font-size: 24rpx; display: flex;">
								<view  @click.stop="toShop(item.companyid)">{{ item.company_name }} 进店></view>
							</view>
						</view>
					</view>
					
				</view>
			</view>
			<!-- <u-gap height="14" bg-color="#f3f3f3"></u-gap>
			<view class="card" style="margin-top: 20rpx;">
				<u-section :title="bttitle" :right="right" :font-size='32' :bold="bold" :color="color" :show-line="false" @click="detail(3)"></u-section>
				<view class="fixed-container jianzhi" v-if="parttime_job.length > 0">
					<view v-for="(item,index) in parttime_job" :key="index" @click="clickToDetail(item.ptjid)" class="re-card bg-white flex-column align-center radius-xs">
						<view class="card-top flex-row">
							<view class="job-name">
								<text class="text-sm">{{item.title}}</text>
							</view>
							<view class="job-salary text-bold text-red text-right">
								<text style="font-size: 32rpx;">{{item.money_unit_fmt}}</text>
							</view>
						</view>
						
						<view class="place margin-top-xs text-gray text-xs">
							<text class="fa fa-map-marker"></text>
							<text class="margin-left-sm">{{item.address}}</text>
						</view>
						<view class="user-info flex-row align-center">
							<image :src="item.company_logo" class="avatar-xs"></image>
							<text class="text-xs margin-left-sm text-gray">{{ item.company_name}}</text>
							<text>{{ item.create_date_fmt }}</text>
						</view>
						
					</view>
					
					
				</view>
			</view> -->
			
			<view v-if="maxpage > 1">
				<u-loadmore :status="status"/>
			</view>
		</view>
		
		
		<u-modal v-model="cert_show" :show-title="false" @confirm="toSetUserInformation" confirm-color="#ff9900">
			<view class="slot-content">
				<view style="padding: 30rpx 30rpx;">
					<view style="text-align: center; font-size: 38rpx; font-weight: bold;">请完善个人信息</view>
					<view style="padding: 10rpx 0;">1.完善信息，发布商品可得更快审核速度</view>
					<view>2.获得更多推荐机会</view>
				</view>
				
			</view>
		</u-modal>
		<u-modal v-model="user_show" show-cancel-button="true" confirm-color="#ff9900" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？" @confirm="confirm"></u-modal>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	export default {
		data() {
			return {
				user_show:false, // 是否填写了资料
				noticenums:0,
				cert_show:false,

				location:'选择位置',
				banner_title: true,
				mode: 'round',
				indicatorPos: 'bottomCenter',
				effect3d: true,
				noticeList: [],
				nav_conf: [
					{
						"img": "/static/class/kuaibao.png",
						"text": "校园快报",
						"ptype": 1
					},
					{
						"img": "/static/class/yujian.png",
						"text": "Ai遇见",
						"ptype": 2
					},
					{
						"img": "/static/class/zhuanqian.png",
						"text": "Ai帮助",
						"ptype": 3
					},
					{
						"img": "/static/class/xiaopu.png",
						"text": "Ai小铺",
						"ptype": 4
					},
					{
						"img": "/static/class/hipi.png",
						"text": "Ai嗨皮",
						"ptype": 5
					}

				],
				article_list:[],
				thread_list:[],
				help_list:[],
				goods_list:[],
				goods_list_haipi:[],
				parttime_job:[],
				
				ctitle: '推荐商品',
				ytitle: 'Ai遇见',
				btitle: 'Ai帮忙',
				ttitle: '热门快报',
				htitle: 'Ai嗨皮',
				
				bold: false,
				right: true,
				color: this.$u.color['mainColor'],
				

				status: 'nomore',
				avatars:[],
				page:1,
				maxpage:0,
				
				address:''
			
			}
		},

		computed: {
			send_show: {
				get() {
					return this.$store.state.send_show
				},
				set(v) {
					// 使用vuex中的mutations中定义好的方法来改变
					this.$store.commit('send_show', v)
				}
			},
			...mapGetters('config',[
				'config',
				'swiperList'
			]),
			...mapGetters('user',[
				'userInfo'
			])
		},
		onShow() {
			let _this = this;
			this.$store.dispatch('ai_pm/getNewnotice').then((res) => {
				if(res.code == 0) {
					_this.noticenums = Number(res.message.newpms) + Number(res.message.system_pms);
					uni.showTabBarRedDot({
						index: 3,
					})
				} else {
					_this.noticenums = 0;
					uni.hideTabBarRedDot({
						index: 3,
					})
				}
			});
			uni.getStorage({
				key: 'getLocation_key',
				success: function (res) {
					
					_this.address = res.data;
					
					_this.init_hot_list(function(){});
				},
				fail() {
					
					_this.$refs.uToast.show({
						title: "请先选择所在位置",
						type: 'error',
						url:'pages/sub/location/location'
						
					})
				}
			});
		},
		onReady() {
			this.noticeList = this.config.notice_rand_text || [];
			// this.swiperList = this.config.banner_list || [];
			console.log(this.config)
			// this.swiperList = this.config.swiperList;
		},
		onLoad(e) {
			
			uni.setNavigationBarColor({
			    frontColor: '#ffffff',
			    backgroundColor: '#ff9900',
			    animation: {
			        duration: 200,
			        timingFunc: 'easeIn'
			    }
			})
			
			let _this = this;
			this.$store.dispatch('login/checkLogin').then((res) => {
				if(res && res.code != 0 ) {
					_this.$refs.uToast.show({
						title: "登录失败",
					})
				} else {
					let userInfo = uni.getStorageSync('userInfo');
					_this.user();
				}
			});
			
			
			
			
			// 获取位置变化
			uni.getStorage({
			    key: 'getLocationCity_key',
			    success: function (res) {
					console.log(1);
					_this.location = res.data;
			    }
			});
			// 监听位置变化
			uni.$on('getLocation',(e)=>{
				console.log(2);
				_this.location = e.location_name;
			})
			
		},
		
		onUnload() {
			uni.$off('getLocation');
		},
		onPullDownRefresh(){
			this.init_hot_list(function(){
				uni.stopPullDownRefresh();
			});
		},
		onReachBottom(){
			let _this = this;
			this.status = 'loading';
			
			if(this.maxpage > 1 && _this.page <= _this.maxpage) {
				this.getPositionList({'page':_this.pag},function(){
					_this.status = 'loadmore';
				});
			} else {
				_this.status = 'nomore';
			}
			
		},
		methods: {
			...mapMutations(['user/setUserInfo']),
			user(){
				let _this = this;
				this.$store.dispatch('user/getRead').then((res) => {
					if(res.code == 0 ) {
						_this['user/setUserInfo'](res.message);
						let is_cert = res.message.is_cert;
						_this.improve_data(is_cert);
					}
				});
			},
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
			toSetUserInformation(){
				uni.navigateTo({
					url: '/pages/center/userinfo_add'
				})
			},
			get_location(){
				uni.navigateTo({
					url: '/pages/sub/location/location'
				})
			},

			init_hot_list(callback){
				let _this = this;
				let data_arr = {};
				let arr = _this.address.split('-');
				data_arr.province = arr[0];
				data_arr.city = arr[1];
				
				this.$store.dispatch('home/getHomeList',data_arr).then((res) => {
					if(res.code == 0) {
						// _this.nav_conf = res.message.nav_conf;
						_this.article_list = res.message.article_list;
						_this.thread_list = res.message.thread_list;
						_this.help_list = res.message.help_list || [];
						_this.goods_list = res.message.goods_list;
						_this.goods_list_haipi = res.message.goods_list_haipi || [];
						_this.parttime_job = res.message.parttime_job;
						
						
						callback();
					}
					
				});
			},
			getPositionList(data,callback=()=>{}){
				let _this = this;
				_this.$store.dispatch('job/getPositionList',data).then((res) => {
					if(res.code == 0) {
						_this.position_list = _this.position_list.concat(res.message.position_list);
			
						_this.maxpage = res.message.maxpage;
						if(_this.maxpage > 1 && _this.page <= _this.maxpage){
							_this.page++;
						}
						callback();
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			swiperclick: function(index){
				if(this.swiperList[index]['url']) {
					uni.navigateTo({
					    url: this.swiperList[index]['url']
					});
					
				}
				
			},
			news(){
				uni.navigateTo({
				    url: '/pages/sub/ai_news/index'
				});
			},
			tab_nav: function(index){
				if(index == 1) {
					uni.navigateTo({
					    url: '/pages/sub/ai_kuaibao/index'
					});
					
				} else if(index == 2) {
					uni.switchTab({
					    url: '/pages/ai_yujian/index'
					});
				} else if(index == 3) {
					uni.navigateTo({
					    url: '/pages/sub/ai_bangzhu/index'
					});
				} else if(index == 4) {
					uni.navigateTo({
					    url: '/pages/sub/ai_xiaopu/index'
					});
				} else if(index == 5) {
					uni.switchTab({
					    url: '/pages/ai_haipi/index'
					});
				}
			},
			detail: function(index) {
				if(index == 1) {
					uni.navigateTo({
					    url: '/pages/sub/ai_kuaibao/index'
					});
				} else if(index == 2) {
					uni.switchTab({
					    url: '/pages/ai_yujian/index'
					});
				} else if(index == 3) {
					uni.navigateTo({
					    url: '/pages/sub/ai_bangzhu/index'
					});
				} else if(index == 4) {
					uni.navigateTo({
					    url: '/pages/sub/ai_xiaopu/index'
					});
				} else if(index == 5) {
					uni.switchTab({
					    url: '/pages/ai_haipi/index'
					});
				}
				
			},

			clickToDetail:function(ptjid) {
				uni.navigateTo({
					url: '/pages/sub/ai_zhuanqian/detail?ptjid='+ptjid
				})
			},
			kuaibao_detail(articleid){
				uni.navigateTo({
				    url: '/pages/sub/ai_kuaibao/kuaibao_comment?articleid='+articleid
				});
			},
			goods_detail(goods_id){
				uni.navigateTo({
				    url: '/pages/sub/ai_xiaopu/goods_detail?goods_id='+goods_id
				});
			},
			toShop(id) {
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/shop_index?companyid='+id
				});
			},
			// 遇见
			user_detail(uid){
				uni.navigateTo({
					url: '/pages/sub/ai_user/index?uid='+uid
				});
			},
			yujianclickCard(tid) {
				uni.navigateTo({
					url: '/pages/sub/ai_yujian/yujian_comment?tid='+tid
				});
			},
			footerClick(types,tid) {
				if (types == 'comment') {
					if(!this.improve_data(this.userInfo.is_cert)) {
						return false;
					}
					
					uni.navigateTo({
						url: '/pages/sub/ai_yujian/yujian_comment?tid='+tid
					});
				}
			},
			like(tid, index) {
				if(!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
				
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
				if(!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
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
	}
</script>
<style>
	.text-red {
		color: red;
	}
</style>
<style lang="scss">
	.mb-50 {
		margin-bottom: 50rpx;
	}
	.px-20 {
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.pb-10 {
		padding-bottom: 10rpx;
	}
	.pt-2 {
		padding-top: 20rpx;
	}
	.py-2 {
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}
	.content_box {
		padding: 0 20rpx 25rpx;
	}

	
	
	.tag {
		font-size: 22rpx;
		border-radius: 20rpx;
		padding: 0 10rpx;
		color: $u-theme-color;
		background-color: rgba(249,134,24,0.2);
	}
	.tag1 {
		background-color: #53370c;
	}
	.job_tag {
		font-size: 22rpx;
		padding: 0 16rpx;
		margin-right: 10rpx;
		color: $u-theme-color;
		border: 1rpx solid $u-theme-color;
	}
	.time {
		font-size: 22rpx;
		color: #8d8d8d;
	}
	.item-menu-image {
		width: 100rpx;
		height: 100rpx;
	}
	.grid-text {
		padding-top: 10rpx;
		font-size: 24rpx;
	}
	.card {
		padding-top: 10rpx;
		padding-bottom: 30rpx;
	}
	.card_item {
		padding-top: 20rpx;
	}
	
	.fixed-container {
		padding-top: 30upx;
	}

	.yujian-container {
		.image {
			width: 210rpx;
			height: 210rpx;
		}
		.uni-card {
			margin: 0;
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
	}


	
	.kuaibao_card {
		display: flex; box-shadow: 0 0 8rpx 1rpx #EEEEEE;border-radius: 10rpx; padding: 10rpx; margin-bottom: 20rpx;
		.card_image {
			border-radius: 6rpx;
		}
		
		.image {
			width: 280rpx;
			height: 210rpx;
		}
	}
	.kuaibao_card_right {
		flex: 1;padding-left: 20rpx;display:flex;flex-flow: column;justify-content: space-between;
	}
	.kuaibao_brief {
		padding-top: 6rpx;
		font-size: 24rpx;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical; 
		color: #AAAAAA;
	}
	.kuaibao_time {
		color: #AAAAAA;
	}
	.product-list {
			
			padding: 24rpx 24rpx 3vw 24rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			.goodcard {
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
					// text-align: right;
					color: #807c87;
					font-size: 24upx;
				}
			}
	}
	.jianzhi {
		.re-card {
			box-shadow: 0 0 6px 1px #EEEEEE;
				width: 94vw;
				/* min-height: 310rpx; */
				max-height: 370rpx;
				margin-top: 20rpx;
				padding: 10rpx;
			}
			
			.card-top {
				width: 96%;
				height: 80rpx;
				line-height: 80rpx;
			}
			
			.card-top .job-name {
				width: 75%;
			}
			
			.card-top .job-salary {
				width: 25%;
			}
			
			.tag-list {
				width: 96%;
				height: 60rpx;
				flex-wrap: nowrap;
				overflow: hidden;
			}
			
			.tag-list .tag-item {
				height: 40rpx;
				line-height: 40rpx;
				padding: 0 10rpx;
				font-size: 12px;
				border-radius: 5rpx;
				color: #606266;
				margin-left: 10rpx;
				margin-top: 10rpx;
				white-space: nowrap;
			}
			
			.tag-list .tag-item:first-of-type {
				margin-left: 0;
			}
			
			.place {
				width: 96%;
				font-size: 26rpx;
		/* 		height: 60rpx;
				line-height: 60rpx; */
			}
			
			.user-info {
				width: 96%;
				height: 90rpx;
				position: relative;
			}
			
			.user-info text:last-of-type {
				position: absolute;
				right: 0;
				font-size: 13px;
				color: #606266;
			}
			
			.offer-date {
				width: 96%;
				height: 60rpx;
				line-height: 60rpx;
				border-top: 1px solid #f1f1f1;
				font-size: 13px;
			}
	}
</style>
