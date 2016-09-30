import React from 'react';
import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import ChatWindow from './ChatWindow'

describe('ChatWindow', () => {
  var wrapper;

  beforeEach(() => {
    wrapper = shallow(<ChatWindow />);
  });

  it('has a class of row', () => {
    let hasClass = wrapper.hasClass('row');

    expect(hasClass).to.be.true;
  });

  it('has two children', () => {
    let children = wrapper.children();

    expect(children.length).to.equal(2);
  });

  it('first child is ChatMessages', () => {
    let firstChild = wrapper.childAt(0);

    expect(firstChild.name()).to.equal('ChatMessages');
  });

  it('second child is CompositionBox', () => {
    let secondChild = wrapper.childAt(1);

    expect(secondChild.name()).to.equal('Composition');
  });
});
