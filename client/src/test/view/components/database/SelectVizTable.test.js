import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import React from 'react';
import SelectVizTable from '../../../../view/components/database/SelectVizTable';
import { shallow } from 'enzyme';

describe('Testing SelectVizTable component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<SelectVizTable onChange={onChange} tables={['testTable1', 'testTable2']} selected={['testTable1']} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('SelectVizTable must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('SelectVizTable must call onChange', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('#tables-select').simulate('change', {target: { value: 'tab2'}});
        expect(onChange).toBeCalledTimes(1);
    })
})

