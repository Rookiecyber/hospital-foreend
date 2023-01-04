import request from '../utils/request.js'

export function insertStaff(data){
    return request({
        url: '/staff',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function deleteStaff(data){
    return request({
        url: '/staff/' + data.id,//请求接口
        method: 'delete',//请求方式
        data
    })
}
export function updateStaff(data){
    return request({
        url: '/staff',//请求接口
        method: 'put',//请求方式
        data
    })
}
export function getStaffByID(data){
    return request({
        url: '/staff/id/' + data.id,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getAllStaff(data){
    return request({
        url: '/staff',//请求接口
        method: 'get',//请求方式
        data
    })
}


