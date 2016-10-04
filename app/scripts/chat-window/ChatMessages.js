'use strict';

import React from 'react';
import { List } from 'immutable';
import { map } from 'lodash';
import ChatMessage from './ChatMessage';
import chatActions from '../chat/chat-actions';
import { connect } from 'react-redux';
import appSocket from '../sockets/appSocket';

const ChatBox = React.createClass({
  render: function () {
    let messages = map(this.props.messages, messageToChatMessage);
    let pendingMessages = map(this.props.pendingMessages, messageToPendingChatMessage);
    return <div className="panel panel-default col-md-12 text-left">
      <div className="panel-body">{messages}{pendingMessages}</div>
    </div>
  },
  propTypes: {
    messages: (props, propName) => List.isList(props[propName]),
    pendingMessages: (props, propName) => List.isList(props[propName])
  }
});

export { ChatBox };

const ChatMessages = connect(mapStateToProps)(ChatBox);
const superComponentDidMount = ChatMessages.prototype.componentDidMount;
ChatMessages.prototype.componentDidMount = function () {
  superComponentDidMount.call(this);

  this.socket = appSocket();

  this.socket.on('chatMessage', (message) => {
    console.log('Chat Message Received:');
    console.log(message);
    this.store.dispatch(chatActions.newMessage(message));
  });
};

export default ChatMessages;

///////

function messageToChatMessage(message) {
  return <ChatMessage message={message} key={message.hash}/>;
}

function messageToPendingChatMessage(message) {
  return <ChatMessage message={message} key={message.hash} pending="true"/>;
}

function mapStateToProps(state) {
  return {
    messages: state.messages.toArray(),
    pendingMessages: state.pendingMessages.toArray(),
  };
}