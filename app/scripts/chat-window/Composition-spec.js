import React from 'react';
import { describe, beforeEach, it, before, after } from 'mocha';
import { stub } from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { clone } from 'lodash';
import Composition from './Composition'
import hasher from 'string-hash';
import store from '../store'
import socketIdMixin from '../mixins/socket.io-mixin';

describe('Composition', () => {
  var wrapper;
  const text = 'text of chat';

  before(() => {
    stub(Composition.prototype, 'componentDidMount', function() {
      console.log('stubbing')
      this.socket = {
        to: stub().returnsThis(),
        emit: stub().returnsThis(),
      }
    });
  });

  after(() => {
    Composition.prototype.componentDidMount.restore();
  });

  describe('sendChat handler', () => {
    before(() => {
      stub(Date, 'now').returns(123);
      stub(store, 'dispatch');
    });

    after(() => {
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
      const textarea = wrapper.find('textarea').get(0);
      textarea.value = text;
      wrapper.find('form').simulate('submit');

      expect(store.dispatch.called).to.equal.true;
      const args = store.dispatch.args;
      expect(args).to.deep.equal([[action]]);
    });
  });
});