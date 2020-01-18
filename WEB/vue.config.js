const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
    // 配置快捷路径，styles为路径名字，resolve是原路径地址
      .set('@styles', resolve('src/assets/styles'))
    // 组件调用快捷路径
      .set('@common', resolve('src/components/common'))
  }
}
