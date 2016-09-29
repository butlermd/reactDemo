import { expect } from 'chai';
import { describe, it, before } from 'mocha';
import { stub } from 'sinon';
import { mount, shallow } from 'enzyme';
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
  });
});
