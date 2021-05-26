import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import FASTMAPfeatures from '../../../../view/components/algorithms/FASTMAPfeatures';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing FASTMAPfeatures component', () => {

    let wrapper;
    let onChangeDistanza = jest.fn();
    let onChangeSize = jest.fn();
    let size = '';
    let distanza = '';

    beforeAll(() => {
        wrapper = mount(<FASTMAPfeatures attributes={{
            d: {
              distanza,
              onChangeDistanza
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

    test('FASTMAPfeatures must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

