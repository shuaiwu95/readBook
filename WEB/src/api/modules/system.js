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
    }
  ]
}
