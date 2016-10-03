import { expect } from 'chai';
import { describe, it, before, after } from 'mocha';
import { stub } from 'sinon';
import actions from './chat-actions'
import hasher from 'string-hash';

describe('redux chat actions', () => {
  var text, hash;

  before(() => {
    text = 'chat text';
    let dateNowStub = stub(Date, 'now');

    const dateNow = 123;
    dateNowStub.returns(dateNow);

    hash = hasher(text + dateNow);
  });

  after(() => {
    Date.now.restore();
  });

  describe('sendMessage', () => {
    it('returns an action', () => {
      var expectedAction = {
        type: "SEND_MESSAGE",
        payload: {
          text: text,
          hash: hash,
          user: 'currentUser'
        }
      };

      expect(actions.sendMessage(text)).to.deep.equal(expectedAction);
    });
  });

  describe('newMessage', () => {
    it('returns an action', () => {
      var user = 'inputUser';
      var expectedAction = {
        type: "NEW_MESSAGE",
        payload: {
          text: text,
          hash: hash,
          user: user
        }
      };

      expect(actions.newMessage(text, user)).to.deep.equal(expectedAction);
    });

    it('returns an action with a payload that is the same as the input if the input is an object', () => {
      let inputMessage = {
        text: 'text',
        hash: 123,
        user: 'user'
      };
      let expectedAction = {
        type: "NEW_MESSAGE",
        payload: inputMessage
      };

      expect(actions.newMessage(inputMessage)).to.deep.equal(expectedAction);
    });
  });
});
