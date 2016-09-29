import Immutable from 'immutable';
import { actionTypes } from './chat-actions';

const initialMessages = new Immutable.List();

export default messages;

////////

function messages(state = initialMessages, action) {
  return action.type === actionTypes.NEW_MESSAGE ? state.push(action.payload) : state;
}
