'use strict';

import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import reducer from './state-users';
import userActions from './user-actions';
import { List } from 'immutable';

describe('users state reducer', () => {
  it('intializes state to an empty List', () => {
    var list = reducer(undefined, {});

    expect(list).to.be.an.instanceof(List);
    expect(list.size).to.equal(0);
  });

  describe('after initialization', () => {
    var state;
    beforeEach(() => {
      state = reducer(undefined, {});
    });

    it('adds a user to the list on login', () => {
      var list = reducer(state, userActions.userLogin('newUser'));

      expect(list.size).to.equal(1);
      expect(list.first()).to.equal('newUser');
    });

    it('removes a user to the list on logout', () => {
      state = reducer(state, userActions.userLogin('newUser1'));
      state = reducer(state, userActions.userLogin('newUser2'));
      state = reducer(state, userActions.userLogin('newUser3'));

      var list = reducer(state, userActions.userLogout('newUser1'));

      expect(list.size).to.equal(2);
      expect(list.first()).to.equal('newUser2');
      expect(list.last()).to.equal('newUser3');
    });

    it('replaces the state when a user list is received', () => {
      state = reducer(state, userActions.userLogin('newUser0'));
      var userList = ['newUser1', 'newUser2', 'newUser3'];
      var list = reducer(state, userActions.userList(userList));

      expect(list.size).to.equal(3);
      expect(list.toArray()).to.deep.equal(userList);
    });

    it('does not throw if user list is undefined', () => {
      var boundReducer = reducer.bind(null, state, userActions.userList());

      expect(boundReducer).not.to.throw(Error);
    });

    it('returns the original state if user list is undefined', () => {
      var list = reducer(state, userActions.userList());

      expect(list).to.equal(state)
    });

    it('does not throw if user list is empty', () => {
      var boundReducer = reducer.bind(null, state, userActions.userList([]));

      expect(boundReducer).not.to.throw(Error);
    });

    it('returns the original state if user list is empty', () => {
      var list = reducer(state, userActions.userList([]));

      expect(list).to.equal(state)
    });
  });
});