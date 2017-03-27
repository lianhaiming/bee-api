'use strict'

var program = require('commander');
 
program
  .version('0.0.1')
  .option('-r, --restart', '重新爬取')
  .option('-u, --url [type]', '爬取指定的url')
  .parse(process.argv);
 
module.exports = program;