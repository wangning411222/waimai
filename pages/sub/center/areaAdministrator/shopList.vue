<template>
	<view>
		<u-subsection :list="list" :current="current" @change="sectionChange"></u-subsection>
		<view v-if="shop.length > 0">
			<view v-for="(item, index) in shop" :key="index" class="shopproduct product" @tap="companyDetail(item.companyid)">
				<shop-box :goodsObj="item" @handleShops="handleShops"></shop-box>
			</view>
			
			<view v-if="maxpage > 1" style="padding-bottom: 50rpx;">
				<u-loadmore :status="status" />
			</view>
		</view>
		<view v-else class="empty_box">
			<u-empty text="暂无数据" mode="list"></u-empty>
		</view>
		<view @click="addShop"
			style="width: 100rpx; height: 100rpx; line-height: 96rpx; text-align: center; border-radius: 100%; overflow: hidden; background-color: #6ee4c1; position: fixed; bottom: 80rpx; right: 30rpx; z-index: 1000;">
			<u-icon name="plus" color="#ffffff" size="64" style="vertical-align: middle;"></u-icon>
		</view>
		
		<u-popup v-model="companyDetailShow" mode="bottom" length="80%" closeable safe-area-inset-bottom>
			<view class="padding-30">
				<view v-if="Object.keys(company_con).length > 0">
					<view class="content_box">
						<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
							<view style="flex: 1;">
								<text style="font-weight: bold;">商店信息</text>
							</view>
							
						</view>
						<view class="content" style="line-height: 1.8rem;">
							<view>
								<text style="vertical-align: middle;">商店头像：</text>
								<image :src="company_con.logo" style="width:100rpx;height:100rpx; border-radius: 10rpx;vertical-align: middle;" mode="aspectFill"></image>
							</view>
							<view>商店名称：{{ company_con.name }}</view>
							<!-- <view>商店类别：{{ company_con.shop_type }}</view> -->
							<view>商店地址：{{ company_con.address }}</view>
						</view>
						<view class="content">
							<rich-text :nodes="company_con.message_fmt"></rich-text>
							<u-grid :col="5" :border="false" hover-class="none">
								<u-grid-item v-for="(item,index) in message_img_arr" :key="index">
									<image class="item-menu-image" :src="item" mode=""></image>
								</u-grid-item>
							</u-grid>
						</view>
					</view>
					<view class="content_box">
						<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
							<view style="flex: 1;">
								<text style="font-weight: bold;">营业执照</text>
							</view>
							
						</view>
						<view class="content cert_content" style="text-align: center;">
							<image :src="company_con.cert_img_url" style="width:300rpx"  mode="widthFix" @click="cert_image_preview(company_con.cert_img_url)"></image>
						</view>
					</view>
					<view class="content_box">
						<view style="display: flex; border-bottom: 1px solid #efefef; padding: 30rpx 0; margin-bottom: 20rpx;">
							<view style="flex: 1;">
								<text style="font-weight: bold;">联系方式</text>
							</view>
							
						</view>
						<view class="content" style="line-height: 1.8rem;">
							<view>联系人：{{ company_con.contacts_name }}</view>
							<view>联系电话：<text user-select>{{ company_con.contacts_mobile }}</text></view>
						</view>
					</view>
					
				</view>
			</view>
		</u-popup>
		<u-popup v-model="statisticsShow" mode="bottom" closeable safe-area-inset-bottom>
			<view class="text-center padding-30 font-bold font38">收入统计</view>
			<view class="padding-30">
				
				<view class="d-flex font38 padding-bottom-40">
					<view class="flex-1">今日订单数：{{statistics.today_count}}</view>
					<view class="flex-1">本周订单数：{{statistics.week_count}}</view>
				</view>
				<view class="d-flex font38">
					<view class="flex-1">本月订单数：{{statistics.month_count}}</view>
					<view class="flex-1">总订单数：{{statistics.total_count}}</view>
				</view>
			</view>
			<view style="height: 50rpx;"></view>
		</u-popup>
		
		<kevy-loading v-if="loadingshow" transparent type='pacman-loader' color="#6ee4c1" tip-color="#6ee4c1"
		            tip="加载中..."></kevy-loading>
	</view>
</template>

