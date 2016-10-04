import React from 'react';
import { describe, beforeEach, it } from 'mocha';
import { stub, spy } from 'sinon';
import { expect } from 'chai';
import { List } from 'immutable';
import { mount } from 'enzyme';
import UserListContainer from './UserList'
import store from '../store';
import io from 'socket.io-client';

describe('UserListContainer', () => {
  var wrapper, users, socket;

  beforeEach(() => {
    users = new List(['firstUser', 'secondUser', 'thirdUser', 'fourthUser']);

    stub(store, 'getState').returns({ users: users, currentUser: 'secondUser' });

    socket = {
      on: stub().returnsThis(),
      disconnect: stub().returnsThis()
    };

    stub(io, 'connect').returns(socket);
  });

  afterEach(() => {
    store.getState.restore();
    io.connect.restore();
  });

  it('compiles alright', () => {
    const mounting = () => {
      wrapper = mount(<UserListContainer store={store}/>);
    };

    expect(mounting).not.to.throw();
  });

  it('creates children for each of the entries', () => {
    wrapper = mount(<UserListContainer store={store}/>);

    let list = wrapper.find('#user-list');

    expect(list.children().length).to.equal(4);
  });

  it('creates children with the name for each of the entries', () => {
    wrapper = mount(<UserListContainer store={store}/>);

    let list = wrapper.find('#user-list');

    for (var i = 0; i < users.length; i++) {
      expect(list.children()[i].text()).to.equal(users[i]);
    }
  });

  it('bolds the entry of the current user', () => {
    wrapper = mount(<UserListContainer store={store}/>);

    let currentUserEntry = wrapper.find('#user-list').childAt(1);

    expect(currentUserEntry.prop('style')).to.deep.equal({'fontWeight': 'bold'});
  });
});