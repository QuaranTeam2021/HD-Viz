import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Database, { parseName } from '../../../../view/components/database/Database';
import { mount } from 'enzyme';
import React from 'react';

describe('Testing Database component', () => {

    let wrapper;

    beforeAll(() => {
        wrapper = mount(<Database />);
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

 /* da sistemare   test('onChangeInsertDs', () => {
        const testFile = new File([''], 'testFile.csv', { type: 'text/csv' })
        const setInsertDs = jest.fn();
        jest.spyOn(React, "useState").mockImplementation(v => [v, setInsertDs]);
        wrapper = mount(<Database />);
        wrapper.find('#dataset-button').simulate('change', { target: { files: [testFile] } });
        expect(setInsertDs).toBeCalledTimes(1);
    })*/
})

