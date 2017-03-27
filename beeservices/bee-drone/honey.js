'use strict'

var mhoney = require('../../beemodule/mbeedrone');
var co = require('co');
exports.getHoney = function(honey) {

    function* bee_gen() {
        let url = honey.originalUrl || '';
        var res = yield mhoney.selectExistHoneyByUrl(url);
        if(res && res.results && res.count === 0) {
            yield mhoney.insertHoney(honey);
        } else {
            return;
        }
    }
    co(function* () {
        yield bee_gen();
    })
}

