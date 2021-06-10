/* eslint-disable sort-keys */
import {describe, expect, test } from '@jest/globals';
import StandardGraph from '../../../store/Graph/StandardGraph';

describe('Testing StandardGraph class', () => {

    describe('Testing attribute to not be undefined', () => {
        
        test('graphId must not be undefined', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.graphId).not.toBeUndefined();
        })

        test('type must not be undefined ', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.type).not.toBeUndefined();
        })

        test('grouper must not be undefined', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.grouper).not.toBeUndefined();
        })

        test('Data must be type of DistanceData', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], [['prova1', 'prova2'], [34, 67]]);
            expect(graph.data).not.toBeUndefined();
        })
    })
        
    test('Must not be undefined', () => {
        const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
        expect(graph).not.toBeUndefined();
    })

    test('Must be instance of StandardGraph', () => {
        const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
        expect(graph).toBeInstanceOf(StandardGraph);
    })

    describe('Testing correct attributes value', () => {
        
        test('Must pass', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.graphId).toEqual('idTest');
        })

        test('Must pass', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.type).toEqual('forceField');
        })

        test('Must pass', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            expect(graph.grouper).toEqual('Species');
        })

        test('Must pass', () => {
            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"],
                [4.7, 3.2, 1.3, 0.2, "setosa"]
            ];
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toBeInstanceOf(Array);
        })

        test('Must pass', () => {
            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"]
            ];

            const result = [
                {
                  "sepalLength": 5.1,
                  "sepalWidth": 3.5,
                  "petalLength": 1.4,
                  "petalWidth": 0.2,
                  "species": "setosa"
                },
                {
                  "sepalLength": 4.9,
                  "sepalWidth": 3,
                  "petalLength": 1.4,
                  "petalWidth": 0.2,
                  "species": "setosa"
                }
            ];
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toEqual(result);
        })
    })

    describe('Testing setters methods', () => {

        const data = [
            ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
            [5.1, 3.5, 1.4, 0.2, "setosa"],
            [4.9, 3, 1.4, 0.2, "setosa"],
            [4.7, 3.2, 1.3, 0.2, "setosa"]
        ];

        const result = [
            {
              "sepalLength": 5.1,
              "sepalWidth": 3.5,
              "petalLength": 1.4,
              "petalWidth": 0.2,
              "species": "setosa"
            },
            {
              "sepalLength": 4.9,
              "sepalWidth": 3,
              "petalLength": 1.4,
              "petalWidth": 0.2,
              "species": "setosa"
            },
            {
              "sepalLength": 4.7,
              "sepalWidth": 3.2,
              "petalLength": 1.3,
              "petalWidth": 0.2,
              "species": "setosa"
            }
        ];

        test('Must set data attribute correctly', () => {            
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            graph.data = data;
            expect(graph.data).toEqual(result);
        })

        test('Data must not be undefined', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            graph.data = data;
            expect(graph.data).not.toBeUndefined();
        })

        test('Data must be instance of DistanceData', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], []);
            graph.data = data;
            expect(graph.data).toBeInstanceOf(Array);
        })
    })

    describe('Testing getters methods', () => {

        const data = [
            ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
            [5.1, 3.5, 1.4, 0.2, "setosa"],
            [4.9, 3, 1.4, 0.2, "setosa"],
            [4.7, 3.2, 1.3, 0.2, "setosa"]
        ];

        const result = [
            {
              "sepalLength": 5.1,
              "sepalWidth": 3.5,
              "petalLength": 1.4,
              "petalWidth": 0.2,
              "species": "setosa"
            },
            {
              "sepalLength": 4.9,
              "sepalWidth": 3,
              "petalLength": 1.4,
              "petalWidth": 0.2,
              "species": "setosa"
            },
            {
              "sepalLength": 4.7,
              "sepalWidth": 3.2,
              "petalLength": 1.3,
              "petalWidth": 0.2,
              "species": "setosa"
            }
        ];

        test('Must return data attribute correctly', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toEqual(result);
        })

        test('Data must not be undefined', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).not.toBeUndefined();
        })

        test('Data must be instance of DistanceData', () => {
            const graph = new StandardGraph('idTest', 'forceField', 'Species', ['sepalLength', 'species'], data);
            expect(graph.data).toBeInstanceOf(Array);
        })
    })
})