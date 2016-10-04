import React from 'react';
import { describe, beforeEach, it, afterEach } from 'mocha';
import { stub, spy } from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import Login from './Login'
import store from '../store';
import io from 'socket.io-client';
import {reset} from '../sockets/appSocket';

describe('Login', () => {
  var wrapper, socket;
  const user = 'userName';

  beforeEach(() => {
    socket = {
      on: stub().returnsThis(),
      emit: stub().returnsThis(),
      disconnect: stub().returnsThis()
    };

    stub(io, 'connect').returns(socket);

    reset();
  });

  afterEach(() => {
    io.connect.restore();
    reset();
  });

  describe('login handler', () => {
    beforeEach(() => {
      stub(Date, 'now').returns(123);
      stub(store, 'dispatch');
    });

    afterEach(() => {
      Date.now.restore();
      store.dispatch.restore();
    });

    it('send a SEND_MESSAGE action to the store', () => {
      let action = {
        type: 'USER_LOGGED_IN',
        payload: {
          user: user,
          local: true
        }
      };

      wrapper = mount(<Login />);
      const input = wrapper.find('input').get(0);
      input.value = user;
      wrapper.find('button').simulate('click');

      expect(store.dispatch.called).to.equal.true;
      const args = store.dispatch.args;
      expect(args).to.deep.equal([[action]]);
    });

    it('sends the message over websocket too', () => {
      let payload = {
        user: user,
        local: true
      };

      wrapper = mount(<Login />);
      const input = wrapper.find('input').get(0);
      input.value = user;
      wrapper.find('button').simulate('click');

      expect(socket.emit.calledOnce).to.equal.true;
      expect(socket.emit.args[0]).to.deep.equal(['login', payload]);
    });
  });

  describe('onKeyPress handler', () => {
    beforeEach(() => {
      stub(Date, 'now').returns(123);
      stub(store, 'dispatch');
    });

    afterEach(() => {
      Date.now.restore();
      store.dispatch.restore();
    });

    it('send a SEND_MESSAGE action to the store', () => {
      let action = {
        type: 'USER_LOGGED_IN',
        payload: {
          user: user,
          local: true
        }
      };

      wrapper = mount(<Login />);
      const input = wrapper.find('input').get(0);
      input.value = user;
      wrapper.find('input').simulate('keyPress', { which: 13 });

      expect(store.dispatch.called).to.equal.true;
      const args = store.dispatch.args;
      expect(args).to.deep.equal([[action]]);
    });

    it('sends the message over websocket too', () => {
      let payload = {
        user: user,
        local: true
      };

      wrapper = mount(<Login />);
      const input = wrapper.find('input').get(0);
      input.value = user;
      wrapper.find('input').simulate('keyPress', { which: 13 });

      expect(socket.emit.calledOnce).to.equal.true;
      expect(socket.emit.args[0]).to.deep.equal(['login' ,payload]);
    });
  });
});