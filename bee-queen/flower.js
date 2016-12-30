const AV = require('leancloud-storage'),
    config = require('../config/config');

function saveLists(flower) {
    AV.init({
        appId: config.APP_ID,
        appKey: config.APP_KEY,
    });

    let BeeFlower= AV.Object.extend('BeeFlower');
    let bee = new BeeFlower();
    bee.save({
        tag: flower.tag,
        listsUrl: flower.listsUrl,
        sourceUrl: flower.sourceUrl,
    })
    .then(function() {
        console.log('save sucess')
    })
    .catch(function(err) {
        console.error(err);
    })
}
    

module.exports = saveLists
