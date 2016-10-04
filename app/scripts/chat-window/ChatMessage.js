'use strict';

import React from 'react';

const ChatMessage = (props) => {
  return <div className="col-md-12" style={props.pending ? {'font-style':'italic', color: '#bbbbbb'}: {}}>
    <strong>{props.message.user}: </strong> {props.message.text}
  </div>
};

export default ChatMessage;
