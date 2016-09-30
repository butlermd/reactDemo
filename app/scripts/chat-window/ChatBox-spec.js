import React from 'react';
import { describe, beforeEach, it } from 'mocha';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { every } from 'lodash';
import ChatBox from './ChatBox';

describe('ChatBox', () => {
  it('adds a single message as a child', () => {
    const messages = [
      {
        text: 'chat text',
        user: 'username',
        hash: 1
      }
    ];

    const wrapper = shallow(<ChatBox messages={messages}/>);

    expect(wrapper.children().length).to.equal(1);
    expect(wrapper.childAt(0).name()).to.equal('ChatMessage');
    expect(wrapper.childAt(0).prop('message')).to.equal(messages[0]);
  });

  it('adds many messages as children', () => {
    const messages = [
      {
        text: 'chat text',
        user: 'user1',
        hash: 1
      },
      {
        text: 'more chat text',
        user: 'user2',
        hash: 2
      },
      {
        text: 'text',
        user: 'user2',
        hash: 3
      },
      {
        text: 'text',
        user: 'user1',
        hash: 4
      },
    ];

    const wrapper = shallow(<ChatBox messages={messages}/>);
    const children = wrapper.children();

    let allChatMessages = every(children.nodes, (message) => {
      return message.type.name === 'ChatMessage';
    });
    let allCorrespondingMessages = every(children.nodes, (message, index) => {
      return message.props.message === messages[index];
    });

    expect(children.length).to.equal(4);
    expect(allChatMessages).to.be.true;
    expect(allCorrespondingMessages).to.be.true;
  });

  it('sets the class to col-md-12', () => {
    const wrapper = shallow(<ChatBox/>);

    expect(wrapper.hasClass('col-md-12')).to.be.true;
  });
});
