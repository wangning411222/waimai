(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["components/kevy-loading/kevy-loading"],{

/***/ 932:
/*!*********************************************************************!*\
  !*** C:/project/my/waimai/components/kevy-loading/kevy-loading.vue ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./kevy-loading.vue?vue&type=template&id=1e1dbdf8&scoped=true& */ 933);
/* harmony import */ var _kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./kevy-loading.vue?vue&type=script&lang=js& */ 935);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./kevy-loading.vue?vue&type=style&index=0&id=1e1dbdf8&lang=scss&scoped=true& */ 937);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 35);

var renderjs





/* normalize component */

var component = Object(_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"],
  _kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  "1e1dbdf8",
  null,
  false,
  _kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "components/kevy-loading/kevy-loading.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 933:
/*!****************************************************************************************************************!*\
  !*** C:/project/my/waimai/components/kevy-loading/kevy-loading.vue?vue&type=template&id=1e1dbdf8&scoped=true& ***!
  \****************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./kevy-loading.vue?vue&type=template&id=1e1dbdf8&scoped=true& */ 934);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_17_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_template_id_1e1dbdf8_scoped_true___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 934:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--17-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/project/my/waimai/components/kevy-loading/kevy-loading.vue?vue&type=template&id=1e1dbdf8&scoped=true& ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
  var s0 =
    _vm.type == "nb-spinner" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s1 =
    _vm.type == "bt-spinner" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s2 =
    _vm.type == "db-spinner" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s3 =
    _vm.type == "reverse-spinner" && _vm.tip
      ? _vm.__get_style([_vm.tipStyle])
      : null
  var s4 =
    _vm.type == "hm-spinner" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s5 =
    _vm.type == "triple-spinner" && _vm.tip
      ? _vm.__get_style([_vm.tipStyle])
      : null
  var s6 =
    _vm.type == "cm-spinner" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s7 =
    _vm.type == "multi-spinner" && _vm.tip
      ? _vm.__get_style([_vm.tipStyle])
      : null
  var s8 = _vm.type == "dot-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s9 = _vm.type == "dot-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s10 = _vm.type == "dot-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s11 =
    _vm.type == "dot-loader" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s12 = _vm.type == "mesh-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s13 = _vm.type == "mesh-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s14 = _vm.type == "mesh-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s15 = _vm.type == "mesh-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s16 = _vm.type == "mesh-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s17 =
    _vm.type == "heart-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s18 =
    _vm.type == "heart-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s19 =
    _vm.type == "heart-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s20 =
    _vm.type == "heart-loader" && _vm.tip
      ? _vm.__get_style([_vm.tipStyle])
      : null
  var s21 = _vm.type == "ss-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s22 =
    _vm.type == "ss-loader" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s23 = _vm.type == "ls-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s24 = _vm.type == "ls-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s25 = _vm.type == "ls-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s26 = _vm.type == "ls-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s27 = _vm.type == "ls-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s28 =
    _vm.type == "ls-loader" && _vm.tip ? _vm.__get_style([_vm.tipStyle]) : null
  var s29 = _vm.type == "bsm-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s30 = _vm.type == "bsm-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s31 = _vm.type == "bsm-loader" ? _vm.__get_style([_vm.colorStyle]) : null
  var s32 =
    _vm.type == "bsm-loader" && _vm.tip
      ? _vm.__get_style([
          _vm.tipStyle,
          {
            "margin-top": "60rpx",
          },
        ])
      : null
  var s33 =
    _vm.type == "bsrm-loader" && _vm.tip
      ? _vm.__get_style([
          _vm.tipStyle,
          {
            "margin-top": "60rpx",
          },
        ])
      : null
  var s34 =
    _vm.type == "pacman-loader" && _vm.tip
      ? _vm.__get_style([
          _vm.tipStyle,
          {
            "margin-top": "40rpx",
          },
        ])
      : null
  var s35 =
    _vm.type == "bps-loader" && _vm.tip
      ? _vm.__get_style([
          _vm.tipStyle,
          {
            "margin-top": "40rpx",
          },
        ])
      : null
  var s36 =
    !(_vm.type == "bps-loader") && _vm.tip
      ? _vm.__get_style([_vm.tipStyle])
      : null
  _vm.$mp.data = Object.assign(
    {},
    {
      $root: {
        s0: s0,
        s1: s1,
        s2: s2,
        s3: s3,
        s4: s4,
        s5: s5,
        s6: s6,
        s7: s7,
        s8: s8,
        s9: s9,
        s10: s10,
        s11: s11,
        s12: s12,
        s13: s13,
        s14: s14,
        s15: s15,
        s16: s16,
        s17: s17,
        s18: s18,
        s19: s19,
        s20: s20,
        s21: s21,
        s22: s22,
        s23: s23,
        s24: s24,
        s25: s25,
        s26: s26,
        s27: s27,
        s28: s28,
        s29: s29,
        s30: s30,
        s31: s31,
        s32: s32,
        s33: s33,
        s34: s34,
        s35: s35,
        s36: s36,
      },
    }
  )
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 935:
/*!**********************************************************************************************!*\
  !*** C:/project/my/waimai/components/kevy-loading/kevy-loading.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/babel-loader/lib!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./kevy-loading.vue?vue&type=script&lang=js& */ 936);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_13_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 936:
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--13-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/project/my/waimai/components/kevy-loading/kevy-loading.vue?vue&type=script&lang=js& ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
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
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
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
  name: "kevy-loading",
  props: {
    /**
     * 类型
     */
    type: {
      type: String,
      default: 'nb-spinner'
    },
    /**
     * 颜色，支持css颜色值
     */
    color: {
      type: String,
      default: '#07c160'
    },
    /**
     * 文字提示
     */
    tip: {
      type: String,
      default: ''
    },
    /**
     * 文字提示颜色
     */
    tipColor: {
      type: String,
      default: '#333333'
    },
    /**
     * 是否透明
     */
    transparent: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {};
  },
  computed: {
    colorStyle: function colorStyle() {
      return {
        'background-color': this.color ? this.color : '#07c160'
      };
    },
    tipStyle: function tipStyle() {
      return {
        color: this.tipColor ? this.tipColor : '#333333'
      };
    }
  }
};
exports.default = _default;

/***/ }),

/***/ 937:
/*!*******************************************************************************************************************************!*\
  !*** C:/project/my/waimai/components/kevy-loading/kevy-loading.vue?vue&type=style&index=0&id=1e1dbdf8&lang=scss&scoped=true& ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/postcss-loader/src??ref--8-oneOf-1-3!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!../../../../hbuildx/HBuilderX.3.8.4.20230531/HBuilderX/plugins/uniapp-cli/node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./kevy-loading.vue?vue&type=style&index=0&id=1e1dbdf8&lang=scss&scoped=true& */ 938);
/* harmony import */ var _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__) if(["default"].indexOf(__WEBPACK_IMPORT_KEY__) < 0) (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_hbuildx_HBuilderX_3_8_4_20230531_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_kevy_loading_vue_vue_type_style_index_0_id_1e1dbdf8_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 938:
/*!***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!C:/project/my/waimai/components/kevy-loading/kevy-loading.vue?vue&type=style&index=0&id=1e1dbdf8&lang=scss&scoped=true& ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

}]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/components/kevy-loading/kevy-loading.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/kevy-loading/kevy-loading-create-component',
    {
        'components/kevy-loading/kevy-loading-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(932))
        })
    },
    [['components/kevy-loading/kevy-loading-create-component']]
]);
