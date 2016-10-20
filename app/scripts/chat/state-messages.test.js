'use strict';

jest.unmock('immutable');
jest.unmock('./state-messages');
jest.unmock('./chat-actions');

import reducer from './state-messages';
import chatActions from './chat-actions';
import Immutable from 'immutable';

describe('redux messages reducer', () => {
  var state, action;
  describe('initializes', () => {
    beforeEach(() => {
      state = undefined;
      action = {};
    });

    it('the state with an empty immutable list', () => {
      var list = reducer(state, action);
      var isList = Immutable.List.isList(list);
      var listSize = list.size;

      expect(isList).toBe(true);
      expect(listSize).toBe(0);
    });
  });

  describe('new message', () => {
    beforeEach(() => {
      state = new Immutable.List();
      action = chatActions.newMessage('chat text');
    });

    it('adds the new message to the state', () => {
      var list = reducer(state, action);
      var listSize = list.size;
      var firstItemText = list.get(0).text;

      expect(listSize).toBe(1);
      expect(firstItemText).toBe('chat text');
    });

  });
});
