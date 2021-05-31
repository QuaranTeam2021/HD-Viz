import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import RenameAxis from '../../../view/components/RenameAxis';
import { shallow } from 'enzyme';

describe('Testing RenameAxis component', () => {

    let wrapper;
    const props = {
        asse: '',
        color1: '',
        color2: '',
        color3: ''
    }
    const setState = jest.fn();	

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = shallow(<RenameAxis props={props} />);
    })

    beforeEach(() => {
        jest.clearAllMocks();
    })

    afterAll(() => {
        wrapper.unmount();
        jest.restoreAllMocks();
    })

    test('renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

    test('Includes three Fab', () => {
        expect(wrapper.find(Fab).length).toEqual(3);
    })

    test('Includes one EditIcon', () => {
        expect(wrapper.find(EditIcon).length).toEqual(1);
    })

    test('Includes one input text', () => {
        expect(wrapper.find('[type="text"]').length).toEqual(1);
    })

    test('Includes one CloseIcon', () => {
        expect(wrapper.find(CloseIcon).length).toEqual(1);
    })

    test('Includes one DoneIcon', () => {
        expect(wrapper.find(DoneIcon).length).toEqual(1);
    })

    test('handleEditing must work correctly', () => {
        Object.defineProperty(React, 'useState', {
            value: () => [{ editing: true }, setState]
        })
        wrapper = shallow(<RenameAxis props={props} />);
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
        expect(setState).toBeCalledTimes(2);
    })

    test('modifyTitleAxis must work correctly', () => {
        const modifyTitleAxis = wrapper.find(Fab).at(1)
            .prop('onClick');
        expect(setState).not.toBeCalled();
        modifyTitleAxis();
        expect(setState).toBeCalledTimes(2);
    })

    test('handleCloseEditing must work correctly', () => {
        const handleCloseEditing = wrapper.find(Fab).last()
            .prop('onClick');
        expect(setState).not.toBeCalled();
        handleCloseEditing();
        expect(setState).toBeCalled();
    })
})

