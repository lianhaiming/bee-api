const cheerio = require('cheerio'),
    request = require('request'),
    Url = require('url'),
    util = require('../../../utils/util'),
    saveHoney = require('../../../bee-drone/honey').saveHoney,
    underscore = require('underscore');

module.exports = function(task) {
    util.beeRequest(task)
    .then((body)=> {
        let $ = cheerio.load(body, {
            decodeEntities: false
        })
        let title = $('.headline-title').text();
        let articleImg = $('.img-wrap img').attr('src') || '';
        let imgSource = $('.img-source').text();
        let time = '';
        let author = $('.author').text();
        let bio = $('.bio').text();
        let article = $('.content').html();
        let content = '';
        let sourceUrl = task;
        let honey = {
                articleImg,
                imgSource,
                title,
                time,
                content,
                article,
                author,
                bio,
                sourceUrl
            }
        saveHoney(honey);
    })
}