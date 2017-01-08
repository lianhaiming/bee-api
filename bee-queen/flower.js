const AV = require('leancloud-storage'),
    util = require('../utils/util'),
    argv = require('../utils/argv'),
    config = require('../config/config');
    AV.init({
        appId: config.APP_ID,
        appKey: config.APP_KEY,
    });
    let BeeFlower= AV.Object.extend('BeeFlower');
    let bee = new BeeFlower();
/**
 * [saveLists 保存爬取到的url列表]
 * @param  {[Object]} flower [flower数据结构]
 * @return {[type]}        [description]
 */
function saveLists(flower) {
    // 查询BeeFlowser表
    var cql = 'select * from BeeFlower';
    AV.Query.doCloudQuery(cql).then(function (data) {
    // results 即为查询结果，它是一个 AV.Object 数组
    var results = data.results;
    if (results.length === 0) {
        bee.save(flower)
        .then(function() {
            console.log(`flower save: ${flower.sourceUrl} listsUrl`);
        })
        .catch(function(err) {
            console.error(err);
        })
        return;
    } else {
        // 判断flower源链接是否存在Beeflower表中   
        let status = false;
        for (let i = 0, len = results.length; i < len; i++) {
            let sourceUrl = results[i].attributes.sourceUrl;
            // 爬虫源是否相等,想等则执行update
            if (sourceUrl === flower.sourceUrl) {
                status = true;
                let listsUrl = results[i].attributes.listsUrl;
                let historylists = results[i].attributes.historylists;
                let flowerLists = flower.listsUrl;
                // 去虫
                let newListsUrl = util.difference(flowerLists, historylists);
                let tag = flower.tag || '';
                let objectId = results[i].id;
                var beeflower = AV.Object.createWithoutData('BeeFlower', objectId);
                // 修改属性
                beeflower.set('tag', tag);
                beeflower.set('sourceUrl', sourceUrl);
                beeflower.save()
                .then(function(beeflower) {
                    beeflower.remove('listsUrl', listsUrl);
                    return beeflower.save();
                })
                .then(function(beeflower) {
                    beeflower.addUnique('historylists', newListsUrl);
                    beeflower.add('listsUrl', newListsUrl);
                    return beeflower.save()
                })
                .then(function(beeflower){
                    console.log(`flower update: ${sourceUrl} listsUrl`)
                }, function(err) {
                    console.error(err);
                })
                break;
            } else {
                status = false;
            }
        }
        if(!status) {
            bee.save(flower)
            .then(function() {
                console.log(`flower save: ${flower.sourceUrl} listsUrl`);
            })
            .catch(function(err) {
                console.error(err);
            })
        }
    }
  }, function (error) {
    console.log(error); 
  });
}
module.exports = saveLists
