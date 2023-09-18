import Vue from 'vue'
import {
	post,
	get,
	wx_pay,
	showToast,
	reBuildUrl
} from '../../tools/utils.js'
const state = {
	content: [],
	upimgUrl: 'user/upimg',
	upIDCardUrl: 'user/upidcard'
}

const getters = {
	content(state) {
		return state.content
	},
	upimgUrl(state) {
		return reBuildUrl(state.upimgUrl);
	},
	upIDCardUrl(state) {
		return reBuildUrl('user/upidcard');
	}

}

const mutations = {


}
const actions = {
	// 商家回复
	postReplay({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/replay', data).then((res) => {
				resolve(res);
			})
		})
	},
	// 评论列表
	postList({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/list', data).then((res) => {
				resolve(res);
			})
		})
	},
  // 评价列表(商家)
  postListByCompany({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/list_by_company', data).then((res) => {
				resolve(res);
			})
		})
	},
  // 屏蔽用户评价
  postStatus({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/status', data).then((res) => {
				resolve(res);
			})
		})
	},
 
	// 删除评论
	postDelete({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/delete', data).then((res) => {
				resolve(res);
			})
		})
	},
	// 评论
	postCreate({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/create', data).then((res) => {
				resolve(res);
			})
		})
	},
	// 我的优惠券
	mycoupon({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			get('user/mycoupon', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商铺列表
	companyList({
		state
	}, data) {
		return new Promise((resolve) => {
			post('company/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商铺详情
	companyRead({
		state
	}, data) {
		return new Promise((resolve) => {
			post('goods/list', data).then((res) => {
				resolve(res)
			})
		})
	},

	// 商品详情
	goodsRead({
		state
	}, data) {
		return new Promise((resolve) => {
			post('goods/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品评价列表
	evaluateList({
		state
	}, data) {
		return new Promise((resolve) => {
			post('post/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品价格计算
	calculatePrice({
		state
	}, data) {
		return new Promise((resolve) => {
			post('goods/price', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品下单
	orderAdd({
		state
	}, data) {
		return new Promise((resolve) => {
			post('order/add', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 取消订单
	orderCancel({
		state
	}, data) {
		return new Promise((resolve) => {
			post('order/cancel', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 删除订单
	orderDelete({
		state
	}, data) {
		return new Promise((resolve) => {
			post('order/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 商品支付
	orderPay({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			post('order/pay', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 用户扫码签收订单
	userScan({
		state
	}, data) {
		return new Promise((resolve) => {
			post('user/scan', data).then((res) => {
				resolve(res)
			})
		})
	},

	// 推荐商品
	goods_recommend_list({
		state
	}, data) {
		return new Promise((resolve) => {
			post('goods/recommend_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	goods_all_list({
		state
	}, data) {
		return new Promise((resolve) => {
			post('goods/all_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 领取优惠券
	couponGet({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			post('user/coupon_get', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 优惠券添加
	couponadd({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			post('coupon/add', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 优惠券列表
	couponlist({
		state
	}) {
		return new Promise((resolve, reject) => {
			get('coupon/list').then((res) => {
				resolve(res)
			})
		})
	},
	// 优惠券详情
	couponread({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			post('coupon/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 优惠券功能开关
	couponisclose({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			post('coupon/isclose', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 优惠券编辑
	couponedit({
		state
	}, data) {
		return new Promise((resolve, reject) => {
			post('coupon/edit', data).then((res) => {
				resolve(res)
			})
		})
	},
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}