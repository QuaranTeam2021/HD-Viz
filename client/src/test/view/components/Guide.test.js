import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import ButtonCloseModal from '../../../view/components/database/ButtonCloseModalDb';
import Guide from '../../../view/components/Guide';
import React from 'react';
import { shallow } from 'enzyme';

describe('Testing Guide component', () => {

    let wrapper;
    const setState = jest.fn();

    beforeAll(() => {
        jest.spyOn(React, "useState").mockImplementation(val => [val, setState]);
        wrapper = shallow(<Guide />);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        jest.restoreAllMocks();
        wrapper.unmount();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('openModal must work correctly', () => {
        expect(setState).not.toBeCalled();
        wrapper.find('button').simulate('click');
        expect(setState).toBeCalled();
    })

    test('closeModal must work correctly', () => {
        expect(setState).not.toBeCalled();
        wrapper.find(ButtonCloseModal).simulate('click');
        expect(setState).toBeCalled();
    })
})

