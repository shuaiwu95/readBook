/**
 * 系统级扩展方法
 */
import { LocaStorage, setToken, clearStorage, clearToken, setStorage } from './storage'
export default {
  install (Vue) {
    window.LocaStorage = window.plus ? window.plus.storage : localStorage
    // 本地存储
    Vue.prototype.$storage = LocaStorage
    Vue.prototype.$setToken = setToken
    Vue.prototype.$clearStorage = clearStorage
    Vue.prototype.$clearToken = clearToken
    Vue.prototype.$setStorage = setStorage
  }
}
