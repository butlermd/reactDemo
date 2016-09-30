import React from 'react';
import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';
import ChatMessages from './ChatMessages'

describe('ChatMessages', () => {
  var wrapper;

  describe('rendered structure', () => {
    beforeEach(() => {
      wrapper = shallow(<ChatMessages />);
    });

    it('builds a ChatBox', () => {
      expect(wrapper.name()).to.equal('ChatBox');
    });
  });
});
