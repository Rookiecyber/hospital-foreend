import request from '../utils/request.js'


export function addRecord(data){
    return request({
        url: '/register-record/addRecord',//请求接口
        method: 'post',//请求方式
        data
    })
}

export function checkRecord(data){
    return request({
        url: '/register-record/checkRecord',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function registerComplete(data){
    return request({
        url: '/register-record/registerComplete',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function getAllRegisterRecord(data){
    return request({
        url: '/register-record',//请求接口
        method: 'get',//请求方式
        data
    })
}

// 1.登录
// 2.搭建系统整体框架
// 3.配置路由以及页面跳转
// 4.模拟根据用户权限配置动态路由
// 5.echarts分析图标的应用
// 6.搭建一个页面(多条件查询,增加,删除,修改)