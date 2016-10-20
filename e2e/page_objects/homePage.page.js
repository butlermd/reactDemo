'use strict';

var HomePage = ( function() {
  function HomePage(){
    this.pageTitle        = $('.header');
  }

  HomePage.prototype ={
    //functions will be declared here
  };

  return HomePage;
}) ();

module.exports = new HomePage();
