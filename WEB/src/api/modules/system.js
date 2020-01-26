export const systemApi = {
  system: [
    {
      name: 'login',
      method: 'POST',
      path: '/app/login',
      mockPath: '/app/login',
      params: {
        role: []
      },
      desc: '用户登录'
    }, {
      name: 'reg',
      method: 'POST',
      path: '/app/reg',
      mockPath: '/app/reg',
      params: {
        role: []
      },
      desc: '用户登录'
    }, {
      name: 'createDb',
      method: 'POST',
      path: '/db/creat',
      mockPath: '/db/creat',
      params: {
        role: []
      },
      desc: '初始化数据库'
    }, {
      name: 'addBookShelf',
      method: 'POST',
      path: '/app/addBookShelf',
      mockPath: '/app/addBookShelf',
      params: {
        role: []
      },
      desc: '添加书架'
    }, {
      name: 'searchBookShelf',
      method: 'POST',
      path: '/app/searchBookShelf',
      mockPath: '/app/searchBookShelf',
      params: {
        role: []
      },
      desc: '查询书架'
    }, {
      name: 'delBookShelf',
      method: 'POST',
      path: '/app/delBookShelf',
      mockPath: '/app/delBookShelf',
      params: {
        role: []
      },
      desc: '移除书架'
    }, {
      name: 'repeatBookShelf',
      method: 'POST',
      path: '/app/repeatBookShelf',
      mockPath: '/app/repeatBookShelf',
      params: {
        role: []
      },
      desc: '判断该书是否存在于书架'
    }, {
      name: 'updataBookShelf',
      method: 'POST',
      path: '/app/updataBookShelf',
      mockPath: '/app/updataBookShelf',
      params: {
        role: []
      },
      desc: '书架信息更新'
    }
  ],
  getBook: [
    {
      name: 'getSmallRank',
      method: 'POST',
      path: '/app/rankSmall',
      mockPath: '/app/rankSmall',
      params: {
        role: []
      },
      desc: '获取首页排行'
    }, {
      name: 'classification',
      method: 'POST',
      path: '/app/classification',
      mockPath: '/app/classification',
      params: {
        role: []
      },
      desc: '获取小说分类'
    }, {
      name: 'details',
      method: 'POST',
      path: '/app/details',
      mockPath: '/app/details',
      params: {
        role: []
      },
      desc: '获取小说详情'
    }, {
      name: 'readBook',
      method: 'POST',
      path: '/app/readBook',
      mockPath: '/app/readBook',
      params: {
        role: []
      },
      desc: '获取小说内容'
    }, {
      name: 'getClassList',
      method: 'POST',
      path: '/app/getClassList',
      mockPath: '/app/getClassList',
      params: {
        role: []
      },
      desc: '获取小说分类列表'
    }, {
      name: 'searchBook',
      method: 'POST',
      path: '/app/searchBook',
      mockPath: '/app/searchBook',
      params: {
        role: []
      },
      desc: '搜索小说'
    }, {
      name: 'catalog',
      method: 'POST',
      path: '/app/catalog',
      mockPath: '/app/catalog',
      params: {
        role: []
      },
      desc: '小说目录'
    }
  ]
}
