<template>
	<view>
		<view v-if="state != 2" style="padding-bottom: 110rpx;">
			<view class="u-cell u-border-bottom" v-for="(item,index) in list" :key="index">

				<view class="u-cell_title" style="width:auto">{{ item.title }}</view>
				<view class="u-cell__value"></view>
				<view class="u-icon-wrap u-cell__right-icon-wrap" >
					<view class="u-margin-right-30" @click.stop="edit_cate(item.title,item.cateid,index)">编辑</view>
					<view @click.stop="dele_cate(item.cateid,index)">删除</view>
				</view>
				<!-- <u-icon name="arrow-right" class="u-icon-wrap u-cell__right-icon-wrap"></u-icon> -->
			</view>
			
		</view>
		<view v-if="state == 2" style="padding-bottom: 110rpx;">
			<HM-dragSorts :list="list" :isLongTouch="true" :rowHeight="45" @confirm="confirm">
				<template slot="rowContent" slot-scope="{ row }">
					<view class="row">
						<!-- <image v-if="row.images" class="icon" :src="row.images"></image> -->
						<text class="text">{{row.title}}</text>
					</view>
				</template>
			</HM-dragSorts>
		</view>
		
		<view class="bottom_btn" v-show="state == 4">
			<view class="collect_left">
				<u-input v-model="edit_cate_name" type="text" placeholder="请输入分类标题名" :border="true" style="width: 100%;" />
			</view>
			<view style="overflow: hidden;display: flex;">
				<view class="primary">
					<text @click="save_edit_cate(edit_index)">修改</text>
				</view>
				<view class="default_btn">
					<text @click="cancel_edit_cate()">取消</text>
				</view>
			</view>
		</view>
		<view class="bottom_btn" v-show="state == 3">
			<view class="collect_left">
				<u-input v-model="cate_name" type="text" placeholder="请输入分类标题名" :border="true" style="width: 100%;" />
			</view>
			<view style="overflow: hidden;display: flex;">
				<view class="primary">
					<text @click="comment()">提交</text>
				</view>
				<view class="default_btn">
					<text @click="cancel_cate_add()">取消</text>
				</view>
			</view>
		</view>
		<view class="navigation" v-if="state == 1">
			<view class="tell btn u-line-1" @click="add_cate()">添加</view>
			<view class="goodsClass btn u-line-1" @click="drag_sort()">排序</view>
		</view>
		<view class="navigation" v-if="state == 2">
			<view class="tell btn u-line-1" @click="save_sort()">确定</view>
			<view class="goodsClass btn u-line-1" @click="cancel_sort()">取消</view>
		</view>
		<u-toast ref="uToast" />
		<u-modal v-model="dele_show" content="确定删除？" show-cancel-button="true" @confirm="dele_true" confirm-color="#6ee4c1"></u-modal>
	</view>
</template>


