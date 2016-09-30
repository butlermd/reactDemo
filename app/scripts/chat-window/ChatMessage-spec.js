import React from 'react';
import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import { mount } from 'enzyme';
import ChatMessage from './ChatMessage'

describe('ChatMessage', () => {
  var wrapper;

  beforeEach(() => {
    let message = {
      text: 'chat text',
      user: 'username'
    };
    wrapper = mount(<ChatMessage message={message}/>);
  });

  it('has a <strong> child with the username', () => {
    const strong = wrapper.find('strong');

    expect(strong.type()).to.equal('strong');
    expect(strong.text()).to.equal('username: ');
  });

  it('contains the text', () => {
    const text = wrapper.find('div').text();

    expect(text).to.equal('username:  chat text');
  });
});