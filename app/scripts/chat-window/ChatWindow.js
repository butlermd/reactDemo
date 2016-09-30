'use strict';

import React from 'react';
import ChatMessages from './ChatMessages'
import Composition from './Composition'

const ChatWindow = () => <div className="row">
      <ChatMessages></ChatMessages>
      <Composition></Composition>
    </div>;

export default ChatWindow;
