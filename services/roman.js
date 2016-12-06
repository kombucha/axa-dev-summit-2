const toRoman = require('roman-numerals').toRoman

function toRomanNumerals(i) {
  return toRoman(i);
}

function toRomanPrice(romanNumeral) {
  if(!romanNumeral || !romanNumeral.match(/^[IVXL]+$/)){
    throw new Error();
  }

  const romanValues = {
    I: 1,
    V: 4.4,
    X: 8.4,
    L: 39
  };

  let result = 0;

  for(let i = 0; i < romanNumeral.length-1;i++){
    if(romanValues[romanNumeral[i]] >= romanValues[romanNumeral[i+1]]){
      result += romanValues[romanNumeral[i]];
    }
    else{
      result -= romanValues[romanNumeral[i]];
    }
  }

  return round(result + romanValues[romanNumeral[romanNumeral.length-1]]);
}

function round(number){
  return Math.round(number*10)/10;
}

module.exports = {
  toRomanNumerals,
  toRomanPrice
};
