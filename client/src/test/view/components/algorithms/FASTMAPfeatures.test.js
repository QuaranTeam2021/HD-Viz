import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import FASTMAPfeatures from '../../../../view/components/algorithms/FASTMAPfeatures';
import { mount } from 'enzyme';
import RadioDistance from '../../../../view/components/startUpOptions/RadioDistance';
import React from 'react';
import SliderSize from '../../../../view/components/algorithms/SliderSize';


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

    test('Includes one RadioDistance', () => {
      expect(wrapper.find(RadioDistance)).toHaveLength(1);
    })

    test('Includes one SliderSize', () => {
      expect(wrapper.find(SliderSize)).toHaveLength(1);
    })
})

