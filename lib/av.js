'use strict'

var AV = require('leancloud-storage');
var avOption = require('../config/config');
var server = require('../config/server.json').device;
var logger = require('./log.js');
var util = require('./util');

if(server == "DEV") {
    avOption = avOption.beeTestDB;
} else {
    avOption = avOption.beeDB;
}
function init(option) {
    AV.init(option);
}

function doCloudQuery(cql,val,cb,comment) {
    if(!cql) {
        logger.debug('cql is empty');
        return;
    }
    let pval = [];
    if(val && typeof val === 'string') {
        pval.push(val);
    }
    if(util.isArray(val)) {
        pval = val;
    }
    init(avOption);
    AV.Query.doCloudQuery(cql,pval)
    .then(function(data) {
        cb && cb(null, data);
    }, function(err) {
        logger.error(`${comment} error`);
        cb && cb(null, err);
    })
}

module.exports = doCloudQuery;