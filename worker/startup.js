const koa = require('koa'),
     path = require('path'),
     util = require('../utils/util'),
       fs = require('fs');

let dirName = __dirname + '/bee';
util.getFileDir(dirName)
.then(function(data) {
    let pathArr = [];
    data.forEach((item, index)=> {
        if(util.isPathDir(dirName + '/' + item)) pathArr.push(item);
    })
    return this.Promise.resolve(pathArr);
})
.then(function(data) {
    console.log(data);
})
