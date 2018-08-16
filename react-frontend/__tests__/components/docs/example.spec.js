import React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';
import { Example } from '../../../src/components/docs/Example';

describe('Docs example component', () => {
    test('renders no div when example component is hidden', () => {
        const wrapper = shallow( <Example example={false} json={{example: "example"}} />);
        expect(wrapper.find('div')).to.have.length(0);
    });

    test('renders one div for the example component', () => {
        const wrapper = shallow( <Example example={true} json={{example: "example"}} />);
        expect(wrapper.find('div .px-6 .py-4')).to.have.length(1);
    });
});