const quoteService = require('../services/quote');

function quoteHandler(req, res) {
  const quoteParams = req.body;

  // if (!quoteService.validateParams(quoteParams)) {
  //   return res.sendStatus(400);
  // }

  try {
    res.send({
      quote: quoteService.compute(quoteParams)
    });
  } catch(e) {
    res.sendStatus(400);
  }


}

module.exports = quoteHandler;
