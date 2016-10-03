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
    return <div className="col-md-12">{messages}</div>
  },
  propTypes: {
    messages: (props, propName) => List.isList(props[propName])
  }
});

export { ChatBox };

const ChatMessages = connect(mapStateToProps)(ChatBox);
ChatMessages.prototype.componentDidMount = function () {
  this.wsRoom = 'chat';

  socketIoMixin.componentDidMount.call(this);

  this.socket.on('message', (message) => {
    this.props.store.dispatch(chatActions.newMessage(message));
  });
};
ChatMessages.prototype.componentWillUnmount = socketIoMixin.componentWillUnmount;

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