import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import QuickstartTutorials from '../../../src/components/quickstart/quickstartTutorials';

describe('Quickstart Tutorial Component', () => {
    test('renders no div when quickstart tutorial component is hidden', () => {
        const wrapper = shallow( <QuickstartTutorials example={false} tutorial='PHP' /> );
        expect(wrapper.find('div')).to.have.length(0);
    });

    test('renders one div for the quickstart tutorial component', () => {
        const wrapper = shallow( <QuickstartTutorials example={true} tutorial='PHP' /> );
        expect(wrapper.find('div')).to.have.length(1);
    });
});