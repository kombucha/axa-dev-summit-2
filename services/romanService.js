const toRoman = require('roman-numerals').toRoman

function toRomanNumerals(i) {
  return toRoman(i);
}

function toRomanPrice(romanNumeral) {
  return 0;
}

module.exports = {
  toRomanNumerals,
  toRomanPrice
};
