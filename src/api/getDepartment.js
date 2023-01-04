import request from '../utils/request.js'

export function insertDepartment(data){
    return request({
        url: '/department',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function deleteDepartment(data){
    return request({
        url: '/department/' + data.id,//请求接口
        method: 'delete',//请求方式
        data
    })
}
export function updateDepartment(data){
    return request({
        url: '/department',//请求接口
        method: 'put',//请求方式
        data
    })
}
export function getDepartmentByID(data){
    return request({
        url: '/department/id/' + data.id,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getAll(data){
    return request({
        url: '/department',//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getPage(data){
    return request({
        url: '/department/page',//请求接口
        method: 'get',//请求方式
        data
    })
}

