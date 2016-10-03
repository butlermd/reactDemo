'use strict';

import io from 'socket.io-client';
import {isString, isArray} from 'lodash';

const socketIoMixin = {
  componentDidMount: function() {
    console.log('socketing')
    this.socket = io.connect('localhost:3000/ws');

    this.socket.on('connection', (socket) => {
      if(this.wsRoom) {
        if(isString(this.wsRoom)) {
          socket.join(this.wsRoom);
        } else if (isArray(this.wsRoom)){
          this.wsRoom.forEach((room) => socket.join(room));
        }
      }
    });
  },
  componentWillUnmount: function() {
    this.socket.disconnect();
  }
};

export default socketIoMixin;