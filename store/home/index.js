import {post,get} from '../../tools/utils.js'
const state = {
	bannerList:[],
	cateList:[],
	dayList:[],
	recommendList:[],
	attachList:[]
}

const getters = {
	bannerList(state) {
		return state.bannerList
	},
	cateList(state) {
		return state.cateList
	},
	dayList(state) {
		return state.dayList
	},
	recommendList(state) {
		return state.recommendList
	},
	attachList(state) {
		return state.attachList
	}
}
const mutations = {}
const actions = {
	getHomeList({state}, data) {
		return new Promise((resolve) => {
			post('index/data_list', data,false).then((res) => {
				resolve(res);
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
