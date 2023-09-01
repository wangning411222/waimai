(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/sub/xieyi/xieyi"],{

/***/ 109:
/*!***************************************************************************!*\
  !*** C:/project/my/waimai/main.js?{"page":"pages%2Fsub%2Fxieyi%2Fxieyi"} ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(wx, createPage) {

var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ 4);
__webpack_require__(/*! uni-pages */ 26);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 25));
var _xieyi = _interopRequireDefault(__webpack_require__(/*! ./pages/sub/xieyi/xieyi.vue */ 110));
// @ts-ignore
wx.__webpack_require_UNI_MP_PLUGIN__ = __webpack_require__;
createPage(_xieyi.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/wx.js */ 1)["default"], __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 2)["createPage"]))

/***/ }),

/***/ 110:
/*!******************************************************!*\
  !*** C:/project/my/waimai/pages/sub/xieyi/xieyi.vue ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./xieyi.vue?vue&type=template&id=7e544bc1& */ 111);
/* harmony import */ var _xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./xieyi.vue?vue&type=script&lang=js& */ 113);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 35);

var renderjs




/* normalize component */

var component = Object(_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["render"],
  _xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/sub/xieyi/xieyi.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 111:
/*!*************************************************************************************!*\
  !*** C:/project/my/waimai/pages/sub/xieyi/xieyi.vue?vue&type=template&id=7e544bc1& ***!
  \*************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./xieyi.vue?vue&type=template&id=7e544bc1& */ 112);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_template_id_7e544bc1___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 112:
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/project/my/waimai/pages/sub/xieyi/xieyi.vue?vue&type=template&id=7e544bc1& ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 113:
/*!*******************************************************************************!*\
  !*** C:/project/my/waimai/pages/sub/xieyi/xieyi.vue?vue&type=script&lang=js& ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./xieyi.vue?vue&type=script&lang=js& */ 114);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_xieyi_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 114:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/project/my/waimai/pages/sub/xieyi/xieyi.vue?vue&type=script&lang=js& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
