import {describe, expect, jest, test } from '@jest/globals';
import Graph from '../../store/Graph';

jest.mock('../../store/Graph');

describe('Testing concrete method of abstract class Graph', () => {

    let graph;

    beforeEach(() => {
        Graph.mockClear();
        graph = new Graph();
    });

    describe('Testing setters methods', () => {

        test('Must set graphId', () => {
            graph.graphId = 'testId';
            expect(graph.graphId).toEqual('testId');
        })

        test('Must set type', () => {
            graph.type = 'Scatterplot';
            expect(graph.type).toEqual('Scatterplot');
        })

        test('Must set grouper', () => {
            graph.grouper = 'Species';
            expect(graph.grouper).toEqual('Species');
        })

        test('Must set selectedFeatures', () => {
            graph.selectedFeatures = ['sepalLength', 'species'];
            expect(graph.selectedFeatures).toEqual(['sepalLength', 'species']);
        })
    })

    describe('Testing getters methods', () => {

        test('Must get graphId', () => {
            graph.graphId = 'testId';
            const getterResult = graph.graphId;
            expect(getterResult).toEqual('testId');
        })

        test('Must get type', () => {
            graph.type = 'Scatterplot';
            const getterResult = graph.type;
            expect(getterResult).toEqual('Scatterplot');
        })

        test('Must get grouper', () => {
            graph.grouper = 'Species';
            const getterResult = graph.grouper;
            expect(getterResult).toEqual('Species');
        })

        test('Must get selectedFeatures', () => {
            graph.selectedFeatures = ['sepalLength', 'species'];
            const getterResult = graph.selectedFeatures;
            expect(getterResult).toEqual(['sepalLength', 'species']);
        })
    })
})
