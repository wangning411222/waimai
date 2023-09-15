<template>
	<view class="content">
		<my-issue key="1" :infoReceive="score" @scoreChange="setScore" @submit="submit"/>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
import myIssue from '@/pages/sub/center/components/myIssue.vue';
	export default {
		components:{myIssue},
		data() {
			return {
				goods_id:0,
				score: {},
				title: 'Hello'
			}
		},
		onLoad(option) {
			this.goods_id = option.goods_id;
		},
		methods: {
			setScore(score){
				this.score = {score:score,textareaValue:""};
				console.log(score);
			},
			submit(infoReceive){
				let _this = this;
				
				let goods_id = this.goods_id;
				
				let star_nums = infoReceive.score;
				let message = infoReceive.textareaValue;
				
				let img_str = infoReceive.upimgUrl;
				
				console.log(infoReceive);
				
				
				_this.$store.dispatch('user/evaluateCreate',{'goods_id':goods_id,'star_nums':star_nums,'message':message,'img_str':img_str}).then((res) => {
					if(res.code == 0) {
						_this.$refs.uToast.show({
							title: "发布完成",
						})
						setTimeout(()=>{
							uni.navigateTo({
								url:"/pages/may_order/may_order"
							})
						},10)
					} else {
						
					}
				})
			},
		}
	}
</script>

<style>
	page {
		background-color: #f9f9f9;
	}
	.content{
		height: 100%;
	}
</style>
