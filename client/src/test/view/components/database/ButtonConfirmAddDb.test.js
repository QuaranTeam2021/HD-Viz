import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonConfirmAddDb from '../../../../view/components/database/ButtonConfirmAddDb';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ButtonConfirmAddDb', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<ButtonConfirmAddDb onClick={onClick} disabled={jest.fn()} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('ButtonAddDb must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onChange method', () => {
        wrapper.find('ColorButton').simulate('click');
        expect(onClick).toBeCalledTimes(1);
    })
})

