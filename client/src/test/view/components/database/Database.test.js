import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Database, { parseName } from '../../../../view/components/database/Database';
import React from 'react';
import { shallow } from 'enzyme';
import TextFieldAddDb from '../../../../view/components/database/TextFieldAddDb';


describe('Testing Database component', () => {

    let wrapper;
    const setState = jest.fn();

    beforeAll(() => {
        Object.defineProperty(React, 'useState', {
            value: val => [val, setState]
        })
        wrapper = shallow(<Database />);
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

    test('SelectVizColumns must call onChange', () => {
        let res = parseName('prova.csv');
        expect(res).toBe('prova');
    })

    test('Must onChangeInsertDs method', () => {
        const testFile = new File([''], 'testFile.csv', { type: 'text/csv' })
        wrapper.find('Dataset').simulate('change', { target: { files: [testFile] } })
        expect(setState).toBeCalledTimes(4);
    })

    test('Must onChangeName method', () => {
        const onChangeName = wrapper.find(TextFieldAddDb).prop('onChangeName');
        onChangeName({ target: {value: 'testName'}})
        expect(setState).toBeCalledTimes(3);
        setState.mockClear();
        onChangeName({ target: {value: 'testName.json'}})
        expect(setState).toBeCalledTimes(1);
    })

    test('Must onBlurName method', () => {
        const onBlurName = wrapper.find(TextFieldAddDb).prop('onBlur');
        onBlurName();
        expect(setState).toBeCalledTimes(2);
    })
})

