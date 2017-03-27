'use strict'

var cheerio = require('cheerio')
    ,request = require('request')
    ,Url = require('url')
    ,co = require('co')
    ,util = require('../../../lib/util')
    ,bee = require('../../../lib/bee')
    ,underscore = require('underscore');

module.exports = function(task) {
    let extend = {};
    let honey = {};
    let flower = {};
    let cluster = {};
    let url = task;
    let domain = 'http://daily.zhihu.com';
    return co(function* () {
        let b = new bee;
        let body = yield b.task(url);       
        if(util.isError(body)) {
            logger.error(body);
            return;
        }
        let $ = cheerio.load(body, {
            decodeEntities: false
        })
        console.log(body)
        console.log($('.img-source').text());
        let date=  new Date().getTime();
        honey = {
            title: $('.headline-title').text() || '' // 内容标题
            ,subhead: '' // 内容副标题
            ,bio: $('.author+.bio').text() || ''
            ,summary: '' // 内容摘要
            ,author: $('.avatar+.author').text() || '' // 内容作者
            ,image: $('.main-wrap img').attr('src') || '' // 内容门面图
            ,content: $('.meta+.content').html() || ''// 内容
            ,date: date // 内容日期
            ,originalUrl: url // 内容源链接
            ,tag: ['daily'] //内容类型
            ,comments: [{
                author: '' // 评论人名字
                ,authorInfo: '' // 评论人介绍
                ,authorImg: '' // 评论人头像
                ,cdate: '' // 评论时间
                ,ccontent: '' // 评论内容
            }] // 文章评论
        }  
        cluster = {
            listsUrl: []
            ,originalUrl: url // 爬取列表的爬虫源
            ,isRelate: false // 是否是相关链接
            ,page: 1 // 分页处理
        }
        return flower = {
                cluster
                ,honey
                ,extend
            }
        
    })
}