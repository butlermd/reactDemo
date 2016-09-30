import React from 'react';
import { describe, beforeEach, it, before, after } from 'mocha';
import { stub } from 'sinon';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { clone } from 'lodash';
import Composition from './Composition'
import hasher from 'string-hash';
import store from '../store'

describe('Composition', () => {
  var wrapper;
  const text = 'text of chat';

  beforeEach(() => {
    wrapper = mount(<Composition />);
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

    beforeEach(() => {
      const textarea = wrapper.find('textarea').get(0);
      textarea.value = text;
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

      wrapper.find('form').simulate('submit');

      expect(store.dispatch.called).to.equal.true;
      const args = store.dispatch.args;
      expect(args).to.deep.equal([[action]]);
    });
  });
});