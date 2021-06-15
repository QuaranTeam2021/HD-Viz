import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Database, { parseName } from '../../../../view/components/database/Database';
import { mount, shallow } from 'enzyme';
import DeleteDb from '../../../../view/components/database/DeleteDb';
import React from 'react';
import TextFieldAddDb from '../../../../view/components/database/TextFieldAddDb';

describe('Testing Database component', () => {

    let wrapper;
    const setState = jest.fn();

    beforeAll(() => {
        jest.spyOn(console, 'log');
        global.fetch = jest.fn();
        jest.spyOn(console, 'error');
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
        let testFile = new File([''], 'testFile.csv', { type: 'text/csv' })
        expect(setState).not.toBeCalled();
        wrapper.find('Dataset').simulate('change', { target: { files: [testFile] } })
        expect(setState).toBeCalled();
    })

    test('Must onChangeName method', () => {
        const onChangeName = wrapper.find(TextFieldAddDb).prop('onChangeName');
        expect(setState).not.toBeCalled();
        onChangeName({ target: {value: 'testName'}})
        expect(setState).toBeCalled();
        setState.mockClear();
        onChangeName({ target: {value: 'testName.json'}})
        expect(setState).toBeCalled();
    })

    test('Must onBlurName method', () => {
        const onBlurName = wrapper.find(TextFieldAddDb).prop('onBlur');
        expect(setState).not.toBeCalled();
        onBlurName();
        expect(setState).toBeCalled();
    })

    test('Must onClickDs method', async () => {
        const onClickDs = wrapper.find(TextFieldAddDb).prop('onSubmit');
        const preventDefaultSpy = jest.fn();
        const event = {
            preventDefault: preventDefaultSpy
        }
        await onClickDs(event);
        expect(preventDefaultSpy).toBeCalledTimes(1);
    })

    test('Must onClickDelete method', async () => {
        jest.spyOn(React, 'useState').mockImplementationOnce(() => [['testTable'], setState])
        wrapper = mount(<Database />);
        const onClickDelete = wrapper.find(DeleteDb).prop('onClickDelete');
        expect(setState).not.toBeCalled();
        await onClickDelete('tableNameToDelete');
        expect(setState).toBeCalled();
    })
})

