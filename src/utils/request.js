import axios from 'axios'
const URL =  "http://localhost:80"
// create an axios instance
const service = axios.create({
	baseURL: URL, // url = base url + request url
	timeout: 10000 // request timeout
})

// http request 拦截器
service.interceptors.request.use(
	config => {
		return config
	},
	error => {
		return Promise.reject(error)
	}
)
service.interceptors.response.use(
	response => {
		if(response.status == 200){
			return response.data
		}
		return -1;
	},
	error => {
		return Promise.reject(error)
	}
)

export default service