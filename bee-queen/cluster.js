const AV = require('leancloud-storage'),
    Promise = require('promise'),
    config = require('../config/config');


function getSourceUrl(sourceUrl) {
    AV.init({
        appId: config.APP_ID,
        appKey: config.APP_KEY,
    });
    let cql;
    if (sourceUrl) {
        cql = `select * from BeeFlower where sourceUrl = "${sourceUrl}"`;
    } else {
        cql = `select * from BeeFlower`;
    }
    return new Promise((resolve, reject)=> {
        AV.Query.doCloudQuery(cql).then(function (data) {
            console.log(`Query BeeFlower table success`);
            // results 即为查询结果，它是一个 AV.Object 数组
            var results = data.results;
            let sourceUrlArr = [];
            results.forEach((item, index)=> {
                sourceUrlArr = sourceUrlArr.concat(item.attributes.listsUrl)
            })
            resolve(sourceUrlArr);
            }, function (error) {
                reject(error);
        });
    })
}
module.exports = getSourceUrl;
