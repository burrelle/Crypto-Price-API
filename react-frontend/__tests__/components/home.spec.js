import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    expect
} from 'chai';

import Home from '../../src/components/home';
import Typing from 'react-typing-animation/dist/Typing';
import Link from 'react-router-dom/Link';

describe('Home Component', () => {
    test('renders two typing components', () => {
        const wrapper = shallow( < Home / > );
        expect(wrapper.find(Typing)).to.have.length(2);
    });
    test('renders one link component', () => {
        const wrapper = shallow( < Home / > );
        expect(wrapper.find(Link)).to.have.length(1);
    });
})