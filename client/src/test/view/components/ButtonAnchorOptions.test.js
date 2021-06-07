import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonAnchorOptions from '../../../view/components/ButtonAnchorOptions';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing ButtonAnchorOptions component', () => {

    let wrapper;
    let position = '';
    let setPosition = jest.fn();
    let optionProp = { optionsPosition: { 
        position, 
        setPosition 
    } }

    beforeAll(() => {
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
})

