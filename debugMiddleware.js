function debugMiddleware(req, res, next) {
  console.log('Got a call on ', req.url);
  next();
}

module.exports = debugMiddleware;
