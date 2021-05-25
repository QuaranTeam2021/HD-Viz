import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DbButton from '../../../../view/components/database/DbButton';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing DbButton component', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<DbButton onClick={onClick} disabled={false} />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('DbButton must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Must call onClick method', () => {
        wrapper.find('button').simulate('click');
        expect(onClick).toBeCalledTimes(1);
    })
})

