'use strict';

import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';
import reducer from './state-current-user';
import userActions from './user-actions';

describe('current user reducer', () => {
  it('is null intitially', () => {
    expect(reducer(undefined, {})).to.be.null;
  });

  it('is updated when the user logs in', () => {
    expect(reducer(null, userActions.userLogin('currentUser', true))).to.equal('currentUser');
  });

  it('is not updated when another user logs in', () => {
    expect(reducer(null, userActions.userLogin('currentUser', false))).to.equal(null);
  });
});