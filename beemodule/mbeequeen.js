'use strict'

/**
 * author: lianhaiming
 * createTime: 2017-03-26
 */

var cql_ = require('./sbeequeen');
var avdb = require('../lib/av');

exports.selectExistUrl = function(url) {
    return function(cb) {
        let sb = cql_.sExistUrl();
        let so = url;
        avdb(sb,so,cb,'查询url个数');
    }
}

exports.insertFlower = function(obj) {
    return function(cb) {
        let sb = cql_.sInsertFlower();
        let so = [obj.url, obj.originalUrl, obj.page, obj.isRelate];
        avdb(sb,so,cb,'插入flower数据');
    }
}