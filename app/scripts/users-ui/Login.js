'use strict';

import React from 'react';
import loginMixin from './login-mixin';

let Login = React.createClass({
  mixins: [loginMixin],
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
  }
});

export default Login;