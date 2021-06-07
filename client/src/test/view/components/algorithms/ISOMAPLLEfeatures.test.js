import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ISOMAPLLEfeatures from '../../../../view/components/algorithms/ISOMAPLLEfeatures';
import { mount } from 'enzyme';
import RadioDistance from '../../../../view/components/startUpOptions/RadioDistance';
import React from 'react';
import SliderNeighbors from '../../../../view/components/algorithms/SliderNeighbors';
import SliderSize from '../../../../view/components/algorithms/SliderSize';


describe('Testing ISOMAPLLEfeatures component', () => {

    let wrapper;
    let onChangeDistanza = jest.fn();
    let onChangeSize = jest.fn();
    let onChangeNeighbours = jest.fn();
    let size = '';
    let distanza = '';
    let neighbours = '';

    beforeAll(() => {
        wrapper = mount(<ISOMAPLLEfeatures attributes={{
            d: {
              distanza,
              onChangeDistanza
            },
            n: {
              neighbours,
              onChangeNeighbours
            },
            s: {
              onChangeSize,
              size
            }
          }} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one SliderSize', () => {
      expect(wrapper.find(SliderSize)).toHaveLength(1);
    })

    test('Includes one SliderNeighbors', () => {
      expect(wrapper.find(SliderNeighbors)).toHaveLength(1);
    })

    test('Includes one RadioDistance', () => {
      expect(wrapper.find(RadioDistance)).toHaveLength(1);
    })
})

