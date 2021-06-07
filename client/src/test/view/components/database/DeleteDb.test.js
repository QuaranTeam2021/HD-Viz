import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DeleteDb from '../../../../view/components/database/DeleteDb';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing DeleteDb component', () => {

    let wrapper;
    let onClick = jest.fn();

    beforeAll(() => {
        wrapper = mount(<DeleteDb onClickDelete={onClick} value={''}/>);
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

