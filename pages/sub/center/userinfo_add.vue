<template>
	<view>
		<view style="padding: 30rpx 30rpx;">
			<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item label="头像">
					<button class="avatarbutton" open-type="chooseAvatar" @chooseavatar="chooseAvatarEvent">

						<image v-if="!form.avatar_url" class="image" src="../../../static/default_avatar.png" mode="widthFix" style="width: 100%;"></image>
						<image v-if="form.avatar_url" class="image" :src="form.avatar_url" mode="widthFix" style="width: 100%;"></image>
					</button>
				</u-form-item>
				<u-form-item label="昵称" prop="nick_name">
					<u-input type="text" v-model="form.nick_name" :clearable="false" />
				</u-form-item>
				
				<u-form-item label="性别" prop="sexname">
					<u-input :border="border" type="select" :select-open="actionSheetShow" v-model="form.sexname" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
				</u-form-item>
				
				<!-- <u-form-item label="手机" prop="phone">
					<u-input type="text" v-model="form.phone" clearable="false"/>
				</u-form-item> -->
				<!-- <u-form-item label="验证码" prop="verify_code">
					<view style="display: flex;width: 100%;">
						<view style="flex:1"><u-input type="text" v-model="form.verify_code" /></view>
						
						<u-verification-code :keep-running="true" @end="end" @start="start" ref="uCode" @change="codeChange" :startText="startText" :changeText="changeText" :endText="endText"></u-verification-code>
						<u-button style="padding: 0;" size="mini" @click="getCode">{{tips}}</u-button>
					</view>
				</u-form-item> -->
				<u-form-item label="手机" prop="phone">
					<view style="display: flex;width: 100%;">
						<view style="flex:1"><u-input type="text" v-model="form.phone" placeholder="实名后可发帖和获取对方联系方式" disabled/></view>
						
						<u-button style="padding: 0;" size="mini" open-type="getPhoneNumber" @getphonenumber="getphonenumber">获取手机号</u-button>
					</view>
				</u-form-item>
				<!-- <view  style="color: #bbb; padding: 10rpx 0 20rpx;">
					注：仅实名用户可以发帖和获取对方联系方式
				</view> -->
				<u-form-item label="学校" prop="school">
					<u-input v-model="form.school" @click="choose_school" disabled/>
					
				</u-form-item>
				<!-- <u-form-item label="入学年份" prop="real_name">
					<u-input type="text" v-model="form.real_name" :clearable="false" />
				</u-form-item> -->
				<u-form-item v-if="config.isshow == 1" label="心动式">
					<u-input type="text" v-model="form.wechat" :clearable="false" placeholder="QQ或微信(选填,仅用于发帖交友)"/>
				</u-form-item>
				<u-form-item v-if="config.isshow == 1" label="公开">
					<u-switch v-model="form.ispublic" style="vertical-align: middle;"></u-switch> 
					<text style="vertical-align: middle; color: #aaa;">是否公开心动式</text>
				</u-form-item>
			</u-form>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			<view style="text-align: center;padding: 30rpx;">
				<checkbox-group @change="checkboxChange" style="display: inline-block;">
					<checkbox value="1" checked="true"/>
				</checkbox-group>同意<text @tap="gotoxieyi">《用户服务协议》以及《隐私政策》</text>
			</view>
		</view>
		<view style="padding: 30rpx 30rpx;">
			
			<button @tap="editinfo_save()" style="line-height: 80rpx;height: 80rpx;font-size: 30rpx;color: #ffffff;border-color: #ff9900;background-color: #ff9900;">保存</button>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState,mapMutations,mapGetters } from 'vuex'
	import { domain } from '../../../tools/utils.js'
	export default {
		data() {
			return {
				tips: '',
				startText: '获取验证码',
				changeText: 'X秒重新获取',
				endText: '重新获取',
				
				content:[],
				phone:'',
				form: {
					avatar_url:'',
					nick_name:'',
					real_name:'',
					phone: '',
					sexname:'',
					sex: 0,
					school:'',
					nid:0,
					verify_code:'',
					wechat:'',
					ispublic: true
				},
				actionSheetList: [
					{
						text: '男',
						val: 1
					},
					{
						text: '女',
						val: 2
					},
					{
						text: '保密',
						val: 0
					}
				],
				pickerShow: false,
				actionSheetShow: false,
				rules: {
					nick_name: [
						{ 
							required: true, 
							message: '请输入昵称', 
							trigger: 'blur' ,
						}
					],
					real_name: [
						{ 
							required: true, 
							message: '请输入相关内容', 
							trigger: 'blur' ,
						}
					],
					
					sexname: [
						{
							required: true,
							message: '请选择性别',
							trigger: 'change'
						},
					],
					phone: [
						{
							required: true,
							message: '请获取手机号',
							trigger: ['change','blur'],
						},
						{
							validator: (rule, value, callback) => {
								// 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
								return this.$u.test.mobile(value);
							},
							message: '手机号码不正确',
							// 触发器可以同时用blur和change，二者之间用英文逗号隔开
							trigger: ['change','blur'],
						}
					],
					verify_code: [
						{ 
							required: true, 
							message: '请输入验证码', 
							trigger: 'blur' ,
						}
					],
					school: [
						{ 
							required: true, 
							message: '请选择学校', 
							trigger: 'blur' ,
						}
					],

				},
				errorType: ['message'],
				checkboxValue1: ['1']
			};
		},
		computed: {
			...mapGetters('config', [
				'config'
			])
		},
		onLoad: function (e) {
			// 获取位置变化
			// uni.getStorage({
			//     key: 'getSchoolLocation',
			//     success(res) {
			// 		this.SchoolLocation = res.data;
			// 		this.location = res.data.schoolname;
			//     }
			// });
			
			uni.$on('getSchool',(e)=>{
				this.form.nid = e.nid;
				this.form.school = e.school;
			})

			this.getRead();
		},
		onUnload() {
			uni.$off('getSchool');
		},
		methods: {
			checkboxChange(e) {
				console.log(e.detail.value);
				this.checkboxValue1 = e.detail.value;
			},
			gotoxieyi(){
				uni.navigateTo({
					url: '/pages/sub/xieyi/xieyi'
				})
			},
			choose_school(){

				uni.navigateTo({
					url: '/pages/sub/location/school_location'
				})
			},

			getRead() {
				let _this = this;
				this.$store.dispatch('user/getRead',{}).then((res) => {

					if(res.code == 0) {
						_this.form.avatar_url = res.message.avatar_url_fmt;
						_this.form.nick_name = res.message.nick_name;
						
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			chooseAvatarEvent(e) {
				let userInfo = uni.getStorageSync('userInfo');
				const tempFilePaths = e.detail.avatarUrl;
				uni.uploadFile({
					url: domain()+'/user-upimg.htm?token='+userInfo.token, //仅为示例，非真实的接口地址
					filePath: tempFilePaths,
					name: 'file',
					success: (uploadFileRes) => {
						
						let avatar_url_fmt = JSON.parse(uploadFileRes.data);

						if(avatar_url_fmt.code == 0) {
							console.log(avatar_url_fmt.message.url)
							this.$set(this.form,'avatar_url',avatar_url_fmt.message.url);

						}
						
					}
				});
			},
			editinfo_save() {
				console.log(123123)
				let _this = this;
				if(this.checkboxValue1.length == 0) {
					uni.showToast({
						title:'请先查阅相关协议',
						icon:'error'
					})
					return
				}
				this.$refs.uForm.validate(valid => {
					console.log(valid)
					if (valid) {
						_this.$store.dispatch('config/postUserUpdate',_this.form).then((res) => {
							if(res.code == 0) {
								_this.getRead();
								uni.navigateBack();
							} else {
								_this.$refs.uToast.show({
									title: res.message,
								})
							}
						});
					}
				});
				
			},
			// 点击actionSheet回调
			actionSheetCallback(index) {
				uni.hideKeyboard();
				this.form.sex = this.actionSheetList[index].val;
				this.form.sexname = this.actionSheetList[index].text;
			},
			
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				let _this = this;
				if(_this.form.phone == '') {
					_this.$refs.uToast.show({
						title: "请填写手机号",
					})
					return false;
				}
				if(this.$refs.uCode.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode.start();
					
					
					this.$store.dispatch('config/sendCode',{'phone':this.form.phone}).then((res) => {
						if(res.code == 0) {
							
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							})
						}
					});
					// setTimeout(() => {
					// 	uni.hideLoading();
					// 	// 这里此提示会被this.start()方法中的提示覆盖
					// 	this.$u.toast('验证码已发送');
					// 	// 通知验证码组件内部开始倒计时
					// 	this.$refs.uCode.start();
					// }, 2000);
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			end() {
				// this.$u.toast('倒计时结束');
			},
			start() {
				// this.$u.toast('倒计时开始');
			},
			
			getphonenumber(e){
				let _this = this;
				console.log(e.detail.code)
				this.$store.dispatch('user/getPhoneNum',{'code':e.detail.code}).then((res) => {
					if(res.code == 0) {
						_this.form.phone = res.message
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
				
			},
			change(status) {
				console.log(status);
			},
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	}
</script>

<style>
	u-input {
		flex: 1;
	}
	.u-form-item--right__content__slot {
		display: flex;
	}
	.avatarbutton {
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		background-color: transparent;
		padding: 0;
		margin: 0;
		font-size: inherit;
		line-height: inherit;
		border: none;
	}
	.card {
		padding: 20rpx;
	}

	.right-img {
		/* height: 150rpx; */
		padding-left: 20rpx;
		/* overflow: hidden; */
	}
	.text-muted {
		font-size: 12px;
		color: #82848A;
	}
	.u-cell {
	    position: relative;
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    width: 100%;
	    padding: 26rpx 32rpx;
	    font-size: 28rpx;
	    line-height: 54rpx;
	    color: #606266;
	    background-color: #fff;
	    text-align: left;
	}
	.u-cell_title {
	    font-size: 28rpx;
	}
	.u-cell__title , .u-cell__value {
	    -webkit-box-flex: 1;
	    -webkit-flex: 1;
	    flex: 1;
	}
	.u-cell__value {
	    overflow: hidden;
	    text-align: right;
	    vertical-align: middle;
	    color: #909399;
	    font-size: 26rpx;
	}
</style>
