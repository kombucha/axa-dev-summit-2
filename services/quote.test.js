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