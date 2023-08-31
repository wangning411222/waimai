<template>
  <view class="page_box">
    <view style="display: flex; padding: 25rpx">
      <view style="flex: 1">
        <u-icon name="map"></u-icon>
        <view @click="get_location" style="display: inline-block">
          {{ location }}
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>
      <view style="width: max-content; text-align: right" :class="[noticenums != 0 ? 'text-red' : '']">
        <u-icon name="bell" size="34" @click="news" style="vertical-align: middle"></u-icon>
        <text v-if="noticenums != 0" style="vertical-align: middle">{{
          noticenums
        }}</text>
      </view>
    </view>
    <view style="padding: 20rpx">
      <u-swiper :list="config.banner_list" @click="swiperclick"></u-swiper>
      <view v-if="config.notice != ''">
        <u-notice-bar mode="horizontal" :list="[config.notice]"></u-notice-bar>
      </view>
      <view v-if="config.isshow == 1" class="dnwmBox">
        <!-- <view
          class="dnwmItem d-flex"
          @tap="handleDNWM(1)"
          style="border-right: 1rpx solid #efefef"
        >
          <view>
            <view class="title">校园外卖</view>
            <view class="brief">轻松下单，直达宿舍</view>
          </view>
          <view class="flex-1" style="text-align: right">
            <image
              src="../../static/imgs/waimai.png"
              mode="widthFix"
              style="width: 200rpx"
            ></image>
          </view>
        </view> -->
        <!-- <view class="dnwmItem" @tap="handleDNWM(2)">
					<view class="title">代取代拿</view>
					<view class="brief">轻松下单，代取代拿</view>
					<view style="text-align: right;">
						<image src="../../static/imgs/daiqu.png" mode="widthFix" style="width: 200rpx;"></image>
					</view>
				</view> -->
        <view class="shop-box">
          <u-search placeholder="请输入商家名称" v-model="keywordShopName" :action-style="actionStyle" action-text="搜索"
            border-color="#6ee4c1" search-icon-color="#6ee4c1" bg-color="#fff" @custom="companySearch"
            @search='companySearch' @clear="getShopList"></u-search>
          <view class="shop-tabs">
            <view class="shop-tabs-item" v-for="(item, index) in config.shop_catelist" :key="index"
              @click="cateHandle(item)">
              <u-image width="100%" height="auto" mode="widthFix" :src="item.img" :lazy-load="true"></u-image>
              <text>{{ item.title }}</text>
            </view>
          </view>
          <view class="shop-content">
            <text class="shop-content-title">附近商家</text>
            <view class="select-box">
              <u-button v-for="(item, index) in selectArr" :key="index" :custom-style="customStyle" plain
                :type="selectIndex == index ? 'warning' : 'default'" @click="selecthandle(index)">{{ item.name
                }}</u-button>
            </view>
            <view class="shop-list" v-if="compayList.length">
              <view class="shop-item" v-for="(item, index) in compayList" :key="index">
                <view class="item-top" @click="toShopDetail(item)">
                  <view class="item-top-left">
                    <image :src="item.logo" mode="aspectFill"></image>
                    <view class="business" v-if="item.business_status == 1">歇业</view>
                  </view>
                  <view class="item-top-right" >
                    <view class="item-top-right-name">{{ item.name }}</view>
                    <view class="item-top-right-rate">
                      <!-- <u-icon
                        name="star-fill"
                        color="rgb(247, 186, 42)"
                        size="28"
                      ></u-icon> -->
                      <u-rate :count="count" :value="item.stars - 0" active-color="rgb(247, 186, 42)"
                        :disabled="true"></u-rate>
                      <text class="yello-font-20">{{ item.stars }}</text>
                      <text class="gray-font-20 margin-left-10">已售:{{ item.sales }}</text>
                    </view>
                    <view class="item-top-right-time">
                      <view>
                        <text class="gray-font-20">起送:Ұ{{ item.start_delivery_rmbs }}</text>
                        <text class="gray-font-20 margin-left-10">配送:Ұ{{ item.delivery_rmbs }}</text>
                      </view>
                      <view>
                        <text class="gray-font-20">{{ item.minute }}分钟</text>
                        <text class="gray-font-20 margin-left-10">{{ item.distance }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view class="item-tag" @click="toShopDetail(item)">
                  <u-tag :text="setText(item.enough_free_dyrmbs)" type="info" size="mini" />
                </view>
                <scroll-view scroll-x="true" class="goods_list">
                  <view class="goods_item" v-for="(goodsitem, goodsindex) in item.goods_list" :key="goodsindex"
                    @click="toGoodsDetail(goodsitem, item)">
                    <view class="goods_item-imgbox">
                      <image class="goods_img" :src="goodsitem.goods_pic" style="width:150rpx;height:150rpx"
                        mode="aspectFill"></image>
                      <view>热销</view>
                    </view>
                    <view class="goods_item-name">{{ goodsitem.goods_name }}</view>
                    <view class="goods_item-price yello-font-20">Ұ{{ goodsitem.price }}</view>
                  </view>
                </scroll-view>
              </view>
            </view>
            <u-empty v-else text="暂无数据" mode="data"></u-empty>
          </view>
        </view>
      </view>
    </view>
    <u-sticky>
      <view style="padding: 10rpx 0; background: #fff">
        <liuyuno-tabs :tabData="tab_list" :activeIndex="current" @tabClick="tabClick" />

        <view v-if="current == 0" style="height: 80rpx">
          <ren-dropdown-filter :filterData="filterData" :defaultIndex="defaultIndex" @onSelected="onSelected"
            ref="dropdown"></ren-dropdown-filter>
        </view>
        <view v-if="current != 0" style="height: 80rpx">
          <ren-dropdown-filter :filterData="filterData2" :defaultIndex="defaultIndex2" @onSelected="onSelected"
            ref="dropdown"></ren-dropdown-filter>
        </view>
      </view>
    </u-sticky>
    <view v-if="thread_list.length > 0" style="padding-top: 20rpx; background: #fff; padding-bottom: 5rem">
      <view v-for="(item, index) in thread_list" :key="index">
        <view class="uni-card uni-border">
          <view class="uni-card__title uni-border-bottom">
            <view class="uni-card__title-box">
              <view class="uni-card__title-header" @click="user_detail(item.uid)">
                <image :src="item.avatar_url" class="uni-card__title-header-image" mode="scaleToFill" role="img"></image>
              </view>
              <view class="uni-card__title-content">
                <view class="uni-card__title-content-title uni-ellipsis">
                  {{ item.nick_name }}
                  <u-icon v-if="item.sex == 1" name="man" size="28"></u-icon>
                  <u-icon v-if="item.sex == 2" name="woman" size="28"></u-icon>
                </view>
                <text class="uni-card__title-content-extra uni-ellipsis">{{
                  item.school
                }}</text>
              </view>
              <view v-if="current == 0" style="padding: 0 15rpx; align-self: baseline">
                <text :style="{
                  color:
                    index == 0
                      ? '#fe2d46'
                      : index == 1
                        ? '#f60'
                        : index == 2
                          ? '#faa90e'
                          : '#9195a3',
                  'font-weight':
                    index == 0 || index == 1 || index == 2
                      ? 'bold'
                      : 'initial',
                }" style="font-size: 50rpx; font-style: italic">{{ index + 1 }}</text>
              </view>
              <view v-if="userInfo.gid == 1 || userInfo.gid == 5" style="align-self: flex-start; color: #aaaaaa"
                @click="dele_modal(item.tid, index)">
                <u-icon name="trash"></u-icon>删除
              </view>
            </view>
            <!-- <view @click.stop="report_method(1,0)" style="color: #BBBBBB;">
							<u-icon name="warning"></u-icon> 举报
						</view> -->
          </view>
          <view @click="clickCard(item.tid)" class="uni-card__content uni-card__content--pd"
            style="padding-bottom: 20rpx">
            <view>
              <view class="content-box">
                <text class="content-box-text">{{ item.message }}</text>
              </view>
              <u-row style="text-align: center" v-if="item.img_arr.length > 0">
                <u-col span="4" v-for="(it, i) in item.img_arr" :key="i">
                  <image class="image" mode="aspectFill" :src="it.url" />
                </u-col>
              </u-row>
            </view>
          </view>
          <view class="uni-card__footer uni-border-top">
            <view class="footer-box">
              <view>
                <image v-if="item.xindong == 1" @tap="getWechat(item.uid)" src="../../static/icon/xindong.png"
                  mode="widthFix" style="width: 43rpx; vertical-align: middle"></image>
                <text v-if="item.xindong == 1" style="padding: 0 15rpx">|</text>
                {{ item.create_date_fmt }}
              </view>
              <view style="color: #aaa">
                <view style="margin-right: 25rpx; display: inline-block">
                  <u-icon name="eye" color="#aaa" size="28"></u-icon>
                  <text>{{ item.views }}</text>
                </view>
                <view v-if="item.is_like == 0" @click.stop="like(item.tid, index)"
                  style="margin-right: 25rpx; display: inline-block">
                  <u-icon name="heart" color="#aaa" size="28"></u-icon>
                  <text v-if="item.likes != 0">{{ item.likes }}</text>
                  点赞
                </view>
                <view v-if="item.is_like != 0" @click.stop="unlike(item.tid, index)"
                  style="margin-right: 25rpx; display: inline-block">
                  <u-icon name="heart-fill" color="red" size="28"></u-icon>
                  <text v-if="item.likes != 0">{{ item.likes }}</text>
                  点赞
                </view>

                <view @click.stop="footerClick('comment', item.tid)" style="display: inline-block">
                  <u-icon name="chat" color="#aaa" size="28"></u-icon>
                  <text v-if="item.posts != 0">{{ item.posts }}</text>
                  评论
                </view>
              </view>
            </view>
          </view>
          <view style="padding: 0 24rpx">
            <view style="background: #f3f3f3; border: 6rpx">
              <view class="reply_box" v-for="(item2, index2) in item.reply_list" :key="index2">
                <view class="reply_user">{{ item2.nick_name }}</view>
                <view class="reply_con">：{{ item2.reply_msg }}</view>
                <view style="width: max-content; color: #aaa">
                  <view v-if="item2.is_like == 0" @click.stop="replaylike(item2.replyid, index, index2)"
                    style="display: inline-block">
                    <u-icon name="heart" size="28"></u-icon>
                    <text v-if="item2.likes != 0"> {{ item2.likes }}</text>
                  </view>
                  <view v-if="item2.is_like != 0" @click.stop="replayunlike(item2.replyid, index, index2)"
                    style="display: inline-block">
                    <u-icon name="heart-fill" color="red" size="28"></u-icon>
                    <text v-if="item2.likes != 0"> {{ item2.likes }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>

        <u-gap height="12" bg-color="#efefef" v-if="index < thread_list.length - 1"></u-gap>
      </view>

      <view v-if="current == 1 && maxpage > 1" style="padding-bottom: 50rpx">
        <u-loadmore :status="status" />
      </view>
      <view v-if="current == 0" style="padding-bottom: 50rpx">
        <u-loadmore :status="nomore" />
      </view>
    </view>
    <view class="empty_box" v-if="thread_list.length == 0">
      <u-empty text="暂无数据" src="../../../static/imgs/empty.png" icon-size="300"></u-empty>
    </view>
    <view @click="send_page" style="
        width: 100rpx;
        height: 100rpx;
        line-height: 96rpx;
        text-align: center;
        border-radius: 100%;
        overflow: hidden;
        background-color: #6ee4c1;
        position: fixed;
        bottom: 80rpx;
        right: 30rpx;
        z-index: 1000;
      ">
      <u-icon name="plus" color="#ffffff" size="64" style="vertical-align: middle"></u-icon>
    </view>
    <u-toast ref="uToast" />
    <u-modal v-model="user_show" show-cancel-button="true" content="请先完善个人资料,否则将影响您的点赞/评论/购物等操作权限,确定？" @confirm="confirm"
      confirm-color="#6ee4c1"></u-modal>
    <u-modal v-model="dele_modal_show" show-cancel-button="true" content="确定删除？" @confirm="delete_post"
      confirm-color="#6ee4c1"></u-modal>
  </view>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
// 在页面中定义激励视频广告
let videoAd = null;
export default {
  data() {
    return {
      location: "选择位置",

      user_show: false,
      noticenums: 0,
      dele_modal_show: false,
      choose_tid: 0,
      choose_index: 0,

      status: "loadmore",

      filterData: [
        [
          {
            text: "本周",
            value: 0,
          },
          {
            text: "本月",
            value: 1,
          },
        ],
        [
          {
            text: "同城",
            value: 0,
          },
          {
            text: "本校",
            value: 1,
          },
          {
            text: "全国",
            value: 99,
          },
        ],
      ],
      defaultIndex: [0, 1],
      filterData2: [
        [
          {
            text: "同城",
            value: 0,
          },
          {
            text: "本校",
            value: 1,
          },
          {
            text: "全国",
            value: 99,
          },
        ],
        [
          {
            text: "时间",
            value: 0,
          },
          {
            text: "热度",
            value: 1,
          },
        ],
      ],
      defaultIndex2: [1, 0],

      tab_list: [
        {
          name: "Hot",
          img: "../../static/icon/hot.png",
        },
        {
          name: "Ai世界",
        },
      ],
      current: 1,

      rank_type: 0, //热度

      active_nav: 0, // 热度99
      area: 1,
      orderby: 0,

      thread_list: [],
      page: 1,
      maxpage: 0,

      address_state: false,

      getWechatUid: 0, // 要获取微信的用户的uid
      keywordShopName: "", //搜索关键字
      actionStyle: {
        color: "#6ee4c1",
        padding: "40px ,40px",
        height: "100%",
        "border-radius": "6px",
      },
      selectArr: [
        {
          name: "综合排序",
          value: 0,
        },
        {
          name: "免配送费",
          value: 1,
        },
        {
          name: "领券活动",
          value: 2,
        },
      ], //筛选按钮
      selectIndex: 0, //筛选选中
      customStyle: {
        padding: "10rpx",
        "font-size": "12px",
        height: "60rpx",
      },
      compayList: [],//店铺列表
      count: 5,
      value: 5,
      shopMaxpage: 0,
      shopPage: 1,
      shopStatus: 'loadmore'
    };
  },
  computed: {
    ...mapGetters("user", ["userInfo"]),
    ...mapGetters("config", ["config"]),
  },
  onPullDownRefresh() {
    let _this = this;
    if (this.current != 0) {
      this.init();
      this.$refs.dropdown.initial([1, 0]);
      this.getThreadList(this.active_nav, this.area, 0, this.page, function () {
        uni.stopPullDownRefresh();
      });
    } else {
      this.init();
      this.$refs.dropdown.initial([0, 1]);
      this.getThreadRanks(this.rank_type, this.area, function () {
        uni.stopPullDownRefresh();
      });
    }
  },
  onReachBottom() {
    console.log('22222222222')
    let _this = this;
    this.status = "loading";
    if (this.current != 0) {
      if (this.maxpage > 1 && _this.page <= _this.maxpage) {
        this.getThreadList(
          this.active_nav,
          this.area,
          this.orderby,
          this.page,
          function () {
            _this.status = "loadmore";
          }
        );
      } else {
        _this.status = "nomore";
      }
    }
    // 店铺下拉加载更多
    if (this.shopPage != 0) {
      if (this.shopMaxpage > 1 && this.shopPage <= this.shopMaxpage) {
        this.getShopList('loding')
      } else {
        _this.shopStatus = "nomore";
      }
    }
  },

  onShow() {
    this.getShopList()
    var _this = this;
    uni.getStorage({
      key: "getSchoolLocation",
      success: function (res) {
        _this.SchoolLocation = res.data;

        // 如果第二次获取到了地址，发出请求
        if (_this.address_state) {
          _this.getThreadRanks(0, _this.area);
        }

        _this.getThreadList(_this.active_nav, _this.area, 0, 1);
      },
      fail() {
        _this.address_state = true;
        _this.$refs.uToast.show({
          title: "请先选择学校",
          type: "error",
          url: "pages/sub/location/location",
        });
      },
    });
    this.$store.dispatch("ai_pm/getNewnotice").then((res) => {
      if (res.code == 0) {
        _this.noticenums =
          Number(res.message.newpms) + Number(res.message.system_pms);

        uni.showTabBarRedDot({
          index: 1,
        });
      } else {
        _this.noticenums = 0;
        uni.hideTabBarRedDot({
          index: 1,
        });
      }
    });
  },
  onLoad() {

    let _this = this;
    // #ifdef MP-WEIXIN
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
      videoAd = wx.createRewardedVideoAd({
        adUnitId: "adunit-8230f2e7e5ee5725",
      });
      videoAd.onLoad(() => { });
      videoAd.onError((err) => { });
      videoAd.onClose((res) => {
        // 用户点击了【关闭广告】按钮
        if (res && res.isEnded) {
          // 正常播放结束，可以下发游戏奖励
          _this.$store
            .dispatch("user/getWechat", { cuid: _this.getWechatUid })
            .then((res) => {
              console.log(res.message);
              _this.$refs.uToast.show({
                title: res.message,
              });
              if (res.code == 0) {
                uni.setClipboardData({
                  data: res.message,
                  success: function () {
                    console.log("success");
                  },
                });
              }
            });
        } else {
          // 播放中途退出，不下发游戏奖励
        }
      });
    }

    // #endif

    this.$store.dispatch("login/checkLogin").then((res) => {
      if (res && res.code != 0) {
        _this.$refs.uToast.show({
          title: "登录失败",
        });
      } else {
        let userInfo = uni.getStorageSync("userInfo");
        _this.user();
      }
    });

    // 获取位置变化
    uni.getStorage({
      key: "getSchoolLocation",
      success: function (res) {
        _this.SchoolLocation = res.data;
        _this.location = res.data.schoolname;
      },
    });
    // 监听位置变化
    uni.$on("getLocation", (e) => {
      _this.SchoolLocation = e;
      _this.location = e.location_name;
      // _this.onReady()

      this.getThreadList(this.active_nav, this.area, 0, 1);
      // this.getThreadRanks(0, this.area);
    });
  },
  onReady() {
    // this.getThreadList(this.active_nav, this.area, 0, 1);
    // this.getThreadRanks(0, this.area);
  },
  onUnload() {
    uni.$off("shuaxin");
  },
  methods: {
    // 获取店铺列表
    getShopList(load) {
      if (this.shopStatus == 'loading') {
        return
      }
      this.shopStatus = 'loading'
      let _this = this
      let schoolid = uni.getStorageSync('getSchoolLocation').schoolid;
      let data = {
        page: this.shopPage,
        schoolid: schoolid,
        orderby: this.selectIndex,
        cateid: 0
      }
      this.$store.dispatch("ai_yujian/companyList", data).then((res) => {
        if (res.code == 0) {
          _this.shopMaxpage = res.message.maxpage;
          if (load == 'loading') {
            _this.compayList = _this.compayList.concat(res.message.company_list)
          } else {
            _this.compayList = res.message.company_list
          }

          if (_this.shopMaxpage > 1 && _this.shopPage <= _this.shopMaxpage) {
            _this.shopPage++;
          }
          _this.shopStatus = 'loadmore'
          console.log(_this.compayList, ' _this.compayList _this.compayList')
        }
      });
    },
    //店铺详情
    toShopDetail(item) {
      uni.navigateTo({
        url: '/pages/sub/ai_xiaopu/shop_index?companyid=' + item.companyid
      });

    },
    // 点击商品
    toGoodsDetail(goodsitem, item) {
      uni.navigateTo({
        url: `/pages/sub/ai_xiaopu/shop_index?cateid=${goodsitem.cateid}&companyid=${item.companyid}`
      });
    },
    // 搜索
    companySearch() {
      let _this = this
      let data = {
        keyword: this.keywordShopName
      }
      this.$store.dispatch("ai_yujian/companySearch", data).then((res) => {
        if (res.code == 0) {
          _this.compayList = res.message.company_list
        }
      });
    },
    // 切换店铺筛选
    selecthandle(index) {
      this.selectIndex = index
      this.shopPage = 1
      this.getShopList()
    },
    // 跳转分类页面
    cateHandle(item) {
      console.log(item, 'itme```````````')
      uni.navigateTo({
        url: `/pages/sub/cateShopList/cateShopList?catid=${item.cateid}&title=${item.title}`,
      });
    },
    setText(text) {
      if (text - 0 == 0) {
        return "免配送费"
      } else {
        return `满${text}免配送`
      }

    },
    ...mapMutations(["user/setUserInfo"]),
    user() {
      let _this = this;
      this.$store.dispatch("user/getRead").then((res) => {
        if (res.code == 0) {
          _this.company_status = res.message.company_status;
          _this.is_cert = res.message.is_cert;
          _this.uid = res.message.uid;
          _this["user/setUserInfo"](res.message);
          if (_this.is_cert == 1) {
            _this.cert = "#FF7925";
          }
        }
      });
    },
    news() {
      uni.navigateTo({
        url: "/pages/sub/ai_news/index",
      });
    },
    init() {
      this.thread_list = [];
      this.rank_type = 0;
      this.page = 1;
      this.area = 1;
      this.orderby = 0;
      this.defaultIndex2 = [1, 0];
      // this.$refs.dropdown.initial([0, 0]);
    },
    get_location() {
      uni.navigateTo({
        url: "/pages/sub/location/location",
      });
    },
    handleDNWM(type) {
      if (type == 1) {
        uni.navigateTo({
          url: "/pages/sub/ai_xiaopu/index",
        });
        return false;
      }
      this.$refs.uToast.show({
        title: "敬请期待",
      });
    },
    onSelected(res) {
      if (this.current == 0) {
        this.thread_list = [];
        this.page = 1;

        let rank_type = res[0][0]["value"];
        this.area = res[1][0]["value"];
        this.rank_type = rank_type;
        this.getThreadRanks(rank_type, this.area);
      } else {
        this.thread_list = [];
        this.page = 1;
        this.area = res[0][0]["value"];
        this.orderby = res[1][0]["value"];

        this.getThreadList(this.active_nav, this.area, this.orderby, this.page);
      }
    },
    getThreadRanks(rank_type, area, callback = () => { }) {
      area = this.area;
      var _this = this;
      var data_arr = {
        rank_type: rank_type,
        area: area,
        schoolid: _this.SchoolLocation.schoolid,
      };

      this.$store.dispatch("ai_yujian/getThreadRank", data_arr).then((res) => {
        if (res.code == 0) {
          _this.thread_list = _this.thread_list.concat(res.message);

          _this.maxpage = res.message.maxpage;
          if (_this.maxpage > 1 && _this.page <= _this.maxpage) {
            _this.page++;
          }

          callback();
        } else {
        }
      });
    },

    getThreadList(fid, area, orderby, page, callback = () => { }) {
      area = this.area;
      var _this = this;
      var data_arr = {
        orderby: orderby,
        fid: fid,
        area: area,
        page: page,
        schoolid: _this.SchoolLocation.schoolid,
      };

      _this.maxpage = 0;
      this.$store.dispatch("ai_yujian/getThreadList", data_arr).then((res) => {
        if (res.code == 0) {
          _this.thread_list = _this.thread_list.concat(res.message.thread_list);

          _this.maxpage = res.message.maxpage;
          if (_this.maxpage > 1 && _this.page <= _this.maxpage) {
            _this.page++;
          }
          callback();
        } else {
        }
      });
    },
    tabClick(index) {
      this.current = index;

      if (index == 0) {
        this.init();
        this.getThreadRanks(0, this.area);
      } else {
        if (index == 1) {
          this.active_nav = 99;
        } else if (index == 2) {
          this.active_nav = 0;
        } else if (index == 3) {
          this.active_nav = 1;
        }
        this.init();
        console.log(this.area);
        this.getThreadList(this.active_nav, this.area, 0, 1);
      }
    },
    user_detail(uid) {
      uni.navigateTo({
        url: "/pages/sub/ai_user/index?uid=" + uid,
      });
    },
    clickCard(tid) {
      uni.navigateTo({
        url: "/pages/sub/ai_yujian/yujian_comment?tid=" + tid,
      });
    },
    footerClick(types, tid) {
      if (types == "comment") {
        uni.navigateTo({
          url: "/pages/sub/ai_yujian/yujian_comment?tid=" + tid,
        });
      }
    },
    send_page() {
      if (this.userInfo.is_cert == 0) {
        this.user_show = true;
        return false;
      }
      uni.navigateTo({
        url: "/pages/sub/ai_yujian/send",
      });
    },
    confirm() {
      uni.navigateTo({
        url: "/pages/sub/center/userinfo_add",
      });
    },
    like(tid, index) {
      let _this = this;
      if (this.userInfo.is_cert == 0) {
        this.user_show = true;
        return false;
      }

      this.$store
        .dispatch("ai_yujian/postThreadLike", {
          tid: tid,
        })
        .then((res) => {
          if (res.code == 0) {
            let likes = _this.thread_list[index]["likes"];
            _this.thread_list[index]["likes"] = Number(likes) + 1;
            _this.thread_list[index]["is_like"] = 1;
          } else {
          }
        });
    },
    unlike(tid, index) {
      let _this = this;
      if (this.userInfo.is_cert == 0) {
        this.user_show = true;
        return false;
      }
      this.$store
        .dispatch("ai_yujian/postThreadUnlike", {
          tid: tid,
        })
        .then((res) => {
          if (res.code == 0) {
            let likes = _this.thread_list[index]["likes"];
            _this.thread_list[index]["likes"] = Number(likes) - 1;
            _this.thread_list[index]["is_like"] = 0;
          } else {
          }
        });
    },
    dele_modal(tid, index) {
      this.dele_modal_show = true;
      this.choose_tid = tid;
      this.choose_index = index;
    },
    delete_post() {
      let _this = this;
      _this.$store
        .dispatch("user/deleThread", {
          tid: this.choose_tid,
        })
        .then((res) => {
          if (res.code == 0) {
            _this.thread_list.splice(this.choose_index, 1);
            _this.$refs.uToast.show({
              title: res.message,
            });
          } else {
            _this.$refs.uToast.show({
              title: res.message,
            });
          }
        });
    },
    swiperclick: function (index) {
      if (this.config.banner_list[index]["url"]) {
        uni.navigateTo({
          url: this.config.banner_list[index]["url"],
        });
      }
    },

    getWechat(cuid) {
      let _this = this;
      if (this.userInfo.is_cert == 0) {
        this.user_show = true;
        return false;
      }
      this.getWechatUid = cuid;
      // #ifdef MP-WEIXIN
      // 用户触发广告后，显示激励视频广告
      if (videoAd) {
        videoAd.show().catch(() => {
          // 失败重试
          videoAd
            .load()
            .then(() => videoAd.show())
            .catch((err) => {
              console.log("激励视频 广告显示失败");
            });
        });
      }
      // #endif
    },
    replaylike(replyid, index, index2) {
      if (this.userInfo.is_cert == 0) {
        this.user_show = true;
        return false;
      }

      let _this = this;
      this.$store
        .dispatch("ai_yujian/postReplyLike", { replyid: replyid })
        .then((res) => {
          if (res.code == 0) {
            let likes = _this.thread_list[index]["reply_list"][index2]["likes"];
            _this.$set(
              _this.thread_list[index]["reply_list"][index2],
              "likes",
              Number(likes) + 1
            );
            _this.$set(
              _this.thread_list[index]["reply_list"][index2],
              "is_like",
              1
            );
          } else {
          }
        });
    },
    replayunlike(replyid, index, index2) {
      if (this.userInfo.is_cert == 0) {
        this.user_show = true;
        return false;
      }

      let _this = this;
      this.$store
        .dispatch("ai_yujian/postReplyUnlike", { replyid: replyid })
        .then((res) => {
          if (res.code == 0) {
            let likes = _this.thread_list[index]["reply_list"][index2]["likes"];
            _this.$set(
              _this.thread_list[index]["reply_list"][index2],
              "likes",
              Number(likes) - 1
            );
            _this.$set(
              _this.thread_list[index]["reply_list"][index2],
              "is_like",
              0
            );
          } else {
          }
        });
    },
  },
  onShareAppMessage() { },
  onShareTimeline() { },
};
</script>

