<template>
	<view class="main-content">
		<view class="address-box" @click="toSelectAddress">
			<view class="left-box">
				<u-icon name="map-fill" :size="40" color="#FF0000"></u-icon>
			</view>
			<view v-if="Object.keys(getAddress).length > 0" class="center-box" >
				<view class="top">
					<view class="name">{{getAddress.real_name}}</view>
					<view class="phone">{{getAddress.mobile}}</view>
					<view class="tag" v-if="getAddress.is_default==1">
						<text class="red">默认</text>
					</view>
				</view>
				<view class="bottom">
					{{ getAddress.province + getAddress.city + getAddress.county + getAddress.address }}
				</view>
			</view>
			<view v-if="Object.keys(getAddress).length == 0" style="align-self: center;">选择地址</view>
			<view class="bottom-box" >
				<view style="display: flex;" v-for="aitem in 20" :key="aitem">
					<view class="city-sigle city-sigle-red"></view>
					<view class="city-sigle city-sigle-blue"></view>
				</view>
			</view>
			
		</view>
		<view class="calculation">
			<view class="goods-box">
				<view class="goods-img">
					<image :src="goods.goods_pic" mode=""></image>
				</view>
				<view class="content">
					<view class="title">
						<view class="text-box">
							{{goods.goods_name}}
						</view>
					</view>
					<view class="info">
						<span style="margin-right: 15rpx;">库存{{goods.stock}}</span>
						<span>销量{{goods.sales}}</span>
						
					</view>
					<view class="count">
						<span class="big-text">￥{{goods.price}}</span>
						<span>  </span>
						<span style="margin: 0 3px;">x</span>
						<span>  </span>
						<span>{{goods.count}}</span>
					</view>
				</view>
			</view>
		</view>
		<view class="total-box">
			<view class="single-box goods-total">
				<view class="left">
					商品金额
				</view>
				<view class="right">
					￥{{ all_price }}
				</view>
			</view>
			
			<view class="distribution-fee single-box">
				<view class="left">
					配送方式
				</view>
				<view class="right">
					<text v-if="goods.deliver_way == 0">自取</text>
					<text v-if="goods.deliver_way == 1">包邮</text>
				</view>
			</view>
			<view class="total-price single-box">
				<view class="left">
					 
				</view>
				<view class="right">
					小计：￥{{ all_price }}
				</view>
			</view>
		</view>
		<view class="remark">
			<view class="label">
				订单备注:
			</view>
			<view class="input-text">
				<u-field 
					v-model="remark"
					label-width="0"
					type="textarea"
					placeholder="选填,合理要求我们会尽量满足..."
					:border-bottom="false"
				>
				</u-field>
			</view>
		</view>
		<view class="bottom-tabbar">
			<view class="left">
				<span class="label">
					实付款:
				</span>
				<span class="price">
					￥{{ all_price }}
				</span>
			</view>
			<view class="right">
				<u-button type="error" @click="submitOrder" shape="circle">支付订单</u-button>
			</view>
		</view>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goods_id:0,
				receiving_address:{},
				goods:{},
				remark:'',
				all_price:0,
				open_goods_list:[
					{
						head: "查看更多",
						open: true,
						disabled: true
					}
				]
				
			};
		},
		onLoad(option) {
			this.goods_id = option.goods_id;
			if(option.num){
				this.goods.count = option.num;
			}
			
			
			
			if(uni.getStorageSync('selected_address_info')){
				this.receiving_address = uni.getStorageSync('selected_address_info')
			}
			this.formatData(option.goods_id);
		},
		onShow(){
			if(uni.getStorageSync('selected_address_info')){
				this.receiving_address = uni.getStorageSync('selected_address_info')
			}
		},
		computed:{
			getAddress(){
				if(uni.getStorageSync('selected_address_info')){
					this.receiving_address = uni.getStorageSync('selected_address_info')
				}
				return this.receiving_address;
				// this.receiving_address uni.setStorageSync('selected_address_info')
			}
		},
		methods: {
			formatData(goods_id){
				let _this = this;
				_this.$store.dispatch('ai_xiaopu/goodsRead',{'goods_id':goods_id}).then((res) => {
					if(res.code == 0) {
						_this.goods.stock = res.message.stock;
						_this.goods.sales = res.message.sales;
						_this.goods.goods_name = res.message.goods_name;
						_this.goods.market_price = res.message.market_price;
						_this.goods.price = res.message.price;
						_this.goods.goods_pic = res.message.goods_pic;
						_this.goods.distribution_fee = 5;
						_this.goods.deliver_way = res.message.deliver_way;
						// 总金额
						_this.all_price = _this.goods.price * _this.goods.count;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			
			},
			toSelectAddress(){
				uni.setStorageSync('selected_address_info', this.receiving_address)
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/address/index?getAddress=order'
				})
			},
			submitOrder(){
				console.log(this.receiving_address);
				if(Object.keys(this.receiving_address).length == 0) {
					this.$refs.uToast.show({
						title: "请选择地址",
					})
					return false;
				}
				let _this = this;
				_this.$store.dispatch('ai_xiaopu/orderAdd',{'goods_id':this.goods_id,'goods_num':this.goods.count,'addressid':this.receiving_address.addressid,'remark':this.remark}).then((res) => {
					if(res.code == 0) {
						_this.payOrder(res.message);
					} else {
						_this.$refs.uToast.show({
							title: res.message,
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

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style>
	.city-sigle{
		width: 20px;
		height: 2px;
		margin-right: 10px;
		transform: skew(-45deg);
	}
	.city-sigle-red{
		background-color: #D06583;
	}
	.city-sigle-blue{
		background-color: #007AFF;
	}
</style>    
<style lang="scss" scoped>
	.main-content{
		padding: 20rpx;
		padding-bottom: 200rpx;
	}
	.address-box{
		background: #FFFFFF;
		padding: 40rpx 20rpx;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		display: flex;
		position: relative;
		overflow: hidden;
		.left-box{
			margin-right: 10rpx;
			padding-top: 6rpx;
		}
		.center-box{
			.top {
				display: flex;
				font-weight: bold;
				font-size: 34rpx;
				.phone {
					margin-left: 60rpx;
				}
				.tag {
					display: flex;
					font-weight: normal;
					align-items: center;
					text {
						display: block;
						width: 60rpx;
						height: 34rpx;
						line-height: 34rpx;
						color: #ffffff;
						font-size: 20rpx;
						border-radius: 6rpx;
						text-align: center;
						margin-left: 30rpx;
						background-color:rgb(49, 145, 253);
					}
					.red{
						background-color:red
					}
				}
			}
			.bottom {
				display: flex;
				margin-top: 20rpx;
				font-size: 28rpx;
				justify-content: space-between;
				color: #999999;
			}
				
		}
		.bottom-box{
			position: absolute;
			bottom: 0;
			left: 0;
			right: 0;
			display: flex;
		}
	}
	.goods-list-box{
		background: #FFFFFF;
	}
	.calculation{
		background: #FFFFFF;
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
		.goods-box{
			display: flex;
			padding: 25rpx;
			border-bottom: 1px solid #f0f0f0;
			.goods-img{
				width:180rpx;
				height: 180rpx;
				overflow: hidden;
				border-radius: 5rpx;
				box-shadow: 0 0 2px #f0f0f0;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.content{
				flex: 1;
				margin-left: 18rpx;
				.title{
					width: 400rpx;
					font-size: 32rpx;
					font-weight: 700;
					margin-bottom: 18rpx;
					.text-box{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
				}
				.info{
					color: #DCDFE6;
					font-size: 23rpx;
					margin-bottom: 18rpx;
				}
				.count{
					.big-text{
						font-weight: 800;
						font-size: 35rpx;
					}
				}
			}
		}
			
				
	}
	.total-box{
		background: #FFFFFF;
		border-bottom-left-radius: 10rpx;
		border-bottom-right-radius: 10rpx;
		.single-box{
			display: flex;
			
			padding: 20rpx 30rpx;
			font-size: 28rpx;
			.left{
				font-weight: 600;
				flex: 1;
				display: flex;
				align-items: center;
			}
			.right{
				text-align: right;
				display: flex;
				align-items: center;
				font-size: 32rpx;
				font-weight: 700;
			}
		}
		.total-price{
			border-top: 1px solid #F0F0F0;
			margin-bottom: 20rpx;
			padding-top: 20rpx;
			padding-bottom: 20rpx;
		}	
		.single-box{
			.tag{
				padding: 5rpx 10rpx;
				border-radius: 10rpx;
				background-color: #6ee4c1;
				display: flex;
				align-items: center;
				justify-content: center;
				margin-right: 10rpx;
				color: #FFFFFF;
			}
		}
		.full-reduction{
			.tag{
				background-color: #F69B16;
			}
		}
	}
	.remark{
		background: #FFFFFF;
		padding: 20rpx;
		border-radius: 10rpx;
		.label{
			font-size: 32rpx;
			font-weight: 600;
		}
		.input-text{
			
		}
	}
	.bottom-tabbar{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		box-shadow: 0 0 2px #F1F1F1;
		background: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 20rpx 20rpx;
		.left{
			flex: 1;
			.label{
				font-size: 28rpx;
				margin-right: 10rpx;
			}
			.price{
				font-size: 35rpx;
				font-weight: 600;
				color: #FA3534;
			}
		}
	}
</style>