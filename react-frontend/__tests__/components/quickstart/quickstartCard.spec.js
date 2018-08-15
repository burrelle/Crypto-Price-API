import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import QuickstartTutorial from '../../../src/components/quickstart/quickstartTutorials';
import QuickstartCard from '../../../src/components/quickstart/quickstartCard';
import PHPTutorial from '../../../src/utils/PhpTutorial';

describe('Quickstart Card Component', () => {
    test('renders one quickstart tutorial component', () => {
        const wrapper = shallow( <QuickstartCard language="PHP" tutorial={<PHPTutorial/>}/> );
        expect(wrapper.find(QuickstartTutorial)).to.have.length(1);
    });

    test('successfully calls the onClick handler', () => {
        const wrapper = shallow(
            <QuickstartCard language="PHP" tutorial={<PHPTutorial/>} />
        );
        wrapper.find('span').simulate('click');
        expect(wrapper.find('span').text()).to.equal('x')
      });
});