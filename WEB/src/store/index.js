import Vue from 'vue'
import Vuex from 'vuex'
import views from './modules/views.js'
import botNav from './modules/botNav.js'
Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    views,
    botNav
  }
})
