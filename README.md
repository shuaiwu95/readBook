# ReadBook 小说APP
## 创建数据库
`
1.请安装mysql数据库
2.创建一个数据库，命名随意，如 bookbase
`
## 启动项目
>
1. 配置项目路径 /WEB/src/config/settings/index.js
  mockBaseUrl: 'http://192.168.1.94:3000' // 开发环境路径
  prodBaseUrl: 'http://192.168.1.94:3000' // 生产环境路径
  
2. 启动项目
  2.1 请打开WEB文件夹的控制台 npm run dev 启动客户端
  2.2 请打开SERVE文件夹控制台 npm start 启动服务端
  
3. 配置数据库环境
  3.1 请打开浏览器 输入 localhost:8080/#/dbset 进入数据库配置页面
  3.2 请根据实际情况输入各配置项
