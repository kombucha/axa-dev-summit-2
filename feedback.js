function feedbackHandler(req, res) {
  console.log('Feedback called');
  console.info("FEEDBACK:", req.body.type, req.body.content);
  res.sendStatus(200);
}

module.exports = feedbackHandler;
