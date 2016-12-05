const moment = require('moment');
const UNIT_PRICE = 1.8;


function getUnitPrice(){
  return UNIT_PRICE;
}

function computeQuote(quote) {
  const numberOfDays = moment(quote.returnDate).diff(moment(quote.departureDate), 'days');
  const travellersCount = quote.travellerAges.length;

  return getUnitPrice() * numberOfDays * travellersCount;
}

function validateCountry(country) {
  return !!country;
}

function validateOptions(options) {
  return !!options;
}

function validateCover(cover) {
  return cover === 'Basic';
}

function validateDates(departureDateStr, returnDateStr) {
  const departureDate = moment(departureDateStr);
  const returnDate = moment(returnDateStr);

  return departureDate.isValid()
    && returnDate.isValid()
    && departureDate.isSameOrBefore(returnDate);
}

function validateQuote(quote) {
  return validateCountry(quote.country)
    && validateOptions(quote.options)
    && validateCover(quote.cover)
    && validateDates(quote.departureDate, quote.returnDate);
}

function quoteHandler(req, res) {
  const quote = req.body;
  console.log('Quote endpoint was called !', quote);

  if (!validateQuote(quote)) {
    return res.sendStatus(400);
  }

  res.send({
    quote: computeQuote(quote)
  });
}

module.exports = quoteHandler;
