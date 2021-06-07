import {describe, expect, test } from '@jest/globals';
import DistanceBasedGraph from '../../../store/Graph/DistanceBasedGraph';
import DistanceData from '../../../store/Store';

describe('Testing DistanceBasedGraph class', () => {

    describe('Testing attribute to not be undefined', () => {
        
        test('graphId must not be undefined', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.graphId).not.toBeUndefined();
        })

        test('type must not be undefined ', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.type).not.toBeUndefined();
        })

        test('grouper must not be undefined', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.grouper).not.toBeUndefined();
        })

        test('Data must be type of DistanceData', () => {
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).not.toBeUndefined();
        })
    })
        
    test('Must not be undefined', () => {
        const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
        expect(graph).not.toBeUndefined();
    })

    test('Must be instance of DistanceBasedGraph', () => {
        const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
        expect(graph).toBeInstanceOf(DistanceBasedGraph);
    })

    describe('Testing correct attributes value', () => {
        
        test('Must pass', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.graphId).toEqual('idTest');
        })

        test('Must pass', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.type).toEqual('forceField');
        })

        test('Must pass', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.grouper).toEqual('Species');
        })

        test('Must pass', () => {
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toBeInstanceOf(DistanceData);
        })

        test('Must pass', () => {
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toEqual(data);
        })
    })

    describe('Testing setters methods', () => {

        test('Must set data attribute correctly', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            graph.data = data;
            expect(graph.data).toEqual(data);
        })

        test('Data must not be undefined', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            graph.data = data;
            expect(graph.data).not.toBeUndefined();
        })

        test('Data must be instance of DistanceData', () => {
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            graph.data = data;
            expect(graph.data).toBeInstanceOf(DistanceData);
        })
    })

    describe('Testing getters methods', () => {

        test('Must return data attribute correctly', () => {
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toEqual(data);
        })

        test('Data must not be undefined', () => {
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).not.toBeUndefined();
        })

        test('Data must be instance of DistanceData', () => {
            const data = new DistanceData(['nodo1', 'nodo2', 'nodo3'], ['link1', 'link2', 'link3']);
            const graph = new DistanceBasedGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toBeInstanceOf(DistanceData);
        })
    })
})