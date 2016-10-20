'use strict';

describe( 'Login page', function() {
  var pieces    = require( '../support/pieces.js' );
  var homePage  = pieces().HomePage;
  var helper    = pieces().helperPage;
  var newBrowser;

    beforeAll(function() {
        browser.get( browser.params.route1 );
        newBrowser = browser.forkNewDriverInstance(true);
        newBrowser.ignoreSynchronization = true;
        newBrowser.get( browser.params.route2 );
    });

    it('displays React chat in both pages', function() {
        expect(browser.element(by.css('.header')).getText() ).toBe('React Chat');
        expect(newBrowser.element(by.css('.header')).getText() ).toBe('React Chat');
    });

    describe('chat session test', function() {
        beforeAll( function() {
            browser.element(by.css('.col-md-4.col-md-offset-3') ).sendKeys('man');
            browser.element(by.buttonText('Login') ).click();
            newBrowser.element(by.css('.col-md-4.col-md-offset-3') ).sendKeys('woman');
            newBrowser.element(by.buttonText('Login') ).click();
        });

        it('message sent in chat1 displayed in chat2 session', function() {
            browser.element(by.css('.col-md-10' )).sendKeys('Hi how are you?');
            browser.element(by.css('.col-md-2.btn-primary.btn-sm') ).click();
            expect( newBrowser.element(by.css('.col-md-12')).getText() ).toBe('man: Hi how are you?');
        });

        it('message sent in chat2 displayed in chat1 session', function() {
            newBrowser.element(by.css('.col-md-10' )).sendKeys('I am good. Thanks!!');
            newBrowser.element(by.css('.col-md-2.btn-primary.btn-sm') ).click();
            expect( browser.element(by.css('.col-md-12')).getText() ).toContain('woman: I am good. Thanks!!');
        });
    });
});
