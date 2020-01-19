export const systemApi = {
  system: [
    {
      name: 'loginIn',
      method: 'POST',
      path: '/loginIn/getData',
      mockPath: '/loginIn/getData',
      params: {
        role: []
      },
      desc: '用户登录'
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
    }
  ]
}
