'use strict';

import appSocket from './appSocket';
import { reset } from './appSocket';
import { describe, it, beforeEach, afterEach } from 'mocha';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import io from 'socket.io-client';

describe('appSocket', () => {
  let socket, store;

  beforeEach(() => {
    socket = {
      on: stub().returnsThis(),
      disconnect: stub().returnsThis()
    };

    let otherSocket = {};

    let connectStub = stub(io, 'connect');
    connectStub.onFirstCall().returns(socket);
    connectStub.onSecondCall().returns(otherSocket);

    reset();
  });

  afterEach(() => {
    io.connect.restore();
  });

  after(() => {
    reset();
  });

  it('calls io.connect when mounting', () => {
    appSocket();

    expect(io.connect.calledOnce).to.be.true;
    expect(io.connect.args[0]).to.deep.equal(['localhost:3001']);
  });

  it('returns the socket created by connect() to this.socket', () => {
    expect(appSocket()).to.equal(socket);
  });

  it('returns the cached socket on a second call and doesn\'t call connect again', () => {
    appSocket();

    expect(appSocket()).to.equal(socket);
    expect(io.connect.calledOnce).to.be.true;
  });
});
