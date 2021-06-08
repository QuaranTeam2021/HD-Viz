import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonConfirm from '../../../../view/components/startUpOptions/ButtonConfirm';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing ButtonConfirm component', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<MemoryRouter><ButtonConfirm onClick={onClick} /></MemoryRouter>);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('ButtonConfirm must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onClick function', () => {
        expect(onClick).toBeCalledTimes(0);
        wrapper.find('button').simulate('click');
        expect(onClick).toBeCalledTimes(1);
    })
})

