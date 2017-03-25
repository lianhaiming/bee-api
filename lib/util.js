'use strict'

const request = require('request')
        , logger = require('../lib/log')
        , fs = require('fs')
/**
 * [difference 数组过滤]
 * @param  {[type]} arr    [description]
 * @param  {[type]} delArr [description]
 * @return {[type]}        [description]
 */
function difference(arr, delArr) {
    let newArr = [];
    if(arr && arr.length === 0) return newArr;
    if (delArr && delArr.length === 0) return arr;
    let status = false;
    for(let i = 0, len = arr.length; i < len; i++) {
        for(let j = 0, lenn = delArr.length; j < lenn; j++) {
            if (arr[i] === delArr[j]) {
                status = true;
                break;
            } else {
                status = false;
            }
        }
        if (!status) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}
/**
 * [getFileDir 获取文件的目录]
 * @param  {[String]} path [文件路径]
 * @return {[Array]}      [description]
 */
function getFileDir(pathName) {
    return function(cb) {
        fs.readdir(pathName,function(err, data) {
            if(err) logger.error(err);
            cb(err, data);
        });
    }
}
/**
 * [isPathDir 判断路径是否是文件夹]
 * @param  {[String]}  path [文件路径]
 * @return {String}      [满足条件的文件路径]
 */
function isPathDir(path) {
    if (path) {
        let stats = fs.statSync(path);
        if (stats.isDirectory()) {
            return path;
        } else {
            return '';
        }
    } else {
        throw new Error('isPathDir函数path参数不存在');
    }
    
}

function isFile(path) {
    if(path) {
        let stats = fs.statSync(path);
        if(stats.isFile()) {
            return path;
        } else {
            return '';
        }
    } else {
        throw new Error('isFile函数path参数不存在');
    }
}
/**
 * [getRouteFile 爬虫地址通过路由配置对应的文件]
 * @param  {[type]} url   [description]
 * @param  {[type]} route [description]
 * @return {[type]}       [description]
 */
function getRouteFile(url, route) {
    if (route.length === 0) {
        return false;
    }
    let file;
    // some 返回true结束循环 
    route.some((item, index)=> {
        let reg = item[0];
        // console.log(item)
        if(reg.test(url)) {
            file = item[1];
            return true;
        }
    })
    return file;
}

function beeRequest(url) {
    return new Promise((resolve, reject)=> {
        request(url,(err, res, body)=> {
            if(err) {
                reject(err);
            } else {
                resolve(body);
            }
        })
    })
}
function judeUrl(url) {
    let state = false;
    if (url) {
        if(/^[a-zA-Z]*:\/\/[^\s]*/.test(url)) {
            state = true;
        }
    }
    return state;
}
exports.isUrl = function(url) {
    return /^(http|https):\/\/[\w\W]+/.test(url);
}
 exports.isArray = function (val) {
    return val.constructor === 'Array';
}
