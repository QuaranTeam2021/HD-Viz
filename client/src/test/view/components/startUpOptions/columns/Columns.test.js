import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Columns from '../../../../../view/components/startUpOptions/columns/Columns';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing Columns component', () => {

    let wrapper;
    let onChangeUploaded = jest.fn();
    let onChangeGrouper = jest.fn();

    beforeAll(() => {
        wrapper = mount(<Columns onChangeUploaded={onChangeUploaded} onChangeGrouper={onChangeGrouper} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Columns must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

