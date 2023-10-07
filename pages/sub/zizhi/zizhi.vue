<template>
	<view>
		<ul>
			<li>
				<text>平台资质</text>
				<image @click="preview('https://pic.maishijie.com.cn/o_1hbtbcjop1v5vtkr1ctp15823tf9.jpg')" mode='heightFix' src="https://pic.maishijie.com.cn/o_1hbtbcjop1v5vtkr1ctp15823tf9.jpg" alt="">
			</li>
    <!--  <li>
				<text>许可证</text>
				<image @click="preview('https://pic.maishijie.com.cn/o_1hbgmhfkg1n7bq6d1ps36j5jkbe.jpg')" mode='aspectFit' style="height:400rpx" src="https://pic.maishijie.com.cn/o_1hbgmhfkg1n7bq6d1ps36j5jkbe.jpg" alt="">
			</li>
      <li>
				<text>备案信息</text>
				<image @click="preview('https://pic.maishijie.com.cn/o_1hbgmi81g1ffrs841ojm1cqk11pgj.jpg')" mode='aspectFit' style="height:400rpx" src="https://pic.maishijie.com.cn/o_1hbgmi81g1ffrs841ojm1cqk11pgj.jpg" alt="">
			</li> -->
		</ul>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
      preview(url){
        uni.previewImage({
          urls: [url],
          success:(res)=>{
          }
   		})
      },
			
		}
	}
</script>

<style lang="scss"  scoped>
  ul{
    padding:30rpx;
  }
    ul>li{
		display:flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    text{
      margin:20rpx 0;
      font-size:30rpx;
      font-weight:bold;
    }
    margin-bottom:30rpx;
      image{
        width:520rpx;
		height:1800rpx;

      }
    }
</style>
