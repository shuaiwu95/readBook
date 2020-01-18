import Vue from 'vue'
import Router from 'vue-router'
import { beforeEachFn } from './routerBeforeFn'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Mine from '@/views/Mine'
import ClassView from '@/views/ClassView'
import Rank from '@/views/Rank'
Vue.use(Router)
const routerInstance = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      meta: {
        isCache: false,
        requireAuth: true
      },
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta: {
            isCache: false,
            requireAuth: true
          }
        }, {
          path: 'classview',
          name: 'ClassView',
          component: ClassView,
          meta: {
            isCache: false,
            requireAuth: false
          }
        }, {
          path: 'rank',
          name: 'Rank',
          component: Rank,
          meta: {
            isCache: false,
            requireAuth: false
          }
        }, {
          path: 'mine',
          name: 'Mine',
          component: Mine,
          meta: {
            isCache: false,
            requireAuth: false
          }
        }
      ]
    }, {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        isCache: false,
        requireAuth: false
      }
    }
  ]
})
// 路由注入拦截器
routerInstance.beforeEach(beforeEachFn)
export default routerInstance
