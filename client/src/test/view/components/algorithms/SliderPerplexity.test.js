import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import SliderPerplexity from '../../../../view/components/algorithms/SliderPerplexity';

describe('Testing SliderPerplexity component', () => {

    let wrapper;
    let onChange = jest.fn();
    let perplexity = '';

    beforeAll(() => {
        wrapper = shallow(<SliderPerplexity perplexity={perplexity} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SliderPerplexity must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

