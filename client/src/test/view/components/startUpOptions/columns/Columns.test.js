import * as Store from '../../../../../store/Store';
import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Columns from '../../../../../view/components/startUpOptions/columns/Columns';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing Columns component', () => {

    let wrapper;
    let onChangeUploaded = jest.fn();
    let onChangeGrouper = jest.fn();

    beforeAll(() => {
        jest.spyOn(Store, 'useStore').mockImplementation(() => {
            return {
                getNumericFeatures: jest.fn(),
                getStringFeatures: jest.fn()
            }
        });
        jest.spyOn(React, "useState").mockImplementation(val => [val, jest.fn()]);
        wrapper = mount(<Columns onChangeUploaded={onChangeUploaded} onChangeGrouper={onChangeGrouper} />);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        wrapper.unmount();
        jest.restoreAllMocks();
    })

    test('Columns must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

