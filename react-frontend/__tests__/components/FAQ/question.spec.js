import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import Question from '../../../src/components/FAQ/question';
import faker from 'faker';

describe('FAQ Question Component', () => {
    test('renders a question and answer each of the question components', () => {
        const wrapper = shallow( <Question question={faker.lorem.sentence()} answer={faker.lorem.sentence()}/>);
        expect(wrapper.find('.text-lg')).to.have.length(1);
        expect(wrapper.find('.text-base')).to.have.length(1);
    });
});