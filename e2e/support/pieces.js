'use strict';

module.exports = function() {
  return {
    helperPage:   require( './helper.js' ),

    HomePage:   require( '../page_objects/homePage.page.js' )
  };
};
