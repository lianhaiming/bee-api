const path = require('path'),
      util = require('../utils/util'),
        fs = require('fs');

function getLists() {
    let dirName = `${__dirname}/bee/`;
    util.getFileDir(dirName)
    .then(function(data) {
        let pathArr = [];
        data.forEach((item, index)=> {
            if(util.isPathDir(dirName + item)) {
                pathArr.push(item);
            } else {
                throw new Error('bee目录爬虫源目录结构错误,请以爬虫源的域名命名文化夹');
            }
        })
        return this.Promise.resolve(pathArr);
    })
    .then(function(urlSource) {
        // 无爬虫源则返回
        if(urlSource.length == 0 ) return;

        urlSource.forEach((url, index)=> {
            // 获取每个爬虫源目录下的文件
            util.getFileDir(dirName + url)
            .then(function(urlFiles) {
                let arr = urlFiles.map((item)=> {
                    return item.split('.')[0];
                })
                if (arr.length != 0) {
                    // 排序路由文件_.js在前面
                    arr = arr.sort(function(a,b) {
                        return a > b;
                    })
                    // 获取路由文件
                    let urlPath = `${dirName}${url}/`
                    // 请求_.js路由文件
                    let route = require(`${urlPath}/${arr[0]}.js`);
                    let file = util.getRouteFile(url, route);
                    // 根据对应的链接爬取
                    if (file) {
                        require(`${urlPath}/${file}.js`)(url);
                    }
                }
            })
        })

    })
}

function init() {
    getLists();
}
init();
