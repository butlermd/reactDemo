'use strict';

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { mount, shallow } from 'enzyme';
import actions from './user-actions'

describe('user actions', () => {

  describe('user login', () => {
    it('defaults to a remote user login', () => {
      var expectedAction = {
        type: 'USER_LOGGED_IN',
        payload: {
          user: 'newUser',
          local: false
        }
      };

      expect(actions.userLogin('newUser')).to.deep.equal(expectedAction);
    });

    it('if specified, designates as a local user login', () => {
      var expectedAction = {
        type: 'USER_LOGGED_IN',
        payload: {
          user: 'newUser',
          local: true
        }
      };

      expect(actions.userLogin('newUser', true)).to.deep.equal(expectedAction);
    });
  });

  describe('user logout', () => {
    it('returns a simple ation payload', () => {
      var expectedAction = {
        type: 'USER_LOGGED_OUT',
        payload: 'oldUser'
      };

      expect(actions.userLogout('oldUser')).to.deep.equal(expectedAction);
    });
  });

  describe('user list', () => {
    it('returns an ation payload with an array of users', () => {
      var userList = ['newUser1', 'newUser2', 'newUser3'];
      var expectedAction = {
        type: 'USER_LIST_RECEIVED',
        payload: userList
      };

      expect(actions.userList(userList)).to.deep.equal(expectedAction);
    });
  });

});