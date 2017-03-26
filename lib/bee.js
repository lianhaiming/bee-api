'use strict'

var request = require('request');

class bee {
    constructor(props) {
    }
    task(url) {
        return function(cb) {
            request(url,(err, res, body)=> {
                if(err) {
                    cb && cb(null,err)
                } else {
                    cb && cb(null, body);
                }
            })
        }
    }
}

module.exports = bee;