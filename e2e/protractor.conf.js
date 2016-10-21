'use strict';

exports.config = {

  // Running Selenium server
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  multiCapabilities: [
   {
      'browserName': 'chrome',
      'chromeOptions': {
        prefs: {
          'profile.managed_default_content_settings.notifications': 1
        }
      }
    }
  ],

  // Spec patterns are relative to the current working directly when protractor is called.
  suites: {
    all:      ['specs/*.spec.js']
  },

  allScriptsTimeout: 60000,

  maxSessions: 1,

  params: {
    route1: 'localhost:3000',
    route2: 'localhost:3001'
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 300000,
    showColors:             true,
    showTiming:             true,
    includeStackTrace:      true,
    isVerbose:              true,
    realtimeFailure:        true,
    print: function() {
    }
  },

  framework: 'jasmine2',

  onPrepare: function() {
    browser.ignoreSynchronization = true;

    var jasmineReporters = require( 'jasmine-reporters' );
    jasmine.getEnv().addReporter( new jasmineReporters.JUnitXmlReporter( {
      consolidateAll: true,
      savePath:       'testresults',
      filePrefix:     'xmloutput'
    } ) );

    var SpecReporter = require( 'jasmine-spec-reporter' );
    // add jasmine spec reporter
    jasmine.getEnv().addReporter( new SpecReporter( {
      displayStacktrace:      true,
      displayFailuresSummary: true,
      displayPendingSummary:  true,
      displaySuccessfulSpec:  true,
      displayFailedSpec:      true,
      displayPendingSpec:     true,
      displaySpecDuration:    false,
      displaySuiteNumber:     false,
      colors: {
        success: 'green',
        failure: 'red',
        pending: 'yellow'
      },
      customProcessors: []
    } ) );
  }
};
