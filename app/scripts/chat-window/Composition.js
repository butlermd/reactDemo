'use strict';

import React from 'react';
import store from '../store';
import chatActions from '../chat/chat-actions';
import socketIdMixin from '../mixins/socket.io-mixin';

let Composition = React.createClass({
  mixins: [socketIdMixin],
  render: function () {
    return <form className="col-md-12" onSubmit={this.sendChat}>
      <textarea className="col-md-11" ref="chatText"></textarea>
      <button className="col-md-1" type="submit"></button>
    </form>;
  },
  sendChat: function () {
    let messageAction = chatActions.sendMessage(this.refs.chatText.value);
    store.dispatch(messageAction);
    //this.socket.to('chat').emit(messageAction.payload)
  },
  componentDidMount: function () {
    this.wsRoom = 'chat';
  }
});

export default Composition;