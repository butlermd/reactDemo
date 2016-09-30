'use strict';

const actionTypes = {
  USER_LIST: 'USER_LIST_RECEIVED',
  USER_LOGGED_IN: 'USER_LOGGED_IN',
  USER_LOGGED_OUT: 'USER_LOGGED_OUT'
};

const actions = {
  userLogin: createUserLoginAction,
  userLogout: createUserLogoutAction,
  userList: createUserListAction
};

export default actions;

export { actionTypes };

///////

function createUserLoginAction(user, local = false) {
  return {
    type: actionTypes.USER_LOGGED_IN,
    payload: {
      user: user,
      local: local
    }
  };
}

function createUserLogoutAction(user) {
  return {
    type: actionTypes.USER_LOGGED_OUT,
    payload: user
  };
}

function createUserListAction(list) {
  return {
    type: actionTypes.USER_LIST,
    payload: list
  };
}