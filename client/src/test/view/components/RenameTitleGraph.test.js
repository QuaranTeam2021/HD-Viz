import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import DoneIcon from '@material-ui/icons/Done';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import React from 'react';
import RenameTitleGraph from '../../../view/components/RenameTitleGraph';
import { shallow } from 'enzyme';


describe('Testing RenameTitleGraph component', () => {

	let wrapper;
    let setTitle = jest.fn();

    beforeAll(() => {
        wrapper = shallow(<RenameTitleGraph title={''} setTitle={setTitle} />);
    })

    afterAll(() => {
        wrapper.unmount();
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
})

