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
                res.json({'msg':'ERROR,数据库异常！'})
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
// 添加书架
const addBookShelf = (conn, params, res) => {
    const sqlStr = sqlJson.insertBook + `('${params.userId}','${params.bookName}','${params.author}','${params.imgPath}','${params.path}')`
    console.log(sqlStr)
    conn.query(sqlStr, function (err, results, fields) {
        if (err) {
             console.log('[书插入失败] - ', err.message)
             res.json({'msg':'ERROR,数据库异常！'})
            return;
        }
        console.log('--------------------------CREATE----------------------------')
        console.log('CREATE TABLE:', results);        
        console.log('--------书插入成功--------\n\n')
        conn.end()
        res.json({'msg':'OK,您已成功将《' + params.bookName + '》加入书架！'})
     })
}
router.post('/addBookShelf',(req,res,next)=>{
    const conn = db.getConnection()
    const params = req.body
    addBookShelf(conn, params, res)
})
// 查询书架
const searchBookShelf = (conn, params, res) => {
    const sqlStr = sqlJson.searhBookShelf + `USERID = '${params.userId}'`
    conn.query(
        sqlStr,
        function (err, result) {
            if (err) {
                console.log("对不起您查询失败")
                res.json({'msg':'ERROR,数据库异常！'})
                return
            }
            res.json({'msg':'OK,查询成功！', data: result})
        }
    )
}
router.post('/searchBookShelf',(req,res,next)=>{
    const conn = db.getConnection()
    const params = req.body
    searchBookShelf(conn, params, res)
})
// 移除书架
const delBookShelf = (conn, params, res) => {
    const sqlStr = sqlJson.delBookShelf + `USERID = '${params.userId}' and BOOKNAME = '${params.bookName}'`
    conn.query(sqlStr, function (err, results, fields) {
        if (err) {
             console.log('[书删除失败] - ', err.message)
             res.json({'msg':'ERROR,数据库异常！'})
            return;
        }
        console.log('--------------------------Delete----------------------------')
        console.log('Delete TABLE:', results);        
        console.log('--------删除成功--------\n\n')
        conn.end()
        res.json({'msg':'OK,您已成功将《' + params.bookName + '》移除书架！'})
     })
}
router.post('/delBookShelf',(req,res,next)=>{
    const conn = db.getConnection()
    const params = req.body
    delBookShelf(conn, params, res)
})
// 判断某个书是否存在于某人的书架上
const repeatBookShelf = (conn, params, res)=> {
    const sqlStr = sqlJson.isBookRepeat + `USERID = '${params.userId}' and BOOKNAME = '${params.bookName}'`
    console.log(sqlStr)
    conn.query(
        sqlStr,
        function (err, result) {
            if (err) {
                console.log("对不起您查询失败")
                res.json({'msg':'ERROR,数据库异常！'})
                return
            }
            if (result.length === 1) {
                res.json({'msg':'OK,查询成功！', 'data': '1'})
            } else {
                res.json({'msg':'OK,查询成功！', 'data': '0'})
            }
        }
    )
}
router.post('/repeatBookShelf',(req,res,next)=>{
    const conn = db.getConnection()
    const params = req.body
    repeatBookShelf(conn, params, res)
})
// 更新书架信息
const updataBookShelf = (conn, params, res) => {
    const sqlStr = sqlJson.updataBookShelf + `PATH = '${params.path}' where USERID = '${params.userId}' and BOOKNAME = '${params.bookName}'`
    conn.query(
        sqlStr,
        function (err, result) {
            if (err) {
                console.log("对不起您查询失败")
                res.json({'msg':'ERROR,数据库异常！'})
                return
            }
            res.json({'msg':'OK,书架数据更新成功！'})
        }
    )
}
router.post('/updataBookShelf',(req,res,next)=>{
    const conn = db.getConnection()
    const params = req.body
    updataBookShelf(conn, params, res)
})
module.exports = router