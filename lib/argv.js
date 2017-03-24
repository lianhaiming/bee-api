let proArgv = process.argv;
let argvArr = proArgv.slice(2);
let state;
if(argvArr.length === 0 || !argvArr[1] || argvArr[0] === '-all') {
    state = null;
}

if(argvArr[0] === '-u' && argvArr[1]) {
    state = argvArr[1];  
}
module.exports = state;