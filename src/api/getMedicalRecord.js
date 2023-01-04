import request from '../utils/request.js'

export function insertMedicalRecord(data){
    return request({
        url: '/medical-record',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function deleteMedicalRecord(data){
    return request({
        url: '/medical-record/' + data.id,//请求接口
        method: 'delete',//请求方式
        data
    })
}
export function updateMedicalRecord(data){
    return request({
        url: '/medical-record',//请求接口
        method: 'put',//请求方式
        data
    })
}
export function getMedicalRecordById(data){
    return request({
        url: '/medical-record/id/' + data.id,//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getAllMedicalRecord(data){
    return request({
        url: '/medical-record',//请求接口
        method: 'get',//请求方式
        data
    })
}
export function getPage(data){
    return request({
        url: '/medical-record/page',//请求接口
        method: 'get',//请求方式
        data
    })
}
