<template>
	<view class="content_box">
		<!-- 编辑商店信息 -->
		<u-form :model="form" ref="uForm" :border-bottom="false">
			<view class="card-list logo">
				<u-upload :action="upimgUrl" :file-list="logo_start" ref="uUploadLogo" width="160" height="160" multiple='false' upload-text="商店logo" max-count="1"></u-upload>
			</view>
			<view class="card-list">
				<view style="text-align: center; color:#bbbbbb;">
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
					商店信息
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
				</view>

				<u-form-item label="商店名称" prop="name" label-width="170rpx" required="true">
					<u-input v-model="form.name" placeholder="请输入名称"/>
				</u-form-item>
				<u-form-item label="商店类别" prop="name" label-width="170rpx" required="true">
					<u-input v-model="form.catename" @click="catelist_show = true" disabled placeholder="请选择商店类别"/>
				</u-form-item>

				<u-form-item label="商店地址" label-width="170rpx" right-icon="map">
					<u-input v-model="form.address" @click="remap" disabled placeholder="定位地址"/>
				</u-form-item>
        <u-form-item label="商家公告" label-width="170rpx">
					<u-input v-model="form.notice"  placeholder="公告不超过100字"/>
				</u-form-item>
			</view>
			<view class="card-list">
				<view style="text-align: center; color:#bbbbbb;">
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
					营业设置
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
				</view>
				<u-form-item label="营业时间" label-width="170rpx">
					<view class="d-row">
						<view>
							<picker mode="time" :value="form.starthours" start="00:00" end="24:00" @change="bindTimeChange">
								<view class="uni-input">{{form.starthours}}</view>
							</picker>
						</view>
						<view class="padding-left-50 padding-right-50">-</view>
						<view>
							<picker mode="time" :value="form.endhours" start="00:00" end="24:00" @change="bindTimeChange2">
								<view class="uni-input">{{form.endhours}}</view>
							</picker>
						</view>
					</view>
					
				</u-form-item>
				<u-form-item label="打烊" label-width="170rpx">
					<u-switch v-model="form.checked" @change="change" active-value="1" inactive-value="0" style="vertical-align: middle;"></u-switch>
				</u-form-item>
				<u-form-item label="配送" label-width="170rpx" required="true">
					<u-input v-model="form.deliver_way_title" disabled @click="deliverWayShow = true" placeholder="请选择配送方式"/>
				</u-form-item>
				<u-form-item label="自动接单" label-width="170rpx">
					<u-switch v-model="form.auto_ordered_checked" @change="auto_ordered_change" active-value="1" inactive-value="0" style="vertical-align: middle;"></u-switch>
				</u-form-item>
			</view>
			<view class="card-list">
				<u-form-item label="简介" prop="message" label-width="0rpx" :label-style="{'display':'none'}">
					<u-input v-model="form.message" type="textarea" placeholder="输入您的商店介绍"/>
				</u-form-item>
				<view>
					<u-upload :action="upimgUrl" :file-list="fileList" ref="uUploadimg" width="160" height="160" multiple='false' upload-text="添加图片"></u-upload>
				</view>
				
			</view>
			<view class="card-list logo">
				<view style="text-align: center; color:#bbbbbb;">
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
					营业执照(必填)
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
				</view>
				<view style="text-align: center; color:#bbbbbb;">（或大学生创业上传身份证即可）</view>
				<u-upload :action="upimgUrl" :file-list="cert_img_start" ref="uUploadlicense" width="160" height="160" multiple='false' upload-text="营业执照" max-count="1"></u-upload>
			</view>
      	<view class="card-list logo">
				<view style="text-align: center; color:#bbbbbb;">
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
					卫生许可证(必填)
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
				</view>
				<u-upload :action="upimgUrl" :file-list="sanitary_img_start" ref="uUploadlicense2" width="160" height="160" multiple='false' upload-text="卫生许可证" max-count="1"></u-upload>
			</view>
			<view class="card-list">
				
				<view style="text-align: center; color:#bbbbbb;">
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
					联系方式
					<u-icon name="star-fill" color="#cccccc" size="24"></u-icon>
				</view>
				<u-form-item label="姓名" prop="contacts_name" label-width="170rpx" required="true">
					<u-input v-model="form.contacts_name" placeholder="请输入姓名"/>
				</u-form-item>

				<u-form-item label="手机" prop="contacts_mobile" label-width="170rpx" :border-bottom="false" required="true">
					<u-input v-model="form.contacts_mobile" placeholder="请输入手机号"/>
				</u-form-item>
			</view>
			
			
		</u-form>
		<u-select v-model="catelist_show" label-name="title" value-name="cateid" :list="config.shop_catelist" @confirm="cateconfirm"></u-select>
		<u-select v-model="deliverWayShow" :list="deliverWayList" @confirm="deliverWayConfirm"></u-select>
    <view class="submit-box"> 
      <u-button @click="submit" type="warning">提交</u-button>
    </view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>

