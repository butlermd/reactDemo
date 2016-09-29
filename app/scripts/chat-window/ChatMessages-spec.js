import React from 'react';
import { expect } from 'chai';
import {spy} from 'sinon';
import { mount, shallow } from 'enzyme';
import ChatMessages from './ChatMessages'

describe('ChatWindow', () => {
    before(() => {
        spy(ChatMessages.prototype, 'componentDidMount');
    });

    it('calls componentDidMount', () => {
        const wrapper = mount(<ChatMessages />);
        expect(ChatMessages.prototype.componentDidMount.calledOnce).to.equal(true);
    });
});
