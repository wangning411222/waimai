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
	// 区域管理申请
	schoolApply({state}, data) {
		return new Promise((resolve) => {
			post('school/apply', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 区域设置
	schoolSetting({state}, data) {
		return new Promise((resolve) => {
			post('school/setting', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 区域设置读取
	schoolBanner({state}, data) {
		return new Promise((resolve) => {
			post('school/banner', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 我管理的店铺列表 分部管理
	schoolMyCompanylist({state}, data) {
		return new Promise((resolve) => {
			post('school/my_companylist', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	
	// 店铺列表[根据经纬度查询附近5公里以内的店铺]  分部管理
	schoolCompanylist({state}, data) {
		return new Promise((resolve) => {
			post('school/companylist', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 店铺添加  分部管理
	schoolAdd({state}, data) {
		return new Promise((resolve) => {
			post('school/add', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 店铺搜素  分部管理
	// schoolCompanysearch({state}, data) {
	// 	return new Promise((resolve) => {
	// 		post('company/search', data,false).then((res) => {
	// 			resolve(res);
	// 		})
	// 	})
	// },
	schoolCompanysearch({state}, data) {
		return new Promise((resolve) => {
			post('school/company_search', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 点审核进去的查看店铺信息接口
	schoolCompanyRead({state}, data) {
		return new Promise((resolve) => {
			post('school/company_read', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 审核店铺
	schoolCompanyAudit({state}, data) {
		return new Promise((resolve) => {
			post('school/company_audit', data,false).then((res) => {
				resolve(res);
			})
		})
	},
	// 移除店铺
	schoolCompanyDel({state}, data) {
		return new Promise((resolve) => {
			post('school/company_del', data,false).then((res) => {
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
