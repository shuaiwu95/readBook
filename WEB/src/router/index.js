import Vue from 'vue'
import Router from 'vue-router'
import { beforeEachFn } from './routerBeforeFn'
import Layout from '@/views/Layout'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Mine from '@/views/Mine'
import ClassView from '@/views/ClassView'
import Sort from '@/views/ClassView/sort'
import Rank from '@/views/Rank'
import Detail from '@/views/BookDetails'
// ReadBook
import ReadBook from '@/views/ReadBook'
// DB配置页面
import Dbsetting from '@/views/DbSet'
Vue.use(Router)
const routerInstance = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          path: '/',
          name: 'Home',
          component: Home,
          meta: {
            isCache: true,
            requireAuth: false
          }
        }, {
          path: 'classview',
          name: 'ClassView',
          component: ClassView,
          meta: {
            isCache: true,
            requireAuth: false
          }
        }, {
          path: 'sort',
          name: 'Sort',
          component: Sort,
          meta: {
            isCache: true,
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
        }, {
          path: 'detail',
          name: 'Detail',
          component: Detail,
          meta: {
            isCache: true,
            requireAuth: false
          }
        }, {
          path: 'readBook',
          name: 'ReadBook',
          component: ReadBook,
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
    }, {
      path: '/dbset',
      name: 'Dbset',
      component: Dbsetting,
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
