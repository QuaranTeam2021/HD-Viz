import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import RenameTitleGraph from '../../../view/components/RenameTitleGraph';
import { shallow } from 'enzyme';


describe('Testing RenameTitleGraph component', () => {

	let wrapper;
    const setTitle = jest.fn();
    let setState = jest.fn();	

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = shallow(<RenameTitleGraph title={''} setTitle={setTitle} />);
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

    test('Includes two fab', () => {
        expect(wrapper.find(Fab).length).toEqual(2);
    })

    test('Includes one DoneIcon', () => {
        expect(wrapper.find(DoneIcon).length).toEqual(1);
    })

    test('Includes one EditIcon', () => {
        expect(wrapper.find(EditIcon).length).toEqual(1);
    })

    test('handleEditing must work correctly', () => {
        Object.defineProperty(React, 'useState', {
            value: () => [{ editing: true }, setState]
        })
        wrapper = shallow(<RenameTitleGraph title={''} setTitle={setTitle} />);
        const handleEditing = wrapper.find(Fab).first()
            .prop('onClick');
        expect(setState).not.toBeCalled();
        handleEditing();
        expect(setState).toBeCalled();
    })

    test('handleChange must work correctly', () => {
        const handleChange = wrapper.find('input').prop('onChange');
        const event = { target: { value: '' } };
        expect(setState).not.toBeCalled();
        handleChange(event);
        expect(setState).toBeCalled();
    })

    test('handleEnterUpdate must work correctly', () => {
        const handleEnterUpdate = wrapper.find('input').prop('onKeyDown');
        const event = { key: 'Enter' };
        expect(setState).not.toBeCalled();
        handleEnterUpdate(event);
        expect(setState).toBeCalled();
    })

    test('handleUpdatedDone must work correctly', () => {
        const handleUpdatedDone = wrapper.find(Fab).last()
            .prop('onClick');
        expect(setState).not.toBeCalled();
        handleUpdatedDone();
        expect(setState).toBeCalled();
    })
})

