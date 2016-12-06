const moment = require('moment');

const COVER_FACTORS = {
  basic: 1.8,
  extra: 2.4,
  premium: 4.2,
  premier: 4.2
};

const COUNTRY_FACTORS = {
  de: 0.8,
  fr: 1.0,
  es: 1.1,
  th: 1.6,
  ee: 1.3,
  lu: 1.3,
  gr: 0.6,
  sl:0.6,
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
  pl: 1.4,
  pt: 0.5,
  hu: 1.1,
  be: 0.9,
  cz: 1.2,
  ie: 1.1,
  mk: 1.6,
  dk: 1.2,
  se: 1.2,
  sk: 0.7,
  at: 0.9,
  kp: 6.9,
  si: 0.8,
  el: 0.6
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
  const value = COVER_FACTORS[cover.toLowerCase()];

  if (!value) {
    throw new Error(`Unhandled ${cover}`);
  }

  return value;
}

function getCountryFactor(country) {
  const value = COUNTRY_FACTORS[country.toLowerCase()];
  if (!value) {
    throw new Error(`Unhandled country ${country}`);
  }
  return value;
}

function getAgeFactor(travellers) {
  let value = travellers.reduce((acc, age) => {
    if (Number.isNaN(age) || age < 0) {
      throw new Error(`Invalid age ${age} (${travellers})`);
    } else if (age < 18) {
      return acc + 1.1;
    } else if (age >= 18 && age <= 24) {
      return acc + 0.9;
    } else if (age >= 25 && age <= 65) {
      return acc + 1.0;
    } else {
      return acc + 1.5;
    }
  }, 0);
  const numberOfKids = travellers.filter((age) => age < 18).length;
  const numberOfAdults = travellers.filter((age) => (age >= 25 && age < 65)).length;
  const numberOfYoungAdults = travellers.filter((age) => (age >= 18 && age < 25)).length;

  // Kids penalty 15%
  if (numberOfKids > numberOfAdults) {
    value = value * 1.15;
  }

  // Young adults 10% off
  if (numberOfYoungAdults === 2) {
    value = value * 0.9;
  }

  if(numberOfYoungAdults >= 5){
    value = value * 0.9;
  }

  // Family 20% off
  if (travellers.length >= 4) {
    const atLeastTwoKids = numberOfKids >= 2;
    const atLeastTwoAdults = numberOfAdults >= 2;
    const isFamily = atLeastTwoAdults && atLeastTwoKids;

    value = isFamily ? value * 0.8 : value;
  }

  //Travelling alone malus
  if(travellers.length === 1){
    value = value * 1.05;
  }

  return value;
}

function getOptionsQuote(options) {
  return options.reduce((acc, option) => {
    const optionValue = OPTIONS_FACTORS[option.toLowerCase()];

    if (!optionValue) {
      throw new Error(`Unhandled option ${option} (${options})`)
    }

    return acc + optionValue;
  }, 0);
}

function getTimeFactor(departureDate, returnDate) {
  const numberOfDays = moment(returnDate).diff(moment(departureDate), 'days');

  return numberOfDays < 10
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
