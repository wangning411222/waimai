<template>
	<view class="goods-detail">
		<view class="main-img lrpad">
			<u-swiper :list="imgList" name="url" :height="450"></u-swiper>
		</view>
		<view class="devide-line">
		</view>
		<view class="price-box">
			<view class="left">
				<span class="yuan-tag">
					￥
				</span>
				<span class="yuan">
					{{ price }}
				</span>
				<span style="color: #CCCCCC; font-size: 24rpx; text-decoration: line-through;">
					￥{{ market_price }}
				</span>
				
			</view>
			<view class="right">
				<!-- <u-icon name="heart-fill" color="#FF2525"></u-icon>
				<span class="text">收藏</span> -->
				<text>库存{{ stock }}</text>
			</view>
		</view>
		<view class="main-title lrpad">
			<span class="answer">{{ goods_name }}</span>
		</view>
		<u-gap height="15" bg-color="#F0F0F0"></u-gap>
		<!-- 已选规格 -->
		
		<view class="selected-qual"  @click="addOrderWindow = true">
			<view></view>
			
			<view class="left">
				<view class="tag">
				</view>
				<view class="text">
					<span>
						已选
					</span>
					<span class="qual" style="align-self: center;">
						{{ count }} 个
					</span>
				</view>
				
			</view>
			<view class="right">
				<u-icon name="more-dot-fill" color="#ABABAB"></u-icon>
			</view>
		</view>
		<u-gap height="15" bg-color="#F0F0F0"></u-gap>
		<!-- 评价 -->
		<view class="comment-box  lrpad tpad">
			<view class="cell">
				<view class="tag"></view>
				<view class="text">评价</view>
				<!-- <view class="small">26万+条</view> -->
			</view>
			<view class="devide-line-inside"></view>
			<view class="contain">
				<view class="single-box" v-for="(item, index) in commentList" :key="index">
					<view class="top">
						<view class="head-img">
							<image :src="item.avatar_url" mode=""></image>
						</view>
						<view class="nickname">
							{{item.username}}
						</view>
						<view class="time">
							{{item.create_date_fmt}}
						</view>
					</view>
					<view class="rate-star">
						<u-rate :count="5" :value="item.star_nums"></u-rate>
					</view>
					<view class="text-content">
						{{item.message}}
					</view>
					<view class="img-box">
						<scroll-view class="scroll-view_H" scroll-x="true" @scroll="scroll" scroll-left="0">
							<view id="demo1" class="scroll-view-item_H uni-bg-red" v-for="(aitem, aindex) in item.img_arr" :key="aindex">
								<image :src="aitem.url"  mode="" @click="previewImg(aindex, index)"></image>
							</view>
						</scroll-view>
					</view>
					
					<!-- <view class="setting-box">
						<span v-for="(bitem, bindex) in item.specifications" :key="bindex">{{bitem}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
					</view> -->
					<view class="line-box"></view>
					<view style="height: 10rpx;"></view>
				</view>
			</view>
			<view v-if="commentList.length == 0" class="empty_box">
				<u-empty text="暂无评价" src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
			</view>
			<view v-if="commentList.length > 0" class="more-btn" style="display: flex; padding-top: 30rpx;padding-top: 10rpx; justify-content: center;">
				<u-button shape="circle" @click="toCommentList()">查看更多</u-button>
			</view>
		</view>
		<u-gap height="15" bg-color="#F0F0F0"></u-gap>
		<!-- 产品更多详情 -->
		<view class="info-box  lrpad tpad">
			<view class="cell">
				<view class="tag"></view>
				<view class="text">宝贝描述</view>
			</view>
			<view class="devide-line-inside"></view>
			<view class="contain">
				<view style="margin-bottom: 20rpx;" v-for="(item, index) in goods_desc_list" :key="index">
					<u-image width="100%" height="500rpx" :src="item.url"></u-image>
				</view>
				
			</view>
		</view>
		<!-- 下单导航栏 -->
		<view class="bottom-navigation"> 
			<view class="navigation">
				<view class="left">
					<view class="item" @click="navTo('/pages/index/index',1)">
						<u-icon name="home" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">首页</view>
					</view>
					<view class="item">
						<button open-type="share" style="width: 60rpx;height: 70rpx; position: absolute; z-index: 3; padding: 0; opacity: 0;">1</button>
						<u-icon name="zhuanfa" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">分享</view>
					</view>
					<view class="item" @click="navTo('/pages/sub/ai_xiaopu/shop_index?companyid='+companyid,2)">
						<u-icon name="dianpu" custom-prefix="custom-icon" :size="40" :color="$u.color['contentColor']"></u-icon>
						<view class="text u-line-1">店铺</view>
					</view>
				</view>
				<view class="right">
					<view class="buy btn u-line-1" @click="buy_btn">立即购买</view>
				</view>
			</view>
		</view>
		<!-- 弹出层 -->
		<u-popup v-model="addOrderWindow"  mode="bottom" closeable border-radius="14">
			<view>
				<view class="simple-info">
					<view class="img-box">
						<u-image :src="imgList[0].url"  width="200rpx" height="200rpx">
						</u-image>
					</view>
					<view class="content">
						<view class="price">
							￥<span class="big-text">{{ price }}</span>
						</view>
						<view class="qual">
							已选 
							<!-- <span>纯净2L</span>, -->
							<span>{{ count }}个</span>
						</view>
					</view>
				</view>
				
				<view style="clear: both;"></view>
				<view class="select-count-box">
					<view class="title">
						数量
					</view>
					<view class="right">
						<u-number-box v-model="count" @change="countChange"></u-number-box>
					</view>
				</view>
				<view class="submit-box">
					<u-button type="error" shape="circle" @click="toAddOrder()">确认</u-button>
				</view>
			</view>
		</u-popup>
		<u-toast ref="uToast" />
		<u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？" @confirm="confirm"  confirm-color="#6ee4c1"></u-modal>
		
	</view>
</template>

<script>
	import { mapGetters } from 'vuex'
    export default {
        name: "goods_detail",
		data() {
		  return {
			user_show:false, // 是否填写了资料
			addOrderWindow: false,//弹出层的状态
		    count: 1,
			value: 2,
			old: {
				scrollTop: 0
			},
			imgList: [],//主图轮播
			companyid:0,
			goods_id:0,
			goods_name:'',
			price:0,
			market_price:0,
			stock:0,
			goods_desc_list:[],
			commentList:[]
		  }
		},
		computed: {
			...mapGetters('user',[
				'userInfo'
			])
		},
		onLoad(option) {
			this.goods_id = option.goods_id;
			this.formatData(option.goods_id);
			this.getEvaluateList(option.goods_id,0,1);
		},
		methods:{
			improve_data(is_cert) {
				if(is_cert == 0) {
					this.user_show = true;
					return false;
				} else {
					return true;
				}
			},
			confirm(){
				uni.navigateTo({
					url: '/pages/sub/center/userinfo_add'
				});
			},
			navTo(url,type) {
				if(type == 1) {
					uni.switchTab({
						url
					});
				} else if(type == 2) {
					uni.navigateTo({
						url
					});
				}
				
			},
			formatData(goods_id){
				let _this = this;
				_this.$store.dispatch('ai_xiaopu/goodsRead',{'goods_id':goods_id}).then((res) => {
					if(res.code == 0) {
						// _this.model.cateid = res.message.cateid;
						// _this.form.cate_title = res.message.cate_title;
						_this.companyid = res.message.companyid;
						_this.stock = res.message.stock;
						_this.goods_desc_list = res.message.goods_desc_list;
						_this.goods_name = res.message.goods_name;
						_this.market_price = res.message.market_price;
						_this.price = res.message.price;
						_this.imgList = res.message.goods_banner_list;
						// _this.fileDescList = res.message.goods_desc_list;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			
			},
			scroll: function(e) {
				// console.log(e)
				this.old.scrollTop = e.detail.scrollTop
			},
			toAddOrder(){
				if(this.count > this.stock) {
					this.$refs.uToast.show({
						title: "库存不足",
					})
					return false;
				}
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/add_order?goods_id='+this.goods_id+'&num='+this.count
				})
			},
			getEvaluateList(goods_id,rate_sel,page){
				let _this = this;
				_this.$store.dispatch('ai_xiaopu/evaluateList',{'goods_id':goods_id,'rate_sel':rate_sel,'page':page}).then((res) => {
					if(res.code == 0) {
						_this.commentList = res.message;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			
			},
			
			previewImg(photoIndex, commentIndex){
				console.log('预览图片',photoIndex,'；；；',commentIndex, ';;;',this.commentList[commentIndex].img_arr)
				let imgArr = []
				this.commentList[commentIndex].img_arr.forEach(res=>{
					imgArr.push(res.url)
				})
				uni.previewImage({
					current: photoIndex,
					urls: imgArr
				});
			},
			// 查看更多
			toCommentList(){
				uni.navigateTo({
					url: '/pages/sub/ai_xiaopu/comment_list?goods_id='+this.goods_id
				})
			},
			// // 查看评价详情
			// toCommentDetail(){
			// 	uni.navigateTo({
			// 		url: '/pages/sub/ai_xiaopu/comment_detail'
			// 	})
			// },
			countChange(e){

				this.count = e.value;
			},
			buy_btn(){
				if(!this.improve_data(this.userInfo.is_cert)) {
					return false;
				}
				this.addOrderWindow = true;
			}
			  
		}
    }
</script>
<style>
	
	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		overflow: hidden;
	}

	.scroll-view-item {
		text-align: center;
		font-size: 36rpx;
	}

	.scroll-view-item_H {
		display: inline-block;
		text-align: center;
		font-size: 36rpx;
	}
</style>
<style lang="scss" scoped>
	.video-play-box{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 5;
		background-color: #000000;
		display: flex;
		align-items: center;
		justify-content: center;
		.close-btn{
			position: absolute; 
			top: 20rpx;
			right: 20rpx;
		}
	}
	.simple-info{
		padding-top: 45rpx;
		padding-left: 45rpx;
		padding-right: 45rpx;
		display: flex;
		
		.img-box{
			border: 1px solid #f0f0f0;
		}
		.content{
			margin-left: 20rpx;
			display: flex;
			flex-direction: column;
			justify-content: flex-end;
			padding-bottom: 20rpx;
			.price{
				color: #FF2525;
				.big-text{
					font-size: 38rpx;
					font-weight: 800;
				}
			}
			.qual{
				margin-top: 10rpx;
				color: #ABABAB;
				span{ 
					margin-left: 18rpx;
					color: #222;
				}
			}
		}
	}
	.selected-box{
		padding-top: 30rpx;
		padding-left: 45rpx;
		padding-right: 45rpx;
		.title{
			font-size: 39rpx;
			font-weight: 800;
			margin-bottom: 50rpx;
		}
		.select-group{
			view{
				height: 60rpx;
				border-radius: 30rpx;
				float: left;
				display: flex;
				padding: 0 20rpx;
				justify-content: center;
				align-items: center;
				border: 1px solid #F2F2F2;
				color: #ABABAB;
				background-color: #F2F2F2;
				font-size: 28rpx;
				margin-right: 30rpx;
				margin-bottom: 30rpx;
			}
			.selected{
				border: 1px solid #FF2525;
				color: #FF2525;
				background-color: #FCEDEB;
			}
		}
	}
	.select-count-box{
		display: flex;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 45rpx;
		padding-right: 45rpx;
		.title{
			font-size: 39rpx;
			font-weight: 800;
			flex: 1;
		}
		.right{
			
		}
	}
	.submit-box{
		padding-top: 30rpx;
		padding-bottom: 30rpx;
		padding-left: 45rpx;
		padding-right: 45rpx;
	}
	.price-box{
		padding: 20rpx;
		display: flex;
		align-items: center;
		.left{
			color: red;
			flex: 1;
			.yuan-tag{
				font-size: 23rpx;
				font-weight: 600;
			}
			.yuan{
				font-size: 38rpx;
				font-weight: 800;
			}
		}
		.right{
			font-size: 23rpx;
			color: #ABABAB;
			.text{
				margin-left: 8rpx;
			}
		}
	}
	.lrpad{
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.tpad{
		padding-top: 20rpx;
	}
	.devide-line{
		border-top: 1px solid #F0F0F0;
		margin: 20rpx;
		&-inside{
			border-top: 1px solid #F0F0F0;
			margin: 20rpx 0;
		}
	}
	.video-box{
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		margin-right: 20rpx;
		background: #000000;
		position: relative;
		.handle-box{
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		
		.outside-circle{
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background: #FFFFFF;
			display: flex;
			align-items: center;
			justify-content: center;
			.inside-circle{
				width: 130rpx;
				height: 130rpx;
				border-radius: 50%;
				background: #000000;
				display: flex;
				align-items: center;
				justify-content: center;
				.btn{
					height: 80rpx; 
					margin-left: 20rpx;
					border-style: solid; 
					border-width: 40rpx 0 40rpx 60rpx; 
					border-color: transparent transparent transparent #FFFFFF;
				}
			}
		}
				
	}
	.goods-detail{
		padding-bottom: 100rpx;
		.info-box{
			padding-bottom: 20rpx;
			.cell{
				display: flex;
				font-size: 35rpx;
				font-weight: 700;
				.tag{
					width: 3px;
					margin-right: 8rpx;
					// background: #CAA787;
					background-image: linear-gradient(#FF0800, #F6FA00);
				}
				.text{
					
				}
				.small{
					font-size: 25rpx;
				}
			}
			.contain{
				.answer{
					display: inline-block;
					margin-right: 20rpx;
					align-items: center;
					font-weight: 800;
					&-block{
						border-radius: 25rpx;
						background: #CAA787;
						color: #FFFFFF;
						span{
							margin: 8rpx 20rpx;
						}
					}
				}
			}
			.contain-rate{
				.cell{
					display: flex;
					align-items: center;
					font-size: 28rpx;
					font-weight: 600;
					margin-bottom: 20rpx;
					.label{
						width: 100rpx;
						text-align: right;
					}
					.answer{
						padding-left: 50rpx;
					}
				}
			}
		}
		.selected-qual{
			display: flex;
			align-items: flex-end;
			padding: 20rpx;
			
			.left{
				flex: 1;
				display: flex;
				font-size: 35rpx;
				font-weight: 700;
				.tag{
					width: 3px;
					margin-right: 8rpx;
					background-image: linear-gradient(#FF0800, #F6FA00);
				}
				.text{
					display: flex;
					align-items: flex-end;
				}
				.qual{
					font-size: 28rpx;
					font-weight: 550;
					margin-left: 10rpx;
					color: #ABABAB;
				}
			}
			.right{
				
			}
		}
			
		.comment-box{
			padding-bottom: 20rpx;
			
			.cell{
				display: flex;
				font-size: 35rpx;
				font-weight: 700;
				// align-items: flex-end;
				.tag{
					width: 3px;
					margin-right: 8rpx;
					background-image: linear-gradient(#FF0800, #F6FA00);
				}
				.small{
					font-size: 25rpx;
					margin-left: 8rpx;
					display: flex;
					align-items: flex-end;
				}
				
				.text{
					
				}
			}
			.contain{
				.single-box{
					.top{
						display: flex;
						.head-img{
							width: 50rpx;
							height: 50rpx;
							border-radius: 25rpx;
							margin-right: 10rpx;
							image{
								width: 50rpx;
								height: 50rpx;
								border-radius: 25rpx;
							}
						}
						.nickname{
							flex: 1;
							font-size: 30rpx;
							font-weight: 600;
							margin-right: 10rpx;
						}
						.time{
							font-size: 25rpx;
							font-weight: 500;
							color: #ABABAB;
							margin-left: 20rpx;
						}
					}
					.rate-star{
						padding-top: 20rpx;
					}
					.text-content{
						padding-top: 20rpx;
						padding-bottom: 20rpx;
						font-size: 28rpx;
						font-weight: 550;
					}
					.img-box{
						image{
							width: 200rpx;
							height: 200rpx;
							border-radius: 20rpx;
							margin-right: 20rpx;
							box-shadow: 0 0 2px #F0F0F0;
						}
					}
					.setting-box{
						font-size: 28rpx;
						font-weight: 520;
						color: #ABABAB;
					}
					.line-box{
						margin-top: 20rpx;
						border-top: 1px solid #F0F0F0;
					}
				}		
			}
		}
		.main-img{
			
		}
		.main-title{
			font-size: 35rpx;
			font-weight: 600;
			margin-bottom: 50rpx;
			.label{
				
			}
			.answer{
				margin-left: 20rpx;
			}
		}
	}
	.bottom-navigation{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.navigation {
		display: flex;
		margin-top: 100rpx;
		border: solid 2rpx #f2f2f2;
		background-color: #ffffff;
		padding: 16rpx 20rpx;
		.left {
			flex: 1;
			display: flex;
			font-size: 20rpx;
			.item {
				flex: 1;
				margin: 0 30rpx;
				text-align: center;
				&.car {
					text-align: center;
					position: relative;
					.car-num {
						position: absolute;
						top: -10rpx;
						right: -10rpx;
					}
				}
			}
		}
		.right {
			display: flex;
			font-size: 28rpx;
			align-items: center;
			.btn {
				width: 360rpx;
				line-height: 66rpx;
				padding: 0 50rpx;
				border-radius: 36rpx;
				color: #ffffff;
				text-align: center;
			}
			.cart {
				background-color: #ed3f14;
				margin-right: 30rpx;
			}
			.buy {
				background-color: #ff7900;
			}
		}
	}
</style>
