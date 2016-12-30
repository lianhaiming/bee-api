const cheerio = require('cheerio'),
    request = require('request'),
    Url = require('url'),
    util = require('../../../utils/util'),
    saveLists = require('../../../bee-queen/flower'),
    underscore = require('underscore');

module.exports = function(task) {
    let url = `http://${task}/welcome/frontend`;
    let domain = 'https://gold.xitu.io/';
    util.beeRequest(url)
    .then((body)=> {
        let $ = cheerio.load(body, {
            decodeEntities: false
        })
        let lists = $('.entries .entry-info .entry-meta a');
        // console.log($(lists).attr('href'))
        // 获取lists
        let listsUrl = [];
        [].forEach.call(lists,(item, index)=> {
            let itemUrl = $(item).attr('href');
            if (itemUrl) {
                if(util.judeUrl(itemUrl)) {
                    if (/^https:\/\/gold\.xitu\.io/.test(itemUrl)) {
                        listsUrl.push($(item).attr('href'));
                    }    
                } else {
                    listsUrl.push(`${domain}${itemUrl}`);
                }
            }
            
        })
        let tag = 'frontend';
        let sourceUrl = url;
        let flower = {
            tag,
            listsUrl,
            sourceUrl,
        };
        // console.log(listsUrl);
        saveLists(flower);
    })
}