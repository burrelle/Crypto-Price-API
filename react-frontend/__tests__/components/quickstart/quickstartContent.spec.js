import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import QuickstartContent from '../../../src/components/quickstart/quickstartContent'
import QuickstartCard from '../../../src/components/quickstart/quickstartCard';

describe('Quickstart Sidebar Component', () => {
    test('renders a link for each of the quickstart tutorial component is hidden', () => {
        const wrapper = shallow( <QuickstartContent /> );
        expect(wrapper.find(QuickstartCard)).to.have.length(5);
    });
});