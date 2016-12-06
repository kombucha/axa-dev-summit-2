const logger = require('../services/logger');

function debugMiddleware(req, res, next) {
  logger.info(req.method, req.url, req.body);
  next();
}

module.exports = debugMiddleware;
