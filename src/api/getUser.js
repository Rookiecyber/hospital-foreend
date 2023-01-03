import request from '../utils/request.js'

	
export function queryTotal(){
	return request({
		url: '/user/total',//请求接口
		method: 'post'//请求方式
		
	})
}