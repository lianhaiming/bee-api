const path = require('path'),
      util = require('./utils/util'),
      Url = require('url'),
      getSourceUrl = require('./bee-queen/cluster'),
      Promise = require('promise'),
      config = require('./config/config'),
      schedule = require('node-schedule'),
      argv = require('./utils/argv'),
      getHoney = require('./bee-drone/honey').getHoney,
        fs = require('fs');

/**
 * [getTask 获取爬虫源]
 * @param  {[type]} dirName [存放爬虫源的路径]
 * @return {[type]}         [description]
 */
function getTask(dirName) {
    return util.getFileDir(dirName)
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
}

/**
 * [cronJod 批量分发爬虫任务]
 * @param  {[Array]} urlSource [需要爬虫的url列表]
 * @return {[type]}           [description]
 */
function cronJob(beeDirName, urlSource) {
    // 无爬虫列表则返回
    if(urlSource.length == 0 ) {
        console.log(`urlSource为空没有可以爬取的url链接列表哦 ^_^`);
        return
    };
    urlSource.forEach((url, index)=> {
        // BeeHoney 表中存在data数据则不重复爬取
        getHoney(url)
        .then(function(len){
            if(len == 0) {
                let isUrl = util.judeUrl(url);
                let hostName;
                if (isUrl) {
                    hostName = Url.parse(url).hostname;
                } else {
                    hostName = url;
                }
                // 爬虫源链接目
                let dirNamePath = beeDirName + hostName;
            
                // 获取每个爬虫源链接目录下的文件
                util.getFileDir(dirNamePath)
                .then(function(urlFiles) {
                    // 将.js文件后缀去掉
                    let arr = urlFiles.map((item)=> {
                        return item.split('.')[0]; 
                    })
                    if (arr.length != 0) {
                        // 排序路由文件确保_.js文件在前面
                        arr = arr.sort(function(a,b) {
                            return a > b;
                        })
                        if (arr[0] !== '_') {
                            console.error(`${hostName}目录下确认以_.js命名的路由文件`);
                            return;
                        }
                        // 请求_.js路由文件
                        let route = require(`${dirNamePath}/${arr[0]}.js`);
                        // 根据_.js路由文件返回要引入处理url的module
                        let file = util.getRouteFile(url, route);
                        // 处理模块存在则引入
                        if (file) {
                            require(`${dirNamePath}/${file}.js`)(url);
                        } else {
                            console.error(`没有对应的处理文件对${url}进行处理！！！`);
                            return;
                        }
                    } else {
                        console.error(`bee目录${hostName}没有文件处理${url}哦!!!`);
                    }
                })
            } else {
                console.log(`BeeHoney table had ${url} data`);
                return;
            }
        })
    })
}

// 爬取bee目录下源链接的url列表
function saveLists() {
    let beeDirName = config.bee;
    // 获取bee目录下url集合
    getTask(beeDirName)
    .then(function(urlSource) {
        let urlSourceArr = [];
        if (argv) {
            urlSourceArr.push(argv);
        } else {
            urlSourceArr = [].concat(urlSource);
        }
        // 分发任务
        cronJob(beeDirName, urlSourceArr);  
    })
}

// 获取flower表中listsurl列表
function getDataOrlists() {
    let beeDirName = config.bee;
    if(argv && !util.judeUrl(argv)) {
        console.error('-u url: 请将命令行url链接配置完整如http://www.baidu.com');
        return;
    }
    let url = argv ? argv : '';
    getSourceUrl(url)
    .then(function(data) {
        cronJob(beeDirName, data);
    })
}

/**
 * [getScheduleJob 定时执行爬取任务]
 * @param  {[type]} time [相隔多少分钟执行一次爬取]
 * @return {[type]}      [description]
 */
function getScheduleJob(time) {
        var rule = new schedule.RecurrenceRule();
        var times = [];
    　　for(var i=0; i<=60; i +=time){
    　　　　times.push(i);
    　　}
    　　rule.minute = times;
    　　var j = schedule.scheduleJob(rule, function(){
         　　saveLists();
            setTimeout(getDataOrlists,1000);
    　　});  
}

function init() {
    getScheduleJob(20);
}
init();
