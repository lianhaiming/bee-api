const Promise = require('bluebird'),
        request = require('request'),
           fs = require('fs');
/**
 * [getFileDir 获取文件的目录]
 * @param  {[String]} path [文件路径]
 * @return {[Array]}      [description]
 */
function getFileDir(path) {
    return new Promise((resolve, reject)=> {
        fs.readdir(path, (err, file)=> {
            if (err) {
                reject(err);
            } else {
                resolve(file);
            }
        })
    })
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
        // throw new Error(`${url}的路由文件不能为空`);
        return;
    }
    let file = '';
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
module.exports = {
    getFileDir,
    isPathDir,
    isFile,
    getRouteFile,
    beeRequest,
    judeUrl
}