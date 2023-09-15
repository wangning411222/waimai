<template>
	<view class="content_box">
		<u-form :model="form" ref="uForm" :border-bottom="false">
			<view class="card-list" style="padding: 35rpx 25rpx;">
				<u-form-item label="内容" prop="message" label-width="0rpx" :border-bottom="false"
					:label-style="{'display':'none'}">
					<u-input v-model="form.message" type="textarea" placeholder="请在此输入内容" />
				</u-form-item>
				<view>
					<u-upload :action="upimgUrl" max-count="3" ref="uUpload" width="160" height="160" multiple='false' :size-type="['compressed ']"
						upload-text="上传图片"  @on-error="uploadError" @on-uploaded="uploaded" @on-choose-complete="beforeUpload"></u-upload>
				</view>
				<!-- <view style="display: flex;margin-top: 20rpx;">
					<view style="width: 160rpx;padding-right: 15rpx; ">
						<u-input v-model="form.demand_fid" type="select" @click="fid_model"
							custom-style="{'background': 'red'}" input-align="center" height="50"></u-input>
					</view>
					<view style="flex: 1; align-self: center; text-align: right;">
						<u-icon name="map"></u-icon>
						<view style="display: inline-block;">
							{{ location }}
						</view>
					</view>
				</view> -->

			</view>

		</u-form>
		<u-button @click="submit" :custom-style="customStyle">提交</u-button>


		<!-- <u-action-sheet :list="fidSheetList" v-model="fidSheetShow" @click="fidSheetCallback"></u-action-sheet> -->
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		mapState,
		mapGetters
	} from 'vuex'
	export default {
		data() {
			return {
				customStyle: {
					backgroundColor: '#ff9900', // 注意驼峰命名，并且值必须用引号包括，因为这是对象
					color: '#fff'
				},
				type: 0,
				btn_state: true,
				// fidSheetList: [{
				// 	text: 'Ai陪伴'
				// }, {
				// 	text: 'Ai开心'
				// }],
				// fidSheetShow: false,
				form: {
					message: '',
					// demand_fid: 'Ai陪伴'
				},
				model: {
					message: '',
					img_str: [],
					province: '',
					city: '',
					fid: 0
				},
				rules: {

				},
				// location: '选择位置',
				// address: ''
			};
		},
		computed: {

			...mapGetters('config', [
				'config'
			]),
			...mapGetters('detail', [
				'upimgUrl'
			])
		},
		onLoad(option) {
			let _this = this;
			// type 判断是否为帮助
			if (option.type && option.type == 1) {
				this.type = option.type;
				// this.form.demand_fid = "Ai帮助";
				// this.model.fid = 3;
			}

			
			// 监听位置变化
			// uni.$on('getLocation', (e) => {
			// 	_this.location = e.location_name;
			// 	uni.getStorage({
			// 		key: 'getLocation_key',
			// 		success: function(res) {
			// 			_this.address = res.data;
			// 		}
			// 	});
			// })
		},
		mounted() {
			this.formatData();
		},
		methods: {
			formatData() {

			},
			beforeUpload(index, list) {
				this.btn_state = false;
				uni.showToast({
				  title: '上传中',
				  duration: 30000,
				  icon: 'none', 
				})
			},

			uploaded(){
				this.btn_state = true;
				uni.hideToast()
			},
			uploadError(res, index, lists, name){
				this.btn_state = true;
				uni.hideToast()
				this.$refs.uUpload.remove(index);
			},
			// fidSheetCallback(index) {
			// 	uni.hideKeyboard();
			// 	this.model.fid = index;
			// 	this.form.demand_fid = this.fidSheetList[index].text;
			// },
			// fid_model() {
			// 	if (this.type == 0) {
			// 		this.fidSheetShow = true;
			// 	} else {
			// 		return false;
			// 	}
			// },
			submit() {
				let _this = this;
				if (!this.btn_state) return false;
				this.btn_state = false;

				_this.model.message = _this.form.message;
				
				let files = [];
				files = this.$refs.uUpload.lists.filter(val => {
					return val.progress == 100;
				})
				
				if(_this.model.message == '' && files.length == 0) {
					_this.btn_state = true;
					_this.$refs.uToast.show({
						title: "请添加内容",
					})
					return
				}
				console.log(files)
				if (files.length > 0) {
					_this.model.img_str = [];
					files.map(function(v, i) {
						_this.model.img_str.push(v['response']['message']['url']);
					})
				}
				// let arr = _this.address.split('-');
				// _this.model.province = arr[0];
				// _this.model.city = arr[1];

				/**/
				this.$refs.uForm.validate(valid => {
					if (valid) {
						_this.$store.dispatch('ai_yujian/postThreadCreate', _this.model).then((res) => {
							if (res.code == 0) {
								uni.hideLoading();
								_this.btn_state = true;
								_this.$refs.uToast.show({
									title: "发表成功",
								})
								// 父子通信
								uni.$emit('shuaxin', {
									'status': 1
								})
								setTimeout(function() {
									uni.navigateBack();
								}, 500)

							} else {
								_this.btn_state = true;
								_this.$refs.uToast.show({
									title: res.message,
								})
							}

						});
					} else {
						console.log(2)
						_this.btn_state = true;
					}
				});
				/**/
			},
			// get_location() {
			// 	uni.navigateTo({
			// 		url: '/pages/sub/location/location'
			// 	})
			// },

		},
		// 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		}
	};
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.content_box {
		padding: 0 20rpx 25rpx;
	}

	// .u-input {
	// 	height: 50rpx;
	// }
	// u-input view.u-input input {
	// 	min-height: 40rpx !important;
	// }
	.card-list {
		width: 710upx;
		border-radius: 8upx;

		margin-bottom: 20upx;

		padding: 35rpx 25rpx 35rpx 35rpx;
		box-shadow: 0 5rpx 9rpx 1rpx #dddddd;
		border-bottom: unset;
		background-color: #FFFFFF;
	}

	.u-form-left {
		width: 200rpx !important;
		flex: 0 0 200rpx;
	}

	.u-action-sheet-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		-webkit-box-orient: horizontal;
		-webkit-box-direction: normal;
		-webkit-flex-direction: row;
		flex-direction: row;
		line-height: 1;
		-webkit-box-pack: center;
		-webkit-justify-content: center;
		justify-content: center;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		font-size: 30rpx;
		padding: 32rpx 0;
		-webkit-flex-direction: column;
		flex-direction: column;
	}

	.u-action-sheet-item__subtext {
		font-size: 24rpx;
		color: $u-tips-color;
		margin-top: 20rpx;
	}

	.u-actionsheet-cancel {
		color: $u-main-color;
	}

	.popupcontent .u-border-bottom:after {
		content: " ";
		position: absolute;
		left: 0;
		top: 0;
		pointer-events: none;
		box-sizing: border-box;
		-webkit-transform-origin: 0 0;
		transform-origin: 0 0;
		width: 199.8%;
		height: 199.7%;
		-webkit-transform: scale(.5);
		transform: scale(.5);
		border-bottom: 1rpx solid #e4e7ed;
		z-index: 2;
	}

	.u-line-1 {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	.u-gab {
		height: 10rpx;
		background-color: #eaeaec;
	}
</style>
