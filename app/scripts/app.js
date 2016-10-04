'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import ChatWindow from './chat-window/ChatWindow';
import Login from './users-ui/Login';
import UserListContainer from './users-ui/UserList';
import store from './store';

let currentUser;
store.subscribe(() => {
  let newUser = store.getState();

  if (newUser && currentUser !== newUser) {
    currentUser = newUser;
    doRender();
  }
});

const doRender = () => {
  let jsx;
  if (currentUser) {
    jsx = <Provider store={store}>
      <div className="row">
        <ChatWindow />
        <UserListContainer className="col-md-3" />
      </div>
    </Provider>
  } else {
    jsx = <Provider store={store}>
      <Login />
    </Provider>
  }

  render(jsx, document.getElementById('app'));

};

doRender();