// 自动创建数据库
const express = require('express');
const router = express.Router();
const db = require('../config/db');
const fs = require('fs'); //文件模块
const confDb = require('../config/dbConf.json')
// 读取数据库配置文件
const readCon = (callback) => {
    fs.readFile('./config/dbConf.json', function (err, data) {
        if (err) {
            res.json({'data': '','msg':'ERROR,服务器配置文件读取失败！'})
            return console.error(err)
        }
        let person = data.toString()//将二进制的数据转换为字符串
        person = JSON.parse(person)//将字符串转换为json对象
        if(callback && typeof callback === 'function') {
            callback(person)
        }
    })
}
router.post('/creat',(req,res,next)=>{
    // const conn = db.getConnection();
    console.log('准备初始化数据库')
    console.log('正在创建配置文件')
    readCon((person) => {
        let reqJson = req.body
        for (let key in person) {
            person[key] = reqJson[key]
        }
        let str = JSON.stringify(person)
        fs.writeFile('./config/dbConf.json', str, function (err) {
            if (err) {
                console.log('----------配置写入失败-------------');
                res.json({'data': '','msg':'ERROR,服务器配置文件写入失败！'})
                console.error(err);
            }
            console.log('----------配置写入成功-------------')
            console.log(confDb)
            if (reqJson.unitBase) {
                // 初始化数据库
                res.json({'data': '123','msg':'OK,数据库初始化成功！'})
            } else {
                res.json({'data': '123','msg':'OK,数据库配置文件重置成功！'})
            }  
        })
    })
})
module.exports = router;