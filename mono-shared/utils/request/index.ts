import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'

type Request = (url: string, data?: object, baseUrl?: string) => Promise<any>

interface HttpRequest {
    get: Request,
    post: Request,
    delete: Request,
    put: Request
}

type Method = 'get' | 'post' | 'delete' | 'put'

const http = {} as HttpRequest
const methods: Method[] = ['get', 'post', 'delete', 'put']

const DEFAULTBASEURL = {
    baseURL: 'http://rap2.taobao.org:38080/app/mock/265540'
}

methods.forEach(v => {
    http[v] = (url: string, data: any, baseUrl?: string) => {
        const config: AxiosRequestConfig = {
            url,
            method: v,
            baseURL: baseUrl || DEFAULTBASEURL.baseURL
        }
        const instance = axios.create(DEFAULTBASEURL)
        // 请求处理
        instance.interceptors.request.use(
            cfg => {
                return cfg
            },
            error => {
                return Promise.reject(error)
            }
        )
        // 回应处理
        instance.interceptors.response.use(
            res => {
                if (res && res.data) {
                    return res.data
                }
                return res
            },
            error => {
                return Promise.reject(error)
            }
        )

        if (v === 'get' || v === 'delete') {
            config.params = data
        } else {
            config.data = qs.stringify(data)
        }

        return instance
            .request(config)
            .then(res => {
                return res
            })
            .catch(err => {
                // 错误集中处理
                if (err.response) {
                    const errData = err.response.data
                    console.log(errData)
                } else {
                    const msg = err.message === 'Network Error' ? '网络错误' : '未知错误'
                    console.log(msg)
                }
                return Promise.reject(err)
            })
    }
})

export default http