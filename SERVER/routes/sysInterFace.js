const express = require('express')
const router = express.Router()
const db = require('../config/db')
const confDb = require('../config/dbConf.json')
const sqlJson = require('../config/sql.json')
// 查询账号是否重复
const isRepeat = (conn, params, res) => {
    const sqlStr = sqlJson.isRepeat
    console.log(sqlStr + ` USERNAME = '${params.user}'`)
    conn.query(
        sqlStr + `USERNAME = '${params.user}'`,
        function (err, result) {
            if (err) {
                console.log("对不起您查询失败")
                return
            }
            if (result.length === 1) {
                console.log("账户密码存在")
                res.json({'msg':'ERROR,注册失败！该账号已存在！'})
            } else {
                insertUser(conn, params, res)
            }
        }
    )
}
// 用户注册
const insertUser = (conn, params, res)=> {
    const sqlStr = sqlJson.insertUser + `('${params.user}','${params.psw}','${params.sex}','${params.email}','${params.nickName}')`
    console.log(sqlStr)
    conn.query(sqlStr, function (err, results, fields) {
        if (err) {
             console.log('[用户信息插入失败] - ', err.message)
             res.json({'msg':'ERROR,数据库异常！'})
            return;
        }
        console.log('--------------------------CREATE----------------------------')
        console.log('CREATE TABLE:', results);        
        console.log('---------用户信息插入成功--------\n\n')
        conn.end()
        res.json({'msg':'OK,账号注册成功！'})
     });
}
router.post('/reg',(req,res,next)=>{
    const conn = db.getConnection()
    const params = req.body
    isRepeat(conn, params, res)
})
// 用户登录
router.post('/login',(req, res, next) => {
    const conn = db.getConnection()
    const params = req.body
    conn.query(
        sqlJson.login + ' USERNAME =? and PSW=?',
        [params.userName, params.psw],
        function (err, result) {
            if (err) {
                console.log("对不起您查询失败")
                return
            }
            conn.end()
            if (result.length === 1) {
                res.json({'data': result, 'msg':'OK,登录成功'})
            } else {
                res.json({'msg':'ERROR,账号或密码错误！'})
            }
        }
    )
})
module.exports = router