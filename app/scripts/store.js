'use strict';

import {combineReducers, createStore} from 'redux';
import messages from './chat/state-messages';
import pendingMessages from './chat/state-pending-messages';
import users from './users/state-users';
import currentUser from './users/state-current-user';

const store = createStore(combineReducers({
  messages: messages,
  pendingMessages: pendingMessages,
  users: users,
  currentUser: currentUser
}));

export default store;