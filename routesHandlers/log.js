const fs = require('fs');
const config = require('../config');

function log(req, res) {
  fs.createReadStream(config.logPath)
    .pipe(res);
}

module.exports = log;
