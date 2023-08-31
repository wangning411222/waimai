<template>
	<view class="content_box">
		<view style="padding: 20rpx 0;">发送至<text style="color: red; font-weight: bold;">{{ username }}</text></view>
		<u-form :model="form" ref="uForm" :border-bottom="false">
			<view class="card-list" style="padding: 35rpx 25rpx;">
				<!-- <u-form-item label="标题" prop="subject" label-width="0rpx" :border-bottom="false" :label-style="{'display':'none'}">
					<u-input v-model="form.subject" type="text" placeholder="标题"/>
				</u-form-item> -->
				<u-form-item label="内容" prop="message" label-width="0rpx" :border-bottom="false" :label-style="{'display':'none'}">
					<u-input v-model="form.message" type="textarea" placeholder="私信内容"/>
				</u-form-item>
				<!-- <view>
					<u-upload :action="upimgUrl" ref="uUpload" width="160" height="160" multiple='false' upload-text="上传图片"></u-upload>
				</view> -->
				
			</view>
			
		</u-form>
		<u-button @click="submit" type="warning">提交</u-button>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import { mapState,mapGetters } from 'vuex'
export default {
	data() {
		return {
			username:'',
			btn_state:true,

			form: {
				subject:'AI',
				message: ''
			},
			model:{
				touid:0,
				subject:'AI',
				message: ''
			},
			rules: {
				
			}
		};
	},
	computed: {

		...mapGetters('config',[
			'config'
		]),
		...mapGetters('detail',[
			
		])
	},
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
		console.log(option);
		this.model.touid = option.uid;
		this.username = option.name;
	},
	mounted() {
		this.formatData();
	},
	methods: {
		formatData(){

		},

		submit() {
			let _this = this;
			if(!this.btn_state) return false;
			this.btn_state = false;

			_this.model.subject = _this.form.subject;
			_this.model.message = _this.form.message;
			

			this.$refs.uForm.validate(valid => {
				if (valid) {
					_this.$store.dispatch('ai_pm/postPmSend',_this.model).then((res) => {
						if(res.code == 0) {
							_this.btn_state = true;
							_this.$refs.uToast.show({
								title: "发送成功",
							})
							
							setTimeout(function(){
								uni.navigateBack();
							},500)
							
						} else {
							_this.btn_state = true;
							_this.$refs.uToast.show({
								title: res.message,
							})
						}
						
					});
				} else {
					_this.btn_state = true;
				}
			});
		}
		
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
