function feedbackHandler(req, res) {
  console.log('Feedback called');
  res.sendStatus(200);
}

module.exports = feedbackHandler;
