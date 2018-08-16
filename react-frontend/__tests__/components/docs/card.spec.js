import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Card from '../../../src/components/docs/card';
import faker from 'faker';
import JsonExamples from '../../../src/utils/JsonExamples'


describe('Docs Card Component', () => {
    test('renders an example for each of the docs card', () => {
        const wrapper = shallow( <Card
            verb={faker.lorem.word()}
            endpoint={faker.internet.url()}
            description={faker.lorem.sentence()}
            json={JsonExamples.getAllPrices}
            liveLink={faker.internet.url()}
            additionalInfo={faker.lorem.sentence()}
          /> );
        wrapper.find('span').at(0).simulate('click');
        expect(wrapper.find('span').at(0).text()).to.equal('Hide')
    });
});