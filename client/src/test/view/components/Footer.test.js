import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import Footer from '../../../view/components/Footer';
import React from 'react';
import { shallow } from 'enzyme';

describe("Footer component tests", () => {

	let wrapper;

	beforeAll(() => {
		wrapper = shallow(<Footer />);
	})

	afterAll(() => {
		wrapper.unmount();
	})

	test("Testing render", () => {
		expect(wrapper).not.toBeNull();
	})

    test('Includes one footer', () => {
        expect(wrapper.find('footer')).toHaveLength(1);
    })
});