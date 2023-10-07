<template>
	<view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30" v-if="!isAuthorized">
			<view class="u-m-r-10">
				<u-avatar :src="pic" size="140"></u-avatar>
			</view>
			<view class="u-flex-1">
				<view class="u-font-18 u-p-b-20 text-white">未授权昵称</view>
				<view class="u-font-14 u-tips-color"></view>
			</view>
			<view class="u-m-l-10 u-p-10">
				<button v-if="!isAuthorized" open-type="getUserInfo" @getuserinfo="wxlogin" class="authBtn">
					同步微信信息
				</button>
			</view>
		</view>
		<view class="u-flex user-box u-p-l-30 u-p-r-20 u-p-b-30 u-p-t-30" v-if="isAuthorized">
			<view class="u-m-r-20">
				<u-avatar :src="userInfo.avatar_url_fmt" size="140" @tap="userinfo()"></u-avatar>
				<!-- ffbe00  e9e9d8  ba6e40 -->
			</view>
			<view class="u-flex-1 text-white">
				<view class="u-font-18 u-p-b-10 text-white">
					{{ userInfo.nick_name }}
					<u-icon size="30" :name="userInfo.sex == 1 ? 'man' : userInfo.sex == 2 ? 'woman' : ''" :color="
              userInfo.sex == 1 ? '#56b4ff' : userInfo.sex == 2 ? '#e599e5' : ''
            "></u-icon>
				</view>
				<view class="d-row d-jc-between">
					<text>uid:{{ userInfo.uid }}</text>
					<text v-if="userInfo.gid == 6 || userInfo.gid == 4" @click="copy">点击复制:{{userInfo.code}}</text>
				</view>
			</view>
			<view class="u-m-l-10 u-p-10" style="text-align: center"> </view>
		</view>
		<view class="content_box">
			<view class="u-m-t-20 d-flex bg-white card" v-if="userInfo.gid && (userInfo.gid == 0 || userInfo.gid == 2)">
				<view>
					<image src="../../static/icon/qiye.png" mode="" style="width: 80rpx; height: 80rpx"></image>
				</view>
				<view class="flex d-flex" style="padding-left: 30rpx; align-items: center">
					<view class="flex">
						<view>商家入驻</view>
						<view class="text-muted" style="font-size: 24rpx">享兼职、商品等发布权限</view>
					</view>
					<view>
						<text v-if="company_status == 0" class="join_btn" @click="settled">现在入驻</text>
						<text v-if="company_status == 1" class="join_btn" @click="settled2">待审核</text>
						<text v-if="company_status == 2" class="join_btn">已认证</text>
					</view>
				</view>
			</view>
			<!--  v-if="userInfo.gid && userInfo.gid == 2" -->
			<view class="u-m-t-20 bg-white card" v-if="userInfo.gid && userInfo.gid == 2">
				<view style="
            padding: 0 0 30rpx;
            border-bottom: 1rpx solid #f3f3f3;
            font-weight: bold;
          ">商家服务</view>
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<view class="item-menu-image" @click="company('company')">
							<u-icon name="qiye" custom-prefix="custom-icon" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">我的店铺</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="mywallet()">
							<u-icon name="xufei" custom-prefix="custom-icon" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">商家钱包</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image dot-box" @click="toUserComment()">
							<u-icon name="chat-fill" size="60" color="#ff9900" style="vertical-align: middle"></u-icon>
							<view v-if="userInfo.system_pms - 0 > 0" class="dot"></view>
						</view>
						<view class="grid-text">评价管理</view>
					</u-grid-item>
				</u-grid>
			</view>

			<view class="u-m-t-20 bg-white card" v-if="userInfo.gid && userInfo.gid == 20">
				<view style="
            padding: 0 0 30rpx;
            border-bottom: 1rpx solid #f3f3f3;
            font-weight: bold;
          ">分部管理</view>
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<view class="item-menu-image" @click="areaAd('shop')">
							<u-icon name="qiye" custom-prefix="custom-icon" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">店铺管理</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="areaAd('banner')"
							style="display: flex; justify-content: center">
							<u-icon name="setting-fill" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">设置</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="u-m-t-20 bg-white card" v-if="userInfo.gid && (userInfo.gid == 4 || userInfo.gid == 6)">
				<view style="
            padding: 0 0 30rpx;
            border-bottom: 1rpx solid #f3f3f3;
            font-weight: bold;
          ">跑腿服务</view>
				<view>
					<view class="chart-con gap">
						<view class="chart-wrap">
							<view class="line-chart-con">
								<!-- <l-echart class="line-chart" ref="lineChart"></l-echart> -->
							</view>
						</view>
					</view>
				</view>
				<u-grid :col="4" :border="false">
					<u-grid-item v-if="userInfo.gid && userInfo.gid == 6">
						<view class="item-menu-image" @click="receivingOrders()"
							style="display: flex; justify-content: center">
							<u-icon name="list-dot" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">接单池</view>
					</u-grid-item>

					<u-grid-item v-if="userInfo.gid && userInfo.gid == 4">
						<view class="item-menu-image" @click="deliveryOrders()"
							style="display: flex; justify-content: center">
							<u-icon name="car" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">配送中</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="revenue()">
							<u-icon name="xufei" custom-prefix="custom-icon" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">收益明细</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="settlement()"
							style="display: flex; justify-content: center">
							<u-icon name="order" size="60" color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">结算清单</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="u-m-t-20 bg-white card">
				<view style="
            padding: 0 0 30rpx;
            border-bottom: 1rpx solid #f3f3f3;
            font-weight: bold;
          ">我的服务</view>
				<u-grid :col="4" :border="false">
					<u-grid-item>
						<view class="item-menu-image" @click="my_comment()">
							<u-icon name="chat-fill" size="60" color="#ff9900" style="vertical-align: middle"></u-icon>
						</view>
						<view class="grid-text">我的评论</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="my_address()">
							<u-icon name="woshenqingdeicon" custom-prefix="custom-icon" size="60"
								color="#ff9900"></u-icon>
						</view>
						<view class="grid-text">我的地址</view>
					</u-grid-item>
					<u-grid-item>
						<view class="item-menu-image" @click="my_coupon()">
							<u-icon name="coupon" size="60" color="#ff9900" style="vertical-align: middle"></u-icon>
						</view>
						<view class="grid-text">我的优惠券</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="u-m-t-20 bg-white card" style="padding-bottom: 0">
				<view style="
            padding: 0 0 30rpx;
            border-bottom: 1rpx solid #f3f3f3;
            font-weight: bold;
          ">其他服务</view>
				<u-grid :col="4" :border="false">
					<u-grid-item @click="attestation()">
						<view>
							<u-icon name="fingerprint" size="60"></u-icon>
						</view>
						<view class="grid-text">个人资料</view>
					</u-grid-item>
					<u-grid-item style="position: relative">
						<view>
							<u-icon name="kefu-ermai" size="60"></u-icon>
						</view>
						<view class="grid-text">联系我们</view>
						<button class="call_us_btn" open-type="contact">联系我们</button>
					</u-grid-item>
					<u-grid-item v-if="userInfo.gid && userInfo.gid != 20" @click="areaApply()">
						<view>
							<u-icon name="grid" size="60"></u-icon>
						</view>
						<view class="grid-text">申请分部管理</view>
					</u-grid-item>
					<u-grid-item v-if="userInfo.gid && userInfo.gid != 4 && userInfo.gid != 6" @click="runnerApply()">
						<view>
							<u-icon name="grid" size="60"></u-icon>
						</view>
						<view class="grid-text">申请跑腿员</view>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="u-m-t-20 bg-white card" style="padding-bottom: 0">
				<view style="
						  padding: 0 0 30rpx;
						  border-bottom: 1rpx solid #f3f3f3;
						  font-weight: bold;
						">关于迈校圈</view>
				<u-grid :col="4" :border="false">
					<u-grid-item @click="toZizhi()">
						<view>
							<u-icon name="fingerprint" size="60"></u-icon>
						</view>
						<view class="grid-text">平台资质</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>

		<u-top-tips ref="uTips"></u-top-tips>
		<u-toast ref="uToast" />
		<u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？"
			@confirm="confirm" confirm-color="#ff9900"></u-modal>

		<wx-user-info-modal v-model="showAuthorizationModal" @updated="updatedUserInfoEvent"></wx-user-info-modal>
	</view>
