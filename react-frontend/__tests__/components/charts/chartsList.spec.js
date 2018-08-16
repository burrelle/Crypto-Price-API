import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import ChartList from '../../../src/components/charts/chartsList'
import Chart from '../../../src/components/charts/charts'

describe('Chart List Component', () => {
    test('renders a link for each of the quickstart tutorial component is hidden', () => {
        const wrapper = shallow(<ChartList />);
        expect(wrapper.find(Chart)).to.have.length(6);
    });    
});