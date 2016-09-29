import hasher from 'string-hash';

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
  return messageAction(NEW_MESSAGE, text, user);
}

function messageAction(type, text, user) {
  var hash = hasher(text + Date.now());

  return {
    type: type,
    payload: {
      text: text,
      hash: hash,
      user: user
    }
  };
}