import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
import TooltipDistColumns from '../../../../../view/components/startUpOptions/columns/TooltipDistColumns';

describe('Testing TooltipDistColumns component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = mount(<TooltipDistColumns />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('TooltipDistColumns must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

