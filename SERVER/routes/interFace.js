const express = require('express');
const router = express.Router();
const path = require('path');
// const request = require('request')
const qs = require('querystring');
const http = require('http')
const bodyParser = require('body-parser'); //对post请求的请求体进行解析模块
const fs = require('fs'); //文件模块
const cheerio = require('cheerio')
const request = require('superagent')
require('superagent-charset')(request)
// https://m.kuxiaoshuo.com/ 
// 首页
const indexUrl = 'https://m.kuxiaoshuo.com/'
// 各类排行榜简略
router.post('/rankSmall',(req,res,next)=>{
    console.log('正在请求首页推荐列表')
    let rankSmallData = []
    request.get(indexUrl).charset('gbk').end((err,response)=>{
        console.log('正在请求首页推荐列表-请求成功')
        let $ = cheerio.load(response.text);
        let $article = $('.article')
        $article.each(function(i,v){
            let articleTitle = $(v).find('.title span a').text()
            if(articleTitle !== ""){
                let listArr = []
                let $listLis = $(v).find('.block ul li')
                $listLis.each(function(liIndex,liItem){
                    let type = ''
                    let name = ''
                    let authorName = ''
                    let url = ''
                    let lia = $(liItem).find('a')
                    lia.each(function(aIndex,aItem){
                        switch(aIndex){
                            case 0:
                                type = $(aItem).text()
                                break
                            case 1:
                                name = $(aItem).text()
                                url = $(aItem).attr('href')
                                break
                            case 2:
                                authorName = $(aItem).text()
                                break
                        }
                    })
                    listArr.push({
                        type: type,
                        name: name,
                        authorName: authorName,
                        url: url
                    })
                })
                rankSmallData.push({
                    articleTitle: articleTitle,
                    listArr: listArr
                })
            }
        })
        console.log()
        res.json({'data': rankSmallData,'msg':'OK,请求成功！'})
    })
    // const requestBack = (error, response, body) => {
    //     if (!error && response.statusCode == 200) {
    //         console.log(body) // 请求成功的处理逻辑
    //         res.json(body)
    //     }
    // }
    // request({
    //     url: indexUrl,
    //     method: 'get',
    //     json: false,
    //     headers: {
    //         // "content-type": setJson['content-type'],
    //     }
    // }, requestBack)
})
module.exports = router;
  