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
        let title = $('head > title').text() || '';
        let articleImg = $('.subject-img img').attr('src') || '';
        let imgSource = $('.subject-title a').text() || '';
        let time = $('.main-meta').text() || '';
        let author = $('span[property="v:reviewer"]').text() || '';
        let bio = '';
        let article = $('.review-content').text() || '';
        let content = $('.main-title-tip').text() || '';
        let sourceUrl = task;
        let rating = $('.main-title-hide').text() || '';
        let honey = {
            articleImg,
            imgSource,
            title,
            time,
            content,
            article,
            author,
            bio,
            sourceUrl,
            rating,
        }
        saveHoney(honey);
    })
}