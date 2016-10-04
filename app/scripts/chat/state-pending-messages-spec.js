import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import reducer from './state-pending-messages';
import chatActions from './chat-actions';
import Immutable from 'immutable';

describe('redux pending messages reducer', () => {
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

      expect(isList).to.be.true;
      expect(listSize).to.equal(0);
    });
  });

  describe('send message', () => {
    beforeEach(() => {
      state = new Immutable.List();
      action = chatActions.sendMessage('chat text', 'currentUser');
    });

    it('adds the new message to the state', () => {
      var list = reducer(state, action);
      var listSize = list.size;
      var firstItemText = list.get(0).text;

      expect(listSize).to.equal(1);
      expect(firstItemText).to.equal('chat text');
    });

  });

  describe('new message', () => {
    var pendingMessageHash;
    beforeEach(() => {
      var initialAction = chatActions.sendMessage('chat text', 'currentUser');
      pendingMessageHash = initialAction.payload.hash;
      state = reducer(undefined, initialAction);

      action = chatActions.newMessage('chat text', 'currentUser');
    });

    it('removes pending message when new message has a matching hash and username', () => {
      action.payload.hash = pendingMessageHash;

      var list = reducer(state, action);
      var listSize = list.size;

      expect(listSize).to.equal(0);
    });

    it('does not remove a message when new message has no hash match in pending', () => {
      action.payload.hash = 1234;
      var list = reducer(state, action);
      var listSize = list.size;

      expect(listSize).to.equal(1);
    });

    it('does not remove a message when new message has an hash match but no username match in pending', () => {
      action.payload.hash = pendingMessageHash;
      action.payload.user = 'otherUser';
      var list = reducer(state, action);
      var listSize = list.size;

      expect(listSize).to.equal(1);
    });

  });
});
