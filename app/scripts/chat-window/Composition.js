'use strict';

import React from 'react';
import store from '../store';
import chatActions from '../chat/chat-actions';
import socketIdMixin from '../mixins/socket.io-mixin';

let Composition = React.createClass({
  mixins: [socketIdMixin],
  render: function () {
    return <div className="col-md-12">
      <input className="col-md-10" ref="chatText" onKeyPress={this.onKeyPress}></input>
      <button className="col-md-2 btn-primary btn-sm" onClick={this.sendChat}>Send Chat</button>
    </div>;
  },
  onKeyPress: function (e) {
    if(e.which === 13) {
      return this.sendChat();
    }
  },
  sendChat: function () {
    let messageAction = chatActions.sendMessage(this.refs.chatText.value);
    store.dispatch(messageAction);
    this.socket.emit('sendMessage', messageAction.payload);

    this.refs.chatText.value = '';
  }
});

export default Composition;