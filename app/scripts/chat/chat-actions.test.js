'use strict';

jest.unmock('./chat-actions');
jest.unmock('lodash');

import actions from './chat-actions'
import hasher from 'string-hash';

describe('redux chat actions', () => {
  var text, hash;

  beforeEach(() => {

    text = 'chat text';

    const dateNow = 123;
    Date.now = jest.fn(() => dateNow);

    hash = 123456;
    hasher.mockReturnValue(hash);
    //Date.now = jest.fn(() => dateNow);

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

      expect(actions.sendMessage(text, 'currentUser')).toEqual(expectedAction);
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

      expect(actions.newMessage(text, user)).toEqual(expectedAction);
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

      expect(actions.newMessage(inputMessage)).toEqual(expectedAction);
    });
  });
});
