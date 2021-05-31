import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
import TooltipVizColumns from '../../../../../view/components/startUpOptions/columns/TooltipVizColumns';

describe('Testing TooltipVizColumns component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = mount(<TooltipVizColumns />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('TooltipVizColumns must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

