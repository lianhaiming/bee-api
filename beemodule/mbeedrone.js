'use strict'

var cql_ = require('./sbeedrone');
var avdb = require('../lib/av');

exports.selectExistHoneyByUrl = function(url) {
    return function(cb) {
        let sb = cql_.sExistHoneyByUrl();
        let so = url;
        avdb(sb,so,cb,`通过${url}查询Honey`);
    }
}

exports.insertHoney = function(obj) {
    return function(cb) {
        let sb = cql_.sInsertHoney();
        let so = [obj.originalUrl || '', obj.title || '' ,obj.subhead || '' ,obj.summary || '' ,obj.author || '' ,obj.image || '' ,obj.content || '' ,obj.date || '', obj.tag || '' ,obj.comments || '', obj.bio || ''];
        avdb(sb,so,cb,`在honey标准插入数据${obj.originalUrl}数据`);
    }
}