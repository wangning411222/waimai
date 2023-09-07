<template>
	<view>
		<view class="bg-white search fixed_zwt" :style="[{top:CustomBar + 'px'}]">
			<view style="background-color: #FFFFFF; border-bottom: 1rpx solid #efefef;width: 100%;padding: 0 30rpx;">
			
				<!-- 当前位置 -->
				<view style="font-size: 28rpx;font-weight: bold; padding: 20rpx 0;">
					当前位置
				</view>
				<view style="padding-bottom: 30rpx; display: flex;">
					<view>
						{{ address }}
					</view>
					<view style="flex: 1; text-align: right; color: #18B566;" @click="remap">
						<u-icon name="map"></u-icon>
						选择定位
					</view>
				</view>
				
			</view>
			<view class="cu-bar ">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input type="text" v-model="textValue" placeholder="输入搜索的关键词" @input="textValueFind" confirm-type="search"></input>
				</view>
			</view>
		</view>
		<!-- 将数据集内数据，按首字母分类展示 -->
		<scroll-view scroll-y class="indexes" :scroll-into-view="'indexes-'+ listCurID" style="height: 100vh;padding-top: 250rpx;" :scroll-with-animation="true" :enable-back-to-top="true">
			<block v-for="(item,index) in dictionary" :key="index">
				<view v-if="item.infoArray.length" :class="'indexItem-' + item.name" :id="'indexes-' + item.name" :data-index="item.name">
					<view class="padding">{{item.name}}</view>
					<view class="cu-list menu-avatar no-padding">
						<view :id="'customerId'+items.id" class="cu-item" v-for="(items,sub) in item.infoArray" :key="sub" @tap="returnInfo(items)">
							<view class="cu-avatar round lg">{{items.schoolname.charAt(0)}}</view>
							<view class="content">
								<view class="text-grey">{{items.schoolname}}</view>
								<view class="text-gray text-sm">{{items.address}}</view>
							</view>
						</view>
					</view>
				</view>
			</block>
			<view style="height: 50rpx;"></view>
		</scroll-view>
		<!-- <view class="indexBar" :style="[{height:'calc(100vh - ' + CustomBar + 'px - 50px)'}]">
			<view class="indexBar-box" @touchstart="tStart" @touchend="tEnd" @touchmove.stop="tMove">
				<view class="indexBar-item" v-for="(item,index) in dictionary" :key="index" :id="index" @touchstart="getCur" @touchend="setCur"> {{item.name}}</view>
			</view>
		</view> -->
		<!--选择显示-->
		<view v-show="!hidden" class="indexToast">
			{{listCur}}
		</view>
	</view>
</template>
 
