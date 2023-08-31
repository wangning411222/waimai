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
	// 文章列表
	getArticleList({state}, data) {
		return new Promise((resolve) => {
			post('article/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 帖子详情
	getThreadRead({state}, data) {
		return new Promise((resolve) => {
			post('article/read', data).then((res) => {
				resolve(res)
			})
		})
	},

	// 评论
	postReply({state}, data) {
		return new Promise((resolve) => {
			post('post/create', data).then((res) => {
				resolve(res)
			})
		})
	},
	
	
	
	// @我的
	postAtme({state}, data) {
		return new Promise((resolve) => {
			post('bbs/atme', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我发布的
	postMythread({state}, data) {
		return new Promise((resolve) => {
			post('bbs/mythread', data).then((res) => {
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
