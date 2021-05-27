import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import Slider from '@material-ui/core/Slider';
import SliderSize from '../../../../view/components/algorithms/SliderSize';
import Typography from '@material-ui/core/Typography';

describe('Testing SliderSize component', () => {

    let wrapper;
    let onChange = jest.fn();
    let size = '';

    beforeAll(() => {
        wrapper = shallow(<SliderSize size={size} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SliderSize must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one Typography', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
    })

    test('Includes one Slider', () => {
        expect(wrapper.find(Slider)).toHaveLength(1);
    })
})

