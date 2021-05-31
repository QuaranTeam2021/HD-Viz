import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import BuildGraph, { needsAlgorithm, needsDistance, selectedInsert } from '../../../view/components/BuildGraph';
import { mount, shallow } from 'enzyme';
import Insert from '../../../view/components/startUpOptions/chooseDataset/Insert';
import { MemoryRouter } from 'react-router-dom';
import ModalDb from '../../../view/components/database/ModalDb';
import RadioAlgorithm from '../../../view/components/algorithms/RadioAlgorithm';
import RadioDistance from '../../../view/components/startUpOptions/RadioDistance';
import RadioGraphType from '../../../view/components/startUpOptions/RadioGraphType';
import React from 'react';

describe("BuildGraph component tests", () => {

	let wrapper;
	let setState = jest.fn();
	const defineStore = jest.fn();

	beforeAll(() => {
		wrapper = mount(<MemoryRouter><BuildGraph defineStore={defineStore} /></MemoryRouter>);	
	})

	beforeEach(() => {
		jest.clearAllMocks();
	})

	afterAll(() => {
		wrapper.unmount();
		jest.restoreAllMocks();
	})

	test("Testing render", () => {
		expect(wrapper).not.toBeNull();
	})

	test('needsAlgorithm must work correctly', () => {
		expect(needsAlgorithm("scptMat")).toBe(true);
		expect(needsAlgorithm("malp")).toBe(true);
	})

	test('needsDistance must work correctly', () => {
		expect(needsDistance("htmp")).toBe(true);
		expect(needsDistance("frcfld")).toBe(true);
		expect(needsDistance("FASTMAP")).toBe(true);
		expect(needsDistance("ISOMAP")).toBe(true);
		expect(needsDistance("T-SNE")).toBe(true);
		expect(needsDistance("LLE")).toBe(true);
	})

	test('selectedInsert must work correctly', () => {
		const input = { name: 'testName'}
		expect(selectedInsert(input)).toBe(true);
		expect(selectedInsert('')).toBe(false);
	})
});