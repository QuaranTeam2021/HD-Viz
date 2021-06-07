import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import Slider from '@material-ui/core/Slider';
import SliderPerplexity from '../../../../view/components/algorithms/SliderPerplexity';
import Typography from '@material-ui/core/Typography';

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

    test('Includes one Typography', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
    })

    test('Includes one Slider', () => {
        expect(wrapper.find(Slider)).toHaveLength(1);
    })
})

