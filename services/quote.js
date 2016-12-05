const moment = require('moment');

const COVER_FACTORS = {
  basic: 1.8,
  extra: 2.4,
  premium: 4.2
};

const COUNTRY_FACTORS = {
  de: 0.8,
  fr: 1.0,
  es: 1.1,
  th: 1.6,
  ee: 1.3,
  lu: 1.3,
  gr: 0.6,
  it: 1.2,
  bg: 1.1,
  sw: 1.2,
  pa: 1.6,
  pn: 1.2,
  qa: 1.6,
  ro: 1.3,
  lt: 0.7,
  uy: 1.6,
  fi: 0.8,
  hr: 1.3,
  lv: 0.6,
  uk: 1.1,
  nl: 0.7,
  pl: 1.4
};

const OPTIONS_FACTORS = {
  'skiing': 24,
  'medical': 72,
  'scuba': 36,
  'sports': 25,
  'yoga': -3
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

  return departureDate.isValid() && returnDate.isValid() && departureDate.isSameOrBefore(returnDate);
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

function getCountryFactor(country) {
  return COUNTRY_FACTORS[country.toLowerCase()];
}

function getAgeFactor(travellers) {
  return travellers.reduce((acc, age) => {
    if (age < 18) {
      return acc + 1.1;
    } else if (age >= 18 && age <= 24) {
      return acc + 0.9;
    } else if (age >= 25 && age <= 65) {
      return acc + 1.0;
    } else {
      return acc + 1.5;
    }
  }, 0);
}

function getOptionsQuote(options) {
  return options.reduce((acc, option) => {
    return acc + OPTIONS_FACTORS[option.toLowerCase()];
  }, 0);
}

function getTimeFactor(departureDate, returnDate) {
  const numberOfDays = moment(returnDate).diff(moment(departureDate), 'days');
  return numberOfDays <= 7
    ? 7
    : numberOfDays;
}

function compute(params) {
  return (getCoverFactor(params.cover) * getCountryFactor(params.country) * getAgeFactor(params.travellerAges) * getTimeFactor(params.departureDate, params.returnDate)) + getOptionsQuote(params.options);
}

module.exports = {
  validateParams,
  getAgeFactor,
  compute
};
