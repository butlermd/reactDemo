import React from 'react';
import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ChatWindow from './ChatWindow'

describe('ChatWindow', () => {
  var wrapper;

  it('compiles alright', () => {
    const mounting = () => {
      wrapper = shallow(<ChatWindow/>);
    };

    expect(mounting).not.to.throw();
  });
});