<script>
	import'@/common/style/main.css'
	// 绝对地址，如需更改需要重新写
	
	import {strChineseFirstPY, oMultiDiff} from '../../../tools/strChineseFirstPY.js'
	
	
	//参数,中文字符串
	//返回值:拼音首字母串数组
	export default {
		data() {
			return {
				address:'',
				StatusBar: this.StatusBar,
				CustomBar: '0',
				hidden: true,
				listCurID: '',
				listCur: '',
				textValue:'',
				// 按照26个英文字母排序，code 0-22为具有汉字的字母排序，23-25为不带汉字的字母排序
				dictionary:[
					{
						name:'#',
						code:-1,
						infoArray:[],
					},
					{
						name:'A',
						code:0,
						infoArray:[],
					},
					{
						name:'B',
						code:1,
						infoArray:[]
					},
					{
						name:'C',
						code:2,
						infoArray:[]
					},
					{
						name:'D',
						code:3,
						infoArray:[]
					},
					{
						name:'E',
						code:4,
						infoArray:[]
					},
					{
						name:'F',
						code:5,
						infoArray:[]
					},
					{
						name:'G',
						code:6,
						infoArray:[]
					},
					{
						name:'H',
						code:7,
						infoArray:[]
					},
					{
						name:'I',
						code:23,
						infoArray:[]
					},
					{
						name:'J',
						code:8,
						infoArray:[]
					},
					{
						name:'K',
						code:9,
						infoArray:[]
					},
					{
						name:'L',
						code:10,
						infoArray:[]
					},
					{
						name:'M',
						code:11,
						infoArray:[]
					},
					{
						name:'N',
						code:12,
						infoArray:[]
					},
					{
						name:'O',
						code:13,
						infoArray:[]
					},
					{
						name:'P',
						code:14,
						infoArray:[]
					},
					{
						name:'Q',
						code:15,
						infoArray:[]
					},
					{
						name:'R',
						code:16,
						infoArray:[]
					},
					{
						name:'S',
						code:17,
						infoArray:[]
					},
					{
						name:'T',
						code:18,
						infoArray:[]
					},
					{
						name:'U',
						code:24,
						infoArray:[]
					},
					{
						name:'V',
						code:25,
						infoArray:[]
					},
					{
						name:'W',
						code:19,
						infoArray:[]
					},
					{
						name:'X',
						code:20,
						infoArray:[]
					},
					{
						name:'Y',
						code:21,
						infoArray:[]
					},
					{
						name:'Z',
						code:22,
						infoArray:[]
					}
				],
				customerListInfo:[],
				customerList:[],
			};
		},
		onLoad() {
			this.getSchoolList()
      wx.getSetting({
        success (res) {
          console.log(res.authSetting)
          // res.authSetting = {
          //   "scope.userInfo": true,
          //   "scope.userLocation": true
          // }
        }
      })

		},
		onReady() {
		},
		methods: {
			remap() {
				let _this = this;
				uni.authorize({
					scope: 'scope.userLocation',
					success() {
						uni.getLocation({
							success(res) {
								uni.chooseLocation({
									latitude: res.latitude,
									longitude: res.longitude,
									success: function(res) {
			
										
			
										let address = res.address;
										let city = '';
										if (address.includes("省")) {
											let arr = address.split('省');
											let arr1 = arr[1].split('市');
											address = arr[0] + "省-" + arr1[0] + "市";
											city = arr1[0]+ "市";
										} else {
											let arr = address.split('市');
											let arr1 = arr[1].split('区');
											address = arr[0] + "市-市辖区";
											city = arr[0]+ "市";
			
										}
										_this.address = city;
										console.log(city)

										_this.getSchoolList(city)
									}
								});
							}
						})
					}
				})
			},
			getSchoolList(city = ''){
				this.$store.dispatch('config/getSchoolList',{'city':city}).then(res => {
					if (res.code == 0) {
						// this.schoolList = res.message
						this.customerListInfo= res.message;
						this.customerList= res.message;
						this.showCustomerList(this.customerList)
					}
				})
			},
			showCustomerList(index){
				let that = this;
				this.dictionary.forEach((item)=>{
					item.infoArray=[]
				})

				index.forEach(function(item){
					// 若是小写字母，全部转为大写
					let firstWord;
					if(RegExp("^[a-z]*$").test(item.schoolname.charAt(0))){
						 firstWord=item.schoolname.charAt(0).toUpperCase()
					}else{
						 firstWord=item.schoolname.charAt(0)
						 
					}
					
					switch (that.isChineseAndEnglish(firstWord)){
						case true:
						
						that.makePy(firstWord,item)
							break;
						case false:
						
						that.dictionary[0].infoArray.push(item)
							break;
					}
				})

			},
			//获取文字信息
			makePy(firstWord,item) {
				let that = this;
				let str=firstWord
				// console.log(str)
				if (typeof (str) != "string") {
					throw new Error(-1, "\u51fd\u6570makePy\u9700\u8981\u5b57\u7b26\u4e32\u7c7b\u578b\u53c2\u6570!");
				}
				var arrResult = new Array(); //保存中间结果的数组
				for (var i = 0, len = str.length; i < len; i++) {
			//获得unicode码
					var ch = str.charAt(i);
			//检查该unicode码是否在处理范围之内,在则返回该码对映汉字的拼音首字母,不在则调用其它函数处理
					arrResult.push(that.checkCh(ch));
				}
			//处理arrResult,返回所有可能的拼音首字母串数组
				// console.log(arrResult[0].charCodeAt())
				that.dictionary[parseInt(arrResult[0].charCodeAt())-64].infoArray.push(item)
			},
			checkCh(ch) {
				var uni = ch.charCodeAt(0);
			//如果不在汉字处理范围之内,返回原字符,也可以调用自己的处理函数
				if (uni > 40869 || uni < 19968) {
					return ch;
				} 
			//检查是否是多音字,是按多音字处理,不是就直接在strChineseFirstPY字符串中找对应的首字母
				return (oMultiDiff[uni] ? oMultiDiff[uni] : (strChineseFirstPY.charAt(uni - 19968)));
			},
			// getCur(e) {
			// 	this.hidden = false;
			// 	this.listCur = this.dictionary[e.target.id].name;
			// },
			// setCur(e) {
			// 	this.hidden = true;
			// 	this.listCur = this.listCur
			// },
			//滑动选择Item
			// tMove(e) {
			// 	let y = e.touches[0].clientY,
			// 		offsettop = this.boxTop,
			// 		that = this;
			// 	//判断选择区域,只有在选择区才会生效
			// 	if (y > offsettop) {
			// 		let num = parseInt((y - offsettop) / 20);
			// 		this.listCur = that.dictionary[num].name
			// 	};
			// },
			//触发全部开始选择
			// tStart() {
			// 	this.hidden = false
			// },
			//触发结束选择
			// tEnd() {
			// 	this.hidden = true;
			// 	this.listCurID = this.listCur
			// },
			indexSelect(e) {
				let that = this;
				let barHeight = this.barHeight;
				let list = this.dictionary;
				let scrollY = Math.ceil(dictionary.length * e.detail.y / barHeight);
				for (let i = 0; i < dictionary.length; i++) {
					if (scrollY < i + 1) {
						that.listCur = dictionary[i].name;
						that.movableY = i * 20
						return false
					}
				}
			},
			// 判断中英文
			isChineseAndEnglish(str){

				if(RegExp("^[\u4e00-\u9fa5]").test(str)) return true;
				else if(RegExp("^[a-z]|[A-Z]").test(str)) return true;
				else return false;
			},
			// 搜索框点击后查询事件
			textValueFind(e){
				// let matchStr = this.textValue;
				let matchStr = e.detail.value
				if (matchStr == "") {
					this.customerList=this.customerListInfo
					this.showCustomerList(this.customerList)
					return;
				}
				// 清空数据
				this.customerList=[];
				this.customerListInfo.forEach((e) => {
					if (e.schoolname.toString().indexOf(matchStr) != -1) {
						// console.log('匹配成功')
						this.customerList.push(e)
					} else {
						// console.log("匹配不成功")
					}
				});
				// 再次查询
				this.showCustomerList(this.customerList)
			},
			returnInfo(items){
				console.log(items)
				let _this = this;
				// 存储学校所有信息
				uni.setStorage({
					key: 'getSchoolLocation',
					data: items,
					success: function() {
						// console.log('success');
					}
				});
				
				uni.$emit('getLocation', {
					'location_name': items.schoolname
				})
				uni.navigateBack();
				
			}
		}
	}
