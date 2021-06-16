import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Header from '../../../view/components/Header';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import React from 'react';

describe("Header component tests", () => {

	let wrapper;

	beforeAll(() => {
		wrapper = mount(<MemoryRouter><Header storeDefined={jest.fn()}/></MemoryRouter>);
	})

	beforeEach(() => {
		jest.clearAllMocks();
	})

	afterAll(() => {
		jest.resetAllMocks();
		wrapper.unmount();
	})

	test("Testing render", () => {
		expect(wrapper).not.toBeNull();
	})

    test('Includes one header', () => {
        expect(wrapper.find('header')).toHaveLength(1);
    })
});