import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import SelectColumns from '../../../../../view/components/startUpOptions/columns/SelectColumns';
import { shallow } from 'enzyme';

describe('Testing SelectColumns component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<SelectColumns onChange={onChange} uploadedColumns={['col1', 'col2']} selectedColumns={['col1']} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('CheckboxColumns must render', () => {
        expect(wrapper).not.toBeNull();
    })
})