<script>
	import dragSorts from '@/pages/sub/center/components/HM-dragSorts/components/HM-dragSorts/HM-dragSorts';
	export default {
		components: {'HM-dragSorts':dragSorts},
		data() {
			return {
				list: [
					// {
					// 	cateid: 1,
					// 	title: '新品',
					// 	show: false
					// }
				],
				rankList: [],
				state:1, // 1初始 2排序 3添加 4编辑

				//新增分类
				cate_name:'',
				// 编辑分类
				edit_index:0,
				edit_cate_name:'',
				edit_cate_id:'',
				// 删除
				dele_index:0,
				dele_cateid:0,
				dele_show:false,
			};
		},
		onLoad(option) {
			this.init_list();
		},
		methods: {
			init_list:function(callback=()=>{}){
				let _this = this;
				_this.data = [];
				
				this.getList();
			},
			getList(){
				let _this = this;
				_this.$store.dispatch('user/cateList').then((res) => {
					if(res.code == 0) {
						_this.list = res.message;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},

			dele_cate(cateid,index){
				this.dele_cateid = cateid;
				this.dele_index = index;
				this.dele_show = true;
			},
			dele_true(){
				let _this = this;
				this.$store.dispatch('user/cateDelete',{'cateid':this.dele_cateid}).then((res) => {
					if (res.code == 0) {
						_this.list.splice(_this.dele_index, 1);
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			edit_cate(title,cateid,index){
				this.state = 4;
				this.edit_index = index;
				this.edit_cate_id = cateid;
				this.edit_cate_name = title;
				 
			},
			cancel_edit_cate(){
				this.state = 1;
			},
			save_edit_cate(index){
				let _this = this;
				this.$store.dispatch('user/cateEdit',{'cateid':this.edit_cate_id,'title':this.edit_cate_name}).then((res) => {
					if (res.code == 0) {
						_this.list[index].title = _this.edit_cate_name;
						_this.state = 1;
					} else {
						_this.$refs.uToast.show({
							title: res.message
						})
					}
				});
			},
			add_cate(){
				this.state = 3; 
			},
			cancel_cate_add(){
				this.state = 1;
			},
			drag_sort(){
				this.state = 2;
			},
			cancel_sort(){
				this.state = 1;
				
			},
			confirm(e){
				let cate = '';
				e.list.map(function(v,i){
					if(i == 0) {
						cate += v.cateid;
					} else {
						cate += ','+v.cateid;
					}
				})
				this.rankList = cate;
			},
			save_sort(){
				let _this = this;
				this.$store.dispatch('user/cateRank',{'cateids':this.rankList}).then((res) => {
					if (res.code == 0) {
						_this.$refs.uToast.show({
							title: "排序完成",
						})
						_this.getList();
						_this.state = 1;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			comment(){
				let _this = this;
				this.$store.dispatch('user/cateAdd',{'title':this.cate_name}).then((res) => {
					if (res.code == 0) {
						_this.getList();
						_this.state = 1;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
		}
	};
</script>
<style lang="scss" scoped>
	.cate_list {
		padding: 30rpx 20rpx;
		border-bottom: 1rpx solid #efefef;
	}
	.u-border-bottom:after {
	    border-bottom-width: 1px;
	}
	.u-cell {
	    display: -webkit-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-orient: horizontal;
	    -webkit-box-direction: normal;
	    -webkit-flex-direction: row;
	    flex-direction: row;
	    -webkit-box-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    position: relative;
	    box-sizing: border-box;
	    width: 100%;
	    padding: 26rpx 32rpx;
	    font-size: 28rpx;
	    line-height: 54rpx;
	    color: #606266;
	    background-color: #fff;
	    text-align: left;
		.u-cell_title {
		    font-size: 28rpx;
		}
		.u-cell__value {
		    overflow: hidden;
		    text-align: right;
		    vertical-align: middle;
		    color: #909399;
		    font-size: 26rpx;
			-webkit-box-flex: 1;
			-webkit-flex: 1;
			flex: 1;
		}
		.u-icon-wrap {
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
			flex-direction: row;
		    -webkit-box-align: center;
		    -webkit-align-items: center;
			
			-webkit-box-orient: horizontal;
			    -webkit-box-direction: normal;
		    align-items: center;
		}
		.u-cell__right-icon-wrap {
		    margin-left: 10rpx;
		    color: #969799;
		    font-size: 28rpx;
			height: 48rpx;
		}
	}
	
	
	image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
		border-radius: 12rpx;
	}
	
	.title {
		text-align: left;
		font-size: 28rpx;
		color: $u-content-color;
		margin-top: 20rpx;
	}
	.row {
		width: 100%;
		display: flex;
		.text {
			align-self: center;
			flex: 1;
		}
	}
	.navigation {
		width: 100%;
		
		position: fixed;
		left: 0;
		bottom: 0;
		
		display: flex;
		border: solid 2rpx #efefef;
		background-color: #efefef;
		
		.tell {
			padding: 28rpx 0;
			color: #333333;
			font-size: 28rpx;
			flex: 1;
			// background-color: #6ee4c1;
			text-align: center;
			border-right: 1rpx solid #bbbbbb;
		}
		.goodsClass {
			padding: 28rpx 0;
			color: #333333;
			font-size: 28rpx;
			flex: 1;
			// background-color: #6ee4c1;
			text-align: center;
		}
	}
	.bottom_btn {
		width: 100%;
		height: 120rpx;
		padding: 0 25rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		border-top: 1px solid #eee;
		background-color: #FFFFFF;
		.collect_left {
				width: 440rpx;
				height: 120rpx;
				
				display: flex;
				align-items: center;
				
				background-color: #FFFFFF;
				color: #aaaaaa;
				float: left;
			}
		.primary {
			width: 130rpx;
			height: 120rpx;
			line-height: 120rpx;
			overflow: hidden;
			text-align: center;
			color: #FFFFFF;
			text {
				padding: 10rpx 20rpx;
				border-radius: 5rpx;
				background-color: #ed3f14;
			}
		}
		.default_btn {
			width: 130rpx;
			height: 120rpx;
			line-height: 120rpx;
			overflow: hidden;
			text-align: center;
			color: #FFFFFF;
			text {
				padding: 10rpx 20rpx;
				border-radius: 5rpx;
				background-color: #C0C4CC;
			}
		}
	}
</style>