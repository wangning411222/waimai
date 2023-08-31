import Vue from 'vue'
import { post, get, wx_pay, showToast,reBuildUrl } from '../../tools/utils.js'
const state = {
	content:[],
	upimgUrl:'user/upimg',
	upIDCardUrl:'user/upidcard'
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
	upimgUrl({state}) {
		state.upimgUrl = reBuildUrl('/user-upimg.htm');
	},
	
	// 兼职创建
	postParttimejobCreate({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/create', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 兼职列表
	postParttimejobList({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 兼职详情
	postParttimejobRead({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 兼职申请
	postParttimejobDeliver({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/deliver', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我的兼职
	postUserParttimejobList({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/mylist', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 兼职开关
	postPublicParttimejob({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/ispublic', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 兼职修改
	postEditParttimejob({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/update', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 兼职删除
	postParttimejobDelete({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我的职位列表
	postUserPositionResumeList({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/deliver_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	postUserPositionDeliveryStatus({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/delivery_status', data).then((res) => {
				resolve(res)
			})
		})
	}
}
export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
