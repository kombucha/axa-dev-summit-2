const ts = require('tail-stream');
const config = require('../config');

function log(req, res) {
  ts.createReadStream(config.logPath)
    .pipe(res);
}

module.exports = log;
