const Promise = require('bluebird'),
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
        console.error('isDir path 参数不存在');
    }
    
}
module.exports = {
    getFileDir,
    isPathDir
}