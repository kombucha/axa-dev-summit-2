const assert = require('assert');
const quoteService = require('./quote');

describe('Quote', function() {
  describe('#validateParams()', function() {
    
    //Bad country
    it('should return false when country is not defined', function() {
      const paramsWithoutCountry = {
        "departureDate" : "2016-12-09",
        "returnDate" : "2016-12-10",
        "travellerAges" : [32, 54],
        "options" : ["MedicalConditions"], 
        "cover" :"Basic"
      };
      assert.equal(false, quoteService.validateParams(paramsWithoutCountry));
    });

    
    //Bad departureDate format
    it('should return false when departureDate does not have a good format', function() {
      const paramsWithBadDepartureDate = {
        "country" : "PL",
        "departureDate" : "2016-12-0",
        "returnDate" : "2016-12-10",
        "travellerAges" : [32, 54],
        "options" : ["MedicalConditions"], 
        "cover" :"Basic"
      };
      assert.equal(false, quoteService.validateParams(paramsWithBadDepartureDate));
    });

    
    //Bad returnDate format
    it('should return false when returnDate does not have a good format', function() {
      const paramsWithBadReturnDate = {
        "country" : "PL",
        "departureDate" : "2016-12-09",
        "returnDate" : "201-12-10",
        "travellerAges" : [32, 54],
        "options" : ["MedicalConditions"], 
        "cover" :"Basic"
      };
      assert.equal(false, quoteService.validateParams(paramsWithBadReturnDate));
    });

    
    //Departure after return
    it('should return false when returnDate is before departureDate', function() {
      const paramsWithReturnBeforeDepature = {
        "country" : "PL",
        "departureDate" : "2016-12-09",
        "returnDate" : "2016-12-08",
        "travellerAges" : [32, 54],
        "options" : ["MedicalConditions"], 
        "cover" :"Basic"
      };
      assert.equal(false, quoteService.validateParams(paramsWithReturnBeforeDepature));
    });

    
    //Bad travellerAges
    it('should return false when travellerAges is not an array', function() {
      const paramsWithBadTravellerAgesFormat = {
        "country" : "PL",
        "departureDate" : "2016-12-09",
        "returnDate" : "2016-12-08",
        "travellerAges" : "32, 54",
        "options" : ["MedicalConditions"], 
        "cover" :"Basic"
      };
      assert.equal(false, quoteService.validateParams(paramsWithBadTravellerAgesFormat));
    });

    
    //Bad options
    it('should return false when travellerAges is not an array', function() {
      const paramsWithBadOptionsFormat = {
        "country" : "PL",
        "departureDate" : "2016-12-09",
        "returnDate" : "2016-12-08",
        "travellerAges" : "32, 54",
        "options" : "MedicalConditions", 
        "cover" :"Basic"
      };
      assert.equal(false, quoteService.validateParams(paramsWithBadOptionsFormat));
    });


  });

  describe('#getAgeFactor()', function() {
    // <18
    it('should return 1.1 if under 18', function() {
      assert.equal(1.1, quoteService.getAgeFactor([0]));
      assert.equal(1.1, quoteService.getAgeFactor([17]));
    });
    // between 18 and 24
    it('should return 0.9 if between 18 and 24', function() {
      assert.equal(0.9, quoteService.getAgeFactor([18]));
      assert.equal(0.9, quoteService.getAgeFactor([20]));
      assert.equal(0.9, quoteService.getAgeFactor([24]));
    });
    // between 25 and 65
    it('should return 1 if between 25 and 65', function() {
      assert.equal(1, quoteService.getAgeFactor([25]));
      assert.equal(1, quoteService.getAgeFactor([40]));
      assert.equal(1, quoteService.getAgeFactor([65]));
    });
    // 66+
    it('should return 1.5 if 66+', function() {
      assert.equal(1.5, quoteService.getAgeFactor([66]));
      assert.equal(1.5, quoteService.getAgeFactor([79]));
    });
    // 1 guy <18 and one guy between 18 and 24
    it('should return 2 if 1 guy <18 and one guy between 18 and 24', function() {
      assert.equal(2, quoteService.getAgeFactor([17,19]));
    });
    // 1 guy <18 and one guy between 25 and 65
    it('should return 2.6 if 1 guy <18 and one guy between 25 and 65', function() {
      assert.equal(2.1, quoteService.getAgeFactor([17,30]));
    });
    // 1 guy <18 and one guy over 66
    it('should return 2.6 if 1 guy <18 and one guy over 66', function() {
      assert.equal(2.6, quoteService.getAgeFactor([17,80]));
    });
    // 1 guy <18 and two guy over 66
    it('should return 4.1 if 1 guy <18 and one guy over 66', function() {
      assert.equal(4.1, quoteService.getAgeFactor([17,81,80]));
    });
    // 1 guy <18 and two guy over 66 and 3 guys between 25-65
    it('should return 7.1 if 1 guy <18 and one guy over 66', function() {
      assert.equal(7.1, quoteService.getAgeFactor([17, 30, ,81, 31,80, 61]));
    });
  });

  describe('#compute()', function() {

    it('should return 1.8 when 1 traveller for 1 day with basic cover', function() {
      const params = {
        "country" : "PL",
        "departureDate" : "2016-12-09",
        "returnDate" : "2016-12-10",
        "travellerAges" : [32],
        "options" : "MedicalConditions", 
        "cover" :"Basic"
      };
      assert.equal(1.8, quoteService.compute(params));
    });
  });
});