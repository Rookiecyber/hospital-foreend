
import request from '../utils/request.js'

export function queryByCondition(data){
    return request({
        url: '/merchandiseinfo/queryByCondition',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function getByOperation(data){
	return request({
		url: '/carchange/getByOperation',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function selectByName(data){
	return request({
		url: '/matetialinfo/selectByName',//请求接口
		method: 'post',//请求方式
		data
	})
}
export function queryByCondition1(data){
    return request({
        url: '/transportationinfo/queryByCondition',//请求接口
        method: 'post',//请求方式
        data
    })
}

export function queryByTypeId(data){
    return request({
        url: '/matetialinfo/selectByType',//请求接口
        method: 'post',//请求方式
        data
    })
}
export function getmoney(){
    return request({
        url: '/user/getSalesValue',//请求接口
        method: 'get',//请求方式
        
    })
}