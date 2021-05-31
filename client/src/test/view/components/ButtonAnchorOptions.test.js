import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Button from '@material-ui/core/Button';
import ButtonAnchorOptions from '../../../view/components/ButtonAnchorOptions';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing ButtonAnchorOptions component', () => {

    let wrapper;
    const position = '';
    const setPosition = jest.fn();
    const optionProp = { optionsPosition: { 
        position, 
        setPosition 
    } }
    const setState = jest.fn();	

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = shallow(<ButtonAnchorOptions optionsPosition={optionProp} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one button', () => {
        expect(wrapper.find('WithStyles(ForwardRef(Button))').length).toEqual(1);
    })

    test('Includes one MenuList', () => {
        expect(wrapper.find('#anchor-options-menu').length).toEqual(1);
    })

    test('Includes four MenuItem', () => {
        expect(wrapper.find('WithStyles(ForwardRef(MenuItem))').length).toEqual(4);
    })

    test('handleToggle must work correctly', () => {
        const handleToggle = wrapper.find(Button).prop('onClick');
        expect(setState).not.toBeCalled();
        handleToggle();
        expect(setState).toBeCalled();
    })

    test('handleClose must work correctly', () => {
        const handleClose = wrapper.find('WithStyles(ForwardRef(MenuItem))').first()
            .prop('onClick');
        expect(setState).not.toBeCalled();
        handleClose({}, '');
        expect(setState).toBeCalled();
    })

    test('handleListKeyDown must work correctly', () => {
        const handleListKeyDown = wrapper.find('#anchor-options-menu').prop('onKeyDown');
        const preventDefaultSpy = jest.fn();
        const event = {
            key: 'Tab',
            preventDefault: preventDefaultSpy
        }
        expect(preventDefaultSpy).not.toBeCalled();
        expect(setState).not.toBeCalled();
        handleListKeyDown(event);
        expect(preventDefaultSpy).toBeCalled();
        expect(setState).toBeCalled();
    })
})

