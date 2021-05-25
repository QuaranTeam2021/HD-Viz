import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonAddDb from '../../../../view/components/database/ButtonAddDb';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ButtonAddDb', () => {

    let wrapper;
    let onChange = jest.fn();

    beforeAll(() => {
        wrapper = mount(<ButtonAddDb onChange={onChange} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('ButtonAddDb must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange method', () => {
        const testFile = new File([['prova'], [5.1]], 'testFile.csv', { type: 'text/csv' });
        const buttonFile = wrapper.find('#contained-button-file');
        buttonFile.simulate('change', { target: { file: [testFile] } })
        expect(onChange).toBeCalledTimes(1);
    })
})

