<template>
  <view class="content_box">
    <u-form :model="form" ref="uForm" :border-bottom="false">
      <!-- <view class="card-list logo">
				<u-upload :action="upimgUrl" ref="uUploadLogo" width="160" height="160" multiple='false' upload-text="商品封面" max-count="1"></u-upload>
			</view> -->
      <view class="card-list">
        <u-upload
          :action="upimgUrl"
          :file-list="fileBannerList"
          ref="uUpBannerimg"
          width="160"
          height="160"
          multiple="false"
          upload-text="商品图"
          max-count="1"
        ></u-upload>
      </view>
      <view class="card-list">
        <u-form-item
          label="商品名"
          prop="goods_name"
          label-width="170rpx"
          left-icon="edit-pen"
          required="true"
        >
          <u-input v-model="form.goods_name" placeholder="请输入商品名" />
        </u-form-item>

        <u-form-item
          label="市场价"
          prop="market_price"
          label-width="170rpx"
          left-icon="edit-pen"
          required="true"
        >
          <u-input
            v-model="form.market_price"
            type="digit"
            placeholder="请输入市场价(元)"
          />
        </u-form-item>
        <u-form-item
          label="销售价"
          prop="price"
          label-width="170rpx"
          left-icon="edit-pen"
          required="true"
        >
          <u-input
            v-model="form.price"
            type="digit"
            placeholder="请输入销售价(元)"
          />
        </u-form-item>

        <u-form-item
          label="分类"
          label-width="170rpx"
          left-icon="edit-pen"
          required="true"
        >
          <u-input
            v-model="form.cate_title"
            disabled
            @click="CateShow = true"
            placeholder="请选择分类"
          />
        </u-form-item>
        <!-- <u-form-item label="配送" label-width="170rpx" left-icon="edit-pen" required="true">
					<u-input v-model="form.deliver_way_title" disabled @click="deliverWayShow = true" placeholder="请选择配送方式"/>
				</u-form-item> -->
        <u-form-item label="库存" label-width="170rpx" left-icon="edit-pen">
          <u-input
            v-model="form.stock"
            type="number"
            placeholder="不提交库存则表示该商品无限库存"
          />
        </u-form-item>
        <u-form-item label="起购(件)" label-width="170rpx" left-icon="edit-pen">
          <u-input
            v-model="form.start_num"
            type="number"
            placeholder="请输入起购件数"
          />
        </u-form-item>
        <u-form-item label="打包费" label-width="170rpx" left-icon="edit-pen">
          <u-input
            v-model="form.box_price"
            type="digit"
            placeholder="请输入打包费(元)"
          />
        </u-form-item>
        <u-form-item label="商品描述" label-width="170rpx" left-icon="edit-pen">
          <u-input
            v-model="form.goods_desc"
            type="digit"
            placeholder="请输入描述"
          />
        </u-form-item>
        <u-select
          v-model="CateShow"
          value-name="cateid"
          label-name="title"
          :list="CateList"
          @confirm="cateConfirm"
        ></u-select>
        <!-- <u-select v-model="deliverWayShow" :list="deliverWayList" @confirm="deliverWayConfirm"></u-select> -->
      </view>
      <view class="card-list" style="padding: 35rpx 25rpx">
        <view class="d-flex" style="padding: 0 0 15rpx">
          <view class="flex">规格配置</view>
          <view style="padding: 0 0 0 15rpx"
            ><u-icon name="plus-circle" size="36" @click="skuAdd"></u-icon
          ></view>
        </view>
        <view
          class="d-flex"
          v-for="(item, index) in skuNum"
          :key="index"
          style="padding: 15rpx 0; border-bottom: 1rpx solid #efefef"
        >
          <view class="flex">
            <u-input v-model="form.sku_name[index]" placeholder="规格名称" />
          </view>
          <view class="flex">
            <u-input
              v-model="form.sku_price[index]"
              type="digit"
              placeholder="规格价格"
            />
          </view>
          <view style="align-self: center; padding: 0 0 0 15rpx">
            <u-icon
              name="minus-circle"
              size="36"
              @click="skuDel(index)"
            ></u-icon>
          </view>
        </view>
      </view>
      <view
        class="card-list"
        style="padding: 35rpx 25rpx"
        v-if="skuNopriceArr.length > 0"
      >
        <view v-for="(item, index) in skuNopriceArr" :key="index" class="sku-noprice-arr">
          <view class="d-flex" style="padding: 0 0 15rpx;justify-content:space-between">
            <view class="flex" style="color:#fa3534;font-weight:bold;">{{ item.skuType }}</view>
            <view class="flex" style="display:flex;flex:1;justify-content:space-between;">
              <u-button type="error" size='mini' :plain="true" @click="DelSkuNoPrice(index)">移除类目</u-button>
              <u-button type="error" size='mini' :plain="true" @click="EditSkuNoPrice(index)">编辑类目</u-button>
            </view>
            <view  style="padding: 0 0 0 15rpx;display:flex;flex:1;justify-content:flex-end;"
              ><u-icon
                name="plus-circle"
                size="36"
                @click="skuNoPriceAdd(index,item)"
              ></u-icon
            ></view>
          </view>
          <view
            class="d-flex"
            v-for="(itemChildren, indexChildren) in item.skuNoPriceNum"
            :key="indexChildren"
            style="padding: 15rpx 0; border-bottom: 1rpx solid #efefef"
          >
            <view class="flex">
              <u-input
                v-model="skuNopriceArr[index].skuArr[indexChildren].name"
                placeholder="规格名称"
              />
            </view>
            <view style="align-self: center; padding: 0 0 0 15rpx">
              <u-icon
                name="minus-circle"
                size="36"
                @click="skuNopriceDel(index, indexChildren,item)"
              ></u-icon>
            </view>
          </view>
        </view>
      </view>
      <view class="card-list" style="padding: 35rpx 25rpx">
        <u-button type="error" :plain="true" :disabled='isDisabled' @click="addSkuNoPrice">新增附属规格</u-button>
      </view>
      <view class="card-list" style="padding: 35rpx 25rpx; display: none">
        <view>
          <u-upload
            :action="upimgUrl"
            :file-list="fileDescList"
            ref="uUpDescimg"
            width="160"
            height="160"
            multiple="false"
            upload-text="商品详情图"
          ></u-upload>
        </view>
      </view>
    </u-form>
    <u-button @click="submit" type="error">提交</u-button>

    <u-toast ref="uToast" />
    <u-modal
      v-model="skuNameInputShow"
      title="请输入规格类别"
      :showCancelButton="true"
      @confirm="skuNameInputConfirm"
      @cancel="skuNameInputCancel"
    >
      <view style="padding: 20px">
        <u-input
          placeholder="请输入规格类别"
          border="surround"
          v-model="skuNameInputValue"
          clearable
        ></u-input>
      </view>
    </u-modal>
  </view>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data() {
    return {
      btn_state: true,
      CateShow: false,
      // deliverWayShow:false,
      CateList: [],
      skuNum: 0, // 规格数目
      form: {
        cate_title: "",
        goods_name: "",
        market_price: "",
        price: "",
        stock: "",
        // deliver_way_title:'',
        box_price: "",
        sku_name: [],
        sku_price: [],
        goods_desc: "",
        start_num: "",
      },

      model: {
        cateid: 0,

        goods_id: 0,
        // goods_pic:'',
        goods_banner: [],
        goods_desc: [],

        goods_name: "",
        market_price: 0,
        price: 0,
        stock: "",
        // deliver_way: 99,
        box_price: 0,
        sku_name: [],
        sku_price: [],
        start_num: "",
      },
      rules: {
        goods_name: [
          {
            required: true,
            message: "请输入商品名",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        market_price: [
          {
            required: true,
            message: "请输入市场价",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        price: [
          {
            required: true,
            message: "请输入销售价",
            // 可以单个或者同时写两个触发验证方式
            trigger: ["change", "blur"],
          },
        ],
        // stock: [
        // 	{
        // 		required: true,
        // 		message: '请输入库存',
        // 		// 可以单个或者同时写两个触发验证方式
        // 		trigger: ['change', 'blur']
        // 	}
        // ]
      },
      // deliverWayList:[{
      // 	value: '0',
      // 	label: '店内和外卖'
      // },
      // {
      // 	value: '1',
      // 	label: '仅外卖'
      // },
      // {
      // 	value: '2',
      // 	label: '仅店内'
      // }],
      fileBannerList: [],
      fileDescList: [],
      skuNameInputShow: false, //附属规格名称设置弹窗
      skuNameInputValue: "",
      skuNopriceArr: [],
      skuNoPriceNum: 0,
      noPirceSku: [],
      noPriceStatus:'add',
      noPriceIndex:0
    };
  },
  computed: {
    ...mapGetters("config", ["config"]),
    ...mapGetters("detail", ["upimgUrl"]),
    isDisabled(){
      return   this.skuNopriceArr.length>=2?true:false
    }
  },
  onLoad(option) {
    this.model.goods_id = option.goods_id;
    this.model.goods_id = 838;
  },
  mounted() {
    this.formatData();
  },
  methods: {
    // 编辑类目名
    EditSkuNoPrice(index){
      this.noPriceStatus='editor'
      this.noPriceIndex=index
      this.skuNameInputShow=true
      this.skuNameInputValue=this.skuNopriceArr[index].skuType
    },
    // 附属规格--
    skuNopriceDel(index, childIndex,item) {
      this.skuNopriceArr[index].skuNoPriceNum = Number(item.skuNoPriceNum) - 1;
      this.skuNopriceArr[index].skuArr.splice(childIndex, 1);
    },
    // 附属规格++
    skuNoPriceAdd(index,item) {
      this.skuNopriceArr[index].skuArr.push({
        name: "",
      });
     this.skuNopriceArr[index].skuNoPriceNum = Number(item.skuNoPriceNum) + 1;
      this.skuNopriceArr[index].skuArr[item.skuNoPriceNum - 1].name = "";
    },
    // 输入附属规格名确认
    skuNameInputConfirm() {
      if( this.noPriceStatus=='add'){
        this.skuNopriceArr.push({
        skuType: this.skuNameInputValue,
        skuNoPriceNum:0,
        skuArr:[]
       
      })
      }else{
         this.skuNopriceArr[this.noPriceIndex].skuType=this.skuNameInputValue
      }
      this.skuNameInputValue = "";
     
    },
    // 输入附属规格名取消
    skuNameInputCancel() {
      this.skuNameInputValue = "";
    },
    // 点击移除附属规格
    DelSkuNoPrice(index){
       this.skuNopriceArr.splice(index,1)
    },
    // 点击新增附属规格
    addSkuNoPrice() {
      this.skuNameInputShow = true;
    },
    formatData() {
      let _this = this;
      _this.$store.dispatch("user/cateList").then((res) => {
        if (res.code == 0) {
          _this.CateList = res.message;
        } else {
          _this.$refs.uToast.show({
            title: res.message,
          });
        }
      });

      _this.$store
        .dispatch("user/goodsRead", { goods_id: this.model.goods_id })
        .then((res) => {
          if (res.code == 0) {
            _this.model.cateid = res.message.cateid;
            _this.form.cate_title = res.message.cate_title;
            _this.form.goods_name = res.message.goods_name;
            _this.form.market_price = res.message.market_price;
            _this.form.price = res.message.price;
            _this.form.goods_desc = res.message.goods_desc;
            _this.form.start_num = res.message.start_num;
            let otherSku=res.message.other_sku_fmt
            if(otherSku.length){
              otherSku.forEach((item,index)=>{
                  _this.skuNopriceArr[index]={
                    "skuNoPriceNum":item.other_sku_data.length,
                    "skuType":item.other_sku_name,
                    "skuArr":item.other_sku_data.map((item1,index1)=>{
                    return {"name":item1}
                  })

                  }
              })
            }
            if (res.message.stock == -1) {
              _this.form.stock = "";
            } else {
              _this.form.stock = Number(res.message.stock);
            }

            _this.form.box_price = Number(res.message.box_price_fmt);

            _this.form.sku_fmt = res.message.sku_fmt;
            _this.skuNum = res.message.sku_fmt.length;
            res.message.sku_fmt.map((item) => {
              _this.form.sku_name.push(item.sku_name);
              _this.form.sku_price.push(item.sku_price);
            });

            // _this.model.deliver_way = res.message.deliver_way;

            // if(res.message.deliver_way == 0) {
            // 	_this.form.deliver_way_title = "店内和外卖";
            // } else if(res.message.deliver_way == 1) {
            // 	_this.form.deliver_way_title = "仅外卖";
            // } else {
            // 	_this.form.deliver_way_title = "仅店内";
            // }

            _this.fileBannerList = res.message.goods_banner_list;
            _this.fileDescList = res.message.goods_desc_list;
          } else {
            _this.$refs.uToast.show({
              title: res.message,
            });
          }
        });
    },
    cateConfirm(e) {
      e.map((val, index) => {
        this.form.cate_title = val.label;
        this.model.cateid = val.value;
      });
    },
    // deliverWayConfirm(e){
    // 	e.map((val, index) => {
    // 		this.form.deliver_way_title = val.label;
    // 		this.model.deliver_way = val.value;
    // 	})
    // },

    getComimg() {
      let _this = this;
      let files = [];
      files = this.$refs.uUpBannerimg.lists.filter((val) => {
        return val.progress == 100;
      });
      if (files.length > 0) {
        _this.model.goods_banner = [];
        files.map(function (v, i) {
          if (v["response"]) {
            _this.model.goods_banner.push(v["response"]["message"]["url"]);
          } else {
            _this.model.goods_banner.push(v["url"]);
          }
        });
      }
    },
    getDescimg() {
      let _this = this;
      let files = [];
      files = this.$refs.uUpDescimg.lists.filter((val) => {
        return val.progress == 100;
      });
      if (files.length > 0) {
        _this.model.goods_desc = [];
        files.map(function (v, i) {
          if (v["response"]) {
            _this.model.goods_desc.push(v["response"]["message"]["url"]);
          } else {
            _this.model.goods_desc.push(v["url"]);
          }
        });
      }
    },
    skuAdd() {
      this.skuNum = Number(this.skuNum) + 1;

      this.form.sku_name[this.skuNum - 1] = "";
      this.form.sku_price[this.skuNum - 1] = "";
    },
    skuDel(index) {
      this.skuNum = Number(this.skuNum) - 1;

      this.form.sku_name.splice(index, 1);
      this.form.sku_price.splice(index, 1);
    },
    submit() {
      let _this = this;
      if (!this.btn_state) return false;
      this.btn_state = false;

      _this.model.goods_name = _this.form.goods_name;
      _this.model.market_price = _this.form.market_price;
      _this.model.price = _this.form.price;
      _this.model.stock = _this.form.stock || -1;

      _this.model.box_price = _this.form.box_price;
      _this.model.sku_name = _this.form.sku_name.filter(
        (value) => value !== ""
      );
      _this.model.sku_price = _this.form.sku_price.filter(
        (value) => value !== ""
      );
      _this.model.goods_desc = _this.form.goods_desc;
      _this.model.start_num = _this.form.start_num;
      let  other_sku_data1, other_sku_data2,other_sku_name1,other_sku_name2;
      this.skuNopriceArr.forEach((item,index)=>{
        if(index==0){
          other_sku_name1=item.skuType
          other_sku_data1=item.skuArr.map((item1,index1)=>{
            
            return item1.name
          }).join(',')
        }else if(index==1){
           other_sku_name2=item.skuType
          other_sku_data2=item.skuArr.map((item1,index1)=>{
            return item1.name
          }).join(',')
        }
      })
      _this.model.other_sku_data1=other_sku_data1
      _this.model.other_sku_data2=other_sku_data2
      _this.model.other_sku_name1=other_sku_name1
      _this.model.other_sku_name2=other_sku_name2
      _this.getComimg();
      _this.getDescimg();

      this.$refs.uForm.validate((valid) => {
        if (valid) {
          _this.$store.dispatch("user/goodsEdit", _this.model).then((res) => {
            if (res.code == 0) {
              _this.btn_state = true;
              _this.$refs.uToast.show({
                title: res.message,
              });
              setTimeout(function () {
                uni.navigateBack();
              }, 500);
            } else {
              _this.btn_state = true;
              _this.$refs.uToast.show({
                title: res.message,
              });
            }
          });
        } else {
          _this.btn_state = true;
        }
      });
    },
  },
  // 必须要在onReady生命周期，因为onLoad生命周期组件可能尚未创建完毕
  onReady() {
    this.$refs.uForm.setRules(this.rules);
  },
};
</script>

<style lang="scss">
page {
  background-color: #f8f8f8;
}
.sku-noprice-arr{
  margin-bottom:30rpx;
}
.content_box {
  padding: 0 20rpx 25rpx;
}
.u-checkbox {
  margin-bottom: 20rpx;
}
.u-checkbox__icon-wrap {
  display: none !important;
}
.u-checkbox__label {
  border-radius: 3px;
  padding: 0 10rpx;
  border: 1rpx solid #cccccc;
  color: #bbbbbb !important;
}
.checked .u-checkbox__label {
  border-color: #ea9518;
  background-color: #ea9518;
  color: #ffffff !important;
}
.card-list {
  width: 710upx;
  border-radius: 8upx;

  margin-bottom: 20upx;

  padding: 35rpx 25rpx 35rpx 35rpx;
  box-shadow: 0 5rpx 9rpx 1rpx #dddddd;
  border-bottom: unset;
  background-color: #ffffff;
}
.u-form-left {
  width: 200rpx !important;
  flex: 0 0 200rpx;
}
.u-action-sheet-item {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -webkit-flex-direction: row;
  flex-direction: row;
  line-height: 1;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;
  font-size: 30rpx;
  padding: 32rpx 0;
  -webkit-flex-direction: column;
  flex-direction: column;
}
.u-action-sheet-item__subtext {
  font-size: 24rpx;
  color: $u-tips-color;
  margin-top: 20rpx;
}
.u-actionsheet-cancel {
  color: $u-main-color;
}

.popupcontent .u-border-bottom:after {
  content: " ";
  position: absolute;
  left: 0;
  top: 0;
  pointer-events: none;
  box-sizing: border-box;
  -webkit-transform-origin: 0 0;
  transform-origin: 0 0;
  width: 199.8%;
  height: 199.7%;
  -webkit-transform: scale(0.5);
  transform: scale(0.5);
  border-bottom: 1rpx solid #e4e7ed;
  z-index: 2;
}
.u-line-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.u-gab {
  height: 10rpx;
  background-color: #eaeaec;
}
</style>
