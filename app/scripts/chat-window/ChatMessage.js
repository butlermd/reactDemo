'use strict';

import React from 'react';

const ChatMessage = (props) =>
  <div className="col-md-12">
    <strong>{props.message.user}: </strong> {props.message.text}
  </div>;

export default ChatMessage;
