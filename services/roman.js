const toRoman = require('roman-numerals').toRoman

const ROMAN_PRICES = {
  I: 1,
  V: 4.2,
  X: 8.4,
  L: 42
};

function toRomanNumerals(i) {
  return toRoman(i);
}

function toRomanPrice(romanNumeral) {
  if(!romanNumeral || !romanNumeral.match(/^[IVXL]+$/)){
    throw new Error();
  }

  let result = 0;

  for(let i = 0; i < romanNumeral.length-1;i++) {
    let romanLetter = romanNumeral[i];
    let nextRomanLetter = romanNumeral[i+1];

    if(ROMAN_PRICES[romanLetter] >= ROMAN_PRICES[nextRomanLetter]){
      result += ROMAN_PRICES[romanLetter];
    }
    else{
      result -= ROMAN_PRICES[romanLetter];
    }
  }

  let lastLetter = romanNumeral[romanNumeral.length-1];
  return round(result + ROMAN_PRICES[lastLetter]);
}

function round(number){
  return Math.round(number*10)/10;
}

module.exports = {
  toRomanNumerals,
  toRomanPrice
};
