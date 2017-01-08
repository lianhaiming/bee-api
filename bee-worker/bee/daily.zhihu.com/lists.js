const cheerio = require('cheerio'),
    request = require('request'),
    Url = require('url'),
    util = require('../../../utils/util'),
    saveLists = require('../../../bee-queen/flower'),
    underscore = require('underscore');

module.exports = function(task) {
    let url;
    if (/[a-zA-Z]*:\/\/[\w\W]*/.test(task)) {
        url = task;
    } else {
        url = `http://${task}`;
    }
    let domain = 'http://daily.zhihu.com';
    util.beeRequest(url)
    .then((body)=> {
        let $ = cheerio.load(body, {
            decodeEntities: false
        })
        let lists = $('.row .box a');
        // 获取lists
        let listsUrl = [];
        [].forEach.call(lists,(item, index)=> {
            let itemUrl = $(item).attr('href');
            if(util.judeUrl(itemUrl)) {
                listsUrl.push(itemUrl);
            } else {
                listsUrl.push(`${domain}${itemUrl}`);
            }
        })
        let tag = 'story';
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