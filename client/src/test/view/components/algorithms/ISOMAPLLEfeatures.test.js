import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ISOMAPLLEfeatures from '../../../../view/components/algorithms/ISOMAPLLEfeatures';
import { mount } from 'enzyme';
import React from 'react';

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

    test('ISOMAPLLEfeatures must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

