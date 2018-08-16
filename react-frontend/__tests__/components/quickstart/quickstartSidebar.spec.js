import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import QuickstartSidebar from '../../../src/components/quickstart/quickstartSidebar';

describe('Quickstart Sidebar Component', () => {
    test('renders a link for each of the quickstart tutorial component is hidden', () => {
        const wrapper = shallow( <QuickstartSidebar />);
        expect(wrapper.find('a')).to.have.length(5);
    });    
});