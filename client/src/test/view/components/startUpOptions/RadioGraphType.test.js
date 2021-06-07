import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import RadioGraphType from '../../../../view/components/startUpOptions/RadioGraphType';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing RadioGraphType component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<RadioGraphType onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('RadioGraphType must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange function', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('ForwardRef(RadioGroup)').simulate('change', { target: { value: 'test'} });
        expect(onChange).toBeCalledTimes(1);
    })
})

