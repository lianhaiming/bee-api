let log4 = require('log4js')
, log4_config = require('../config/log4.json')
, env = require('../config/server.json');

let loggerType;
if(env.device === 'DEV' || env.device === "test") {
    loggerType = 'file'
} else {
    loggerType = 'date';
}
log4.configure(log4_config[env.device]);

let logFile = log4.getLogger(loggerType);

module.exports = logFile;
// logFile.trace('This is a Log4js-Test');
// logFile.debug('We Write Logs with log4js');
// logFile.info('You can find logs-files in the log-dir');
// logFile.warn('log-dir is a configuration-item in the log4js.json');
// logFile.error('In This Test log-dir is : \'./logs/log_test/\'');