import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import HeatmapOptions from '../../../view/components/HeatmapOptions';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import React from 'react';
import Select from '@material-ui/core/Select';
import { shallow } from 'enzyme';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

describe('Testing HeatmapOptions component', () => {

    let wrapper;
    const position = '';
    const graphViz = ''; 
    const data = ''; 
    const buttonRef = '';
    const currentOptions = '';
    const setCurrentOptions = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<HeatmapOptions position={position} graphViz={graphViz} data={data} buttonRef={buttonRef} currentOptions={currentOptions} setCurrentOptions={setCurrentOptions} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one InputLabel', () => {
        expect(wrapper.find(InputLabel).length).toEqual(1);
    })

    test('Includes one Typography', () => {
        expect(wrapper.find(Typography).length).toEqual(2);
    })

    test('Includes one Slider', () => {
        expect(wrapper.find(Slider).length).toEqual(2);
    })

    test('Includes one Select', () => {
        expect(wrapper.find(Select).length).toEqual(1);
    })

    test('Includes one MenuItem', () => {
        expect(wrapper.find(MenuItem).length).toEqual(2);
    })
})

