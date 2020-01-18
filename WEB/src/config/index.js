import { api } from './api'
import axios from 'axios'
import plusExtends from './plus'
export default {
  install (Vue) {
    Vue.prototype.$api = api
    Vue.prototype.$ajax = axios
    // 调用plus
    // this.$plusExtends(() => {
    //   var cmr = window.plus.camera.getCamera()
    //   cmr.captureImage((path) => {
    //     alert(path)
    //   })
    // })
    Vue.prototype.$plusExtends = plusExtends
  }
}
