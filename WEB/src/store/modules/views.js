
const state = {
  visitedViews: [], // 已经点击访问过的View, 用于展示为tag-tabs
  cachedViews: [] // 哪些Views需要使用keep-alive进行缓存,默认不加noCache的都会缓存(根据业务需求)
}
const mutations = {
  // 增加浏览记录路由对象
  ADD_VISITED_VIEW (state, { route }) {
    if (state.visitedViews.some(v => v.path === route.path)) return
    state.visitedViews.push(route)
    if (route.name && route.meta && !route.meta.noCache) {
      state.cachedViews.push(route.name)
    }
  }
}
const actions = {
  addVisitedViews ({ commit }, { route }) {
    commit('ADD_VISITED_VIEW', { route })
  }
}
const getters = {
  // 页面
  cachedViews: state => state.cachedViews,
  visitedViews: state => state.visitedViews
}
export default {
  namespaced: true, // 用于在全局引用此文件里的方法时标识这一个的文件名
  state,
  getters,
  mutations,
  actions
}
