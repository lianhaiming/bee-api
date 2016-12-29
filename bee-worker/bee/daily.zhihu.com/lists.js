const cheerio = require('cheerio'),
    request = require('request'),
    Url = require('url'),
    util = require('../../../utils/util'),
    underscore = require('underscore');

module.exports = function(task) {
    let url = `http://${task}`;
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
            if(util.judeUrl(item)) {
                listsUrl.push(item);
            } else {
                listsUrl.push(`${domain}${$(item).attr('href')}`);
            }
        })
        console.log(listsUrl)
    })
}