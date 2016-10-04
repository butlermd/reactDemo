'use strict';
import store from '../store';
import userActions from '../users/user-actions';
import appSocket from '../sockets/appSocket';

export default {
  login: function () {
    this.socket = appSocket();

    let messageAction = userActions.userLogin(this.refs.userInput.value, true);
    store.dispatch(messageAction);
    this.socket.emit('login', messageAction.payload);
  }
}