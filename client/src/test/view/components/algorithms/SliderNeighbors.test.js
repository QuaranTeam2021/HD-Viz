import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import SliderNeighbors from '../../../../view/components/algorithms/SliderNeighbors';

describe('Testing SliderNeighbors component', () => {

    let wrapper;
    let onChange = jest.fn();
    let neighbors = '';

    beforeAll(() => {
        wrapper = shallow(<SliderNeighbors neighbours={neighbors} onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SliderNeighbors must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

