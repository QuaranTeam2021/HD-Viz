import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import SliderEpsilon from '../../../../view/components/algorithms/SliderEpsilon';

describe('Testing SliderEpsilon component', () => {

    let wrapper;
    let onChange = jest.fn();
    let epsilon = '';

    beforeAll(() => {
        wrapper = shallow(<SliderEpsilon epsilon={epsilon} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SliderEpsilon must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

