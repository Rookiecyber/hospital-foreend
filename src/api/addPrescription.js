import request from '../utils/request.js'


export function addPrescription(data){
    return request({
        url: '/prescription/addPrescription',//请求接口
        method: 'post',//请求方式
        data
    })
}

export function checkPrescription(data){
    return request({
        url: '/prescription/checkPrescription/'+data.id,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function pay(data){
    return request({
        url: '/prescription/pay/'+data.id,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function receive(data){
    return request({
        url: '/prescription/receive/'+data.id,//请求接口
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