</template>

<script>
	// import * as echarts from '@/uni_modules/lime-echart/static/echarts.min.js';
	import WxUserInfoModal from "@/uni_modules/tuniaoui-wx-user-info/components/tuniaoui-wx-user-info/tuniaoui-wx-user-info.vue";
	import {
		mapState,
		mapMutations,
		mapGetters
	} from "vuex";

	import {
		domain
	} from "../../tools/utils.js";
	export default {
		components: {
			WxUserInfoModal
		},
		data() {
			return {
				showAuthorizationModal: false,

				user_show: false, // 是否填写了资料

				noticenums: 0,
				uid: 0,
				company_status: 9,
				pic: "../../../static/default_avatar.png",
				show: true,
				cert: "#aaa",
				member: "",
				member_color: "",
				member_color1: "",
				runner_curve_count: [],
				runner_curve_date: [],
			};
		},
		computed: {
			...mapGetters("user", ["isAuthorized", "userInfo"]),
			...mapState({
				tabbar: (state) => state.tabbar,
				inactiveColor: (state) => state.inactiveColor,
				activeColor: (state) => state.activeColor,
			}),
			...mapGetters("config", ["config"]),
		},
		onShow() {
			let _this = this;
			this.user();
		},
		onLoad(e) {
			var self = this;

			uni.setNavigationBarColor({
				frontColor: "#ffffff",
				backgroundColor: "#ff9900",
				animation: {
					duration: 200,
					timingFunc: "easeIn",
				},
			});
			let _this = this;
			this.$store.dispatch("login/checkLogin").then((res) => {
				if (res && res.code != 0) {
					_this.$refs.uToast.show({
						title: "未登录",
					});
				}
			});
		},
		onReady() {
			let _this = this;
			setTimeout(() => {
				if (!this.isAuthorized) {
					_this.openAuthorizationModal();
				}
			}, 2000);
		},
		onTabItemTap: function(e) {
			let _this = this;
			if (this.userInfo.gid == 1) {
				uni.requestSubscribeMessage({
					tmplIds: [_this.config.new_company_apply],
					success(res) {},
				});
			}
		},
		methods: {
			// 去资质页面
			toZizhi() {
				uni.navigateTo({
					url: "/pages/sub/zizhi/zizhi"
				})
			},
			// 复制跑腿code
			copy() {
				uni.setClipboardData({
					data: this.userInfo.code,
					success: () => {
						uni.showToast({
							title: '复制成功'
						})
					}
				})
			},
			// 去用户评论页面
			toUserComment() {
				uni.navigateTo({
					url: `/pages/sub/center/usercomment/usercomment?companyid=${this.userInfo.companyid}`,
				});
			},
			...mapMutations(["user/setUserInfo", "user/setAuthorized"]),
			user() {
				let _this = this;
				this.$store.dispatch("user/getRead").then((res) => {
					if (res.code == 0) {
						_this.company_status = res.message.company_status;
						_this.is_cert = res.message.is_cert;
						_this.uid = res.message.uid;
						_this.runner_curve_count = res.message.runner_curve_count;
						_this.runner_curve_date = res.message.runner_curve_date;

						_this["user/setUserInfo"](res.message);
						if (_this.is_cert == 1) {
							_this.cert = "#FF7925";
						}
						if (res.message.system_pms > 0) {
							uni.showTabBarRedDot({
								index: 1,
							});
						} else {
							uni.hideTabBarRedDot({
								index: 1
							})
						}
						if (res.message.gid == 4 || res.message.gid == 6) {
							//加载折线图数据
							// _this.loadLineData();
						}
					}
				});
			},
			wxlogin(e) {
				this.openAuthorizationModal();
			},
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
					url: "/pages/sub/center/userinfo_add",
				});
			},
			userinfo() {
				uni.navigateTo({
					url: "/pages/sub/center/userinfo",
				});
			},
			my_comment() {
				uni.navigateTo({
					url: "/pages/sub/center/my_comment",
				});
			},
			my_address() {
				uni.navigateTo({
					url: "/pages/sub/ai_xiaopu/address/index?type=0",
				});
			},
			my_coupon() {
				uni.navigateTo({
					url: "/pages/sub/center/my_coupons",
				});
			},
			mywallet() {
				uni.navigateTo({
					url: "/pages/sub/center/my_wallet",
				});
			},
			settled() {
				if (!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
				let _this = this;
				uni.navigateTo({
					url: "/pages/sub/center/company_settled",
				});
			},
			settled2() {
				this.$refs.uToast.show({
					title: "敬请期待",
				});
				return false;

				if (!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
				uni.navigateTo({
					url: "/pages/sub/center/company_settled_edit",
				});
			},
			company(index) {
				if (index == "company") {
					let _this = this;
					uni.requestSubscribeMessage({
						tmplIds: [_this.config.new_order_tmplid],
						success(res) {},
					});
					uni.navigateTo({
						url: "/pages/sub/center/my_company",
					});
				} else if (index == "send") {
					uni.navigateTo({
						url: "/pages/sub/center/send_concurrent",
					});
				} else if (index == "own") {
					uni.navigateTo({
						url: "/pages/sub/center/my_concurrent_list",
					});
					// } else if(index == "renew") {
					// 	uni.navigateTo({
					// 		url: '/pages/sub/center/my_renew'
					// 	})
				}
			},
			areaAd(index) {
				// 地区管理
				if (index == "shop") {
					let _this = this;
					uni.navigateTo({
						url: "/pages/sub/center/areaAdministrator/shopList",
					});
				} else if (index == "banner") {
					uni.navigateTo({
						url: "/pages/sub/center/areaAdministrator/banner",
					});
				} else if (index == "comment") {
					uni.navigateTo({
						url: "/pages/sub/center/my_concurrent_list",
					});
				}
			},
			// 接单池
			receivingOrders() {
				let _this = this;
				let tampid = this.config.runner_income_tmplid;
				// 获取推送权限,统一再提交接口,拒绝不执行后续提交
				uni.requestSubscribeMessage({
					tmplIds: [tampid],
					success(res) {
						if (res[tampid] == "reject") {
							// 拒绝授权
							_this.$refs.uToast.show({
								title: "为保证订单信息及时推送,请同意授权",
								type: "error",
							});
						}
					},
					complete(res) {
						uni.navigateTo({
							url: "/pages/sub/runner/index",
						});
					},
				});
			},
			scanCodeTakeFoot() {
				let _this = this;
				uni.vibrateLong({
					success: function() {
						console.log('success');
					}
				});
				// 只允许通过相机扫码
				uni.scanCode({
					scanType: ["qrCode"],
					onlyFromCamera: true,
					success: function(res) {},
					fail(err) {
						_this.$refs.uToast.show({
							title: "扫码失败,请稍后重试",
						});
					},
				});
			},
			deliveryOrders() {
				uni.navigateTo({
					url: "/pages/sub/runner/delivery",
				});
			},
			revenue() {
				uni.navigateTo({
					url: "/pages/sub/runner/revenue",
				});
			},
			// 结算清单
			settlement() {
				let _this = this;
				let tampid2 = this.config.runner_neworder_tmplid;
				// 获取推送权限,统一再提交接口,拒绝不执行后续提交
				uni.requestSubscribeMessage({
					tmplIds: [tampid2],
					success(res) {
						if (res[tampid2] == "reject") {
							// 拒绝授权
							_this.$refs.uToast.show({
								title: "为保证订单信息及时推送,请同意授权",
								type: "error",
							});
						}
					},
					complete(res) {
						uni.navigateTo({
							url: "/pages/sub/runner/settlement",
						});
					},
				});
			},
			attestation() {
				if (this.is_cert != 1) {
					uni.navigateTo({
						url: "/pages/sub/center/userinfo_add",
					});
					return false;
				}

				uni.navigateTo({
					url: "/pages/sub/center/userinfo",
				});
			},
			areaApply() {
				if (this.userInfo.gid == 6) {
					this.$refs.uToast.show({
						title: "已提交审核，请等待",
						type: "warning",
						url: "/pages/user/index",
					});
					return false;
				}
				uni.navigateTo({
					url: "/pages/sub/center/areaAdministratorApply",
				});
			},
			runnerApply() {
				if (this.userInfo.gid == 3) {
					this.$refs.uToast.show({
						title: "已提交审核，请等待",
						type: "warning",
						url: "/pages/user/index",
					});
					return false;
				}
				if (this.userInfo.nid == 0) {
					this.user_show = true;
					return;
				}
				uni.navigateTo({
					url: "/pages/sub/center/runnerApply",
				});
			},
			// 打开获取用户信息弹框
			openAuthorizationModal() {
				this.showAuthorizationModal = true;
			},

			// 获取到的用户信息
			updatedUserInfoEvent(info) {
				let userInfo = uni.getStorageSync("userInfo");
				const tempFilePaths = info.avatar;
				uni.uploadFile({
					url: domain() + "/user-upimg.htm?token=" + userInfo.token, //仅为示例，非真实的接口地址
					filePath: tempFilePaths,
					name: "file",
					formData: {
						nickName: info.nickname,
					},
					success: (uploadFileRes) => {
						this["user/setAuthorized"](true);
						this.showAuthorizationModal = false;
						this.user();
					},
				});
			},

			//加载折线图数据
			loadLineData() {
				//这里请求服务器拿到数据
				let res = {
					//x轴数据
					xData: this.runner_curve_date,
					//y轴数据
					yData: this.runner_curve_count,
				};
				//这里option配置参考文档：https://echarts.apache.org/zh/option.html
				let option = {
					height: "120px",
					xAxis: {
						type: "category",
						// x轴数据文字颜色
						axisLabel: {
							color: "#a7a7a7",
						},
						// x轴那天坐标轴线的颜色
						axisLine: {
							lineStyle: {
								color: "#f1f1f1",
							},
						},
						//x轴上面刻度线隐藏
						axisTick: {
							show: false,
						},
						//这里是x轴数据
						data: res.xData,
					},
					//设置网格
					grid: {
						top: 20,
						bottom: 30,
						right: 0,
					},
					//y轴设置
					yAxis: {
						type: "value",
						//y轴标签文字颜色
						axisLabel: {
							color: "#a7a7a7",
						},
						// y轴分割线设置为虚线
						splitLine: {
							show: true,
							lineStyle: {
								type: "dashed",
							},
						},
						splitNumber: 5,
					},
					//设置提示为点击时
					tooltip: {
						trigger: "axis",
						triggerOn: "click",
						formatter: "{b} \n 订单数: {c}",
					},
					//设置曲线的颜色
					color: ["#64ca99"],
					series: [{
						//这里是数据
						data: res.yData,
						type: "line",
						//设置为平滑，默认为折线
						smooth: true,
					}, ],
				};

				this.$refs.lineChart.init(echarts, (chart) => {
					chart.setOption(option);
				});
			},
		},
	};
