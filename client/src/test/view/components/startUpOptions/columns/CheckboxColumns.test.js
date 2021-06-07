import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import CheckboxColumns from '../../../../../view/components/startUpOptions/columns/CheckboxColumns';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing CheckboxColumns component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<CheckboxColumns onChange={onChange} uploadedColumns={['col1', 'col2']} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('CheckboxColumns must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onClick function', () => {
        expect(onChange).toBeCalledTimes(0);
        wrapper.find('[value="col1"]').simulate('change', { target: { value: 'test' } });
        expect(onChange).toBeCalledTimes(1);
    })
})

