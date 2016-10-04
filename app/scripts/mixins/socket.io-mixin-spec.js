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
      disconnect: stub().returnsThis()
    };

    stub(io, 'connect').returns(socket);

  });

  beforeEach(() => {
    socket.on.reset();
  });

  after(() => {
    io.connect.restore();
  });

  describe('componentDidMount()', () => {
    it('calls io.connect when mounting', () => {
      mixin.componentDidMount();

      expect(io.connect.calledOnce).to.be.true;
      expect(io.connect.args[0]).to.deep.equal(['localhost:3001']);
    });

    it('assigns the socket created by connect() to this.socket', () => {
      mixin.componentDidMount();

      expect(mixin.socket).to.equal(socket);
    });
  });

  describe('componentWillUnmount()', () => {
    it('disconnects the socket on unmount', () => {
      mixin.componentWillUnmount();

      expect(socket.disconnect.calledOnce).to.be.true;
    });
  });
});
