const moment = require('moment');

const UNIT_PRICE = 1.8;

function getUnitPrice(){
  return UNIT_PRICE;
}

function getNumberOfTravellers( travellerAges ){
  return travellerAges.length;
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

// Public
function validateParams(params) {
  return validateCountry(params.country)
    && validateOptions(params.options)
    && validateCover(params.cover)
    && validateDates(params.departureDate, params.returnDate);
}

function compute(params) {
  const numberOfDays = moment(params.returnDate).diff(moment(params.departureDate), 'days');
  const travellersCount = getNumberOfTravellers(params.travellerAges);

  return getUnitPrice() * numberOfDays * travellersCount;
}

module.exports = {
  validateParams,
  compute
};
