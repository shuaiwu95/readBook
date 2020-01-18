/* 控制底部导航状态 */
const state = {
  activeHome: true,
  activeClass: false,
  activeMine: false,
  activeRank: false,
  showTopNav: true,
  showBottomNav: true
}
const mutations = {}
const actions = {}
const getters = {
  getHome: state => state.activeHome,
  getClass: state => state.activeClass,
  getMine: state => state.activeMine,
  getRank: state => state.activeRank,
  getTopNav: state => state.showTopNav,
  getBottomNav: state => state.showBottomNav
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
