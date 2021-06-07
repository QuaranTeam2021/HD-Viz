import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import CloseIcon from '@material-ui/icons/Close';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import RenameAxis from '../../../view/components/RenameAxis';
import { shallow } from 'enzyme';

describe('Testing RenameAxis component', () => {

    let wrapper;
    let props = {
        asse: '',
        color1: '',
        color2: '',
        color3: ''
    }

    beforeAll(() => {
        wrapper = shallow(<RenameAxis props={props} />);
    })

    afterAll(() => {
        wrapper.unmount();
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
})

