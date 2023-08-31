<template>
	<view class="comment-box  lrpad tpad">
		<view>
			<view class="tag" :class="[active==0?'active':'']" @click="tab(0)">全部</view>
			<view class="tag" :class="[active==1?'active':'']" @click="tab(1)">好评</view>
			<view class="tag" :class="[active==2?'active':'']" @click="tab(2)">中评</view>
			<view class="tag" :class="[active==3?'active':'']" @click="tab(3)">差评</view>
		</view>
		
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
				<view class="line-box"></view>
				<view style="height: 10rpx;"></view>
			</view>
		</view>
		<view v-if="commentList.length == 0" class="empty_box">
			<u-empty text="暂无评价"  src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
		</view>
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			active:0,
			page:1,
			goods_id:0,
			commentList: []
		};
	},
	onLoad(option) {
		this.goods_id = option.goods_id;
		this.getEvaluateList(option.goods_id,0,1);
	},
	onReachBottom(){
		console.log("到底部");
		console.log(this.current);
		let _this = this;
		let page = this.page+1;
		this.getEvaluateList(this.goods_id,this.active,page,function(msg){
			if(msg.length > 0) {
				_this.page = _this.page+1;
			}
		});
		
		// let _this = this;
		// let currTab= this.tabs[this.current];
		// let maxpage = currTab.maxpage;
		// let page = currTab.page;
		// if(maxpage > page) {
		// 	currTab.page = page+1;
		// 	this.getCompanyList({'page':page+1},function(msg){
		// 		_this.concatGoods(msg);
		// 	})
		// } else {
		// 	_this.$refs.uToast.show({
		// 		title: "没有更多了",
		// 	})
		// }
	},
	methods: {
		getEvaluateList(goods_id,rate_sel,page,callback=()=>{}){
			let _this = this;
			_this.$store.dispatch('ai_xiaopu/evaluateList',{'goods_id':goods_id,'rate_sel':rate_sel,'page':page}).then((res) => {
				if(res.code == 0) {
					// var comment = res.message.concat(res.message);
					// var comment1 = comment.concat(comment);
					// var comment2 = comment1.concat(comment1);
					// _this.commentList = comment2;
					
					_this.commentList = res.message;
					
					callback(res.message);
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
		tab(type){
			this.active = type;
			this.page = 1;
			this.commentList = [];
			this.getEvaluateList(this.goods_id,type,1);
		},
		
		
		// 跳转到全部回复
		toAllReply() {
			uni.navigateTo({
				url: '/pages/goods/comment_detail'
			});
		},
		// 点赞
		getLike(index) {
			this.commentList[index].isLike = !this.commentList[index].isLike;
			if (this.commentList[index].isLike == true) {
				this.commentList[index].likeNum++;
			} else {
				this.commentList[index].likeNum--;
			}
		},
		
	}
};
</script>
<style>
	.lrpad{
		padding-left: 20rpx;
		padding-right: 20rpx;
	}
	.tpad{
		padding-top: 20rpx;
	}
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
	.empty_box {
		width: 100%;
		position: absolute;
		left: 0;
		top: 35%;
	}
</style>
<style lang="scss" scoped>
.comment-box{
	padding-bottom: 20rpx;
	
	.tag{
		padding: 3px 6px;
		margin-right: 20rpx;
		display: inline-block;
		
		border-radius: 50rpx;
		border: 1rpx solid #EEEEEE;
		background: #EEEEEE;
		color: #333333;
	}
	.tag.active {
		border: 1rpx solid #fc3707;
		background: rgba(252, 55, 7, 0.1);
		color: #fc3707;
	}
	.contain{
		padding-top: 20rpx;
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

</style>
