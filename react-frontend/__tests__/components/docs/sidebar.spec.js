import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Sidebar from '../../../src/components/docs/sidebar'

describe('Docs Sidebar Component', () => {
    test('renders a link for each of the sidebar component is hidden', () => {
        const wrapper = shallow( <Sidebar />);
        expect(wrapper.find('a')).to.have.length(5);
    });    
});