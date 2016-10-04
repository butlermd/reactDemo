'use strict';

import React from 'react';
import store from '../store';
import userActions from '../users/user-actions';
import socketIdMixin from '../mixins/socket.io-mixin';

let Login = React.createClass({
  mixins: [socketIdMixin],
  render: function () {
    return <div className="col-md-12">
      <input className="col-md-4 col-md-offset-3" ref="userInput" onKeyPress={this.onKeyPress}></input>
      <button className="col-md-2 btn-primary btn-sm" onClick={this.login}>Login</button>
    </div>;
  },
  onKeyPress: function (e) {
    if(e.which === 13) {
      this.login();
    }
  },
  login: function () {
    let messageAction = userActions.userLogin(this.refs.userInput.value, true);
    store.dispatch(messageAction);
    this.socket.emit('login', messageAction.payload);
  }
});

export default Login;