</script>

<style>

	.indexes {
		position: relative;
	}
	.indexBar {
		position: fixed;
		right: 0px;
		bottom: 0px;
		padding: 20upx 20upx 20upx 60upx;
		display: flex;
		align-items: center;
	}

	.indexBar .indexBar-box {
		width: 40upx;
		height: auto;
		background: #fff;
		display: flex;
		flex-direction: column;
		box-shadow: 0 0 20upx rgba(0, 0, 0, 0.1);
		border-radius: 10upx;
	}

	.indexBar-item {
		flex: 1;
		width: 40upx;
		height: 40upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 24upx;
		color: #888;
	}

	movable-view.indexBar-item {
		width: 40upx;
		height: 40upx;
		z-index: 9;
		position: relative;
	}

	movable-view.indexBar-item::before {
		content: "";
		display: block;
		position: absolute;
		left: 0;
		top: 10upx;
		height: 20upx;
		width: 4upx;
		background-color: #f37b1d;
	}

	.indexToast {
		position: fixed;
		top: 0;
		right: 80upx;
		bottom: 0;
		background: rgba(0, 0, 0, 0.5);
		width: 100upx;
		height: 100upx;
		border-radius: 10upx;
		margin: auto;
		color: #fff;
		line-height: 100upx;
		text-align: center;
		font-size: 48upx;
	}
	.fixed_zwt{
		position: fixed;
		top: 95upx;
		width: 750upx;
		z-index: 999;
		right: 0;

		overflow: hidden;
	}
</style>
