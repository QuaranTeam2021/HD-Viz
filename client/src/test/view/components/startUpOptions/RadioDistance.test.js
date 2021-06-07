import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import RadioDistance from '../../../../view/components/startUpOptions/RadioDistance';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing RadioDistance component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<RadioDistance distanza={''} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('RadioDistance must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange function', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('ForwardRef(RadioGroup)').simulate('change', { target: { value: 'test'} });
        expect(onChange).toBeCalledTimes(1);
    })
})

