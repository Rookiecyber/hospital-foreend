import request from '../utils/request.js'


export function insertCheckReport(data){
    return request({
        url: '/check-report',//请求接口
        method: 'post',//请求方式
        data
    })
}

export function deleteCheckReport(data){
    return request({
        url: '/check-report/'+data.id,//请求接口
        method: 'delete',//请求方式
        data
    })
}
export function updateCheckReport(data){
    return request({
        url: '/check-report/'+data.id,//请求接口
        method: 'put',//请求方式
        data
    })
}
export function getCheckReportById(data){
    return request({
        url: '/check-report/id/'+data.id,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getAllCheckReport(data){
    return request({
        url: '/check-report',//请求接口
        method: 'get',//请求方式
        data
    })
}
