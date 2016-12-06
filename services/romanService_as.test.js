const assert = require('assert');
const romanService = require('./romanService');

describe('#romanPrice()', function() {

   // 1  is I is 1
    it('should return 1 if I', function() {
      assert.equal(1, romanService.toRomanPrice(romanService.toRomanNumerals(1)));
    });

    // 3  is III is 3
    it('should return 3 if 3', function() {
      assert.equal(3*1, romanService.toRomanPrice(romanService.toRomanNumerals(3)));
    });

    // 4  is IV is 4.4-1
    it('should return 3.4 if 4', function() {
      assert.equal(4.4-1, romanService.toRomanPrice(romanService.toRomanNumerals(4)));
    });

    // 5  is V is 4.4
    it('should return 4.4 if 5', function() {
      assert.equal(4.4, romanService.toRomanPrice(romanService.toRomanNumerals(5)));
    });


    // 7  is VII is 4.4 + 2*1
    it('should return 6.4 if 7', function() {
      assert.equal(4.4 + 2*1, romanService.toRomanPrice(romanService.toRomanNumerals(7)));
    });


     // 9  is IX is 8.4 -1
    it('should return 7.4 if 9', function() {
      assert.equal(8.4 -1, romanService.toRomanPrice(romanService.toRomanNumerals(9)));
    });

    // 14  is XIV is 8.4 -1 + 4.4
    it('should return 7.4 if 9', function() {
      assert.equal(8.4 -1 + 4.4, romanService.toRomanPrice(romanService.toRomanNumerals(14)));
    });


    // 14  is XIV is 8.4 -1 + 4.4
    it('should return 7.4 if 9', function() {
      assert.equal(8.4 -1 + 4.4, romanService.toRomanPrice(romanService.toRomanNumerals(14)));
    });


});