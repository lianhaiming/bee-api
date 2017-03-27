'use strict'

var util  = require('../../lib/util');
var logger = require('../../lib/log');
var cluster = require('./cluster');
var mqueen = require('../../beemodule/mbeequeen');
// var mhoney = require('../bee-drone/honey');
var co = require('co');

exports.getFlower = function(flower) {
    function* bee_cluster() {
        if(!flower) return;
        let clusListUrl = flower.cluster && flower.cluster.listsUrl;
        if(clusListUrl.length === 0) return;
        let clusArr = [];
        for(let i = 0, len = clusListUrl.length; i < len; i++) {
            let obj = yield mqueen.selectExistUrl(clusListUrl[i]);
            if (obj.results && obj.count == '0') {
                let insert = yield mqueen.insertFlower({
                    url: clusListUrl[i],
                    originalUrl: flower.cluster.originalUrl,
                    page: flower.cluster.page,
                    isRelate: flower.cluster.isRelate
                })
                if(insert.results) {
                    clusArr.push(clusListUrl[i]);
                } else {
                    continue;
                }
            } else {
                logger.warn(`${clusListUrl[i]}已存在flower表中`);
                continue;
            }
        }
        cluster.cornJob(clusArr); 
    }

    function* bee_honey() {

    }
    co(function* () {
        yield bee_cluster();
        yield bee_honey();
    })

};  