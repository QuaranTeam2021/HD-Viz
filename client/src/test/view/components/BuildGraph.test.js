import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import { mount, render, shallow } from 'enzyme';
import React, { useRef } from 'react';
import { act } from 'react-dom/test-utils';
import BuildGraph from '../../../view/components/BuildGraph';
import { MemoryRouter } from 'react-router-dom';

describe("BuildGraph component tests", () => {

	let wrapper;
	let component;

	beforeAll(() => {
		const defineStore = jest.fn();
		// eslint-disable-next-line no-extra-parens
		wrapper = shallow(<MemoryRouter><BuildGraph/></MemoryRouter>);	
	})

	afterAll(() => {
		wrapper.unmount();
	})

	test("Testing render", () => {
		expect(wrapper).not.toBeNull();
	})
});