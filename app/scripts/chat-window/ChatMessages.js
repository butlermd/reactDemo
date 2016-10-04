'use strict';

import React from 'react';
import { List } from 'immutable';
import { map } from 'lodash';
import ChatMessage from './ChatMessage';
import chatActions from '../chat/chat-actions';
import { connect } from 'react-redux';
import socketIoMixin from '../mixins/socket.io-mixin';

const ChatBox = React.createClass({
  render: function () {
    let messages = map(this.props.messages, messageToChatMessage);
    return <div className="col-md-12 text-left">{messages}</div>
  },
  propTypes: {
    messages: (props, propName) => List.isList(props[propName])
  }
});

export { ChatBox };

const ChatMessages = connect(mapStateToProps)(ChatBox);
const superComponentDidMount = ChatMessages.prototype.componentDidMount;
ChatMessages.prototype.componentDidMount = function () {
  socketIoMixin.componentDidMount.call(this);
  superComponentDidMount.call(this);

  this.socket.on('chatMessage', (message) => {
    console.log('Chat Message Received:');
    console.log(message);
    this.store.dispatch(chatActions.newMessage(message));
  });
};
const superComponentWillUnmount = ChatMessages.prototype.componentWillUnmount;
ChatMessages.prototype.componentWillUnmount = function() {
  superComponentWillUnmount.call(this);
  socketIoMixin.componentWillUnmount.call(this);
};

export default ChatMessages;

///////

function messageToChatMessage(message) {
  return <ChatMessage message={message} key={message.hash}/>;
}

function mapStateToProps(state) {
  return {
    messages: state.messages.toArray()
  };
}