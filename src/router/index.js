import Vue from 'vue';
import VueRouter from 'vue-router';
import index from '../views/index.vue';
import login from '../views/login.vue';
import forgot from '../views/forgot.vue';
import register from '../views/register.vue';
Vue.use(VueRouter)

const routes = [
	// 主页
	{
		path: '/',
		name: 'index',
		component: index,
		meta: {
			index: 0,
			title: '首页'
		}
	},

	// 登录
	{
		path: '/login',
		name: 'login',
		component: login,
		meta: {
			index: 0,
			title: '登录'
		}
	},
	// 注册
	{
		path: '/register',
		name: 'register',
		component: register,
		meta: {
			index: 0,
			title: '注册'
		}
	},

	// 忘记密码
	{
		path: '/forgot',
		name: "forgot",
		component: forgot,
		meta: {
			index: 0,
			title: '忘记密码'
		}
	},

	// 修改密码
	{
		path: '/user/password',
		name: "password",
		component: () => import("../views/user/password.vue"),
		meta: {
			index: 0,
			title: '修改密码'
		}
	},

	// 视频播放页
	{
		path: "/media/video",
		name: "video",
		component: () => import('../views/media/video.vue'),
		meta: {
			index: 0,
			title: "视频"
		}
	},

	// 音频播放页
	{
		path: "/media/audio",
		name: "audio",
		component: () => import('../views/media/audio.vue'),
		meta: {
			index: 0,
			title: "音频"
		}
	},
	// 普通员工路由
	{
		path: '/ordinary_staff/table',
		name: 'ordinary_staff_table',
		component: () => import('../views/ordinary_staff/table.vue')
	},
	{
		path: '/ordinary_staff/view',
		name: 'ordinary_staff_view',
		component: () => import('../views/ordinary_staff/view.vue')
	},
	// 车辆信息路由
	{
		path: '/vehicle_information/table',
		name: 'vehicle_information_table',
		component: () => import('../views/vehicle_information/table.vue')
	},
	{
		path: '/vehicle_information/view',
		name: 'vehicle_information_view',
		component: () => import('../views/vehicle_information/view.vue')
	},
	// 司机信息路由
	{
		path: '/driver_information/table',
		name: 'driver_information_table',
		component: () => import('../views/driver_information/table.vue')
	},
	{
		path: '/driver_information/view',
		name: 'driver_information_view',
		component: () => import('../views/driver_information/view.vue')
	},
	// 仓储管理路由
	{
		path: '/warehouse_management/table',
		name: 'warehouse_management_table',
		component: () => import('../views/warehouse_management/table.vue')
	},
	{
		path: '/warehouse_management/view',
		name: 'warehouse_management_view',
		component: () => import('../views/warehouse_management/view.vue')
	},
	// 入库记录路由
	{
		path: '/warehousing_record/table',
		name: 'warehousing_record_table',
		component: () => import('../views/warehousing_record/table.vue')
	},
	{
		path: '/warehousing_record/view',
		name: 'warehousing_record_view',
		component: () => import('../views/warehousing_record/view.vue')
	},
	// 出库记录路由
	{
		path: '/outbound_record/table',
		name: 'outbound_record_table',
		component: () => import('../views/outbound_record/table.vue')
	},
	{
		path: '/outbound_record/view',
		name: 'outbound_record_view',
		component: () => import('../views/outbound_record/view.vue')
	},
	// kpi规则路由
	// {
	// 	path: '/kpi_rule/table',
	// 	name: 'kpi_rule_table',
	// 	component: () => import('../views/kpi_rule/table.vue')
	// },
	// {
	// 	path: '/kpi_rule/view',
	// 	name: 'kpi_rule_view',
	// 	component: () => import('../views/kpi_rule/view.vue')
	// },
	// kpi考核路由
	// {
	// 	path: '/kpi_assessment/table',
	// 	name: 'kpi_assessment_table',
	// 	component: () => import('../views/kpi_assessment/table.vue')
	// },
	// {
	// 	path: '/kpi_assessment/view',
	// 	name: 'kpi_assessment_view',
	// 	component: () => import('../views/kpi_assessment/view.vue')
	// },

	// 用户路由
	{
		path: '/user/table',
		name: 'user_table',
		component: () => import('../views/user/table.vue'),
		meta: {
			index: 0,
			title: '用户列表'
		}
	},
	{
		path: '/user/view',
		name: 'user_view',
		component: () => import('../views/user/view.vue'),
		meta: {
			index: 0,
			title: '用户详情'
		}
	},
	{
		path: '/user/info',
		name: 'user_info',
		component: () => import('../views/user/info.vue'),
		meta: {
			index: 0,
			title: '个人信息'
		}
	},
	// 用户组路由
	{
		path: '/user_group/table',
		name: 'user_group_table',
		component: () => import('../views/user_group/table.vue'),
		meta: {
			index: 0,
			title: '用户组列表'
		}
	},
	{
		path: '/user_group/view',
		name: 'user_group_view',
		component: () => import('../views/user_group/view.vue'),
		meta: {
			index: 0,
			title: '用户组详情'
		}
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

router.beforeEach((to, from, next) => {
	let token = to.query.token;
	if (token){
		$.db.set("token",token,120);
	}
	next();
})

router.afterEach((to, from, next) => {
	let title = "仓储物流系统-admin";
	document.title = title;
})

export default router
