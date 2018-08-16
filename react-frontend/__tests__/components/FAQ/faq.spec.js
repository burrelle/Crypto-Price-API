import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import FAQ from '../../../src/components/FAQ/faq';
import Question from '../../../src/components/FAQ/question';

describe('FAQ Component', () => {
    test('Renders a question for each question in the FAQ component', () => {
        const wrapper = shallow(<FAQ />)
        expect(wrapper.find(Question)).to.have.length(7);
    });
});