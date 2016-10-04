'use strict';

import React from 'react';
import chatActions from '../chat/chat-actions';
import appSocket from '../sockets/appSocket';
import store from '../store';

let Composition = React.createClass({
  componentDidMount: function() {
    this.socket = appSocket();
  },
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
    let username = store.getState().currentUser;
    let messageAction = chatActions.sendMessage(this.refs.chatText.value, username);
    store.dispatch(messageAction);
    this.socket.emit('sendMessage', messageAction.payload);

    this.refs.chatText.value = '';
  }
});

export default Composition;