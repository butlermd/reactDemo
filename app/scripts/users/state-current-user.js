'use strict';

import { actionTypes } from './user-actions';

export default (state = null, action) => {
  if(action.type === actionTypes.USER_LOGGED_IN && action.payload.local) {
    return action.payload.user;
  }
  return state;
};