function quoteHandler(req, res) {
  console.log('Quote endpoint was called !', req.body);
  // res.send({
  //   quote: 0
  // });
  res.sendStatus(400);
}

module.exports = quoteHandler;
