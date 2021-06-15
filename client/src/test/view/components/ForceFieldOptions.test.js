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
    const setState = jest.fn();	

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = shallow(<ForceFieldOptions position={position} graphViz={graphViz} buttonRef={buttonRef} currentOptions={currentOptions} setCurrentOptions={setCurrentOptions} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes four Typography', () => {
        expect(wrapper.find(Typography).length).toEqual(3);
    })

    test('Includes four Slider', () => {
        expect(wrapper.find(Slider).length).toEqual(3);
    })

    test('onChangeDistanceMax must work correctly', () => {
        const onChangeDistanceMax = wrapper.find(Slider).first()
            .prop('onChange');
        expect(setState).not.toBeCalled();
        onChangeDistanceMax({}, 10);
        expect(setState).toBeCalled();
    })

    test('onChangeDistanceMin must work correctly', () => {
        const onChangeDistanceMin = wrapper.find(Slider).at(1)
            .prop('onChange');
        expect(setState).not.toBeCalled();
        onChangeDistanceMin({}, 10);
        expect(setState).toBeCalled();
    })

    test('onChangeThreshold must work correctly', () => {
        const onChangeThreshold = wrapper.find(Slider).at(2)
            .prop('onChange');
        expect(setState).not.toBeCalled();
        onChangeThreshold({}, 10);
        expect(setState).toBeCalled();
    })

    test('onChangeStrength must work correctly', () => {
        const onChangeStrength = wrapper.find(Slider).last()
            .prop('onChange');
        expect(setState).not.toBeCalled();
        onChangeStrength({}, 10);
        expect(setState).toBeCalled();
    })
})

