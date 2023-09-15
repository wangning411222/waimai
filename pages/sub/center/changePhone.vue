<template>
	<view>
		<view style="padding: 30rpx 30rpx;">
			<u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
				<u-form-item label="原手机" prop="phone">
					<u-input type="text" v-model="form.phone" clearable="false"/>
					
				</u-form-item>
				<u-form-item label="验证码" prop="verify_code">
					<view style="display: flex;width: 100%;">
						<view style="flex:1"><u-input type="text" v-model="form.verify_code" /></view>
						
						<u-verification-code :keep-running="true" ref="uCode" @change="codeChange" :startText="startText" :changeText="changeText" :endText="endText"></u-verification-code>
						<u-button style="padding: 0;" size="mini" @click="getCode">{{tips}}</u-button>
					</view>
				</u-form-item>
				<u-form-item label="新手机" prop="phone2">
					<u-input type="text" v-model="form.phone2" clearable="false"/>
					
				</u-form-item>
				<u-form-item label="验证码" prop="verify_code2">
					<view style="display: flex;width: 100%;">
						<view style="flex:1"><u-input type="text" v-model="form.verify_code2" /></view>
						
						<u-verification-code :keep-running="true" ref="uCode2" @change="codeChange2" :startText="startText2" :changeText="changeText2" :endText="endText2"></u-verification-code>
						<u-button style="padding: 0;" size="mini" @click="getCode2">{{tips2}}</u-button>
					</view>
				</u-form-item>
			</u-form>
			<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
			
		</view>
		<view style="padding: 30rpx 30rpx;">
			
			<button @tap="editinfo_save()" style="line-height: 80rpx;height: 80rpx;font-size: 30rpx;color: #ffffff;border-color: #ff9900;background-color: #ff9900;">保存</button>
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { domain } from '../../../tools/utils.js'
	export default {
		data() {
			return {
				tips: '',
				startText: '获取验证码',
				changeText: 'X秒重新获取',
				endText: '重新获取',
				
				tips2: '',
				startText2: '获取验证码',
				changeText2: 'X秒重新获取',
				endText2: '重新获取',
				
				content:[],
				phone:'',
				form: {
					phone: '',
					verify_code:'',
					phone2: '',
					verify_code2:'',
				},

				rules: {
					phone: [
						{
							required: true,
							message: '请输入原手机号',
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
					phone2: [
						{
							required: true,
							message: '请输入新手机号',
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
					verify_code2: [
						{ 
							required: true, 
							message: '请输入验证码', 
							trigger: 'blur' ,
						}
					]
				},
				errorType: ['message'],
							
			};
		},
		onLoad: function (e) {
			console.log(e.phone);
			this.form.phone = e.phone
		},
		onUnload() {
			
		},
		methods: {
			codeChange(text) {
				this.tips = text;
			},
			codeChange2(text) {
				this.tips2 = text;
			},
			editinfo_save() {

				let _this = this;
				this.$refs.uForm.validate(valid => {
					
					if (valid) {
						let form = {
							phone: _this.form.phone2,
							verify_code:_this.form.verify_code,
							verify_code_new:_this.form.verify_code2
						}
						_this.$store.dispatch('user/changePhoneNum',form).then((res) => {
							if(res.code == 0) {
								this.$u.toast('修改成功');
								setTimeout(()=>{
									uni.navigateBack();
								},1000)
							} else {
								_this.$refs.uToast.show({
									title: res.message,
								})
							}
						});
					}
				});
				
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
					
					
					this.$store.dispatch('config/sendCode',{'phone':this.form.phone,'type':1}).then((res) => {
						if(res.code == 0) {
							
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							})
						}
					});
					
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
			},
			getCode2() {
				let _this = this;
				if(_this.form.phone == '') {
					_this.$refs.uToast.show({
						title: "请填写手机号",
					})
					return false;
				}
				if(this.$refs.uCode2.canGetCode) {
					// 模拟向后端请求验证码
					uni.showLoading({
						title: '正在获取验证码'
					})
					uni.hideLoading();
					// 这里此提示会被this.start()方法中的提示覆盖
					this.$u.toast('验证码已发送');
					// 通知验证码组件内部开始倒计时
					this.$refs.uCode2.start();
					
					
					this.$store.dispatch('config/sendCode',{'phone':this.form.phone2}).then((res) => {
						if(res.code == 0) {
							
						} else {
							_this.$refs.uToast.show({
								title: res.message,
							})
						}
					});
					
				} else {
					this.$u.toast('倒计时结束后再发送');
				}
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
