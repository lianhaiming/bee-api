var util  = require('../../lib/util');
var logger = require('../../lib/log');
var mqueen = require('../../beemodule/mbeequeen');
var co = require('co');

exports.cornJob = function(val) {
    if(!val || typeof val !== 'string') return;
    if(util.isArray(val) && val.length === 0) return;
    co(function* () {
        var a = yield mqueen.selectExistUrl('http://www.baidu.com');
        console.log(typeof a);
    })

}