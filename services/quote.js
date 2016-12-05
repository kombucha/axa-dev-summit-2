const moment = require('moment');

const COVER_FACTORS = {
  basic: 1.8,
  extra: 2.4,
  premium: 4.2
};

function validateCountry(country) {
  return !!country;
}

function validateOptions(options) {
  return !!options;
}

function validateCover(cover) {
  // return ['basic', 'extra', 'premium'].indexOf(cover) !== -1;
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

function getCoverFactor(cover) {
  return COVER_FACTORS[cover.toLowerCase()];
}

function getCountryFactor() {
  return 1;
}

function getAgeFactor(travellers) {
  return travellers.reduce((acc, age) => {
    if (age < 18) {
      return 1.1;
    } else if (age >= 18 && age <= 24) {
      return 0.9;
    } else if (age >= 25 && age <= 65) {
      return 1.0;
    } else {
      return 1.5;
    }
  }, 0);
}

function getOptionsQuote() {
  return 0;
}

function getTimeFactor(departureDate, returnDate) {
  const numberOfDays = moment(returnDate).diff(moment(departureDate), 'days');
  return numberOfDays <= 7 ? 7 : numberOfDays;
}

function compute(params) {
  return (getCoverFactor(params.cover)
    * getCountryFactor(params.country)
    * getAgeFactor(params.travellers)
    * getTimeFactor(params.departureDate, params.returnDate))
    + getOptionsQuote(params.options);
}

module.exports = {
  validateParams,
  compute
};
