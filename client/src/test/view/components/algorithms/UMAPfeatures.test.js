import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
import SliderNeighbors from '../../../../view/components/algorithms/SliderNeighbors';
import SliderSize from '../../../../view/components/algorithms/SliderSize';
import UMAPfeatures from '../../../../view/components/algorithms/UMAPfeatures';

describe('Testing UMAPfeatures component', () => {

    let wrapper;
    let onChangeSize = jest.fn();
    let onChangeNeighbours = jest.fn();
    let size = '';
    let neighbours = '';

    beforeAll(() => {
        wrapper = mount(<UMAPfeatures attributes={{
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
})

