import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonConfirmDb from '../../../../view/components/database/ButtonConfirmDb';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ButtonConfirmDb component', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<ButtonConfirmDb onClick={onClick} disabled={false} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('ButtonConfirmDb must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onClick method', () => {
        wrapper.find('button').simulate('click');
        expect(onClick).toBeCalledTimes(1);
    })
})

