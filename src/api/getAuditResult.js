import request from '../utils/request.js'

export function isPassed(data){
    return request({
        url: '/audit-result/isPassed/' + data.id,//请求接口
        method: 'post',//请求方式
        data
    })
}
export function insertAuditResult(data){
    return request({
        url: '/audit-result',//请求接口
        method: 'post',//请求方式
        data
    })
}

export function deleteAuditResult(data){
    return request({
        url: '/audit-result/'+data.id,//请求接口
        method: 'delete',//请求方式
        data
    })
}
export function updateAuditResult(data){
    return request({
        url: '/audit-result/'+data.id,//请求接口
        method: 'put',//请求方式
        data
    })
}
export function getAllAuditResult(data){
    return request({
        url: '/audit-result',//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getByPrescriptionId(data){
    return request({
        url: '/audit-result/getByPrescriptionId/' + data,//请求接口
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