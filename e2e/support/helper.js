'use strict';

var EC = protractor.ExpectedConditions;

var Helper = ( function() {
  function Helper(){
  }

  Helper.prototype = {
    presenceOf : function(element) {
      browser.wait(EC.presenceOf(element), 5000);
    },

    urlContains : function(text) {
      browser.wait(EC.urlContains(text), 5000);
    }
  }

  return Helper;
} )();

module.exports = new Helper();