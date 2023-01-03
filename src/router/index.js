import Vue from "vue";
import Router from "vue-router";
import home from "@/page/home";
import login from "@/page/login/login";
import mainPage from "@/page/mainPage/mainPage";
import managerPage from "@/page/managerPage/managerPage";
import docManager from "@/page/managerPage/docManager";

import test from "@/page/test"
import outpatient from "@/page/Outpatient/outpatient";
import userRegister from "@/page/Outpatient/userRegister";
import prescriptionPrice from "@/page/Outpatient/prescriptionPrice";
import projectPricing from "@/page/Outpatient/projectPricing";
import projectPayment from "@/page/Outpatient/projectPayment";
import projectCheck from "@/page/Outpatient/projectCheck";
import drugPayment from "@/page/Outpatient/drugPayment";
import outPatientBank from "@/page/Outpatient/outPatientBank";
import drugManagement from "@/page/pharmacyManagement/drugManagement";
import pharmacyManagement from "@/page/pharmacyManagement/pharmacyManagement";
Vue.use(Router);

export default new Router({
	mode: "history",
	routes: [
		{
			path: '/login',
			name: 'login',
			component: login
		},
		{
			path: '/',
			name: 'home',
			component: home,
			redirect: "/mainPage",
			children: [{
					path: '/mainPage',
					name: 'mainPage',
					component: mainPage,
					meta: {
						title: '首页'
					}
				},
				//药房管理
				{
					path: '/pharmacyManagement',
					name: 'pharmacyManagement',
					component: pharmacyManagement,
					meta: {
						title: '药房管理'
					},
					children:[{
						path: '/drugManagement',
						name: 'drugManagement',
						component: drugManagement,
						meta: {
							title: '药品管理'
						}
					}]
				},
				//门诊管理
				{
					path: '/outpatientManage',
					name: 'outpatientManage',
					component: outpatient,
					meta: {
						title: '门诊管理'
					},
					children: [{
						path: '/userRegister',
						name: 'userRegister',
						component: userRegister,
						meta: {
							title: '用户挂号'
						}
					},
						{
							path: '/prescriptionPrice',
							name: 'prescriptionPrice',
							component: prescriptionPrice,
							meta: {
								title: '处方划价'
							}
						},
						{
							path: '/projectPricing',
							name: 'projectPricing',
							component:projectPricing,
							meta: {
								title: '项目划价'
							}
						},
						{
							path: '/projectPayment',
							name: 'projectPayment',
							component: projectPayment,
							meta: {
								title: '项目缴费'
							}
						},
						{
							path: '/projectCheck',
							name: 'projectCheck',
							component:projectCheck,
							meta: {
								title: '项目检查'
							}
						},
						{
							path: '/drugPayment',
							name: 'drugPayment',
							component:drugPayment,
							meta: {
								title: '药品缴费'
							}
						},
						{
							path: '/outPatientBank',
							name: 'outPatientBank',
							component:outPatientBank,
							meta: {
								title: '门诊患者库'
							}
						}
					]
				},
			]
		},



		// {
		// 	path: '/common',
		// 	name: 'common',
		// 	component: common,
		// 	children: [{
		// 		path: '/ad',
		// 		name: 'ad',
		// 		component: ad
		// 	},
		// 	{
		// 		path:'aboutUs',
		// 		name:'aboutUs',
		// 		component: companyInformation
		// 	}]
		// }
	]
});
