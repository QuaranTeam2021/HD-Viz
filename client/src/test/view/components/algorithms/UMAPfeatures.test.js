import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
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

    test('UMAPfeatures must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

