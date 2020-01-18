import Vue from 'vue'
import vuescroll from 'vuescroll'
import App from './App.vue'
import YDUI from 'vue-ydui' /* 相当于import YDUI from 'vue-ydui/ydui.rem.js' */
import 'vue-ydui/dist/ydui.rem.css'
import Router from '@/router/index.js'
import Store from './store/index'
import config from '@/config'
import sys from '@/sys'
import tool from '@/plusTools'
Vue.config.productionTip = false
Vue.use(config)
Vue.use(sys)
Vue.use(tool)
Vue.use(YDUI)
Vue.use(vuescroll) // install the vuescroll first
Vue.prototype.$vuescrollConfig = { // 注册下拉刷新组件
  bar: {
    background: 'transparent'
  }
}
new Vue({
  router: Router,
  store: Store,
  render: h => h(App)
}).$mount('#app')
