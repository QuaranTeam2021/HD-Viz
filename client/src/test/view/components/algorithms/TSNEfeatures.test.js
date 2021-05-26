import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
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

    test('TSNEfeatures must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

