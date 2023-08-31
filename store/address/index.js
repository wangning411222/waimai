import {post,get} from '../../tools/utils.js'
const state = {

}

const getters = {

}

const actions = {
	// 添加/编辑地址
	addresssave({state}, data) {
		return new Promise((resolve) => {
			post('address/save',data).then((res) => {
				resolve(res);
			})
		})
	},
	// 地址列表
	addresslist({state}) {
		return new Promise((resolve) => {
			get('address/list').then((res) => {
				resolve(res);
			})
		})
	},
	// 地址删除
	addressdelete({state}, data) {
		return new Promise((resolve) => {
			post('address/delete',data).then((res) => {
				resolve(res);
			})
		})
	},
	// 地址详情
	addressdelete({state}, data) {
		return new Promise((resolve) => {
			post('address/delete',data).then((res) => {
				resolve(res);
			})
		})
	},
	// 默认地址
	addressdefault({state}, data){
		return new Promise((resolve,reject)=>{
			post('address/default',data).then((res)=>{
				resolve(res)
			})
		})
	},
}

const mutations = {

}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
