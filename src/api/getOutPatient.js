import request from '../utils/request.js'

export function insertPatient(data){
    return request({
        url: '/patient',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function deletePatient(data){
    return request({
        url: '/patient/' + data.id,//请求接口
        method: 'delete',//请求方式
        data
    })
}
export function updatePatient(data){
    return request({
        url: '/patient',//请求接口
        method: 'put',//请求方式
        data
    })
}
export function getPatientByID(data){
    return request({
        url: '/patient/id/' + data,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getAllPatient(data){
    return request({
        url: '/patient',//请求接口
        method: 'get',//请求方式
        data
    })
}

