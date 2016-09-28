import React from 'react';
import { expect } from 'chai';
import {spy} from 'sinon';
import { mount, shallow } from 'enzyme';
import TestCrap from '../../app/scripts/ui/TestCrap'

describe('TestCrap', () => {
    before(() => {
        spy(TestCrap.prototype, 'componentDidMount');
    })

    it('calls componentDidMount', () => {
        const wrapper = mount(<TestCrap />);
        expect(TestCrap.prototype.componentDidMount.calledOnce).to.equal(true);
    });
});
