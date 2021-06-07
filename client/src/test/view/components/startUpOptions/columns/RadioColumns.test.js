import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount } from 'enzyme';
import RadioColumns from '../../../../../view/components/startUpOptions/columns/RadioColumns';
import React from 'react';

describe('Testing RadioColumns component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = mount(<RadioColumns onChange={onChange} grouperColumns={['test']} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('RadioColumns must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

