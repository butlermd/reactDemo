'use strict';

import React from 'react';
import { map } from 'lodash';
import ChatMessage from './ChatMessage';

const ChatBox = (props) => {
  let messages = map(props.messages, messageToChatMessage);
  return <div className="col-md-12">{messages}</div>
};

export default ChatBox;

///////

function messageToChatMessage(message) {
  return <ChatMessage message={message} key={message.hash}/>;
}