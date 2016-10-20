'use strict';

jest.unmock('react-test-renderer');
jest.unmock('./ChatMessage');

import React from 'react';
import renderer from 'react-test-renderer';
import ChatMessage from './ChatMessage'

describe('ChatMessage', () => {
  var message, pending;

  beforeEach(() => {
    message = {
      text: 'chat text',
      user: 'username'
    };

    pending = false;
  });

  it('when the message is not pending', () => {
    const tree = renderer.create(<ChatMessage message={message} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('contains the text', () => {
    pending = true;

    const tree = renderer.create(<ChatMessage message={message} pending={pending} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});