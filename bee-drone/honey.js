const AV = require('leancloud-storage'),
    config = require('../config/config');

function saveData(honey) {
    AV.init({
        appId: config.APP_ID,
        appKey: config.APP_KEY,
    });
    let BeeFlower= AV.Object.extend('BeeHoney');
    let bee = new BeeFlower();
    bee.save(honey)
    .then(function() {
        console.log(honey);
    })
    .catch(function(err) {
        console.error(err);
    })
}
    
module.exports = saveData
