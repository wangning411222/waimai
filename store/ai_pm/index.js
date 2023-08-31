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
	// 短消息发布
	postPmSend({state}, data) {
		return new Promise((resolve) => {
			post('pm/send', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 短消息回复
	postPmReply({state}, data) {
		return new Promise((resolve) => {
			post('pm/reply', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 私信详情
	postPmRead({state}, data) {
		return new Promise((resolve) => {
			post('pm/read', data,false).then((res) => {
				resolve(res)
			})
		})
	},
	// 私信列表
	postPmList({state}, data) {
		return new Promise((resolve) => {
			post('pm/recent_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 系统通知列表
	postNoticelist({state}, data) {
		return new Promise((resolve) => {
			post('pm/noticelist', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 新的消息数
	getNewnotice({state}, data) {
		return new Promise((resolve) => {
			post('pm/newnotice', data,false).then((res) => {
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
