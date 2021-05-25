import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount } from 'enzyme';
import React from 'react';
import TextFieldAddDb from '../../../../view/components/database/TextFieldAddDb';

describe('Testing TextFieldAddDb component', () => {

    let wrapper;
    let textField;
    let onChangeName = jest.fn(); 
    let onBlur = jest.fn();

    beforeAll(() => {
        wrapper = mount(<TextFieldAddDb onChangeName={onChangeName} onSubmit={jest.fn()} onBlur={onBlur} nameDs={'testName'} fileName={'testFileName.csv'} disabled={false} error={[]} />);
        textField = wrapper.find('input');
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('DbButton must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange method', () => {
        textField.simulate('change', { value: 'hello' });
        expect(onChangeName).toBeCalledTimes(1);
    })

    test('Must call onBlur method', () => {
        textField.simulate('blur');
        expect(onBlur).toBeCalledTimes(1);
    })
})

