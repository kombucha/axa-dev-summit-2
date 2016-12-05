const moment = require('moment');
// {
// "Country": "PL",
// "departureDate" : "2016-11-15",
// "returnDate" : 2016-12-09,
// "travellerAges" : [32,39]
// "options" : ["MedicalConditions"],
// "Cover" :"Basic"
// }

function validateCountry(country) {
  return true;
}

function validateOptions(options) {
  return true;
}

function validateCover(cover) {
  return cover === 'Basic';
}

function validateDates(departureDateStr, returnDateStr) {
  // TODO
  return true;
}

function validateQuote(quote) {
  return validateCountry(quote.country)
    && validateOptions(quote.options)
    && validateCover(quote.cover)
    && validateDates(quote.departureDate, quote.returnDate);
}

function quoteHandler(req, res) {
  const quote = req.body || {};

  console.log('Quote endpoint was called !', quote);

  if (!validateQuote(quote)) {
    return res.sendStatus(400);
  }

  res.sendStatus(200);
}

module.exports = quoteHandler;
