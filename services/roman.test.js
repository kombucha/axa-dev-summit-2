const assert = require('assert');
const romanService = require('./roman');

describe('Roman', function() {
  describe('toRomanNumerals', function() {
    it('should convert 42 to XLII', function() {
        const romanNumber = romanService.toRomanNumerals(42);
        assert.equal('XLII', romanNumber);
    });
  });

  describe('toRomanPrice', function() {
    it('should convert I to 1', function() {
        const romanPrice = romanService.toRomanPrice('I');
        assert.equal(1, romanPrice);
    });

    it('should throw an error if the input is not known', function(){
      try {
        romanService.toRomanPrice('Z');
      } catch (e) {
        assert.equal(true, true);
        return;
      }
      assert.equal(true, false);
    });

    it('should convert III to 3', function(){
      const romanPrice = romanService.toRomanPrice('III');
      assert.equal(3, romanPrice);
    });

    it('should convert IV to 3.2', function(){
      const romanPrice = romanService.toRomanPrice('IV');
      assert.equal(3.2, romanPrice);
    });

    it('should convert V to 4.2', function(){
      const romanPrice = romanService.toRomanPrice('V');
      assert.equal(4.2, romanPrice);
    });

    it('should convert LXXVII to 65', function(){
      const romanPrice = romanService.toRomanPrice('LXXVII');
      assert.equal(65, romanPrice);
    });

    it('should convert XXXIV to 28.4', function(){
      const romanPrice = romanService.toRomanPrice('XXXIV');
      assert.equal(28.4, romanPrice);
    });
  });
});