<style lang="scss">
@charset "UTF-8";

page {
  background-color: #eeeeee;
}

.u-col-4 {
  padding: 0 !important;
}

.page_box {
  /* padding: 0 20rpx 25rpx; */
}

.uni-card {
  margin: 0 !important;
}

.image {
  width: 210rpx;
  height: 210rpx;
}

.content-box {
  padding-bottom: 20rpx;
}

.content-box-text {
  font-size: 12px;
  line-height: 22px;
}

.footer-box {
  /* #ifndef APP-NVUE */
  display: flex;
  /* #endif */
  justify-content: space-between;
  flex-direction: row;

  /* text-align: right; */
  color: #aaaaaa;
}

.footer-box__item {
  align-items: center;
  padding: 2px 0;
  font-size: 12px;
  color: #666;
}

.empty_box {
  width: 100%;

  padding-top: 60rpx;
  background: #fff;
}

.dnwmBox {
  display: flex;
  background: #fff;
  margin-top: 20rpx;
  border-radius: 20rpx;
}

.dnwmItem {
  flex: 1;
  padding: 30rpx 30rpx 20rpx 40rpx;
}

.dnwmItem .title {
  font-size: 42rpx;
  font-weight: bold;
}

.dnwmItem .brief {
  color: #a9a7a7;
  margin: 25rpx 0;
}

