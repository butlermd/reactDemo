import {List} from 'immutable';
import {actionTypes} from './chat-actions';

const initialMessages = new List();

export default messages;

////////

function messages(state = initialMessages, action) {
  switch( action.type) {
    case actionTypes.SEND_MESSAGE:
      return state.push(action.payload);
    case actionTypes.NEW_MESSAGE:
      var index;
      if(List.isList(state) && (index = state.findIndex(matchingPayload(action.payload))) >= 0) {
        return state.delete(index);
      } else {
        return state;
      }
    default:
      return state;
  }
}

function matchingPayload(newMessage) {
  return (pendingMessage) => {
    return newMessage.hash === pendingMessage.hash && newMessage.user === pendingMessage.user;
  }
}