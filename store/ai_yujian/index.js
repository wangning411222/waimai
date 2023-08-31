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
	
	// 店铺列表
	companyList({state}, data) {
		return new Promise((resolve) => {
			post('company/list', data).then((res) => {
				resolve(res)
			})
		})
	},
  // 搜索
  companySearch({state}, data) {
		return new Promise((resolve) => {
			post('company/search', data).then((res) => {
				resolve(res)
			})
		})
	},
  postThreadCreate({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_create', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 帖子回复
	postThreadReply({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_reply', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 帖子举报主题帖或回帖接口
	postThreadReport({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_report', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 点赞
	postThreadLike({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_like', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 取消点赞
	postThreadUnlike({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_unlike', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 回复点赞
	postReplyLike({state}, data) {
		return new Promise((resolve) => {
			post('bbs/post_like', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 取消回复点赞
	postReplyUnlike({state}, data) {
		return new Promise((resolve) => {
			post('bbs/post_unlike', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 热度列表
	getThreadRank({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_rank', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 帖子列表
	getThreadList({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 帖子详情
	getThreadRead({state}, data) {
		return new Promise((resolve) => {
			post('bbs/thread_read', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 删除
	postDelete({state}, data) {
		return new Promise((resolve) => {
			post('bbs/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 评论
	postMyreply({state}, data) {
		return new Promise((resolve) => {
			post('bbs/myreply', data).then((res) => {
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
	},












	// 申请职位
	applyPositon({state}, data) {
		return new Promise((resolve) => {
			post('user/deliver', data).then((res) => {
				resolve(res)
			})
		})
	},
	getPositionRead({state}, data) {
		return new Promise((resolve) => {
			post('position/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	upimgUrl({state}) {
		state.upimgUrl = reBuildUrl('/user-upimg.htm');
	},
	postPosition({state}, data) {
		return new Promise((resolve) => {
			post('position/create', data).then((res) => {
				resolve(res)
			})
		})
	},
	
	postCompanyApply({state}, data) {
		return new Promise((resolve) => {
			post('company/apply', data).then((res) => {
				resolve(res)
			})
		})
	},
	postCompanyRead({state}, data) {
		return new Promise((resolve) => {
			post('user/company_read', data).then((res) => {
				resolve(res)
			})
		})
	},
	postMyCompanyRead({state}, data) {
		return new Promise((resolve) => {
			post('company/read', data).then((res) => {
				resolve(res)
			})
		})
	},
	postCompanyUpdate({state}, data) {
		return new Promise((resolve) => {
			post('company/update', data).then((res) => {
				resolve(res)
			})
		})
	},
	postCompanyDeliverList({state}, data) {
		return new Promise((resolve) => {
			post('company/deliver_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我的职位列表
	postUserPositionList({state}, data) {
		return new Promise((resolve) => {
			post('user/position_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 我的职位列表
	postUserPositionResumeList({state}, data) {
		return new Promise((resolve) => {
			post('position/resume_list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 职位删除
	postPositionDelete({state}, data) {
		return new Promise((resolve) => {
			post('position/delete', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 职位编辑
	postEditPosition({state}, data) {
		return new Promise((resolve) => {
			post('position/update', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 职位发布
	postPublicPosition({state}, data) {
		return new Promise((resolve) => {
			post('position/ispublic', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 简历上传
	postUserUpresume({state}, data) {
		return new Promise((resolve) => {
			post('user/upresume', data).then((res) => {
				resolve(res)
			})
		})
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
	// 我的兼职
	postUserParttimejobList({state}, data) {
		return new Promise((resolve) => {
			post('user/parttimejob_list', data).then((res) => {
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
	// 我的投递状态
	postUserDeliveryStatus({state}, data) {
		return new Promise((resolve) => {
			post('user/delivery_status', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 公司列表
	postCompanyList({state}, data) {
		return new Promise((resolve) => {
			post('company/list', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 收藏
	favorator({state}, data) {
		return new Promise((resolve) => {
			post('user/favorator', data).then((res) => {
				resolve(res)
			})
		})
	},
	// 取消收藏
	unfavorator({state}, data) {
		return new Promise((resolve) => {
			post('user/unfavorator', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 收藏列表
	postFavoratorList({state}, data) {
		return new Promise((resolve) => {
			post('user/favorator_list', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 我的投递
	postUserDeliverList({state}, data) {
		return new Promise((resolve) => {
			post('user/deliver_list', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 简历详情
	postUserResumeRead({state}, data) {
		return new Promise((resolve) => {
			post('user/resume_read', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 我的简历详情
	postMyResume({state}, data) {
		return new Promise((resolve) => {
			post('user/myresume', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 提交修改简历
	postResumeUpdate({state}, data) {
		return new Promise((resolve) => {
			post('user/resume_update', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 简历开关
	postResumeSwitch({state}, data) {
		return new Promise((resolve) => {
			post('user/resume_is_public', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 发布评论
	postCommentCreate({state}, data) {
		return new Promise((resolve) => {
			post('post/create', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 某职位的评论
	postCommentList({state}, data) {
		return new Promise((resolve) => {
			post('post/list', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 我的评论
	postUserCommentList({state}, data) {
		return new Promise((resolve) => {
			post('user/postlist', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 删除评论
	postCommentDelete({state}, data) {
		return new Promise((resolve) => {
			post('post/delete', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 实名认证
	postRealnameAuth({state}, data) {
		return new Promise((resolve) => {
			post('user/realname_auth', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 职位搜索
	postSearchPosition({state}, data) {
		return new Promise((resolve) => {
			post('position/search', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 兼职搜索
	postSearchParttimejob({state}, data) {
		return new Promise((resolve) => {
			post('parttimejob/search', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 公司搜索
	postSearchCompany({state}, data) {
		return new Promise((resolve) => {
			post('company/search', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 获取职位手机号
	postJobMobile({state}, data) {
		return new Promise((resolve) => {
			post('user/sensitive_info', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 邀请码
	postInvitationCode({state}, data) {
		return new Promise((resolve) => {
			post('user/bind_parent', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 我的邀请码
	postMyInvitationCode({state}, data) {
		return new Promise((resolve) => {
			post('user/share', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 提现申请
	postMoneyWithdraw({state}, data) {
		return new Promise((resolve) => {
			post('money/withdraw', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 提现列表
	postMoneyWithdrawList({state}, data) {
		return new Promise((resolve) => {
			post('money/withdraw_list', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 收入记录
	postMoneyLog({state}, data) {
		return new Promise((resolve) => {
			post('money/money_log', data).then((res) => {				
				resolve(res)
			})
		})
	},
	// 我的团队
	postMygroup({state}, data) {
		return new Promise((resolve) => {
			post('user/mygroup', data).then((res) => {				
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
