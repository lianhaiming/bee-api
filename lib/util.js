'use strict'

const request = require('request')
        , logger = require('../lib/log')
        , fs = require('fs')
/**
 * [difference 数组去重]
 * @param  {[type]} arr    [description]
 * @return {[type]}        [description]
 */
exports.unique = function (arr) {
    if(Array.isArray(arr) && arr.length === 0) return [];
    let newArr = [];
    let o = {};
    for(let i = 0, len = arr.length; i < len; i++) {
        if(o[arr[i]] !== 1) {
            newArr.push(arr[i]);
            o[arr[i]] = 1;
        }
    }
    return newArr;
}
/**
 * [dateFormat 格式化日期]
 * @param  {[String]} format [日期格式]
 * @param  {[Number]} dt     [日期时间戳]
 * @return {[type]}        [description]
 */
exports.dateFormat = function(format, dt) {
    let now = dt || new Date();

    let o = {
        "M+": now.getMonth() + 1,
        "d+": now.getDate(),
        "h+": now.getHours(),
        "m+": now.getMinutes(),
        "s+": now.getSeconds()
    }

    if(/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, ('' + now.getFullYear()).substr(4-RegExp.$1.length));
    }
    for(let i in o) {
        if(new RegExp('(' + i + ')').test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[i] : ('00' +  o[i]).substr((''+ o[i]).length))
        }
    }
    return format;
}

/**
 * [getFileDir 获取文件的目录]
 * @param  {[String]} path [文件路径]
 * @return {[Array]}      [description]
 */
exports.getFileDir = function(pathName) {
    return function(cb) {
        fs.readdir(pathName,function(err, data) {
            if(err) {
                logger.debug(err);
                cb(err);
            } else {
                cb(null, data);
            }
            
        });
    }
}

exports.isFile = function(path) {
    if(!path) return;
    if(path) {
        let stats = fs.statSync(path);
        if(stats.isFile()) {
            return path;
        } else {
            return '';
        }
    }
}
exports.isUrl = function (url) {
    if(!url) return false;
    return /^(http|https):\/\/[\w\W]+/.test(url);
}
exports.isArray = function (val) {
    if(!val) return false;
    return val.constructor === Array;
}
exports.isDirectory = function (dirName) {
    if(!dirName) return false;
    let stat;
    try {
        stat = fs.statSync(dirName);
    } catch(e) {
        return false;
    }
    return stat.isDirectory();
}
exports.isError = function(val) {
    if(!val) return false;
    return val.constructor == Error;
} 
exports.isObject = function (obj) {
    if(!obj) return;
    return obj.constructor == Object;
}
exports.isEmptyObject = function (obj) {
    if(!obj) return;
    let keys = Object.keys(obj);
    return keys.length;
}