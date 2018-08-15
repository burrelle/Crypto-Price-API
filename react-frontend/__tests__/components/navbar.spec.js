import React from 'react';
import {
    shallow
} from 'enzyme';
import {
    expect
} from 'chai';
import Navbar from '../../src/components/navbar';
import Link from 'react-router-dom/Link';

describe('Navbar Component', () => {
    test('renders five link components', () => {
        const wrapper = shallow( < Navbar / > );
        expect(wrapper.find(Link)).to.have.length(5);
    });
})