//
//
//
//
//
//
//
//
//
var _default = {
  data: function data() {
    return {
      strings: '<p>迈校圈平台（以下简称“迈校圈”）深知个人信息对您的重要性，并会尽力保护您的个人信息安全可靠，我们致力于维持您对我们的信任，恪守以下原则，保护您的个人信息：权责一致原则、目的明确原则、选择同意原则、最少够用原则、确保安全原则、主体参与原则、公开透明原则等等。同时我们承诺，我们将按业界成熟的安全解决方案，采取相应的安全保护措施来保护您的个人信息。鉴于此，我们制定本《迈校圈隐私保护政策》（下称“本政策&nbsp;/本隐私保护政策”）并提醒您：</p><h5>您必须同意并遵守我们的《迈校圈用户服务协议》，才可以使用我们的产品及服务。在您同意《迈校圈用户服务协议》之时，您已经同意我们按照本隐私保护政策来使用和披露您的个人信息。本隐私保护政策的全部条款属于《迈校圈用户服务协议》的一部分。</h5><h5>本政策适用于迈校圈平台产品或服务。若我们关联公司的产品或服务中使用了迈校圈平台提供的产品或服务（例如直接使用迈校圈账户登录）但未设独立隐私权政策的，则本政策同样适用于该部分产品或服务。</h5><h5>需要特别说明的是，本政策不适用于其他第三方向您提供的服务，也不适用于迈校圈平台中已另行独立设置隐私权政策的产品或服务。</h5><h5>在使用迈校圈平台各项产品或服务前，请您务必仔细阅读并透彻理解本政策，重点内容我们已采用粗体的方式来表示，望您特别注意，在确认充分理解并同意后使用我们的相关产品或服务。一旦您开始使用迈校圈平台各项产品或服务，即表示您已充分理解并同意本政策。如对本政策内容有任何疑问、意见或建议，您可通过迈校圈平台提供的各种联系方式与我们联系。</h5><h5>本隐私权政策部分将帮助您了解以下内容：</h5><h5>1、我们如何收集和使用您的个人信息</h5><h5>2、我们如何使用&nbsp;Cookie&nbsp;和同类技术</h5><h5>3、我们如何共享、转让、公开披露您的个人信息</h5><h5>4、我们如何保护您的个人信息</h5><h5>5、您如何管理您的个人信息</h5><h5>6、您的个人信息如何在全球范围转移</h5><h5>7、本隐私权政策如何更新</h5><h5>8、如何联系我们</h5><h5>一、我们如何收集和使用您的个人信息</h5><h5>个人信息是指以电子或者其他方式记录的能够单独或者与其他信息结合识别特定自然人身份或者反映特定自然人活动情况的各种信息，我们会出于本政策所述的以下目的，收集和使用您的个人信息：</h5><h5>（一）帮助您成为我们的用户</h5><h5>为完成创建账号，以便我们为您提供服务，您需要提供包括但不限于以下信息：您的手机号码/微信号、居住地、等等。</h5><h5>在注册过程中，如果您提供以下额外信息补全个人资料，将有助于我们给您提供更好的服务和体验：自我介绍、对另一半的要求、个人标签、择偶信息、就读学校等等。但如果您不提供这些信息，将不会影响使用谈个对象婚恋交友平台产品或服务的基本功能。</h5><h5>请注意，您在本网站上公开发布的个人信息，任何登陆到我们产品或使用我们产品的第三人均可全部或部分的查看，以提高您通过我们产品相亲成功的机会。您提供这些信息即表示您同意我们不同程度地向我们产品的使用者披露。</h5><h5>请注意，我们产品的任何用户（无论是否注册或登录）都可以访问、阅览和打印您所提供并公开发布在产品上全部或部分信息，对于他人使用您在我们产品上所提供的信息，我们不承担任何责任。</h5><h5>请注意，我们产品的任何用户（无论是否注册）都可以访问、下载和打印您所提供的除真实姓名和个人联系方式、身份证、学位证、社会保险信息/企业工牌、企业邮箱以外的信息。对于他人使用或公开您在我们网站所提供的信息，我们不承担任何责任。</h5><h5>同时，一旦您使用我们产品或成为会员（无论是付费还是免费），则表示您已许可我们将这些信息披露给我们的附属公司、母公司和相关联的第三方商业机构（包括但不限于谈个对象婚恋交友平台线下婚介服务授权店），以及其他和我们处于共同公司控制权的有关联的法律实体和商业机构。但是，我们同样会要求上述这些法律实体和商业机构在使用和披露这些个人信息时遵守本隐私政策的相关条款。我们也可能会在法律规定或政府机关要求的情况下，即为了回应传票、许可证、法院命令、政府机关指令或其他法律程序，为免除您在生命、身体或财产方面之急迫危险，为防止他人权益之重大危害，提高用户的使用安全性并提供客户支持，及其他维护用户及我们产品利益的情形下，去披露这些信息。</h5><h5>所有相关的个人信息将会转移到计算机网络中进行维护，在符合当地法律规定的前提下，计算机网络可能位于您居住地以外的省/自治区/直辖市、国家/地区或其他政府管辖区域，在这些国家/地区可能没有像您所在的国家/地区那样对个人信息给予同等力度的法律保护。</h5><h5>（二）为您展示和推送商品或服务</h5><h5>为改善我们的产品或服务、向您提供个性化的信息搜索及交易服务，我们会根据您的浏览及搜索记录、设备信息、位置信息、交易信息等，提取您的浏览、搜索偏好、行为习惯、位置信息等特征，基于特征标签进行间接人群画像并展示、推送信息。</h5><h5>如果您不想接受我们给您发送的商业广告，您可随时通过相应产品退订功能取消。</h5><h5>（三）向您提供商品或服务</h5><h5>1、您向我们提供的信息</h5><h5>您在注册账户或使用我们的服务时，向我们提供的相关个人信息，例如电话号码、电子邮件、支付宝账号等向单身青年自救平台提供该其他方的前述个人信息之前，您需确保您已经取得其授权同意。</h5><h5>2、我们在您使用服务过程中收集的信息</h5><h5>为向您提供更契合您需求的页面展示和搜索结果、了解产品适配性、识别账号异常状态，我们会收集关于您使用的服务以及使用方式的信息并将这些信息进行关联，这些信息包括：</h5><h5>设备信息：&nbsp;我们会根据您在软件安装及使用中授予的具体权限，接收并记录您所使用的设备相关信息（例如设备型号、操作系统版本、设备设置、唯一设备标识符等软硬件特征信息）、设备所在位置相关信息（例如Idiv&nbsp;地址、GdivS位置以及能够提供相关信息的Wi-Fi&nbsp;接入点、蓝牙和基站等传感器信息，您确认成功注册“迈校圈”帐号视为确认授权我们提取、公开及使用您的地理位置信息。如您需要终止向其他用户公开其地理位置信息，可随时自行设置为隐身状态）。</h5><h5>日志信息：&nbsp;当您使用我们的客户端、微信小程序或微信公众号及微信web端提供的产品或服务时，我们会自动收集您对我们服务的详细使用情况，作为有关网络日志保存。例如您的搜索查询内容、Idiv地址、浏览器的类型、电信运营商、使用的语言、访问日期和时间及您访问的网页记录等。请注意，单独的设备信息、日志信息等是无法识别特定自然人身份的信息。如果我们将这类非个人信息与其他信息结合用于识别特定自然人身份，或者将其与个人信息结合使用，则在结合使用期间，这类非个人信息将被视为个人信息，除取得您授权或法律法规另有规定外，我们会将该类个人信息做匿名化、去标识化处理。</h5><h5>当您与我们联系时，我们可能会保存您的通信/通话记录和内容或您留下的联系方式等信息，以便与您联系或帮助您解决问题，或记录相关问题的处理方案及结果。</h5><h5>3、我们通过间接获得方式收集到的您的个人信息</h5><h5>您可通过迈校圈平台账号在我们提供的链接入口使用我们关联公司提供的产品或服务，为便于我们基于关联账号共同向您提供一站式服务并便于您统一进行管理，我们在迈校圈平台集中展示您的信息或推荐您感兴趣的信息。</h5><h5>当您通过我们产品或服务使用上述服务时，您授权我们根据实际业务及合作需要从我们关联公司处接收、汇总、分析我们确认其来源合法或您授权同意其向我们提供的您的个人信息或交易信息。</h5><h5>如您拒绝提供上述信息或拒绝授权，可能无法使用我们关联公司的相应产品或服务，或者无法展示相关信息，但不影响使用谈个对象婚恋交友平台核心服务。</h5><h5>（四）为您提供安全保障</h5><h5>请注意，为确保用户身份真实性、向您提供更好的安全保障，您可以向我们提供身份证、社保卡、学历证明、企业邮箱、企业工牌等身份信息完成实名认证。如您拒绝提供上述信息，可能无法使用账户管理、开通直播、继续可能存在风险的交易等服务，但不会影响您使用浏览、聊天等服务。</h5><h5>为提高您使用我们及我们关联公司、合作伙伴提供服务的安全性，保护您或其他用户或公众的人身财产安全免遭侵害，更好地预防钓鱼网站、欺诈、网络漏洞、计算机病毒、网络攻击、网络侵入等安全风险，更准确地识别违反法律法规或迈校圈平台相关协议规则的情况，我们可能使用或整合您的用户信息、交易信息、设备信息、有关网络日志以及我们关联公司、合作伙伴取得您授权或依据法律共享的信息，来综合判断您账户及交易风险、进行身份验证、检测及防范安全事件，并依法采取必要的记录、审计、分析、处置措施。</h5><h5>（五）其他用途</h5><h5>我们将信息用于本政策未载明的其他用途，或者将基于特定目的收集而来的信息用于其他目的时，会事先征求您的同意。</h5><h5>（六）征得授权同意的例外</h5><h5>根据相关法律法规规定，以下情形中收集您的个人信息无需征得您的授权同意：</h5><h5>1、与国家安全、国防安全有关的；</h5><h5>2、与公共安全、公共卫生、重大公共利益有关的；</h5><h5>3、与犯罪侦查、起诉、审判和判决执行等有关的；</h5><h5>4、出于维护个人信息主体或其他个人的生命、财产等重大合法权益但又很难得到您本人同意的；</h5><h5>5、所收集的个人信息是您自行向社会公众公开的；</h5><h5>6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道；</h5><h5>7、根据您的要求签订合同所必需的；</h5><h5>8、用于维护所提供的产品或服务的安全稳定运行所必需的，例如发现、处置产品或服务的故障；</h5><h5>9、为合法的新闻报道所必需的；</h5><h5>10、学术研究机构基于公共利益开展统计或学术研究所必要，且对外提供学术研究或描述的结果时，对结果中所包含的个人信息进行去标识化处理的；</h5><h5>11、法律法规规定的其他情形。</h5><h5>如我们停止运营迈校圈平台产品或服务，我们将及时停止继续收集您个人信息的活动，将停止运营的通知以逐一送达或公告的形式通知您，对所持有的个人信息进行删除或匿名化处理。</h5><h5>（七）反爬虫申明</h5><h5>除非迈校圈平台另行声明，迈校圈平台内所有的用户资料（包括：昵称、个人基本信息、工作职业信息、自我介绍、相册图片等）的所有权利（包括肖像权、隐私权及其他相关权利）均归迈校圈平台及对应用户所有。未经平台或用户本人许可，任何人或机构不得以包括机器人、蜘蛛等程序或设备监视、复制、传播、展示、镜像等方式擅自使用平台内任何内容。</h5><h5>二、我们如何使用&nbsp;Cookie&nbsp;和同类技术</h5><h5>（一）Cookie</h5><h5>为确保网站正常运转、为您获得更轻松的访问体验、向您推荐您可能感兴趣的内容，我们会在您的计算机或移动设备上存储名为&nbsp;Cookie&nbsp;的小数据文件。Cookie&nbsp;通常包含标识符、站点名称以及一些号码和字符。借助于&nbsp;Cookie，网站能够存储您的偏好等数据。</h5><h5>（二）网站信标和像素标签</h5><h5>除&nbsp;Cookie&nbsp;外，我们还会在网站上使用网站信标和像素标签等其他同类技术。例如，我们向您发送的电子邮件可能含有链接至我们网站内容的地址链接，如果您点击该链接，我们则会跟踪此次点击，帮助我们了解您的产品或服务偏好以便于我们主动改善客户服务体验。网站信标通常是一种嵌入到网站或电子邮件中的透明图像。借助于电子邮件中的像素标签，我们能够获知电子邮件是否被打开。如果您不希望自己的活动以这种方式被追踪，则可以随时从我们的寄信名单中退订。</h5><h5>三、我们如何共享、转让、公开披露您的个人信息</h5><h5>（一）共享</h5><h5>我们不会与迈校圈平台服务提供者以外的公司、组织和个人共享您的个人信息，但以下情况除外：</h5><h5>1、在获取明确同意的情况下共享：获得您的明确同意后，我们会与其他方共享您的个人信息。</h5><h5>2、在法定情形下的共享：我们可能会根据法律法规规定、诉讼争议解决需要，或按行政、司法机关依法提出的要求，对外共享您的个人信息。</h5><h5>3、与关联公司间共享：为便于我们基于关联账号共同向您提供服务，推荐您可能感兴趣的信息或保护迈校圈平台关联公司或其他用户或公众的人身财产安全免遭侵害，您的个人信息可能会与我们的关联公司共享。我们只会共享必要的个人信息（如为便于您使用迈校圈平台账号使用我们关联公司产品或服务，我们会向关联公司共享您必要的账户信息），如果我们共享您的个人敏感信息或关联公司改变个人信息的使用及处理目的，将再次征求您的授权同意。</h5><h5>4、与授权合作伙伴共享：仅为实现本隐私权政策中声明的目的，我们的某些服务将由我们和授权合作伙伴共同提供。我们可能会与合作伙伴共享您的某些个人信息，以提供更好的客户服务和用户体验。例如安排合作伙伴提供服务。我们仅会出于合法、正当、必要、特定、明确的目的共享您的个人信息，并且只会共享提供服务所必要的个人信息。我们的合作伙伴无权将共享的个人信息用于与产品或服务无关的其他用途。</h5><h5>对我们与之共享个人信息的公司、组织和个人，我们会与其签署严格的数据保护协定，要求他们按照我们的说明、本隐私权政策以及其他任何相关的保密和安全措施来处理个人信息。</h5><h5>（二）转让</h5><h5>我们不会将您的个人信息转让给任何公司、组织和个人，但以下情况除外：</h5><h5>1、在获取明确同意的情况下转让：获得您的明确同意后，我们会向其他方转让您的个人信息；</h5><h5>2、在涉及合并、收购或破产清算情形，或其他涉及合并、收购或破产清算情形时，如涉及到个人信息转让，我们会要求新的持有您个人信息的公司、组织继续受本政策的约束，否则我们将要求该公司、组织和个人重新向您征求授权同意。</h5><h5>（三）公开披露</h5><h5>我们仅会在以下情况下，公开披露您的个人信息：</h5><h5>1、获得您明确同意或基于您的主动选择，我们可能会公开披露您的个人信息；</h5><h5>2、如果我们确定您出现违反法律法规或严重违反迈校圈平台相关协议规则的情况，或为保护迈校圈平台及其关联公司用户或公众的人身财产安全免遭侵害，我们可能依据法律法规或迈校圈平台相关协议规则披露关于您的个人信息，包括相关违规行为以及迈校圈平台已对您采取的措施。</h5><h5>（四）共享、转让、公开披露个人信息时事先征得授权同意的例外</h5><h5>以下情形中，共享、转让、公开披露您的个人信息无需事先征得您的授权同意：</h5><h5>1、与国家安全、国防安全有关的；</h5><h5>2、与公共安全、公共卫生、重大公共利益有关的；</h5><h5>3、与犯罪侦查、起诉、审判和判决执行等有关的；</h5><h5>4、出于维护您或其他个人的生命、财产等重大合法权益但又很难得到本人同意的；</h5><h5>5、您自行向社会公众公开的个人信息；</h5><h5>6、从合法公开披露的信息中收集个人信息的，如合法的新闻报道、政府信息公开等渠道。</h5><h5>根据法律规定，共享、转让经去标识化处理的个人信息，且确保数据接收方无法复原并重新识别个人信息主体的，不属于个人信息的对外共享、转让及公开披露行为，对此类数据的保存及处理将无需另行向您通知并征得您的同意。</h5><h5>7、为实现使用目的，其他有必要的情况及法律法规规定的其他情形。</h5><h5>四、我们如何保护您的个人信息安全</h5><h5>（一）我们已采取符合业界通用解决方案、合理可行的安全防护措施保护您提供的个人信息安全，防止个人信息遭到未经授权访问、公开披露、使用、修改、损坏或丢失。</h5><h5>（二）我们有行业先进的以数据为核心，围绕数据生命周期进行的数据安全管理体系，从组织建设、制度设计、人员管理、产品技术等方面多维度提升整个系统的安全性。</h5><h5>（三）我们会采取合理可行的措施，尽力避免收集无关的个人信息。我们只会在达成本政策所述目的所需的期限内保留您的个人信息，除非需要延长保留期或受到法律的允许。</h5><h5>（四）互联网并非绝对安全的环境，我们强烈建议您不要使用非迈校圈平台推荐的通信方式发送个人信息。您可以通过我们的服务建立联系和相互分享。当您通过我们的服务创建交流、交易或分享时，您可以自主选择沟通、交易或分享的对象，作为能够看到您的交易内容、联络方式、交流信息或分享内容等相关信息的第三方。</h5><h5>如您发现自己的个人信息尤其是您的账户或密码发生泄露，请您立即联络迈校圈平台客服，以便我们根据您的申请采取相应措施。</h5><h5>请注意，您在使用我们服务时自愿共享甚至公开分享的信息，可能会涉及您或他人的个人信息甚至个人敏感信息，如您在发表动态或者在日记、话题等公众场合选择上传包含个人信息的图片。请您更加谨慎地考虑，是否在使用我们的服务时共享甚至公开分享相关信息。</h5><h5>请使用复杂密码，协助我们保证您的账号安全。我们将尽力保障您发送给我们的任何信息的安全性。</h5><h5>同时，我们还将按照监管部门要求，上报个人信息安全事件的处置情况。</h5><h5>但是，相信您也理解，无论采取何种严密措施，都难免发生信息泄漏的情况，就此类情况的发生，您同意免除我们相应的法律责任。</h5><h5>五、您如何管理您的个人信息</h5><h5>您可以通过以下方式访问及管理您的个人信息：</h5><h5>（一）访问您的个人信息</h5><h5>您有权访问您的个人信息，法律法规规定的例外情况除外。您可以通过以下方式自行访问您的个人信息：</h5><h5>账户信息&nbsp;——如果您希望访问或编辑您的账户中的个人证件信息，手机绑定、支付信息、更改您的密码、添加安全信息或关闭您的账户等，您可以通过登录账号点击我的-设置执行此类操作。</h5><h5>日记信息&nbsp;——您可以登录账号“我的”访问或清除您的日记发表历史记录。如果您无法通过上述路径访问该等个人信息，您可以随时通过迈校圈平台客服与我们取得联系。我们将在30天内回复您的访问请求。对于您在使用我们的产品或服务过程中产生的其他个人信息，我们将根据本条“（七）响应您的上述请求”中的相关安排向您提供。</h5><h5>个人资料&nbsp;——如果您希望访问或编辑您个人资料中的昵称、头像、家乡、情感状态、出生年月日、星座、职业、学校、兴趣爱好以及地点足迹其他资料等，您可以通过登录编辑个人主页执行此类操作。-设置执行此类操作。</h5><h5>（二）更正或补充您的个人信息</h5><h5>当您发现我们处理的关于您的个人信息有错误时，您有权要求我们作出更正或补充。您可以通过本条“（一）访问您的个人信息”中列明的方式提出更正或补充申请。</h5><h5>（三）删除您的个人信息</h5><h5>您可以通过本条“（一）访问您的个人信息”中列明的方式删除您的部分个人信息。</h5><h5>在以下情形中，您可以向我们提出删除个人信息的请求：</h5><h5>1、如果我们处理个人信息的行为违反法律法规；</h5><h5>2、如果我们收集、使用您的个人信息，却未征得您的明确同意；</h5><h5>3、如果我们处理个人信息的行为严重违反了与您的约定；</h5><h5>4、如果您不再使用我们的产品或服务，或您主动注销了账号；</h5><h5>5、如果我们永久不再为您提供产品或服务。</h5><h5>若我们决定响应您的删除请求，我们还将同时尽可能通知从我们处获得您的个人信息的主体，要求其及时删除，除非法律法规另有规定，或这些主体获得您的独立授权。</h5><h5>当您从我们的服务中删除信息后，我们可能不会立即从备份系统中删除相应的信息，但会在备份更新时删除这些信息。</h5><h5>（四）改变您授权同意的范围</h5><h5>每个业务功能需要一些基本的个人信息才能得以完成（见本隐私权政策“第一条”）。除此之外，对于额外个人信息的收集和使用，您可以与迈校圈平台小编联系给予或收回您的授权同意。</h5><h5>当您收回同意后，我们将不再处理相应的个人信息。但您收回同意的决定，不会影响此前基于您的授权而开展的个人信息处理。</h5><h5>（五）个人信息主体注销账户</h5><h5>您可以自行在“注销账户”页面提交账户注销申请，或者联系客服（微信：L13287677111）删除。</h5><h5>在您主动注销账户之后，我们将停止为您提供产品或服务，根据适用法律的要求删除您的个人信息，或使其匿名化处理。</h5><h5>（六）约束信息系统自动决策</h5><h5>在某些业务功能中，我们可能仅依据信息系统、算法等在内的非人工自动决策机制做出决定。如果这些决定显著影响您的合法权益，您有权要求我们做出解释，我们也将在不侵害迈校圈平台商业秘密或其他用户权益、社会公共利益的前提下提供申诉方法。</h5><h5>（七）响应您的上述请求</h5><h5>为保障安全，您可能需要提供书面请求，或以其他方式证明您的身份。我们可能会先要求您验证自己的身份，然后再处理您的请求。</h5><h5>我们将在30天内作出答复。如您不满意，还可以通过谈个对象婚恋交友平台小编发起投诉。</h5><h5>对于您合理的请求，我们原则上不收取费用，但对多次重复、超出合理限度的请求，我们将视情收取一定成本费用。对于那些无端重复、需要过多技术手段（例如，需要开发新系统或从根本上改变现行惯例）、给他人合法权益带来风险或者非常不切实际的请求，我们可能会予以拒绝，您不可因此向我们主张任何责任。</h5><h5>在以下情形中，按照法律法规要求，我们将无法响应您的请求：</h5><h5>1、与国家安全、国防安全有关的；</h5><h5>2、与公共安全、公共卫生、重大公共利益有关的；</h5><h5>3、与犯罪侦查、起诉、审判和执行判决等有关的；</h5><h5>4、有充分证据表明个人信息主体存在主观恶意或滥用权利的；</h5><h5>5、响应您的请求将导致您或其他个人、组织的合法权益受到严重损害的；</h5><h5>6、涉及商业秘密的；</h5><h5>7、法律法规规定的其他情形；</h5><h5>六、您的个人信息如何在全球范围转移</h5><h5>我们在中华人民共和国境内运营中收集和产生的个人信息，存储在中国境内，以下情形除外：</h5><h5>1、法律法规有明确规定；</h5><h5>2、获得您的明确授权；</h5><h5>3、您通过互联网进行跨境直播/发布动态等个人主动行为。</h5><h5>针对以上情形，我们会确保依据本隐私权政策对您的个人信息提供足够的保护。/发布动态等个人主动行为。</h5><h5>七、本隐私权政策如何更新</h5><h5>我们的隐私权政策可能变更。</h5><h5>未经您明确同意，我们不会限制您按照本隐私权政策所应享有的权利。对于重大变更，我们会提供显著的通知（包括但不限于我们会通过迈校圈平台公示的方式进行通知甚至向您提供弹窗提示）。</h5><h5>本政策所指的重大变更包括但不限于：</h5><h5>1、我们的服务模式发生重大变化。如处理个人信息的目的、处理的个人信息类型、个人信息的使用方式等；</h5><h5>2、我们在控制权等方面发生重大变化。如并购重组等引起的所有者变更等；</h5><h5>3、个人信息共享、转让或公开披露的主要对象发生变化；</h5><h5>4、您参与个人信息处理方面的权利及其行使方式发生重大变化；</h5><h5>5、我们负责处理个人信息安全的责任部门、联络方式及投诉渠道发生变化时；</h5><h5>6、个人信息安全影响评估报告表明存在高风险时。</h5><h5>我们还会将本隐私权政策的旧版本存档，供您查阅。</h5><h5>八、如何联系我们</h5><h5>1、如对本政策内容有任何疑问、意见或建议，您可通过迈校圈平台客服及迈校圈平台小程序中“我的”-“留言反馈”与我们联系；</h5><h5>2、如发现个人信息可能被泄露，您可以通过发送邮件至（1270027452@qq.com）投诉举报；</h5><h5>如果您对我们的回复不满意，特别是您认为我们的个人信息处理行为损害了您的合法权益，您还可以通过向被告住所地有管辖权的法院提起诉讼来寻求解决方案。</h5><h5>河南我帮您人力资源有限公司</h5><p><br/></p>'
    };
  }
};
exports.default = _default;

/***/ })

},[[109,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/sub/xieyi/xieyi.js.map