import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
import SliderEpsilon from '../../../../view/components/algorithms/SliderEpsilon';
import SliderNeighbors from '../../../../view/components/algorithms/SliderNeighbors';
import SliderPerplexity from '../../../../view/components/algorithms/SliderPerplexity';
import SliderSize from '../../../../view/components/algorithms/SliderSize';
import TSNEfeatures from '../../../../view/components/algorithms/TSNEfeatures';

describe('Testing TSNEfeatures component', () => {

    let wrapper;
    let onChangeDistanza = jest.fn();
    let onChangeSize = jest.fn();
    let onChangeNeighbours = jest.fn();
    let onChangeEpsilon = jest.fn();
    let onChangePerplexity = jest.fn();

    let size = '';
    let distanza = '';
    let neighbours = '';
    let epsilon = '';
    let perplexity = '';

    beforeAll(() => {
        wrapper = mount(<TSNEfeatures attributes={{
            d: {
              distanza,
              onChangeDistanza
            },
            e: {
              epsilon,
              onChangeEpsilon
            },
            n: {
              neighbours,
              onChangeNeighbours
            },
            p: {
              onChangePerplexity,
              perplexity
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

    test('Includes SliderNeighbors', () => {
      expect(wrapper.find(SliderNeighbors)).toHaveLength(1);
    })

    test('Includes SliderEpsilon', () => {
      expect(wrapper.find(SliderEpsilon)).toHaveLength(1);
    })

    test('Includes SliderPerplexity', () => {
      expect(wrapper.find(SliderPerplexity)).toHaveLength(1);
    })

    test('Includes SliderSize', () => {
      expect(wrapper.find(SliderSize)).toHaveLength(1);
    })
})

