<template>
	<view class="content_box">

		<u-form :model="form" ref="uForm" :border-bottom="false">
			<view class="card-list">
				<view>
					<u-upload :action="upimgUrl" :file-list="fileList" ref="uUploadimg" width="160" height="160" multiple='false' upload-text="添加图片" max-count="3"></u-upload>
				</view>
				<u-gap height="1" bg-color="#f4f6f8"></u-gap>
				<u-form-item label="简介" label-width="0rpx" :label-style="{'display':'none'}">
					<u-input v-model="form.message" type="textarea" height="150" placeholder="输入跳转链接,多个链接用换行分隔"/>
				</u-form-item>
				
				<view style="padding-top: 15rpx;">
					<text style="color: #aaa;">注：链接与轮播图分别最多可上传三条数据</text>
				</view>
			</view>
			<view style="padding: 10rpx 0;font-weight: bold;">公告</view>
			<view class="card-list">
				<u-form-item label="简介" label-width="0rpx" :label-style="{'display':'none'}">
					<u-input v-model="form.notice" type="textarea" height="150" placeholder="请输入公告消息"/>
				</u-form-item>
			</view>
		</u-form>

		<u-button @click="submit" type="warning" >保存</u-button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import { mapState,mapGetters } from 'vuex'
	export default {
		data() {
			return {
				btn_state:true,
				fileList:[],
				form: {
					message:'',
					notice:''
				},
				model: {
					message:'',
					message_img:[],
					notice:''
					
				},
			}
		},
		computed: {
			...mapGetters('config',[
				'config'
			]),
			...mapGetters('detail',[
				'upimgUrl'
			])
		},
		onLoad() {
			this.getSchoolBanner()
		},
		methods: {
			getSchoolBanner(data,callback=(company_list)=>{}){
				let _this = this;
				_this.$store.dispatch('school/schoolBanner',data).then((res) => {
					if(res.code == 0) {
						let fileList = [];
						let message = [];
						let banner_href = res.message.banner_href;
						this.form.notice = res.message.notice
						banner_href.map((item)=>{
							fileList.push({
								url:item.image
							})
							message.push(item.url)

						})
						this.fileList = fileList;
						this.form.message = message.join("\n");

						callback(res.message);
					} else {

					}
				});
			},
			getComimg(){
				let _this = this;
				let files = [];
				files = this.$refs.uUploadimg.lists.filter(val => {
					return val.progress == 100;
				})
				if(files.length > 0) {
					console.log(files)
					_this.model.message_img = [];
					files.map(function(v,i){

						if(v['response'] && v['response']['code'] == 0) {
							_this.model.message_img.push(v['response']['message']['url']);
							
						} else{
							_this.model.message_img.push(v.url);
						}
						
					})
				}
			},
			submit() {
				let _this = this;
				if(!this.btn_state) return false;
				this.btn_state = false;
				
				
				_this.model.message = _this.form.message;
				_this.model.notice = _this.form.notice;
				_this.getComimg();
				
				let str = _this.model.message;
				let arr = str.split("\n");


				this.$store.dispatch('school/schoolSetting',{
					banner1:_this.model.message_img[0]||'',
					banner2:_this.model.message_img[1]||'',
					banner3:_this.model.message_img[2]||'',
					banner_href1:arr[0]||'',
					banner_href2:arr[1]||'',
					banner_href3:arr[2]||'',
					notice:_this.model.notice||'',
				}).then((res) => {
					if(res.code == 0) {
						_this.btn_state = true;
						_this.$refs.uToast.show({
							title: "保存成功",
						})
						// uni.navigateBack()
	
					} else {
						_this.btn_state = true;
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					
				});
			}
		}
	}
</script>

<style>
page {
	background-color: #f8f8f8;
}
.u-btn--warning {
    color: #ffffff;
    border-color: #ff9900 !important;
    background-color: #ff9900 !important;
}
.content_box {
	padding: 0 20rpx 25rpx;
}
.card-list {
	width: 710upx;
	border-radius: 8upx;
	
	margin-bottom: 20upx;
	
	padding: 35rpx 25rpx 35rpx 35rpx;
	box-shadow: 0 5rpx 9rpx 1rpx #dddddd;
	border-bottom: unset;
	background-color: #FFFFFF;
}

</style>
