<template>
  <view class="hx-comment">
    <view class="hx-comment_dividing-line15"></view>
    <view class="hx-comment_main-box">
      <view class="lists" v-if="commentList.length > 0">
        <block v-for="(item, index_) in commentList" :key="index_">
          <view class="item">
            <view class="icon">
              <image
                :src="item.avatar_url"
                mode="widthFix"
                style="width: 100%"
              />
            </view>
            <view class="info">
              <view class="name-time">
                <text class="name">{{ item.username }}</text>
                <text class="time">{{ item.create_date_fmt }}</text>
              </view>
              <view class="stars">
                <text>评分</text>
                <u-rate
                  size="28"
                  :count="count"
                  active-color="rgb(247, 186, 42)"
                  :value="item.star_nums"
                ></u-rate>
              </view>
              <view class="evaluate-content">
                <text>{{ item.message || "用户暂未评价" }}</text>
                <view class="imgs" v-if="item.img_arr">
                  <block v-for="(imgurl, index) in item.img_arr" :key="index">
                    <view class="imgs-box">
                      <image
                        :src="imgurl"
                        mode="widthFix"
                        style="width: 100%; height: auto"
                        @click="previewImgs(imgurl, item.imgs)"
                      ></image>
                    </view>
                  </block>
                </view>
              </view>
              <view class="d-row d-jc-between" style="margin:20rpx; 0">
                <view class="btn evaluate">
                  <text
                    v-if="item.replay == ''"
                    @click="handleInputFieldShow(item)"
                    >回复</text
                  >
                  <text v-else @click="handleInputFieldShow(item)">编辑</text>
                </view>
                <view class="btn evaluate">
                  <text  @click="toOrderDeatil(item.orderid)">订单详情</text>
                </view>
                <view class="btn evaluate" v-if="item.deleted==0">
                  <text  @click="postStatus(item.pid,3)">屏蔽</text>
                </view>
                <view class="btn evaluate" v-else>
                  <text  @click="postStatus(item.pid,0)">取消屏蔽</text>
                </view>
              </view>
              
              <view v-if="inputFieldShow">
                <view class="input-field">
                  <u-input
                    class="u-input"
                    v-model="replayValue"
                    type="text"
                    :border="true"
                  />
                  <view class="custom-style" @click="confirmReplay">发送</view>
                </view>
              </view>
              <view
                v-if="item.replay != ''"
                class="replay-content"
              >
                <view>商家回复</view>
                <view>{{ item.replay }}</view>
              </view>
            </view>
          </view>
          <view class="hx-bb"></view>
        </block>
      </view>
      <view class="no-lists" v-else>
        <u-empty text="暂无评论" mode="data"></u-empty>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: "hx-comment",
  props: {
    companyid: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      tagArr: [
        {
          text: "全部",
          value: "",
        },
        {
          text: "好评",
          value: "",
        },
        {
          text: "中评",
          value: "",
        },
        {
          text: "差评",
          value: "",
        },
      ],
      selectTag: 0,
      commentList: [],
      loaddingStatus: "more",
      page: 1,
      maxPage: 1,
      canReplay: 0, //是否展示回复按钮
      inputFieldShow: false, //回复输入框展示隐藏
      replayPid: null, //点击回复的pid
      replayValue: "",
      count: 5,
      star:''
    };
  },

  created() {
    this.getPostList();
  },
  methods: {
    // 去订单详情
    toOrderDeatil(id){
      uni.navigateTo({
				url: '/pages/sub/center/company_order_detail?orderid='+id
			});
    },
    postStatus(id,status){
      let data={
          pid:id,
          status:status
      }
      let _this=this
      this.$store.dispatch('ai_xiaopu/postStatus',data).then((res)=>{
            this.page = 1;
            this.maxPage = 1;
            this.commentList = [];
            this.loaddingStatus = "more";
            this.getPostList();
        uni.showToast({
            title:res.message
        })

      })
    },
    // 商家回复消息提交
    confirmReplay() {
      if (this.replayValue) {
        let data = {
          pid: this.replayPid,
          replay: this.replayValue,
        };
        this.$store.dispatch("ai_xiaopu/postReplay", data).then((res) => {
          if (res.code == 0) {
            this.page = 1;
            this.maxPage = 1;
            this.commentList = [];
            this.loaddingStatus = "more";
            this.getPostList();
            this.replayValue = "";
          }
        });
      }

      this.inputFieldShow = false;
    },
    // 商家回复弹窗
    handleInputFieldShow(item) {
      this.replayPid = item.pid;
      this.inputFieldShow = true;
    },
    // 获取评价列表
    getPostList() {
    console.log(this.loaddingStatus,'this.loaddingStatusthis.loaddingStatus')
      if (this.loaddingStatus == "loading") {
        return;
      }
      this.loaddingStatus = "loading";
      let data = {
        companyid: this.companyid,
        page: this.page,
      };
      // 还有数据
      if (this.maxPage >= this.page) {
        this.$store.dispatch("ai_xiaopu/postListByCompany", data).then((res) => {
          if (res.code == 0) {
            let data = res.message;
            this.maxPage = data.maxpage;
            this.page++;
            this.commentList = [...this.commentList, ...data.post_list];
            this.loaddingStatus = "more";
          }
        });
      }
    },
    previewImgs(img, imgList) {
      // 预览图片
      uni.previewImage({
        current: img,
        urls: imgList,
        indicator: "default",
      });
    },
  },
};
</script>

