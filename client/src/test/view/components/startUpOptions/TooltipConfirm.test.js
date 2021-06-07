import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import { shallow } from 'enzyme';
import TooltipConfirm from '../../../../view/components/startUpOptions/TooltipConfirm';

describe('Testing TooltipConfirm component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<TooltipConfirm/>);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('TooltipConfirm must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

