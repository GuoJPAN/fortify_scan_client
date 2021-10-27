import axios from 'axios'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

let host = "/api"
    // let host = "localhost:8000/api"
    // 打包
    // let host = ""

// 获取主页信息

export const getindex = params => { return axios.get(`${host}/index/`, { params: params }) }

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