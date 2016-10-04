import React from 'react';
import { describe, beforeEach, it, afterEach } from 'mocha';
import { stub, spy } from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { clone } from 'lodash';
import Composition from './Composition'
import hasher from 'string-hash';
import store from '../store';

describe('Composition', () => {
  var wrapper, socket;
  const text = 'text of chat';

  beforeEach(() => {
    stub(Composition.prototype, 'componentDidMount', function () {
      this.socket = socket = {
        to: stub().returnsThis(),
        emit: stub().returnsThis(),
      }
    });
  });

  afterEach(() => {
    Composition.prototype.componentDidMount.restore();

  });

  describe('sendChat handler', () => {
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
        type: 'SEND_MESSAGE',
        payload: {
          text: text,
          hash: hasher(text + 123),
          user: 'currentUser'
        }
      };

      wrapper = mount(<Composition />);
      const input = wrapper.find('input').get(0);
      input.value = text;
      wrapper.find('button').simulate('click');

      expect(store.dispatch.called).to.equal.true;
      const args = store.dispatch.args;
      expect(args).to.deep.equal([[action]]);
    });

    it('sends the message over websocket too', () => {
      let payload = {
        text: text,
        hash: hasher(text + 123),
        user: 'currentUser'
      };

      wrapper = mount(<Composition />);
      const input = wrapper.find('input').get(0);
      input.value = text;
      wrapper.find('button').simulate('click');

      expect(socket.emit.calledOnce).to.equal.true;
      expect(socket.emit.args[0]).to.deep.equal(['sendMessage', payload]);
    });

    it('clears the input afterwards', () => {
      wrapper = mount(<Composition />);
      const input = wrapper.find('input').get(0);
      input.value = text;
      wrapper.find('button').simulate('click');

      expect(input.value).to.equal('');
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
        type: 'SEND_MESSAGE',
        payload: {
          text: text,
          hash: hasher(text + 123),
          user: 'currentUser'
        }
      };

      wrapper = mount(<Composition />);
      const input = wrapper.find('input').get(0);
      input.value = text;
      wrapper.find('input').simulate('keyPress', { which: 13 });

      expect(store.dispatch.called).to.equal.true;
      const args = store.dispatch.args;
      expect(args).to.deep.equal([[action]]);
    });

    it('sends the message over websocket too', () => {
      let payload = {
        text: text,
        hash: hasher(text + 123),
        user: 'currentUser'
      };

      wrapper = mount(<Composition />);
      const input = wrapper.find('input').get(0);
      input.value = text;
      wrapper.find('input').simulate('keyPress', { which: 13 });

      expect(socket.emit.calledOnce).to.equal.true;
      expect(socket.emit.args[0]).to.deep.equal(['sendMessage' ,payload]);
    });

    it('clears the input afterwards', () => {
      wrapper = mount(<Composition />);
      const input = wrapper.find('input').get(0);
      input.value = text;
      wrapper.find('input').simulate('keyPress', { which: 13 });

      expect(input.value).to.equal('');
    });
  });
});