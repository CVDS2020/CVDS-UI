import axios from 'axios'
axios.defaults.withCredentials=true
export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
        baseURL: '/',
        timeout: 10000,
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        withcredentials: true, // 允许携带cookie

    })

    // 2.axios的拦截器
    // 2.1.请求拦截的作用
    instance.interceptors.request.use(config => {
        // config.headers.Authorization='Bearer'+window.sessionStorage.getItem('userToken')
        return config
    }, err => {
        console.log("req err:")
        console.log(err);
    })

    // 2.2.响应拦截
    instance.interceptors.response.use(res => {
        console.log('res:')
        console.log(res)
        return res.data
    }, err => {
        console.log("res err:")
        console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
}




