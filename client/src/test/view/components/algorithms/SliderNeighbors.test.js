import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import Slider from '@material-ui/core/Slider';
import SliderNeighbors from '../../../../view/components/algorithms/SliderNeighbors';
import Typography from '@material-ui/core/Typography';

describe('Testing SliderNeighbors component', () => {

    let wrapper;
    let onChange = jest.fn();
    let neighbors = '';

    beforeAll(() => {
        wrapper = shallow(<SliderNeighbors neighbours={neighbors} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SliderNeighbors must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one Typography', () => {
        expect(wrapper.find(Typography)).toHaveLength(1);
    })

    test('Includes one Slider', () => {
        expect(wrapper.find(Slider)).toHaveLength(1);
    })
})

