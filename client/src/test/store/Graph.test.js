import {describe, expect, jest, test } from '@jest/globals';
import Graph from '../../store/Graph';

jest.mock('../../store/Graph'); // Graph is now a mock constructor

describe('Testing concrete method of abstract class Graph', () => {

    beforeEach(() => {
        Graph.mockClear();
    });

    describe('Testing setters methods', () => {

        test('Must set graphId', () => {
            const graph = new Graph();
            graph.graphId = 'testId';
            expect(graph.graphId).toEqual('testId');
        })

        test('Must set type', () => {
            const graph = new Graph();
            graph.type = 'Scatterplot';
            expect(graph.type).toEqual('Scatterplot');
        })

        test('Must set grouper', () => {
            const graph = new Graph();
            graph.grouper = 'Species';
            expect(graph.grouper).toEqual('Species');
        })
    })

    describe('Testing getters methods', () => {

        test('Must get graphId', () => {
            const graph = new Graph();
            graph.graphId = 'testId';
            const getterResult = graph.graphId;
            expect(getterResult).toEqual('testId');
        })

        test('Must get type', () => {
            const graph = new Graph();
            graph.type = 'Scatterplot';
            const getterResult = graph.type;
            expect(getterResult).toEqual('Scatterplot');
        })

        test('Must get grouper', () => {
            const graph = new Graph();
            graph.grouper = 'Species';
            const getterResult = graph.grouper;
            expect(getterResult).toEqual('Species');
        })
    })
})
