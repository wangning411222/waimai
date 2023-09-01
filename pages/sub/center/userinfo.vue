<template>
  <view>
    <u-cell-group>
      <u-cell-item title="头像" :arrow="false">
        <image
          :src="content.avatar_url_fmt"
          mode="widthFix"
          style="width: 100rpx; border-radius: 50%"
        ></image>
      </u-cell-item>
      <u-cell-item
        title="昵称"
        :arrow="false"
        :value="content.nick_name"
      ></u-cell-item>

      <u-cell-item
        title="性别"
        :arrow="false"
        :value="content.sex == 1 ? '男' : content.sex == 2 ? '女' : '保密'"
      ></u-cell-item>
      <u-cell-item
        title="手机号"
        :arrow="false"
        :value="content.phone != '' ? content.phone : '暂无'"
      ></u-cell-item>
      <view class="u-cell u-cell u-border-bottom u-border-bottom">
        <view class="u-cell_title u-cell_title">学校</view>
        <view class="u-cell__value u-cell__value" v-if="content.school">
          {{ content.school }}
        </view>
        <view class="u-cell__value u-cell__value" v-if="!content.school">
          暂无
        </view>
      </view>
      <!-- <u-cell-item
        title="入学年份"
        :arrow="false"
        :value="content.real_name != '' ? content.real_name : '暂无'"
      ></u-cell-item> -->
      <u-cell-item
        v-if="config.isshow == 1"
        title="心动式"
        :arrow="false"
        :value="content.wechat != '' ? content.wechat : '暂无'"
      ></u-cell-item>
      <u-cell-item
        v-if="config.isshow == 1"
        title="心动式状态"
        :arrow="false"
        :value="content.ispublic == '1' ? '公开' : '私密'"
      ></u-cell-item>
    </u-cell-group>
    <view class="u-padding-left-30 u-padding-right-30 u-padding-top-30">
      <u-button type="primary" @click="edit_userinfo">编辑信息</u-button>
    </view>
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      content: [],
    };
  },
  computed: {
    ...mapGetters("config", ["config"]),
  },
  onShow() {
    this.getRead();
  },
  onLoad: function (e) {},
  methods: {
    getRead() {
      let _this = this;
      this.$store.dispatch("user/getRead", {}).then((res) => {
        if (res.code == 0) {
          _this.content = res.message;
        } else {
          _this.$refs.uToast.show({
            title: res.message,
          });
        }
      });
    },
    edit_userinfo() {
      if (this.content.is_cert == 0) {
        uni.navigateTo({
          url: "/pages/sub/center/userinfo_add",
        });
        return false;
      }
      uni.navigateTo({
        url: "/pages/sub/center/userinfo_edit",
      });
    },
    toChangephone(phone) {
      if (this.content.is_cert == 0) {
        uni.navigateTo({
          url: "/pages/sub/center/userinfo_add",
        });
        return false;
      }
      uni.navigateTo({
        url: "/pages/sub/center/changePhone?phone=" + phone,
      });
    },
  },
};
</script>

<style>
.card {
  padding: 20rpx;
}

.right-img {
  /* height: 150rpx; */
  padding-left: 20rpx;
  /* overflow: hidden; */
}
.text-muted {
  font-size: 12px;
  color: #82848a;
}
.u-cell {
  position: relative;
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  width: 100%;
  padding: 26rpx 32rpx;
  font-size: 28rpx;
  line-height: 54rpx;
  color: #606266;
  background-color: #fff;
  text-align: left;
}
.u-cell_title {
  font-size: 28rpx;
}
.u-cell__title,
.u-cell__value {
  -webkit-box-flex: 1;
  -webkit-flex: 1;
  flex: 1;
}
.u-cell__value {
  overflow: hidden;
  text-align: right;
  vertical-align: middle;
  color: #909399;
  font-size: 26rpx;
}
</style>
