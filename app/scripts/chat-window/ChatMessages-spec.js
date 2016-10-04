import React from 'react';
import { List } from 'immutable';
import { describe, it, before, after } from 'mocha';
import { expect } from 'chai';
import { stub, spy } from 'sinon';
import { shallow, mount } from 'enzyme';
import { every } from 'lodash';
import { ChatBox } from './ChatMessages';
import ChatMessages from './ChatMessages';
import io from 'socket.io-client';

describe('ChatBox', () => {
  describe('render()', () => {
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
});

describe('Connect(ChatBox)', () => {
  let socket, store;

  before(() => {
    socket = {
      on: stub().returnsThis(),
      disconnect: stub().returnsThis()
    };

    stub(io, 'connect').returns(socket);

    let state = {
      messages: new List(),
      pendingMessages: new List(),
    };
    store = {
      subscribe: spy(),
      getState: stub().returns(state),
      dispatch: spy()
    };
  });

  beforeEach(() => {
    socket.on.reset();
  });

  after(() => {
    io.connect.restore();
  });

  describe('componentDidMount()', () => {
    it('calls io.connect when mounting', () => {
      mount(<ChatMessages store={store}/>);

      expect(io.connect.calledOnce).to.be.true;
      expect(io.connect.args[0]).to.deep.equal(['localhost:3001']);
    });

    it('assigns the socket created by connect() to this.socket', () => {
      const chatBox = mount(<ChatMessages store={store}/>).node;

      expect(chatBox.socket).to.equal(socket);
    });

    it('dispatches a NEW_MESSAGE action to the store when one is received from the socket', () => {
      let message = { text: 'new message', user: 'other user', hash: 123 };
      store.dispatch.reset();

      mount(<ChatMessages store={store}/>);

      let onMessage = socket.on.args[0];
      let event = onMessage[0];
      let callback = onMessage[1];

      callback(message);

      expect(event).to.equal('chatMessage');
      expect(store.dispatch.calledOnce);
      expect(store.dispatch.args[0]).to.deep.equal([{type: 'NEW_MESSAGE', payload: message}]);
    });
  });

  describe('componentWillUnmount()', () => {
    it('disconnects the socket on unmount', () => {
      mount(<ChatMessages store={store}/>).unmount();

      expect(socket.disconnect.calledOnce).to.be.true;
    });
  });
});