.reply_box {
  display: flex;
  padding: 15rpx 24rpx;
  margin-bottom: 10rpx;
}

.reply_box .reply_user {
  width: max-content;
  color: #36deac;
}

.reply_box .reply_con {
  flex: 1;
  color: #aaaaaa;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.uni-border-top:after {
  border-top-color: #eee !important;
}

.shop-box {
  flex: 1;
  padding-top: 30rpx;

  .shop-tabs {
    padding: 20rpx 20rpx;
    margin-top: 40rpx;
    display: flex;
    flex-direction: row;
    flex-flow: wrap;

    .shop-tabs-item {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      flex: 0 0 25%;
      // margin-right:60rpx;
      margin-bottom: 20rpx;

      u-image {
        width: 80rpx;
        height: 80rpx;
      }

      text {
        margin-top: 10rpx;
        color: #ccc;
      }
    }
  }

  .shop-content {
    background: whitesmoke;
    padding: 20rpx 10rpx;
    display: flex;
    flex-direction: column;

    .shop-content-title {
      font-size: 30rpx;
      color: #000;
      font-weight: bold;

    }

    .u-empty {
      display: 1;
    }

    .select-box {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      margin-top: 20rpx;

      u-button {
        flex: 0 0 20%;
        margin-right: 20rpx;
      }
    }

    .shop-list {
      background: whitesmoke;
      border-radius: 4px;
      margin-top: 30rpx;

      .shop-item {
        background: #fff;
        margin-bottom: 20rpx;
        padding: 20rpx;

        .item-top {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;

          .item-top-left {
            width: 200rpx;
            height: 150rpx;
            border: 1px solud #ccc;
            border-radius: 4px;
            border: 1px solid #ccc;
            position: relative;

            .business {
              position: absolute;
              bottom: 0;
              width: 100%;
              background: #2f2d2d90;
              color: #fff;
              height: 40rpx;
              line-height: 40rpx;
              text-align: center;
              left: 0;

            }

            image {
              width: 100%;
              height: 100%;
            }
          }

          .item-top-right {
            margin-left: 20rpx;
            flex: 1;

            .item-top-right-name {
              font-size: 30rpx;
              color: #000;
              font-weight: bold;
            }

            .item-top-right-rate {
              margin: 5rpx 0;
            }

            .item-top-right-time {
              display: flex;
              flex-direction: row;
              justify-content: space-between;
              align-items: center;
            }

            .gray-font-20 {
              color: gray;
              font-size: 24rpx;
            }

            .yello-font-20 {
              color: rgb(247, 186, 42);
              font-size: 24rpx;
            }

            .margin-left-10 {
              margin-left: 10rpx;
            }
          }
        }

        .item-tag {
          margin-left: 220rpx;
          display: flex;
          flex-direction: row;

          u-tag {
            margin-right: 10rpx;
          }
        }

        .goods_list {
          margin-top: 10rpx;
          height: 240rpx;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
          flex-direction: row;

          .goods_item {
            float: left;
            margin-right: 20rpx;
            display: flex;
            flex-direction: column;
            max-width: 150rpx;

            .goods_item-imgbox {
              position: relative;

              .goods_img {
                width: 150rpx;
                height: 150rpx;

              }

              view {
                position: absolute;
                left: 0rpx;
                bottom: 0rpx;
                width: 60rpx;
                height: 30rpx;
                color: #fff;
                background: rgb(247, 186, 42);
                border-radius: 3px;
                font-size: 18rpx;
                line-height: 30rpx;
                text-align: center;
              }
            }

            .goods_item-name {
              color: #666;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }

            .yello-font-20 {
              color: rgb(247, 186, 42);
              font-size: 24rpx;
            }

          }

        }
      }
    }
  }
}</style>
