'use strict';

import mixin from './socket.io-mixin';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import io from 'socket.io-client';

describe('socket-io mixin', () => {
  let socket, store;

  before(() => {
    socket = {
      on: stub().returnsThis(),
      join: stub().returnsThis(),
      disconnect: stub().returnsThis()
    };

    stub(io, 'connect').returns(socket);

  });

  beforeEach(() => {
    socket.on.reset();
    socket.join.reset();
  });

  after(() => {
    io.connect.restore();
  });

  describe('componentDidMount()', () => {
    it('calls io.connect when mounting', () => {
      mixin.componentDidMount();

      expect(io.connect.calledOnce).to.be.true;
      expect(io.connect.args[0]).to.deep.equal(['localhost:3000/ws']);
    });

    it('assigns the socket created by connect() to this.socket', () => {
      mixin.componentDidMount();

      expect(mixin.socket).to.equal(socket);
    });

    it('joins the room specified by the array this.wsRoom on connection', () => {
      mixin.wsRoom = 'testRoom';

      mixin.componentDidMount();
      let event = socket.on.args[0][0];
      let callback = socket.on.args[0][1];

      callback(socket);

      expect(event).to.equal('connection');
      expect(socket.join.calledOnce).to.be.true;
      expect(socket.join.args[0]).to.deep.equal(['testRoom']);
    });

    it('joins the rooms specified by the array this.wsRoom on connection', () => {
      mixin.wsRoom = ['testRoom1', 'testRoom2', 'testRoom3'];

      mixin.componentDidMount();
      let event = socket.on.args[0][0];
      let callback = socket.on.args[0][1];

      callback(socket);

      expect(event).to.equal('connection');
      expect(socket.join.calledThrice).to.be.true;
      expect(socket.join.args).to.deep.equal([['testRoom1'], ['testRoom2'], ['testRoom3']]);
    });

  });

  describe('componentWillUnmount()', () => {
    it('disconnects the socket on unmount', () => {
      mixin.componentWillUnmount();

      expect(socket.disconnect.calledOnce).to.be.true;
    });
  });
});
