const AV = require('leancloud-storage'),
    Promise = require('promise'),
    config = require('../config/config');


function getSourceUrl(sourceUrl) {
    AV.init({
        appId: config.APP_ID,
        appKey: config.APP_KEY,
    }); 
    let query = new AV.Query('BeeFlower');
    query.equalTo('sourceUrl', sourceUrl);
    return new Promise((resolve, reject)=> {
        query.find()
        .then(function(results) {
            if (results.length === 0) return;
            let listsUrl = results[0].attributes.listsUrl;
            resolve(listsUrl);
            console.log(`query ${sourceUrl} success`);
        }, function(err) {
            reject(err);
        })
    })
}

module.exports = getSourceUrl;
