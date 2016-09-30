'use strict';

import React from 'react';
import store from '../store';
import chatActions from '../chat/chat-actions'

let Composition = React.createClass({
  render: function () {
    return <form className="col-md-12" onSubmit={this.sendChat}>
      <textarea className="col-md-11" ref="chatText"></textarea>
      <button className="col-md-1" type="submit"></button>
    </form>;
  },
  sendChat: function () {
    store.dispatch(chatActions.sendMessage(this.refs.chatText.value));
  }
});

export default Composition;