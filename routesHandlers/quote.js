const quoteService = require('../services/quote');

function quoteHandler(req, res) {
  const quoteParams = req.body;

  if (!quoteService.validateParams(quoteParams)) {
    return res.sendStatus(400);
  }

  res.send({
    quote: quoteService.compute(quoteParams)
  });
}

module.exports = quoteHandler;
