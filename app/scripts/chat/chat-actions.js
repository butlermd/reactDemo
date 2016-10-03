import hasher from 'string-hash';
import { isObject } from 'lodash';

const SEND_MESSAGE = 'SEND_MESSAGE';
const NEW_MESSAGE = 'NEW_MESSAGE';

const actionTypes = {
  SEND_MESSAGE: SEND_MESSAGE,
  NEW_MESSAGE: NEW_MESSAGE,
};

const actions = {
  sendMessage: createSendMessageAction,
  newMessage: createNewMessageAction
};

var currentUser = 'currentUser';

export default actions;

export { actionTypes };

////////

function createSendMessageAction(text) {
  return messageAction(SEND_MESSAGE, text, currentUser);
}

function createNewMessageAction(text, user) {
  let hash;

  if (isObject(text)) {
    user = text.user;
    hash = text.hash;
    text = text.text;
  }

  return messageAction(NEW_MESSAGE, text, user, hash);
}

function messageAction(type, text, user, hash) {
  hash = hash || hasher(text + Date.now());

  return {
    type: type,
    payload: {
      text: text,
      hash: hash,
      user: user
    }
  };
}