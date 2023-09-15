<template>
  <view>
    <view style="padding: 30rpx 30rpx">
      <u-form :model="form" :rules="rules" ref="uForm" :errorType="errorType">
        <u-form-item label="姓名" prop="realname">
          <u-input type="text" v-model="form.realname" :clearable="false" />
        </u-form-item>
        <u-form-item label="手机" prop="phone">
          <view style="display: flex; width: 100%">
            <view style="flex: 1"><u-input type="text" v-model="form.phone" placeholder="填写手机号用于管理员与你联系" disabled />
            </view>

            <u-button style="padding: 0" size="mini" open-type="getPhoneNumber"
              @getphonenumber="getphonenumber">获取手机号</u-button>
          </view>
        </u-form-item>
        <u-form-item label="证件">
          <u-upload :action="upimgUrl" ref="uUploadLogo" width="160" height="160" multiple="false" upload-text="身份证件"
            max-count="1"></u-upload>
          <view style="color: #bbb">注：上传可证明身份的相关证件即可，详细可资讯<text style="color: #ff9900">客服</text></view>
        </u-form-item>

        <u-form-item label="类型">
          <u-radio-group v-model="form.type_fmt" @change="radioGroupChange">
            <u-radio v-for="(item, index) in type" :key="index" :name="item.name">
              {{ item.name }}
            </u-radio>
          </u-radio-group>
        </u-form-item>
      </u-form>

      <view style="text-align: center; padding: 30rpx">
        <checkbox-group @change="checkboxChange" style="display: inline-block">
          <checkbox value="1" checked="true" />
        </checkbox-group>同意<text @tap="gotoxieyi">《用户服务协议》以及《隐私政策》</text>
      </view>
      
    </view>
    <view style="padding: 30rpx 30rpx">
      <button @tap="submit()" style="
          line-height: 80rpx;
          height: 80rpx;
          font-size: 30rpx;
          color: #ffffff;
          border-color: #ff9900;
          background-color: #ff9900;
        ">
        提交申请
      </button>
    </view>

    <u-toast ref="uToast" />
  </view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { domain } from "../../../tools/utils.js";
export default {
  data() {
    return {
      type: [
        {
          name: "校外",
        },
        {
          name: "校内",
        },
      ],
      form: {
        realname: "",
        phone: "",
        type_fmt: "校外",
        type: 0,
        certification: "",
      },
      rules: {
        realname: [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            message: "请获取手机号",
            trigger: ["change", "blur"],
          },
          {
            validator: (rule, value, callback) => {
              // 调用uView自带的js验证规则，详见：https://www.uviewui.com/js/test.html
              return this.$u.test.mobile(value);
            },
            message: "手机号码不正确",
            // 触发器可以同时用blur和change，二者之间用英文逗号隔开
            trigger: ["change", "blur"],
          },
        ],
      },
      errorType: ["message"],
      checkboxValue1: ["1"],
    };
  },
  computed: {
    ...mapGetters("detail", ["upimgUrl"]),
    ...mapGetters("config", ["config"]),
  },
  onLoad: function (e) {
    // 获取位置变化
    // uni.getStorage({
    //     key: 'getSchoolLocation',
    //     success(res) {
    // 		this.SchoolLocation = res.data;
    // 		this.location = res.data.schoolname;
    //     }
    // });
    console.log(this.config, "config```````````````");
  },
  onUnload() {
    uni.$off("getSchool");
  },
  methods: {
    getLogo(callback) {
      let _this = this;
      let files = [];
      files = this.$refs.uUploadLogo.lists.filter((val) => {
        return val.progress == 100;
      });
      if (files.length > 0) {
        _this.form.certification = "";
        files.map(function (v, i) {
          _this.form.certification = v["response"]["message"]["url"];
        });
      }
    },
    radioGroupChange(e) {
      this.form.type_fmt = e;
      if (this.form.type_fmt == "校外") {
        this.form.type = 0;
      } else if (this.form.type_fmt == "校内") {
        this.form.type = 1;
      }
    },
    checkboxChange(e) {
      console.log(e.detail.value);
      this.checkboxValue1 = e.detail.value;
    },
    gotoxieyi() {
      uni.navigateTo({
        url: "/pages/sub/xieyi/xieyi",
      });
    },

    submit() {
      let _this = this;
      if (this.checkboxValue1.length == 0) {
        uni.showToast({
          title: "请先查阅相关协议",
          icon: "error",
        });
        return;
      }
      this.$refs.uForm.validate((valid) => {
        if (valid) {
          _this.getLogo();
          if (_this.form.certification == "") {
            _this.$refs.uToast.show({
              title: "请上传身份审核证件",
            });
            return false;
          }
        _this.$store
              .dispatch("runner/runnerApply", _this.form)
              .then((res) => {
                if (res.code == 0) {
                  _this.$refs.uToast.show({
                    title: res.message,
                  });
                  uni.navigateBack();
                } else {
                  _this.$refs.uToast.show({
                    title: res.message,
                  });
                }
              });
          
        }
      });
    },

    getphonenumber(e) {
      let _this = this;
      console.log(e.detail.code);
      this.$store
        .dispatch("user/getPhoneNum", { code: e.detail.code })
        .then((res) => {
          if (res.code == 0) {
            _this.form.phone = res.message;
          } else {
            _this.$refs.uToast.show({
              title: res.message,
            });
          }
        });
    },
    change(status) {
      console.log(status);
    },
  },
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style>
u-input {
  flex: 1;
}

.u-form-item--right__content__slot {
  display: flex;
}

.avatarbutton {
  width: 130rpx;
  height: 130rpx;
  border-radius: 50%;
  background-color: transparent;
  padding: 0;
  margin: 0;
  font-size: inherit;
  line-height: inherit;
  border: none;
}

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
