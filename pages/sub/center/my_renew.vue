<template>
	<view class="page_content">
		<view v-if="company.status != 0 && company.end_date != 0" style="text-align: center;">
			到期时间：<text style="color: red;">{{ company.end_date_fmt }}</text>
		</view>
		<view v-if="company.status != 0 && company.end_date == 0" style="text-align: center;">
			到期时间：<text style="color: green;">{{ company.end_date_fmt }}</text>
		</view>
		<view class="top_popup_box">
			<view class="top_popup_item" v-for="(item,index) in config.pay_type_info" :key="index">
				<view class="top_price_box" :class="[top_popup_active==index?'active':'']" @click="change_price(index)">
					<view class="top_title">{{ item.title }}</view>
					<view class="top_price">费用：￥{{ item.price }}元</view>
				</view>
			</view>
			
		</view>
		
		
		<view style="margin-top:38upx;">
			<button type="primary" style="font-size: 30rpx;" @tap="submit">立即支付</button>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>
<script>
import { mapState,mapMutations,mapGetters } from 'vuex'
var _self;
export default {
	data() {
		return {
			top_popup_active:'',
			paytype:'',
			company:{}
		};
	},
	computed: {
		...mapGetters('config',[
			'config'
		])
	},
	onLoad:function(option){
		_self = this;
		this.user();
	},
	methods: {
		user(){
			let _this = this;
			this.$store.dispatch('user/companyRead').then((res) => {
				if(res.code == 0 ) {
					_this.company = res.message;
				}
			});
		},
		change_price: function(index) {
			
			this.top_popup_active = index;
			this.paytype = index;
		},
		submit(){
			let _this = this;
			this.$store.dispatch('user/userOrderadd',{paytype: this.paytype}).then((res) => {
				if(res.code == 0){
					
					// setTimeout(function(){
					// 	uni.switchTab({
					// 	    url: '/pages/index/index'
					// 	});
					// },500)
				} else {
					_this.$refs.uToast.show({
						title: res.message
					})
				}
			});
			
		},
		payOrder(order_token){
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/orderPay',{'order_token':order_token}).then((res) => {
				if(res.code == 0) {
					
				} else {
					_this.$refs.uToast.show({
						title: res.message,
					})
				}
			});
		}
	}
}
</script>
<style lang="scss">
view{font-size:28upx;}
.page_content {padding: 25rpx 30rpx;}
.grace-idcard-text{margin-bottom: 30rpx; padding: 30rpx 0;}
.grace-idcard-items{padding: 0 95rpx;}

.step_text1 {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 30rpx;
	margin-left: -25rpx;
	border: 1rpx solid #cccccc; color: #FFFFFF;border-radius: 100%;width: 50rpx; height: 50rpx;line-height: 50rpx; display: inline-block;text-align: center;background-color: #cccccc;
}
.step_text2 {
	position: absolute;
	z-index: 1;
	top: 0;
	left: 50%;
	margin-left: -25rpx;
	border: 1rpx solid #2979FF; color: #FFFFFF;border-radius: 100%;width: 50rpx; height: 50rpx;line-height: 50rpx; display: inline-block;text-align: center;background-color: #2979FF;}
.top_popup_box {
		display: flex;
		flex-wrap: wrap;
		padding: 30rpx 25rpx;
	}
	.top_popup_item {
		flex: 0 0 50%;
		max-width: 50%;
		padding: 0 10rpx;
		margin-bottom: 20rpx;
	}
	.top_title {
		font-size: 30rpx;
		font-weight: bold;
	}
	.top_price {
		font-size: 25rpx;
		color: #909399;
	}
	.top_price_box {
		padding: 30rpx 50rpx;
		border: 1px solid #efefef; border-radius: 6rpx;
	}
	.top_price_box.active {
		padding: 30rpx 50rpx;
		position: relative;
		border-color: #EA9518;
		border-radius: 6rpx;
		color: #EA9518;
		.top_price {
			color: #EA9518;
		}
		&:before {
			content: '';
			color: #FFFFFF;
			position: absolute;
			bottom: 0;
			left: 0;
			width: 0;
			height: 0;
			border-bottom: 40rpx solid #EA9518;
			border-right: 40rpx solid transparent;
		}
		&:after{
			content:"";
			position: absolute;
			left: 5rpx;
			bootom: 0;
			z-index:3;
			width:8rpx;
			height:12rpx;
			border-color: #FFFFFF;
			border-style: solid;
			border-width: 0 1rpx 2rpx 0;
			transform: rotate(45deg);
		}
	}
</style>