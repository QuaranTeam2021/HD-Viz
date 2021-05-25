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

    test('Database must render', () => {
        expect(wrapper).not.toBeNull();
    })

    test('SelectVizColumns must call onChange', () => {
        let res = parseName('prova.csv');
        expect(res).toBe('prova');
    })
})

