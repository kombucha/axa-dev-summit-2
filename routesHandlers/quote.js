const quoteService = require('../services/quote');
const logger = require('../services/logger');

function quoteHandler(req, res) {
  const quoteParams = req.body;

  try {
    res.send({
      quote: quoteService.compute(quoteParams)
    });
  } catch(e) {
    logger.error(e);
    res.sendStatus(204);
  }

}

module.exports = quoteHandler;
