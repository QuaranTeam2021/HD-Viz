import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import Select from '@material-ui/core/Select';
import SelectVizColumns from '../../../../view/components/database/SelectVizColumns';
import { shallow } from 'enzyme';

describe('Testing SelectVizColumns component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<SelectVizColumns onChange={onChange} columns={['col1', 'col2']} selectedColumns={['col1', 'col4']} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one Select', () => {
        expect(wrapper.find(Select)).toHaveLength(1);
    })

    test('SelectVizColumns must call onChange', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('#columns-select').simulate('change', {target: { value: 'tab2'}});
        expect(onChange).toBeCalledTimes(1);
    })

    test('SelectVizColumns must have correct number of chip', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('#columns-select').simulate('change', {target: { value: 'tab2'}});
        expect(onChange).toBeCalledTimes(1);
    })
})

