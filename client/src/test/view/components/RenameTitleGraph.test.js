import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount, shallow } from 'enzyme';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import RenameTitleGraph from '../../../view/components/RenameTitleGraph';

describe('Testing RenameTitleGraph component', () => {

	let wrapper;
    const setTitle = jest.fn();
    let setState = jest.fn();	

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = mount(<RenameTitleGraph title={''} setTitle={setTitle} />);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        wrapper.unmount();
        jest.restoreAllMocks();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes one input', () => {
        expect(wrapper.find('input').length).toEqual(1);
    })

    test('Includes one EditIcon', () => {
        expect(wrapper.find(EditIcon).length).toEqual(1);
    })
})

