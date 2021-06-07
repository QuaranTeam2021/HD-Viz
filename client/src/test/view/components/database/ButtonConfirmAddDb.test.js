import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonConfirmAddDb from '../../../../view/components/database/ButtonConfirmAddDb';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ButtonConfirmAddDb component', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<ButtonConfirmAddDb onClick={onClick} disabled={false} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Include one button', () => {
        expect(wrapper.find('button')).toHaveLength(1);
    })

    test('Must call onClick method', () => {
        wrapper.find('button').simulate('click');
        expect(onClick).toBeCalledTimes(1);
    })
})

