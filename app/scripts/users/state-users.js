'use strict';

import { actionTypes } from './user-actions';
import { List } from 'immutable';

export default (state = initialState, action) => {
  return handlers[action.type] ? handlers[action.type](state, action) : state;
}

const initialState = new List();

const handlers = {
  [actionTypes.USER_LIST]: addAllUsers,
  [actionTypes.USER_LOGGED_IN]: login,
  [actionTypes.USER_LOGGED_OUT]: logout
};

/////

function login(state, action) {
  return action.payload.local ? state : state.push(action.payload.user);
}

function logout(state, action) {
  let index;

  return (index = state.indexOf(action.payload)) >= 0 ? state.delete(index) : state;
}

function addAllUsers(state, action) {
  return Array.isArray(action.payload) ? new List(action.payload) : state;
}