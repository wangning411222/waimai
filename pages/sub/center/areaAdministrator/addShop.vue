<template>
	<view>
		<view class="u-p-20 u-m-b-20" style="background: #fff;">
			<u-search placeholder="请输入校区名称" v-model="keyword" @custom="search" @search="search"></u-search>
		</view>
		<view v-for="(item, index) in companylist" :key="index" class="d-flex bg-white u-p-25">
			<view class="content flex">
				<view class="text-grey u-m-b-5">{{item.name}}</view>
				<view class="text-gray text-sm">{{item.address}}</view>
			</view>
			<view class="u-p-r-25" style="align-self: center;">
				<button v-if="item.isadd == 0" type="primary" size="mini" @click="addCompany(item.companyid)">添加</button>
				<text v-if="item.isadd != 0" style="color: #cccccc;">已添加</text>
			</view>
		</view>
		
		<view v-if="maxpage > 1" style="padding-bottom: 50rpx;">
			<u-loadmore :status="status" />
		</view>
		
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keyword:'',
				companylist:[],
				page: 1,
				maxpage: 0,
				status: 'loadmore',
			}
		},
		onReachBottom() {
			let _this = this;
			this.status = 'loading';
			if (this.maxpage > 1 && _this.page <= _this.maxpage) {
					
				this.getList({page:this.page,is_auditlist:0}, function() {
					_this.status = 'loadmore';
				});
			} else {
				_this.status = 'nomore';
			}
		},
		onLoad() {
			let _this = this;
			let data = {'page':1,is_auditlist:0};
			this.getList(data)
		},
		methods: {
			
			getList(data, callback = () => {}){
				let _this = this;
				_this.$store.dispatch('school/schoolCompanylist',data).then((res) => {
					if(res.code == 0) {
						_this.companylist = _this.companylist.concat(res.message.company_list);
						
						_this.maxpage = res.message.maxpage;
						if (_this.maxpage > 1 && _this.page <= _this.maxpage) {
							_this.page++;
						}
						callback();
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
				});
			},
			addCompany(companyid){
				let _this = this;
				wx.showModal({
				  title: '提示',
				  content: '确定加入？',
				  success (res) {
				    if (res.confirm) {
				      _this.$store.dispatch('school/schoolAdd',{'companyid':companyid}).then((res) => {
				      	if(res.code == 0) {
				      		wx.showToast({
				      		  title: '添加成功',
				      		  icon: 'success',
				      		  duration: 2000
				      		})
				      	}
				      })
				    } else if (res.cancel) {
				      console.log('用户点击取消')
				    }
				  }
				})

				
			},
			search(){
				console.log(this.keyword)
				let _this = this;
				_this.companylist=[];
				_this.$store.dispatch('school/schoolCompanysearch',{
					'keyword':_this.keyword
				}).then((res) => {
					if(res.code == 0) {
						_this.companylist = res.message;
						
						// _this.maxpage = res.message.maxpage;
						// if (_this.maxpage > 1 && _this.page <= _this.maxpage) {
						// 	_this.page++;
						// }
						
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
	page {
		background-color: #f1f1f1;
		font-size: 28rpx;
		color: #333333;
		font-family: Helvetica Neue, Helvetica, sans-serif;
	}

	.text-sm {
	    font-size: 24rpx;
	}
	.text-gray, .line-gray, .lines-gray {
	    color: #aaaaaa;
	}
	.text-grey, .line-grey, .lines-grey {
	    color: #8799a3;
	}
	.content {
		font-size: 30rpx;
		
		background-color: #fff;
	}
</style>
