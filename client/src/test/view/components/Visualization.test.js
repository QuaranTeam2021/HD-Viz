import * as forceDir from '../../../view/chart/forceDirected';
import * as htMp from '../../../view/chart/heatmap';
import * as linProj from '../../../view/chart/linearProjection';
import * as scptMat from '../../../view/chart/scptMatrix';
import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Visualization, { switchArguments, switchGraph } from '../../../view/components/Visualization';
import DistanceBasedGraph from '../../../store/Graph/DistanceBasedGraph';
import GraphContainer from '../../../view/components/GraphContainer';
import React from 'react';
import { shallow } from 'enzyme';
import StandardGraph from '../../../store/Graph/StandardGraph';
import Store from '../../../store/Store';

describe('Testing Visualization component', () => {

	let wrapper;

    beforeAll(() => {
		const scptGraph = new StandardGraph('testId1', 'scptMat', 'species', ['sepalLength', 'sepalWidth'], [['sepalLength', 'sepalWidth', 'species'], [5.1, 3.2, 'setosa']]);
		const malpGraph = new StandardGraph('testId2', 'malp', 'species', ['sepalLength', 'sepalWidth'], [['sepalLength', 'sepalWidth', 'species'], [5.1, 3.2, 'setosa']]);
		const heatGraph = new DistanceBasedGraph('testId3', 'htmp', 'species', ['sepalLength', 'sepalWidth'], [['sepalLength', 'sepalWidth', 'species'], [5.1, 3.2, 'setosa']]);
		const frcfldGraph = new DistanceBasedGraph('testId4', 'frcfld', 'species', ['sepalLength', 'sepalWidth'], [['sepalLength', 'sepalWidth', 'species'], [5.1, 3.2, 'setosa']]);
		const noneGraph = new DistanceBasedGraph('testId4', 'none', 'species', ['sepalLength', 'sepalWidth'], [['sepalLength', 'sepalWidth', 'species'], [5.1, 3.2, 'setosa']]);
		Object.defineProperty(Store, 'graphs', {
			get: jest.fn(() => [scptGraph, malpGraph, heatGraph, frcfldGraph, noneGraph])
		});
		jest.spyOn(console, 'log');
        wrapper = shallow(<Visualization />);
    })

    afterAll(() => {
        wrapper.unmount();
    })

    test('Renders correctly', () => {
        expect(wrapper).not.toBeNull();
    })

	test('Includes one GraphContainer', () => {
        expect(wrapper.find(GraphContainer).length).toEqual(5);
    })

	test('Must return correct graph type', () => {
		const { forceDirected } = forceDir;
		const { heatmap } = htMp;
		const { linearProjection } = linProj;
		const { scpMatrix } = scptMat;
		expect(switchGraph("scptMat")).toBe(scpMatrix);
		expect(switchGraph("malp")).toBe(linearProjection);
		expect(switchGraph("htmp")).toBe(heatmap);
		expect(switchGraph("frcfld")).toBe(forceDirected);
		expect(switchGraph("")).toBe(null);
	})

	test('Must return correct argument', () => {
		let testGraph = {
			data: [
				{
					sepalLength: 5.1,
					sepalWidth: 3.2,
					species: 'setosa'
				}
			],
			graphId: 'testId',
			grouper: 'testGrouper',
			type: 'scptMat'
		};
		expect(switchArguments(testGraph)).toEqual([
				[
					{ 
						sepalLength: 5.1, 
						sepalWidth: 3.2, 
						species: 'setosa' 
					}
				],
				['sepalLength', 'sepalWidth', 'species'],
				'testGrouper',
				'testId'
		]);
		testGraph.type = 'malp';
		expect(switchArguments(testGraph)).toEqual([
			[ 
				{ 
					sepalLength: 5.1, 
					sepalWidth: 3.2, 
					species: 'setosa' 
				}
			],
			['sepalLength', 'sepalWidth', 'species'],
			'testGrouper',
			'testId'
		])
		testGraph.type = "frcfld";
		expect(switchArguments(testGraph)).toEqual([
			[ 
				{ 
					sepalLength: 5.1, 
					sepalWidth: 3.2, 
					species: 'setosa' 
				} 
			],
			'testId'
		])
		testGraph.type = "htmp";
		expect(switchArguments(testGraph)).toEqual([
			[ 
				{ 
					sepalLength: 5.1, 
					sepalWidth: 3.2, 
					species: 'setosa' 
				}
			],
			'testId'
		])
		testGraph.type = null;
		expect(switchArguments(testGraph)).toEqual(null);
	})
})

