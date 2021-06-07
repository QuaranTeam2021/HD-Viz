import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonAddDb from '../../../../view/components/database/ButtonAddDb';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing ButtonAddDb component', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<ButtonAddDb onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one input', () => {
        expect(wrapper.find('input')).toHaveLength(1);
    })

    test('Includes one IconButton', () => {
        expect(wrapper.find(IconButton)).toHaveLength(1);
    })

    test('Must call onChange method', () => {
        const testFile = new File([['prova'], [5.1]], 'testFile.csv', { type: 'text/csv' });
        const buttonFile = wrapper.find('#dataset-button');
        buttonFile.simulate('change', { target: { file: [testFile] } })
        expect(onChange).toBeCalledTimes(1);
    })
})

