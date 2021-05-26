import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import SliderSize from '../../../../view/components/algorithms/SliderSize';

describe('Testing SliderSize component', () => {

    let wrapper;
    let onChange = jest.fn();
    let size = '';

    beforeAll(() => {
        wrapper = shallow(<SliderSize size={size} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SliderSize must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

