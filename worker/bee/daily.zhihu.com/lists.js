const cheerio = require('cheerio'),
    request = require('request'),
    Url = require('url'),
    underscore = require('underscore');

module.exports = function(task) {
    let url = `http://${task}`;
    request(url, (err, res, body)=> {
        console.log(body);
    })
}