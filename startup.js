'use strict'

var path = require('path'),
    schedule = require('node-schedule'),
    config = require('./config/config'),
    clus = require('./beeservices/bee-queen/cluster');

/**
 * [getScheduleJob 定时执行爬取任务]
 * @return {[type]}      [description]
 */
function getScheduleJob() {
    let time = config.beeCrawIntervalTime;
    let rule = new schedule.RecurrenceRule();
    let times = [];　　
    for (let i = 0; i <= 60; i += time) {　　　　 times.push(i);　　 }　　
    rule.minute = times;
    let j = schedule.scheduleJob(rule, function() {　　
        init();
    });
}

function init() {
    let beeResourceUrls = config.beeResourceUrls;
    clus.cornJob(beeResourceUrls);
}

getScheduleJob();
