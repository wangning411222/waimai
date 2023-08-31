<template>
	<view>
		<view>
			<camera mode="scanCode" device-position="back" @scancode="scancode" @error="error" style="width: 100%; height:100vh;"></camera>
		</view>
		
		<u-toast ref="uToast" />
		<u-popup v-model="popupshow" width="600" mode="center" border-radius="8" closeable="true" :mask-close-able="false" close-icon-size="40">
			<view style="text-align: center; padding: 2rem 0 2rem;font-size: 35rpx;">
				<view style="font-weight: bold; margin-bottom: 1rem;">{{status}}</view>
				<view style="color: #18b566;margin-bottom: 1rem;">{{ticket}}</view>
				<view>签到码：<text style="color: #eb0000;">{{choujiangma}}</text></view>
			</view>
		</u-popup>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				popupshow:false,
				codestate:false,

				ut:'',
				
				qrcode_token:''
			}
		},
		onLoad:function(option){

		},
		methods: {
			scancode(e) {
				console.log(e.target)
				if(this.ut == '') {
					this.ut = e.target.result;
					this.codestate = false;
					// 震动
					uni.vibrateLong({
					    success: function () {
					        console.log('success');
					    }
					});

					this.userScan(this.ut)
				} else {
					let n = e.target.result;
					if(n !== this.ut && this.codestate) {

						this.ut = n;
						
						this.codestate = false;
						// 震动
						uni.vibrateLong({
						    success: function () {
						        console.log('success');
						    }
						});
						
						this.userScan(this.ut)
					}
				}
			},

			
			userScan(result){
				console.log(result)
				let _this = this;
				uni.showLoading({
					title: '加载中...'
				});
				
				_this.$store.dispatch('runner/runnerScanode',{'qrcode_token':result}).then((res) => {

					uni.hideLoading();
					if(res.code == 0) {
						_this.$refs.uToast.show({
							title: res.message,
						})
						
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					setTimeout(()=>{
						_this.codestate = true;
						_this.ut = _this.$options.data().ut
					},2000)
				});
			},
			error(e) {

				this.$refs.uToast.show({
					title: e.detail,
					type: 'warning',
					icon:false,
					position:'top'
				})
				console.log(e.detail);
				this.ut = this.$options.data().ut
			},
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}
	.text-area {
		display: flex;
		justify-content: center;
	}
	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
	.bu {
		margin-top: 20upx;
	}
</style>

