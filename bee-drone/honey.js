const AV = require('leancloud-storage'),
    config = require('../config/config');

AV.init({
    appId: config.APP_ID,
    appKey: config.APP_KEY,
});
let BeeFlower= AV.Object.extend('BeeHoney');
let bee = new BeeFlower();
function saveHoney(honey) {
    bee.save(honey)
    .then(function() {
        console.log(`save ${honey.sourceUrl} data success`);
        // console.log(honey);
    })
    .catch(function(err) {
        console.error(err);
    })
}

function getHoney(sourceUrl) {
    cql = `select * from BeeHoney where sourceUrl = "${sourceUrl}"`;
    return new Promise((resolve, reject)=> {
        AV.Query.doCloudQuery(cql)
        .then(function (data) {
            console.log(`get ${sourceUrl} Honey is success`);
            // console.log(data.results.length)
            resolve(data.results.length);
        }, function(err) {
            reject(err);
        });
    })
}
module.exports = {
    saveHoney,
    getHoney,
}
