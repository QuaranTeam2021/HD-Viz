import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import Slider from '@material-ui/core/Slider';
import SliderEpsilon from '../../../../view/components/algorithms/SliderEpsilon';
import Typography from '@material-ui/core/Typography';

describe('Testing SliderEpsilon component', () => {

    let wrapper;
    let onChange = jest.fn();
    let epsilon = '';

    beforeAll(() => {
        wrapper = shallow(<SliderEpsilon epsilon={epsilon} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one Typography', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
    })

    test('Includes one Slider', () => {
        expect(wrapper.find(Slider)).toHaveLength(1);
    })
})

