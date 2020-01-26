const express = require('express');
const router = express.Router();
const path = require('path');
// const request = require('request')
const qs = require('querystring');
const http = require('http') 
const fs = require('fs'); //文件模块
const cheerio = require('cheerio')
const request = require('superagent')
require('superagent-charset')(request)
// https://m.kuxiaoshuo.com/ 
// 首页
const indexUrl = 'https://m.kuxiaoshuo.com/'
const classificationUrl = 'https://m.kuxiaoshuo.com/sort.html'
const detailUrl = 'https://m.kuxiaoshuo.com'
// 各类排行榜简略
router.post('/rankSmall',(req,res,next)=>{
    console.log('正在请求首页推荐列表')
    let rankSmallData = []
    request.get(indexUrl).charset('gbk').end((err,response)=>{
        console.log('正在请求首页推荐列表-请求成功')
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
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
})
// 小说分类查询
router.post('/classification',(req,res,next)=>{
    console.log('正在请求小说分类')
    request.get(classificationUrl).charset('gbk').end((err,response)=>{
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
        let $contentList = $('.content ul li')
        let classData = []
        $contentList.each(function(liIndex,liItem){
            let itemName = $(liItem).find('a').text()
            let url = $(liItem).find('a').attr('href')
            classData.push({
                'name': itemName,
                'url': url
            })
        })
        console.log('小说分类-请求成功！')
        res.json({'data': classData,'msg':'OK,请求成功！'})
    })
})
// 小说封面查询details
router.post('/details',(req,res,next)=>{
    console.log('正在请求小说详情')
    console.log(req.body.id)
    request.get(detailUrl + req.body.id).charset('gbk').end((err,response)=>{
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
        let $block = $('.block')
        let imgUrl = $block.find('img').attr('src')
        let title = $block.find('h2 a').text()
        let author = $block.find('p').eq(2).find('a').text()
        let type = $block.find('p').eq(3).find('a').text()
        let status = $block.find('p').eq(4).text()
        let update = $block.find('p').eq(5).text()
        let newData = $block.find('p').eq(6).find('a').text()
        let info = $('.intro_info').text()
        let newChapterLi = $('.chapter').find('li')
        let newChapters = []
        let firstHtml = $('.margin_right').find('a').attr('href')
        newChapterLi.each(function(i,e){
            newChapters.push({
                name: $(e).find('a').text(),
                url: $(e).find('a').attr('href')
            })
        })
        console.log('小说详情-请求成功！')
        res.json({'data': {
            imgUrl: imgUrl,
            title: title,
            author: author,
            type: type,
            status: status,
            update: update,
            newData: newData,
            info: info,
            newChapters: newChapters,
            firstHtml: firstHtml
        },'msg':'OK,请求成功！'})
    })
})
// 获取小说内容
router.post('/readBook',(req,res,next)=>{
    console.log('正在请求小说内容')
    console.log(detailUrl +  req.body.url + req.body.path)
    request.get(detailUrl + req.body.path).charset('gbk').end((err,response)=>{
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
        let con = $('#content').find('.text').html()
        let title = $('#content').find('.title').text()
        let nextPath = $('.navigator-nobutton').find('ul li').eq(3).find('a').attr('href')
        let lastPath = $('.navigator-nobutton').find('ul li').eq(0).find('a').attr('href')
        let allPath = $('.navigator-nobutton').find('ul li').eq(1).find('a').attr('href')
        res.json({
            data: {
                con: con,
                title: title,
                nextPath: nextPath,
                lastPath: lastPath,
                allPath: allPath
            },
            msg: 'OK,请求成功！'
        })
    })
})
// 获取小说指定类目
router.post('/getClassList',(req,res,next)=>{
    console.log('正在请求小说类目')
    console.log(detailUrl + req.body.path)
    request.get(detailUrl + req.body.path).charset('gbk').end((err,response)=>{
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
       
        let cover = $('.cover')
        let coverP = cover.find('.line')
        let data = []
        coverP.each((i, e) => {
            data.push({
                type: $(e).find('a').eq(0).text(),
                name: $(e).find('a').eq(1).text(),
                author: $(e).find('a').eq(2).text(),
                path: $(e).find('a').eq(1).attr('href')
            })
        })
        console.log('小说列表加载成功')
        res.json({
            data: {
                list: data,
                next: $('.page a').eq(0).attr('href')
            },
            msg: 'OK,请求成功！'
        })
    })
})
// searchBook
router.post('/searchBook',(req,res,next)=>{
    console.log('正在搜索======>' + req.body.keyword)
    let keyword = req.body.keyword
    console.log(detailUrl + '/s.php?keyword=' + keyword)
    request.get(detailUrl + '/s.php?keyword=' + encodeURI(keyword)).charset('gbk').end((err,response)=>{
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
        let cover = $('.cover')
        let coverP = cover.find('.line')
        let data = []
        coverP.each((i, e) => {
            data.push({
                type: $(e).find('a').eq(0).text(),
                name: $(e).find('a').eq(1).text(),
                author: $(e).find('a').eq(2).text(),
                path: $(e).find('a').eq(1).attr('href')
            })
        })
        console.log('小说列表加载成功')
        res.json({
            data: {
                list: data
            },
            msg: 'OK,请求成功！'
        })
    })
})
// catalog
router.post('/catalog',(req,res,next)=>{
    console.log('正在搜索======>' + req.body.path)
    let path = req.body.path
    console.log(detailUrl + path)
    request.get(detailUrl + path).charset('gbk').end((err,response)=>{
        let $ = null
        try {
            $ = cheerio.load(response.text)
        } catch (error) {
            res.json({
                data: '',
                msg: 'ERROR,请求出错'
            })
            return
        }
        let cover = $('.cover')
        let read = cover.find('.read')
        let title = read.find('h3').text()
        let zxPath = read.find('span a').eq(0).attr('href')
        let dxPath = read.find('span a').eq(1).attr('href')
        let chapter = cover.find('.chapter')
        let nextPageDom = $('.page').eq(0)
        nextPageDom.find('a').each((i,e) => {
            if($(e).text() === '下一页') {
                nextPage = $(e).attr('href')
            }
        })
        let zjList = []
        chapter.find('li').each((i,e) => {
            zjList.push({
                name: $(e).find('a').text(),
                path: $(e).find('a').attr('href')
            })
        })
        res.json({
            data: {
                title: title,
                zxPath: zxPath,
                dxPath: dxPath,
                zjList: zjList,
                nextPage: nextPage
            },
            msg: 'OK,请求成功！'
        })
    })
})
module.exports = router;
  