<style lang="scss">
$hx-color-main: #ff9800;
$hx-color-gray: #999999;

.input-field {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 5rpx 10rpx;

  .u-input {
    flex: 1;
  }
}

.hx-comment_main-box {
  display: flex;
  flex-direction: column;
}

.custom-style {
  margin: 0 auto;
  padding: 15rpx 0;
  border-radius: 200rpx;
  color: #efefef;
  width: 150rpx;
  text-align: center;
  background: linear-gradient(to right, #80d0c7, #0093e9);
}

.hx-comment {
  position: relative;
  flex: 1;
  overflow: hidden;
 

  .hx-bb {
    margin-left: 22rpx;
    border-bottom: 1px solid #efefef;
  }

  &_dividing-line15 {
    height: 30rpx;
    background: #efefef;
    width: 100%;
  }

  &_dividing-line {
    height: 4rpx;
    background: #efefef;
    width: 100%;
  }

  &_basic-info {
    height: 164rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    text-align: center;
    border-bottom:1px solid rgba(204, 204, 204, 0.438);

    &_left {
      display: flex;
      flex-direction: column;
      width: 200rpx;

      &_top {
        font-size: 46rpx;
        margin-bottom: 4rpx;
        color: $hx-color-main;
      }

      &_bottom {
        font-size: 26rpx;
        color: #555555;
      }
    }

    &_center {
      flex: 1;
      display: flex;
      align-items: center;
      flex-direction: column;
      

      &_item {
        font-size:28rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex:1;

        &_left {
          color: #555555;
        }

        &_right {
          color: #ff9800;
        }
      }
    }

    &_right {
      width: 200rpx;
      display: flex;
      flex-direction: column;
      border-left: 1px solid #efefef;

      &_top {
        font-size: 52rpx;
        margin-bottom: 4rpx;
        color: $hx-color-gray;
      }

      &_bottom {
        font-size: 24rpx;
        color: $hx-color-gray;
      }
    }
  }

  &_main-box {
    .lists .item {
      padding: 20rpx;
      display: flex;
      font-size: 44rpx;
      color: #999;

      .icon {
        width: 120rpx;
        height: 120rpx;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 26rpx;
        border: 1px solid #efefef;
      }
    }

    .lists .item .info {
      flex: 1;
      font-size: 32rpx;
      color: #000;

      .name-time {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-size: 32rpx;
          color: #000;
        }

        .time {
          font-size: 32rpx;
          color: #999;
        }
      }

      .stars {
        padding: 12rpx 0 20rpx;
        display: flex;
        flex-direction: row;
        align-items: center;
        position: relative;

        text {
          font-size: 24rpx;
          color: #999;
          margin-right: 12rpx;
        }

        .uni-rate {
          height: 0;
        }
      }

      .replay-button {
        display: flex;
        justify-content: flex-end;
        color: #4b7bec;
        font-size: 28rpx;
      }
      .btn {
			line-height: 52rpx;
			width: 160rpx;
			border-radius: 26rpx;
			border: 2rpx solid $u-border-color;
			font-size: 26rpx;
			text-align: center;
			color: $u-type-info-dark;
		}
		.evaluate {
			color: #ff9900;
			border-color: #ff9900;
		}
      .replay-content {
        margin-top: 20rpx;
        background: whitesmoke;
        border-radius: 4px;
        padding: 10rpx;

        & > view:first-child {
          font-weight: bold;
          font-size: 30rpx;
          margin-bottom: 8rpx;
          color: #000;
        }

        & > view:last-child {
          font-size: 26rpx;
          color: #666;
          line-height: 30rpx;
        }
      }

      .evaluate-content {
        color: #555555;
        font-size: 28rpx;
        text-align: left;
        padding-top: 8rpx;

        .imgs {
          display: flex;
          flex-wrap: wrap;
          padding-top: 8rpx;

          .imgs-box {
            width: 25%;
            padding-right: 10rpx;
            box-sizing: border-box;

            image {
              border-radius: 8rpx;
            }
          }
        }
      }
    }

    .no-lists {
      padding: 40rpx 0;
      text-align: center;
      font-size: 40rpx;
      color: #666;
      display: 1;
    }
  }
}

.tag-box {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: 20rpx;
  font-size: 18rpx;
}
</style>
