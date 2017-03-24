const cheerio = require('cheerio'),
    request = require('request'),
    Url = require('url'),
    util = require('../../../utils/util'),
    saveLists = require('../../../bee-queen/flower'),
    underscore = require('underscore');

module.exports = function(task) {
    let url;
    if (util.judeUrl(task)) {
        url = task;
    } else {
        url = `https://${task}/review/best/?start=0`;
    }
    let domain = 'https://movie.douban.com';
    console.log(url)
    util.beeRequest(url)
    .then((body)=> {
        let $ = cheerio.load(body, {
            decodeEntities: false
        })
        let lists = $('.title-link');
        let pageLists = $('.paginator > a');
        // console.log(pageLists.length)
        // 获取lists
        let listsUrl = [];
        [].forEach.call(lists,(item, index)=> {
            let itemUrl = $(item).attr('href');
            if(util.judeUrl(itemUrl)) {
                listsUrl.push(itemUrl);
            } else {
                listsUrl.push(`${domain}${itemUrl}`);
            }
        });

        [].forEach.call(pageLists,(item, index)=> {
            let pageUrl = $(item).attr('href');
            if(util.judeUrl(pageUrl)) {
                listsUrl.push(pageUrl);
            } else {
                listsUrl.push(`${domain}${pageUrl}`);
            }
        })
        let tag = 'review';
        let sourceUrl = url;
        let historylists = [].concat(listsUrl);
        let flower = {
            tag,
            listsUrl,
            sourceUrl,
            historylists,
        };
        // console.log(listsUrl);
        // 存储列表数据
        saveLists(flower);
    })
    .catch(function(err) {
        console.error(err);
    })
}