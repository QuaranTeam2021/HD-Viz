import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ForceFieldOptions from '../../../view/components/ForceFieldOptions';
import React from 'react';
import { shallow } from 'enzyme';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

describe('Testing ForceFieldOptions component', () => {

    let wrapper;
    const position = '';
    const graphViz = ''; 
    const buttonRef = '';
    const currentOptions = '';
    const setCurrentOptions = jest.fn();


    beforeAll(() => {
        wrapper = shallow(<ForceFieldOptions position={position} graphViz={graphViz} buttonRef={buttonRef} currentOptions={currentOptions} setCurrentOptions={setCurrentOptions} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes four Typography', () => {
        expect(wrapper.find(Typography).length).toEqual(4);
    })

    test('Includes four Slider', () => {
        expect(wrapper.find(Slider).length).toEqual(4);
    })
})

