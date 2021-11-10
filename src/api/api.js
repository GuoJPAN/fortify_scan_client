import axios from 'axios'
import router from '../router/index'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.response.use(
    response => {
        // 未登录或会话已过期
        console.log(response.data)
        if (401 === response.data.status) {
            // 重定向到登录页
            console.log(1)
            router.replace({
                path: '/login',
                query: { redirect: router.currentRoute.fullPath }
            })
        }
        return response;
    },
    error => {
        if (500 === error.response.status) {
            // 服务端异常  
        }
        return Promise.reject(error) // 返回接口返回的错误信息
    }
);

let host = "/api"
    // let host = "localhost:8000/api"
    // 打包
    // let host = ""

// 登录
export const login = params => { return axios.post(`${host}/login`, params) }

// 登录
export const logout = params => { return axios.post(`${host}/logout`, params) }

// 获取城市信息

export const getcity = params => { return axios.get(`${host}/city/`) }

// 获取详细信息

export const getdetail = params => { return axios.get(`${host}/detail/`, { params: params }) }

// 注册

export const postRegister = params => { return axios.post(`${host}/register/`, { params: params }) }

// 获取后台表格数据

export const sendJson = params => { return axios.get(`${host}/getJson`, { params: params }) }

// mock 测试
export const getTest = params => { return axios.get(`${host}/getTest`, { params: params }) }

// 获取需求单数据
export const getDemandList = params => { return axios.get(`${host}/getDemandList`, { params: params }) }

// 获取需求单数据
export const getCodeScanList = params => { return axios.get(`${host}/getCodeScanList`, { params: params }) }

// 开启fortify扫描
export const runFortifyScan = params => { return axios.post(`${host}/runFortifyScan`, params) }

// 开启fortify扫描
export const gitStartScan = params => { return axios.post(`${host}/startGitScan`, params) }

// 获取扫描任务结果详情
export const projectDatail = params => { return axios.post(`${host}/vDetail`, params) }

// 删除fortify扫描结果
export const deletePrj = params => { return axios.post(`${host}/deletePrj`, params) }

// 获取单个漏洞id详情
export const singleVulDetail = params => { return axios.post(`${host}/singleVulDetail`, params) }

// 开启fortify扫描
export const getProjectDetail = params => { return axios.get(`${host}/projectInfo`, { params: params }) }