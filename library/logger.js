const fs = require('fs')
const Logger = require('mini-logger')

const logPath = 'log'

// 判断 logs 目录是否存在
if (!fs.existsSync(logPath)) {
  fs.mkdirSync(logPath, 0755)
}

const logger = Logger({
    dir: logPath,
    categories: ['http', 'error'],
    format: '[{category}.]YYYY-MM-DD[.log]',
    timestamp: true
});

module.exports = logger

