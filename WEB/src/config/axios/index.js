import axios from 'axios'
import { AXIOS_DEFAULT_CONFIG } from '@/config/settings'
/**
 *
 *
 * @param {*} config
 * @returns
 */
function axiosRequestSucessFunc (config) {
  // dosth before request
  // config.headers['Content-type'] = 'application/x-www-form-urlencoded'
  return config
}

/**
 *
 *
 * @param {*} error
 * @returns
 */
function axiosRequestFailFunc (error) {
  return Promise.reject(error)
}
/**
 *
 *
 * @param {*} response
 * @returns
 */
function axiosResponseSucessFunc (response) {
  /**
   * response 基本格式如下
   * {
   *  ...
   *  status: 200,
   *  data: {
   *    head: { success: 'true' },
   *    data: { some data here }
   *  }
   *  ...
   * }
   */
  // response by remote server
  return response.data
}

function axiosResponseFailFunc (error) {
  return Promise.reject(error)
}

const axiosInstance = axios.create(AXIOS_DEFAULT_CONFIG)
// 注入request拦截器
axiosInstance.interceptors.request.use(axiosRequestSucessFunc, axiosRequestFailFunc)
// 注入response拦截器
axiosInstance.interceptors.response.use(axiosResponseSucessFunc, axiosResponseFailFunc)

export default axiosInstance
