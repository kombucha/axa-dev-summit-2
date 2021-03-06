const moment = require('moment');
const logger = require('./logger');
const romanService = require('./roman');

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
  el: 0.6,
  do: 0.6,
  im: 1.2,
  hm: 0.7,
  mt: 1.2,
  sz: 3.7,
  eg: 0.9,
  mx: 1.6,
  cy: 1.6,
  td: 1.3,
  wf: 1.5,
  za: 1.6,
  tw: 1.6
};

const OPTIONS_FACTORS = {
  'skiing': 24,
  'medical': 72,
  'scuba': 36,
  'sports': 25,
  'yoga': -3
};

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
  return travellers.reduce((acc, age) => {
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

function getTimeFactor(departureDateStr, returnDateStr) {
  const departureDate = moment(departureDateStr);
  const returnDate = moment(returnDateStr);

  if (departureDate.isAfter(returnDate, 'day')) {
    throw new Error('Invalid dates');
  }

  return romanService.toRomanPrice(romanService.toRomanNumerals(returnDate.diff(departureDate, 'days')));
}

function compute(params) {
  const coverFactor = getCoverFactor(params.cover);
  const countryFactor = getCountryFactor(params.country);
  const ageFactor = getAgeFactor(params.travellerAges);
  const timeFactor = getTimeFactor(params.departureDate, params.returnDate);
  const optionsQuote = getOptionsQuote(params.options);

  logger.info(`coverFactor: ${coverFactor} countryFactor: ${countryFactor} ageFactor: ${ageFactor} timeFactor: ${timeFactor} optionsQuote: ${optionsQuote}`);

  return (coverFactor * countryFactor * ageFactor * timeFactor) + optionsQuote;
}

module.exports = {
  compute
};
