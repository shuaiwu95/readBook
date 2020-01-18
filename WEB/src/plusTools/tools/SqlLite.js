/*
  本地存储 sqlLite数据库操作
  @class SqlLite
  @method shuaiwu Li
 */
export default class SqlLite {
  constructor (setting = {}) {
    const _self = this
    // eslint-disable-next-line no-prototype-builtins
    if (!window.hasOwnProperty('plus')) {
      alert('您当前环境不支持数据库')
      return
    }
    Object.assign(_self, {
      name: 'appDB', // 数据库名称
      path: '_doc/appDB.db' // 数据库路径 _doc 为移动设备中该项目文件中的文件
    }, setting)
    // eslint-disable-next-line no-undef
    _self.plusSqlLite = plus.sqlite
    _self.openDatabase()
  }

  // 打开数据库，如果没打开则创建数据库
  openDatabase () {
    const _self = this
    _self.plusSqlLite.openDatabase({
      name: _self.name,
      path: _self.path,
      success: function (e) { // 数据库启动成功
        console.log('openDatabase success!')
      },
      fail: function (e) { // 数据库启动失败
        console.error('openDatabase failed: ' + JSON.stringify(e))
      }
    })
  }

  // 执行增删改等操作的SQL语句
  executeSql (sqlStr, executeSuccess, executeError) {
    const _self = this
    if (_self.isOpenDatabase()) {
      _self.plusSqlLite.executeSql({
        name: _self.name,
        sql: sqlStr,
        success: function (e) {
          if (executeSuccess !== undefined && typeof executeSuccess === 'function') {
            executeSuccess(e)
          }
        },
        fail: function (e) {
          if (executeError !== undefined && typeof executeError === 'function') {
            executeError(e)
          }
        }
      })
    } else {
      console.error('数据库没有打开')
    }
  }

  // 执行查询sql语句
  selectSql (sqlStr, executeSuccess, executeError) {
    const _self = this
    if (_self.isOpenDatabase()) {
      _self.plusSqlLite.selectSql({
        name: _self.name,
        sql: sqlStr,
        success: function (e) {
          if (executeSuccess !== undefined && typeof executeSuccess === 'function') {
            executeSuccess(e)
          }
        },
        fail: function (e) {
          if (executeError !== undefined && typeof executeError === 'function') {
            executeError(e)
          }
        }
      })
    } else {
      console.error('数据库没有打开')
    }
  }

  // 判断数据库是否开启
  isOpenDatabase () {
    const _self = this
    return _self.plusSqlLite.isOpenDatabase({
      name: _self.name,
      path: _self.path
    })
  }

  // 关闭数据库
  closeDatabase () {
    const _self = this
    _self.plusSqlLite.closeDatabase({
      name: _self.name,
      success: function (e) {
        console.log('closeDatabase success!')
      },
      fail: function (e) {
        console.error('closeDatabase failed: ' + JSON.stringify(e))
      }
    })
  }

  // 事物 开始begin 回滚rollback 提交commit
  transactionDb (operation) {
    const _self = this
    _self.plusSqlLite.transaction({
      name: _self.name,
      operation: operation,
      success: function (e) {
        console.log('transaction success!')
      },
      fail: function (e) {
        console.error('transaction failed: ' + JSON.stringify(e))
      }
    })
  }

  /**
   * 创建数据库表
   * @param table 表名 String
   * @param params 表字段 {}
   * @returns {Promise}
   */
  createTableTest (table, params) {
    const _self = this
    return new Promise((resolve, reject) => {
      if (_self.isOpenDatabase()) {
        const keys = Object.keys(params)
        const str =
          `CREATE TABLE IF NOT EXISTS ${table} (_id integer primary key autoincrement, ${keys.join(' varchar(20),')} varchar(20))`
        _self.executeSql(str, (result) => {
          // eslint-disable-next-line no-undef
          resolve(results)
        }, (error) => {
          reject(error)
        })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('数据库未打开！')
      }
    })
  }

  /**
   * 插入数据
   * @param table 表名 String
   * @param params 数据参数 {}
   * @returns {Promise}
   */
  insert (table, params) {
    const _self = this
    return new Promise((resolve, reject) => {
      if (_self.isOpenDatabase()) {
        const keys = Object.keys(params)
        const values = []
        // eslint-disable-next-line no-unused-vars
        let empty = ''
        keys.forEach((key) => {
          values.push(params[key])
          empty += '?, '
        })
        empty = empty.substring(0, empty.length - 2)
        const sqlStr = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${values.join(', ')})`
        _self.executeSql(sqlStr, (result) => {
          // eslint-disable-next-line no-undef
          resolve(results)
        }, (error) => {
          reject(error)
        })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('数据库未打开！')
      }
    })
  }

  /**
   * 查询
   * @param table 表名 String
   * @param params 查询条件 {}
   * @returns {Promise}
   */
  queryAll (table, params) {
    const _self = this
    return new Promise((resolve, reject) => {
      if (_self.isOpenDatabase()) {
        const keys = Object.keys(params)
        const wheres = []
        keys.forEach((key) => {
          wheres.push('WHERE ' + key + '=' + params[key])
        })
        const sqlStr = `SELECT * FROM ${table} ${wheres.join(', ')}`
        _self.selectSql(sqlStr, (result) => {
          // eslint-disable-next-line no-undef
          resolve(results)
        }, (error) => {
          reject(error)
        })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        reject('数据库未打开！')
      }
    })
  }
}
