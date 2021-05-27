import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import RadioAlgorithm from '../../../../view/components/algorithms/RadioAlgorithm';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing RadioAlgorithm component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<RadioAlgorithm onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange function', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('ForwardRef(RadioGroup)').simulate('change', { target: { value: 'test'} });
        expect(onChange).toBeCalledTimes(1);
    })
})

