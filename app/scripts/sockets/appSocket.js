'use strict';

import io from 'socket.io-client';

let socket;
export default () => {
  return socket || (socket = io.connect('localhost:3001'));
};

const reset = ()=>{socket = null;};
export {reset};