import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import login from './login'
import user from './user'
import config from './config'

import detail from './detail'

import school from './school'

import ai_kuaibao from './ai_kuaibao'
import ai_yujian from './ai_yujian'
import ai_xiaopu from './ai_xiaopu'


import runner from './runner'

import ai_pm from './ai_pm'
import home from './home'
import address from './address'
export default new Vuex.Store({
	state: {
		active_ptype:99
	},
	modules: {
		user,
		login,
		config,

		detail,
		school,
		ai_kuaibao,
		ai_yujian,
		ai_xiaopu,
		ai_pm,
		home,
		address,
		runner

	},
	mutations: {
		change_ptype(state, param) {
			state.active_ptype = param;
		}
	}
});