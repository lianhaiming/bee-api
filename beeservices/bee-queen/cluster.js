'use strict'

var util  = require('../../lib/util');
var logger = require('../../lib/log');
var getFlower = require('./flower').getFlower;
var co = require('co');
var config = require('../../config/config');

/**
 * [cornJob 分发任务]
 * @param  {[String or Array]} val [description]
 * @return {[type]}     [description]
 */
exports.cornJob = function(val) {
    let resourceUrlArr = [];
    let pathName = `${config.beeWorkerPath}`;
    if(!val) return;
    if(util.isArray(val) && val.length === 0) return;
    if(util.isArray(val) && val.length !== 0) {
        resourceUrlArr = val;
    };

    if(typeof val === 'string') {
        resourceUrlArr.push(val);
    }

    function* getBeeWorker(pathName) {
        let fileDir = yield util.getFileDir(pathName);
        let beeWorkerArr = [];
        if (!fileDir) return;
        if (typeof fileDir === 'string') {
            beeWorkerArr.push(fileDir);
        }
        if (util.isArray(fileDir)) {
            beeWorkerArr = fileDir;
        }
        beeWorkerArr =  beeWorkerArr.map(function(item) {
            if(util.isDirectory(`${pathName}/${item}`)) {
                return item;
            }
        })
        return beeWorkerArr;        
    }

    function* runBeeWorker(beeWorker, beeUrl) {
        if(!beeWorker || !beeUrl) return;
        let workerFile = yield util.getFileDir(`${pathName}/${beeWorker}`);
        if(!workerFile || workerFile.length === 0) {
            logger.debug('bee-worker对应的源目录中无处理文件');
            return {
                res: -1,
                info: ''
            };
        }
        workerFile = workerFile.map(item => {
            return item.split('.')[0];
        });
        workerFile = workerFile.sort((a,b) => a > b);

        let route = workerFile[0].trim();
        let isRoute = /_/.test(route);

        if(isRoute) {
            let routes = require(`../bee-worker/${beeWorker}/_`);
            if (!routes || !util.isArray(routes)) {
                logger.error(`${beeUrl}路由返回正确的数据格式！`);
                return {
                    res: -2,
                    info:''
                }
            }
            if (util.isArray(routes) && routes.length !== 0) {
                for(let i = 0, rLen = routes.length; i < rLen; i++) {
                    if(routes[i][0].test(beeUrl)) {
                        let flower  = yield require(`../bee-worker/${beeWorker}/${routes[i][1]}`)(beeUrl);
                        getFlower(flower);
                    }
                }
            } else {
                logger.error('无对应的路由文件处理${beeUrl}!');
                return {
                    res: -2,
                    info: ''
                }
            }
        }
    }

    function* bee_gen() {
        let beeWorkerArr = yield getBeeWorker(pathName);
        for(let i = 0, len = resourceUrlArr.length; i < len; i++) {
            for(let j = 0, blen = beeWorkerArr.length; j < blen; j++) {
                if(resourceUrlArr[i].indexOf(beeWorkerArr[j]) !== -1) {
                    yield runBeeWorker(beeWorkerArr[j], resourceUrlArr[i]);
                } else {
                    continue;
                }
            }
        }
    }
    co(function* () {
        yield bee_gen();
    })

}