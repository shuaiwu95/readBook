/**
 * 系统工具
 */
// 扫码工具
import BarCoode from './tools/BarCode'
// sqllite本地数据库
import SqlLite from './tools/SqlLite'
// Geolocation 定位
import Geolocation from './tools/Geolocation'
export default {
  install (Vue) {
    // 本地存储
    Vue.prototype.$BarCoode = BarCoode
    // sqllite
    Vue.prototype.$SqlLite = SqlLite
    // 定位
    Vue.prototype.$Geolocation = Geolocation
  }
}
