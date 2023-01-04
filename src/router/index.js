import Vue from "vue";
import Router from "vue-router";
import home from "@/page/home";
import login from "@/page/login/login";
import mainPage from "@/page/mainPage/mainPage";
import managerPage from "@/page/managerPage/managerPage";
import docManager from "@/page/managerPage/docManager";
//data center部分
import dataCenter from "@/page/dataCenter/dataCenter";
import department from "@/page/dataCenter/department";
import patient from "@/page/dataCenter/outPatient";
import staff from "@/page/dataCenter/staff";

import test from "@/page/test"
import outpatient from "@/page/Outpatient/outpatient";
import userRegister from "@/page/Outpatient/userRegister";
import prescriptionPrice from "@/page/Outpatient/prescriptionPrice";
import projectPricing from "@/page/Outpatient/projectPricing";
import projectPayment from "@/page/Outpatient/projectPayment";
import projectCheck from "@/page/Outpatient/projectCheck";
import drugPayment from "@/page/Outpatient/drugPayment";
import medicalRecord from "@/page/Outpatient/medicalRecord";
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
				//数据中心
				{
					path: '/dataCenter',
					name: 'dataCenter',
					component: dataCenter,
					meta: {
						title: '数据中心'
					},
					children:[{
							path: '/department',
							name: 'department',
							component: department,
							meta: {
								title: '部门列表'
							}
						},
						{
							path: '/staff',
							name: 'staff',
							component: staff,
							meta: {
								title: '员工列表'
							}
						},
						{
						path: '/patient',
						name: 'patient',
						component: patient,
						meta: {
							title: '门诊患者库'
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
							path: '/medicalRecord',
							name: 'medicalRecord',
							component:medicalRecord,
							meta: {
								title: '病历编辑'
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
