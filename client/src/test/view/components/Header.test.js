import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import Header from '../../../view/components/Header';
import React from 'react';
import { shallow } from 'enzyme';

describe("Header component tests", () => {

	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<Header />);
	})

	afterAll(() => {
		wrapper.unmount();
	})

	test("Testing render", () => {
		expect(wrapper).not.toBeNull();
	})

    test('Includes one header', () => {
        expect(wrapper.find('header')).toHaveLength(1);
    })
});