</script>

<style lang="scss">
	canvas {
		height: 180px !important;
	}

	page {
		background-color: #f9f9f9;
	}

	.content_box {
		padding: 0 20rpx 25rpx;
	}

	.dot-box {
		position: relative;

		.dot {
			position: absolute;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			top: 10rpx;
			right: 10rpx;
			background: red;
		}
	}

	.call_us_btn {
		font-size: 28rpx;
		opacity: 0;
		// padding: 26rpx 32rpx;
		width: 100%;
		line-height: 65rpx;
		text-align: left;
		box-sizing: border-box;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 2;
	}

	.authBtn {
		font-size: 24rpx;
	}

	.join_btn {
		border-radius: 50rpx;
		padding: 5rpx 15rpx;
		font-size: 24rpx;
		color: #ffffff;
		background-color: #ff9900;
	}

	.item-menu-image {
		width: 100rpx;
		height: 100rpx;
		line-height: 100rpx;
		border-radius: 100%;
		background-color: #f5e3c761;
		text-align: center;
	}

	.grid-text {
		padding-top: 10rpx;
		font-size: 24rpx;
	}

	.user-box {
		background-color: #ff9900;
	}

	.d-flex {
		display: flex;
	}

	.flex {
		flex: 1;
	}

	.card {
		padding: 30rpx;
		border-radius: 10rpx;
		box-shadow: 0 0 10rpx 1rpx #f5f5f5;
	}
</style>