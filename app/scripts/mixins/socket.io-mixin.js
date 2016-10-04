'use strict';

import io from 'socket.io-client';
import {isString, isArray} from 'lodash';

window.io = io;

const socketIoMixin = {
  componentDidMount: function() {
    this.socket = io.connect('localhost:3001');
  },
  componentWillUnmount: function() {
    this.socket.disconnect();
  }
};

export default socketIoMixin;