import { mapState,mapGetters } from 'vuex'
export default {
	data() {
		return {
			btn_state:true,
			catelist_show:false,
			deliverWayShow:false,
			form: {
				name:'',
				latitude:0,
				longitude:0,
				address:'',
				message:'',
				contacts_name:'',
				contacts_mobile:'',
				catename:'',
				starthours:'00:00',
				endhours:'24:00',
				business_status: 0,
				checked: false,
				deliver_way_title:'', // 配送方式
				auto_ordered_checked: false,
				auto_ordered: 0,
        notice:''
			},
			model: {
				companyid:0,
				logo_img_url:'',
				name:'',
				latitude:0,
				longitude:0,
				address:'',
				message:'',
				message_img:[],
				cert_img_url:"",
        sanitary_img_url:'',
				contacts_name:'',
				contacts_mobile:'',
				cateid:0,
				shop_type:0,
				
				starthours:'00:00',
				endhours:'24:00',
				business_status: 0,
				deliver_way: 99,
				auto_ordered: 0,
        notice:''
			},
			rules: {
				name: [
					{
						required: true,
						message: '请输入商店名称',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],

				contacts_name: [
					{
						required: true,
						message: '请输入联系人称谓',
						// 可以单个或者同时写两个触发验证方式
						trigger: ['change', 'blur']
					}
				],
				contacts_mobile: [
					{
						required: true,
						message: '请输入手机号',
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
				
			},
			logo_start:[],
			fileList:[],
			cert_img_start:[],
			sanitary_img_start:[],
			deliverWayList:[{
				value: '0',
				label: '店内和外卖'
			},
			{
				value: '1',
				label: '仅外卖'
			},
			{
				value: '2',
				label: '仅店内'
			}],
			
		};
	},
	computed: {
		...mapGetters('config',[
			'config'
		]),
		...mapGetters('detail',[
			'upimgUrl'
		])
	},
	mounted() {
		this.init();
	},
	methods: {
		init(){
			let _this = this;
			this.$store.dispatch('user/companyRead').then((res) => {
				if(res.code == 0 ) {
					_this.logo_start = [{url:res.message.logo}];
					_this.form.name=res.message.name;
					_this.form.address=res.message.address;
					_this.form.message=res.message.message;
					_this.form.contacts_name=res.message.contacts_name;
					_this.form.contacts_mobile=res.message.contacts_mobile;
					let message_img_arr = res.message.message_img.split(",");
					let message_img_new_arr = [];
					message_img_arr.map(function(v,i){
						let obj = {url:v};
						message_img_new_arr.push(obj);
					})
					_this.fileList = message_img_new_arr;
					_this.cert_img_start = [{url:res.message.cert_img_url}];
					_this.sanitary_img_start=[{url:res.message.sanitary_img_url}]
					_this.config.shop_catelist.map(function(v,i){
						if(v.cateid == res.message.cateid) {
							_this.form.catename = v.title;
						}
					})
					_this.form.starthours = res.message.starthours || '00:00';
					_this.form.endhours = res.message.endhours || '24:00';
					_this.form.business_status = res.message.business_status;
					_this.form.checked = res.message.business_status == 0 ? false : true;
					
					_this.form.auto_ordered = res.message.auto_ordered;
          _this.form.notice = res.message.notice;
					_this.form.auto_ordered_checked = res.message.auto_ordered == 0 ? false : true;
				
					if(res.message.deliver_way == 0) {
						_this.form.deliver_way_title = "店内和外卖";
					} else if(res.message.deliver_way == 1) {	
						_this.form.deliver_way_title = "仅外卖";
					} else {
						_this.form.deliver_way_title = "仅店内";
					}
					_this.model.deliver_way = res.message.deliver_way;
					
					_this.model.companyid=res.message.companyid;
					_this.model.cateid=res.message.cateid;
					_this.model.name=res.message.name;
					_this.model.address=res.message.address;
					_this.model.message=res.message.message;
					_this.model.contacts_name=res.message.contacts_name;
					_this.model.contacts_mobile=res.message.contacts_mobile;
						_this.model.notice=res.message.notice
					_this.model.shop_type=res.message.shop_type
          
					
				}
			});
		},
		getLogo(){
			let _this = this;
			let files = [];
			files = this.$refs.uUploadLogo.lists.filter(val => {
				return val.progress == 100;
			})
			if(files.length > 0) {
				_this.model.logo_img_url = '';
				files.map(function(v,i){
					if(v['response']) {
						_this.model.logo_img_url = v['response']['message']['url'];
					} else {
						_this.model.logo_img_url = v['url'];
					}
				})
			}
		},
		getLicense(){
			let _this = this;
			let files = [];
			files = this.$refs.uUploadlicense.lists.filter(val => {
				return val.progress == 100;
			})
			if(files.length > 0) {
				_this.model.cert_img_url = '';
				files.map(function(v,i){
					if(v['response']) {
						_this.model.cert_img_url = v['response']['message']['url'];
					} else {
						_this.model.cert_img_url = v['url'];
					}	
				})
			}
		},
    getLicense2(){
			let _this = this;
			let files = [];
			files = this.$refs.uUploadlicense2.lists.filter(val => {
				return val.progress == 100;
			})
			if(files.length > 0) {
        	_this.model.sanitary_img_url=''
				files.map(function(v,i){
					if(v['response']) {
							_this.model.sanitary_img_url= v['response']['message']['url'];
					} else {
							_this.model.sanitary_img_url = v['url'];
					}	
				})
			}
		},
		getComimg(){
			let _this = this;
			let files = [];
			files = this.$refs.uUploadimg.lists.filter(val => {
				return val.progress == 100;
			})
			if(files.length > 0) {
				_this.model.message_img = [];
				files.map(function(v,i){
					if(v['response']) {
						_this.model.message_img.push(v['response']['message']['url']);
					} else {
						_this.model.message_img.push(v['url']);
					}
				})
			}
		},
		change(status) {
			this.form.business_status = status
		},
		auto_ordered_change(value){
			this.form.auto_ordered = value
		},
		bindTimeChange: function(e) {
			this.form.starthours = e.target.value
		},
		bindTimeChange2: function(e) {
			this.form.endhours = e.target.value
		},
		deliverWayConfirm(e){
			e.map((val, index) => {
				this.form.deliver_way_title = val.label;
				this.model.deliver_way = val.value;
			})
		},
		submit() {
			let _this = this;

			if(!this.btn_state) return false;
			this.btn_state = false;
			
			_this.model.name = _this.form.name;
			_this.model.address = _this.form.address;
			_this.model.latitude = _this.form.latitude;
			_this.model.longitude = _this.form.longitude;
			
			_this.model.message = _this.form.message;
			
			_this.model.contacts_name = _this.form.contacts_name;
			_this.model.contacts_mobile = _this.form.contacts_mobile;
			
			_this.model.starthours = _this.form.starthours;
			_this.model.endhours = _this.form.endhours;
			_this.model.business_status = _this.form.business_status;
			
			_this.model.auto_ordered = _this.form.auto_ordered;
      _this.model.notice=_this.form.notice
			
			// logo
			_this.getLogo();
			_this.getComimg();
			_this.getLicense();
      _this.getLicense2()

			this.$refs.uForm.validate(valid => {
				if (valid) {
					_this.$store.dispatch('user/companyUpdate',_this.model).then((res) => {
						if(res.code == 0) {
							_this.btn_state = true;
							
							
							_this.$refs.uToast.show({
								title: "编辑完成",
							})
							// 返回上一个页面并传递参数
							uni.navigateBack({
							  delta: 1,
							  success: function () {
							    // 向上一个页面传递参数
							    const eventChannel = uni.getOpenerEventChannel();
							    eventChannel.emit('fromRoute', { from: 'edit' });
							  }
							});
							
						} else {
							_this.btn_state = true;
							_this.$refs.uToast.show({
								title: res.message,
							})
						}
					});
				} else {
					_this.btn_state = true;
					console.log('验证失败');
				}
			});
		},
		remap(){
			let _this = this;
			uni.authorize({
			    scope: 'scope.userLocation',
			    success() {
			        uni.getLocation({
						success(res) {
							uni.chooseLocation({
								latitude:res.latitude,
								longitude:res.longitude,
							    success: function (res1) {
									console.log(res1);
									_this.form.address = res1.address;
									_this.form.latitude = res1.latitude;
									_this.form.longitude = res1.longitude;
							    }
							});
						}
					})
			    }
			})
		},
		cateconfirm(e) {
			this.form.catename = e[0].label;
			this.model.cateid = e[0].value
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
.logo .u-upload {
	justify-content: center;
}
.u-checkbox {
	margin-bottom: 20rpx;
}
.u-checkbox__icon-wrap {
	display: none !important;
}
.u-checkbox__label {
	border-radius: 3px;
	padding: 0 10rpx;
	border: 1rpx solid #cccccc;
	color: #bbbbbb!important;
}
.checked .u-checkbox__label {
	border-color: #ea9518;
	background-color: #ea9518;
	color: #FFFFFF!important;
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
.submit-box{
  width: 100%;
  height: 105rpx;
  position: fixed;
  bottom:0;
  left:0;
  opacity: 1;
  z-index: 1000;
  display: flex;
  align-items: center;
  u-button{
    flex:1;
  }
}
</style>
