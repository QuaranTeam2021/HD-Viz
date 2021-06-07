import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import ChangeDistance from '../../../view/components/ChangeDistance';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing ChangeDistance component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = shallow(<ChangeDistance />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('ChangeDistance must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

