<template>
	<view>

		<view class="content_box">
			<view v-if="ResumeList.length > 0" class="fixed-container">
				<view v-for='(item,index) in ResumeList' :key='index' class="fixed-list">
					<view style="display: flex;">
						<view class="fixed-title" style="flex: 1;">{{item.nick_name}}</view>
						<view>
							<text style="color: red; font-size: 30rpx;">{{item.create_date_fmt}}</text>
						</view>
					</view>
					<view style="padding: 20rpx 0;">
						<view>{{item.sex_fmt}} | {{item.school}} | {{item.height}}cm | {{item.weight}}kg</view>
					</view>
					<view style="padding: 20rpx 0;">
						<view>Tell:{{item.phone}}</view>
						
					</view>
					
					<view style="padding-top: 20rpx; display: flex; border-top: 1rpx solid #f4f4f4; text-align: center; color: #6ee4c1;">
						<!-- <view style="flex: 1;" @click="pool_detail(item.resumeid)">查看简历</view> -->
						<view v-if="item.status == 0" style="flex: 1;" @click="UserDeliveryStatus(item.did,1,index)">拒绝合作</view>
						<view v-if="item.status == 0" style="flex: 1;" @click="UserDeliveryStatus(item.did,2,index)">确认合作</view>
						
						<view v-if="item.status == 2" style="flex: 1;" @click="UserDeliveryStatus(item.did,3,index)">停止合作</view>
						<view v-if="item.status == 2" style="flex: 1;" @click="UserDeliveryStatus(item.did,4,index)">确定完成</view>
						<view v-if="item.status == 1" style="flex: 1; color: #CCCCCC;">已拒</view>
						<view v-if="item.status == 3" style="flex: 1; color: #CCCCCC;">已停</view>
						<view v-if="item.status == 4" style="flex: 1; color: #CCCCCC;">已完成</view>
					</view>
					
				</view>
			</view>
			<view v-else class="empty_box">
				<u-empty text="暂无数据" mode="list"></u-empty>
			</view>
		</view>
		<view v-if="maxpage > 1" style="padding-bottom: 50rpx;">
			<u-loadmore :status="status" />
		</view>
	</view>
</template>

<script>
	import RenDropdownFilter from '@/components/ren-dropdown-filter/ren-dropdown-filter.vue'
	import { mapState,mapMutations } from 'vuex'
	export default {

		data() {
			return {
				ptjid:0,

				status: 'loadmore',
				
				ResumeList:[],
				condition_arr:{}
			}
		},
		computed: {

		},
		onLoad(option) {
			uni.setNavigationBarColor({
			    frontColor: '#000000',
			    backgroundColor: '#ffffff',
			    animation: {
			        duration: 200,
			        timingFunc: 'easeIn'
			    }
			})
			this.ptjid = option.ptjid;
			this.init_list()
		},
		
		methods: {
			init_list:function(callback=()=>{}){
				let _this = this;
				_this.ResumeList = [];
				_this.page = 1;
				let data = {
					'ptjid':_this.ptjid
				}
				this.condition_arr = data;
				this.getPositionList(data,callback)
			},
			getPositionList(data,callback=()=>{}){
				let _this = this;
				_this.$store.dispatch('detail/postUserPositionResumeList',data).then((res) => {
					if(res.code == 0) {
						_this.ResumeList = _this.ResumeList.concat(res.message);
			
						
						callback();
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			UserDeliveryStatus(id,status,index) {
				let _this = this;
				_this.$store.dispatch('detail/postUserPositionDeliveryStatus',{'did':id,'status':status}).then((res) => {
					if(res.code == 0) {
						if(status == 1){
							_this.ResumeList[index]['delivery_status'] = 1;
						} else if(status == 2) {
							_this.ResumeList[index]['delivery_status'] = 2;
						} else if(status == 3) {
							_this.ResumeList[index]['delivery_status'] = 3;
						} else if(status == 4) {
							_this.ResumeList[index]['delivery_status'] = 4;
						}
						
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			// pool_detail:function(id){
			// 	uni.navigateTo({
			// 	    url: '/pages/detail/pool_detail?resumeid='+id
			// 	});
			// },
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f8f8f8;
	}
	.top_tab {
		background-color: #FFFFFF; 
		position: fixed; 
		top: 0; 
		
		z-index: 999;
		width: 100%;
		height: 80rpx;
		box-shadow: 0 6rpx 6rpx 0.2rpx #EEEEEE;
	}
	.content_box {
		padding: 0 20rpx 25rpx;
		
	}

	.card_item {
		padding-top: 20rpx;
	}
	
	.fixed-container {
		padding-top: 30upx;
	}

	
	.fixed-list {
		padding: 35rpx 25rpx;
		box-shadow: 0 3rpx 9rpx 1rpx #efefef;
		border-bottom: unset;
		
		padding-bottom: 20rpx;
		margin-bottom: 20upx;

		border-radius: 8upx;
		background-color: #FFFFFF;
	}

	.fixed-title {
		color: #1A1A1A;
		font-size: 32upx;
		
	}
	.fixed-subtitle {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		
		color: #8d8d8d;
		font-size: 26upx;
		
		margin: 10upx 0;
	}
	.left-con {
		width: 520rpx;
	}
	.right-con {
		flex: 1;
		text-align: right;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}
	.time {
		font-size: 22rpx;
		color: #8d8d8d;
	}
	.empty_box {
		width: 100%;
		position: absolute;
		left: 0;
		top: 35%;
	}
</style>
