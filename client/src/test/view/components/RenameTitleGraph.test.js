import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import IconButton from '@material-ui/core/IconButton';
import { mount } from 'enzyme';
import React from 'react';
import RenameTitleGraph from '../../../view/components/RenameTitleGraph';
import TextField from '@material-ui/core/TextField';

describe('Testing RenameTitleGraph component', () => {

	let wrapper;
    const setTitle = jest.fn();
    const setState = jest.fn();	

    beforeAll(() => {
        jest.spyOn(React, "useState").mockImplementationOnce(() => [true, setState])
            .mockImplementation(val => [val, setState]);
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

    test('handleKeyDown must work correctly', () => {
        const handleKeyDown = wrapper.find(TextField).prop('onKeyDown');
        expect(setState).not.toBeCalled();
        handleKeyDown({ key: 'Escape' })
        expect(setState).toBeCalled();
        setState.mockClear();
        expect(setState).not.toBeCalled();
        handleKeyDown({ key: 'Enter' })
        expect(setState).toBeCalled();
    })

    test('onChangeTitle must work correctly', () => {
        const onChangeTitle = wrapper.find(TextField).prop('onChange');
        expect(setState).not.toBeCalled();
        onChangeTitle({ target: { value: '' }})
        expect(setState).toBeCalled();
        setState.mockClear();
        expect(setState).not.toBeCalled();
        onChangeTitle({ target: { value: ' prova/ ' }})
        expect(setState).toBeCalled();
    })

    test('onClickClose must work correctly', () => {
        const onClickClose = wrapper.find(IconButton).at(0)
            .prop('onClick');
        expect(setState).not.toBeCalled();
        onClickClose();
        expect(setState).toBeCalled();
    })

    test('onClickEditing must work correctly', () => {
        jest.spyOn(React, "useState").mockImplementationOnce(() => [false, setState])
            .mockImplementation(val => [val, setState]);
        wrapper = mount(<RenameTitleGraph title={''} setTitle={setTitle} />);
        const onClickEditing = wrapper.find(IconButton).prop('onClick');
        expect(setState).not.toBeCalled();
        onClickEditing();
        expect(setState).toBeCalled();
    })
})

