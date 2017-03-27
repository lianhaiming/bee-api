'use strict'

const cheerio = require('cheerio')
    ,request = require('request')
    ,Url = require('url')
    ,util = require('../../../lib/util')
    // ,flower = require('../../bee-queen/flower')
    ,underscore = require('underscore')
    ,co = require('co')
    ,logger = require('../../../lib/log')
    ,bee = require('../../../lib/bee');
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
            return {
                res: -1,
                info: ''
            };
        }
        let $ = cheerio.load(body, {
            decodeEntities: false
        })
        let lists = $('.row .box a');
        // // 获取lists
        let listsUrl = [];
        [].forEach.call(lists,(item, index)=> {
            let itemUrl = $(item).attr('href');
            if(util.isUrl(itemUrl)) {
                listsUrl.push(itemUrl);
            } else {
                listsUrl.push(`${domain}${itemUrl}`);
            }
        })
        cluster = {
            listsUrl
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