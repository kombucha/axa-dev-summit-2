function feedbackHandler(req, res) {
  console.log('Feedback endpoint was called !');
  res.send(400);
}

module.exports = feedbackHandler;