<script>
	import shopBox from '@/pages/sub/center/components/areaAd_shop_box.vue';
	import kevyLoading from '@/components/kevy-loading/kevy-loading'
	export default {
		components: { shopBox, kevyLoading },
		data() {
			return {
				loadingshow: false,
				list: [
					{
						name: '我管理的店铺'
					}, 
					{
						name: '待审核'
					}
				],
				current: 0,
				shop:[],
				page: 1,
				maxpage: 0,
				status: 'loadmore',
				companyDetailShow:false,
				company_con:{},
				
				statisticsShow:false,
				statistics:{}
			}
		},
		onReachBottom() {
			let _this = this;
			this.status = 'loading';
			if (this.current == 0) {
				if (this.maxpage > 1 && _this.page <= _this.maxpage) {
		
					this.getList({'page':this.page}, function() {
						_this.status = 'loadmore';
					});
				} else {
					_this.status = 'nomore';
				}
			}
			if (this.current == 1) {
				if (this.maxpage > 1 && _this.page <= _this.maxpage) {
					
					this.getAuditList({'page':this.page}, function() {
						_this.status = 'loadmore';
					});
				} else {
					_this.status = 'nomore';
				}
			}
		},
		onLoad() {
			let _this = this;
			let data = {'page':1};
			this.getList(data,function(msg){
				// _this.concatCompany(msg);
			})
			
		},
		methods: {
			sectionChange(index) {
				this.current = index;
			
				this.shop=[]
				this.page= 1
				this.maxpage= 0
				this.status= 'loadmore'
				this.loadingshow = true
				if(index == 0) {
					let data = {'page':1};
					this.getList(data,function(msg){
						// _this.concatCompany(msg);
					})
				} else {
					let data = {'page':1,'is_auditlist':1};
					this.getAuditList(data)
				}
				
				
			},
			getList(data, callback = () => {}){
				let _this = this;
				_this.$store.dispatch('school/schoolMyCompanylist',data).then((res) => {
					if(res.code == 0) {
						_this.shop = _this.shop.concat(res.message.company_list);
						
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
					_this.loadingshow = false
				});
			},
			getAuditList(data, callback = () => {}){
				let _this = this;
				_this.$store.dispatch('school/schoolCompanylist',data).then((res) => {
					if(res.code == 0) {
						_this.shop = _this.shop.concat(res.message.company_list);
						
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
					_this.loadingshow = false
				});
			},
			handleShops(cid){
				let _this = this;
				if(this.current == 0) {
					wx.showActionSheet({
					  itemList: ['移除店铺'],
					  success (res) {
					    _this.schoolCompanyDel(cid)
					  },
					  fail (res) {
					    console.log(res.errMsg)
					  }
					})
				} else {
					wx.showActionSheet({
					  itemList: ['通过','拒绝'],
					  success (res) {

						if(res.tapIndex == 0) {
							_this.schoolCompanyAudit(cid,1)
						} else if(res.tapIndex == 1) {
							_this.schoolCompanyAudit(cid,2)
						}
					  },
					  fail (res) {
					    console.log(res.errMsg)
					  }
					})
				}
				
			},
			schoolCompanyDel(companyid,status){
				let _this = this;
				_this.$store.dispatch('school/schoolCompanyDel',{'companyid':companyid}).then((res) => {
					if(res.code == 0) {
						_this.sectionChange(0)
						_this.$refs.uToast.show({
							title: res.message,
						})
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					
				});
			},
			schoolCompanyAudit(companyid,status){
				let _this = this;
				_this.$store.dispatch('school/schoolCompanyAudit',{'companyid':companyid,'status':status}).then((res) => {
					if(res.code == 0) {
						_this.$refs.uToast.show({
							title: res.message,
						})
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					
				});
			},
			addShop(){
				uni.navigateTo({
					url: '/pages/sub/center/areaAdministrator/addShop'
				})
			},
			
			companyDetail(companyid) {
				this.loadingshow = true
				if(this.current == 0) {
					this.getCompanyStatistics(companyid)
					// uni.navigateTo({
					// 	url: '/pages/sub/center/areaAdministrator/company_order_list?companyid='+companyid
					// });
				} else if(this.current == 1) {
					this.getCompanyDetail(companyid)
					
				}
				
			},
			getCompanyStatistics(companyid){
				let _this = this;
				_this.$store.dispatch('user/companyStatistics',{'companyid':companyid}).then((res) => {
					if(res.code == 0) {
						_this.statistics = res.message
						_this.statisticsShow = true;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					_this.loadingshow = false
				});
			},
			getCompanyDetail(companyid){
				let _this = this;
				_this.$store.dispatch('school/schoolCompanyRead',{'companyid':companyid}).then((res) => {
					if(res.code == 0) {
						_this.company_con = res.message
						_this.companyDetailShow = true;
					} else {
						_this.$refs.uToast.show({
							title: res.message,
						})
					}
					_this.loadingshow = false
				});
			},
			cert_image_preview(message_img_arr){
				let _this = this;
				uni.previewImage({
					urls: [message_img_arr],
					longPressActions: {
						success: function(data) {
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					}
				});
			},
		}
	}
</script>

<style>
.empty_box {
	width: 100%;
	position: absolute;
	left: 0;
	top: 35%;
}
</style>
