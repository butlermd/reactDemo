'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'
import ChatWindow from './chat-window/ChatWindow';
//import { UserList } from './user-panel/UserList';
import store from './store';

render(
  <Provider store={store}>
    <ChatWindow />
    {/*<UserList />*/}
  </Provider>,
  document.getElementById('app')
);

