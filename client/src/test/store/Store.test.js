/* eslint-disable max-lines */
import { describe, expect, test } from '@jest/globals';
import Data from '../../store/Data';
import StandardGraph from '../../store/Graph/StandardGraph';
import Store from '../../store/Store';

describe('Testing Store class', () => {

    describe('Testing constructors', () => {

        test('Must not be undefined', () => {
            const store = new Store();
            expect(store).not.toBeUndefined();
        })

        test('Must be a Store instance', () => {
            const store = new Store();
            expect(store).toBeInstanceOf(Store);
        })

        test('originalData must be type of Data', () => {
            const store = new Store();
            expect(store.originalData).toBeInstanceOf(Data);
        })

        test('originalData must not undefined', () => {
            const store = new Store();
            expect(store.originalData).not.toBeUndefined();
        })

        test('graphs must be type of Array', () => {
            const store = new Store();
            expect(store.graphs).toBeInstanceOf(Array);
        })

        test('graphs must not undefined', () => {
            const store = new Store();
            expect(store.graphs).not.toBeUndefined();
        })

        test('features must not undefined', () => {
            const store = new Store();
            expect(store.features).not.toBeUndefined();
        })
    })

    describe('Testing setters methods', () => {

        describe('Testing set originalData', () => {

            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"],
                [4.7, 3.2, 1.3, 0.2, "setosa"]
            ];
            
            test('original data must not be undefined', () => {
                const store = new Store();
                store.originalData = data;
                expect(store.originalData).not.toBeUndefined();
            })

            test('originalData must be instance of Data', () => {
                const store = new Store();
                store.originalData = data;
                expect(store.originalData).toBeInstanceOf(Data)
            })

            test('originalData must not be empty', () => {
                const store = new Store();
                store.originalData = data;
                expect(store.originalData).not.toEqual(new Data([]));
            })

            test('originalData must have correct value', () => {
                const store = new Store();
                store.originalData = data;
                expect(store.originalData).toEqual(new Data(data));
            })
        })

        describe('Testing set graphs', () => {
            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"],
                [4.7, 3.2, 1.3, 0.2, "setosa"]
            ];
            const graph1 = new StandardGraph('id1', 'scpt', 'Species', data);
            const graph2 = new StandardGraph('id2', 'malp', 'Species', data);
            const graphs = [graph1, graph2];

            test('graphs must not be undefined', () => {
                const store = new Store();
                store.graphs = graphs;
                expect(store.graphs).not.toBeUndefined();
            })

            test('graphs must be instance of Array', () => {
                const store = new Store();
                store.graphs = graphs;
                expect(store.graphs).toBeInstanceOf(Array)
            })

            test('graphs must not be empty', () => {
                const store = new Store();
                store.graphs = graphs;
                expect(store.graphs).not.toEqual([]);
            })

            test('graphs must have correct value', () => {
                const store = new Store();
                store.graphs = graphs;
                expect(store.graphs).toEqual(graphs);
            })
        })

        
        describe('Testing set features', () => {
            const features = new Map();
            features.set('sepalLength', 'number');
            features.set('sepalWidth', 'number');
            features.set('species', 'string');
            
            test('features data must not be undefined', () => {
                const store = new Store();
                store.features = features;
                expect(store.features).not.toBeUndefined();
            })

            test('originalData must not be empty', () => {
                const store = new Store();
                store.features = features;
                const maptest = new Map();
                expect(store.features).not.toEqual(maptest);
            })

    /*        test('originalData must have correct value', () => {
                const store = new Store();
                store.features = features;
                expect(store.features).toEqual(features);
            })*/
        })
    })

    describe('Testing getters methods', () => {
        
        describe('Testing get originalData', () => {

            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"],
                [4.7, 3.2, 1.3, 0.2, "setosa"]
            ];
            
            test('original data must not be undefined', () => {
                const store = new Store();
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).not.toBeUndefined();
            })

            test('originalData must be instance of Data', () => {
                const store = new Store();
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).toBeInstanceOf(Data)
            })

            test('originalData must not be empty', () => {
                const store = new Store();
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).not.toEqual(new Data([]));
            })

            test('originalData must have correct value', () => {
                const store = new Store();
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).toEqual(new Data(data));
            })
        })

        describe('Testing get graphs', () => {
            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"],
                [4.7, 3.2, 1.3, 0.2, "setosa"]
            ];
            const graph1 = new StandardGraph('id1', 'scpt', 'Species', data);
            const graph2 = new StandardGraph('id2', 'malp', 'Species', data);
            const graphs = [graph1, graph2];

            test('graphs must not be undefined', () => {
                const store = new Store();
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).not.toBeUndefined();
            })

            test('graphs must be instance of Array', () => {
                const store = new Store();
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).toBeInstanceOf(Array)
            })

            test('graphs must not be empty', () => {
                const store = new Store();
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).not.toEqual([]);
            })

            test('graphs must have correct value', () => {
                const store = new Store();
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).toEqual(graphs);
            })
        })

        describe('Testing get features', () => {
            const features = new Map();
            features.set('sepalLength', 'number');
            features.set('sepalWidth', 'number');
            features.set('species', 'string');
            
            test('features data must not be undefined', () => {
                const store = new Store();
                store.features = features;
                const getterResult = store.features;
                expect(getterResult).not.toBeUndefined();
            })

            test('features must not be empty', () => {
                const store = new Store();
                store.features = features;
                const maptest = new Map();
                const getterResult = store.features;
                expect(getterResult).not.toEqual(maptest);
            })

/*            test('features must have correct value', () => {
                const store = new Store();
                store.features = features;
                const getterResult = store.features;
                expect(getterResult).toMatchObject([["sepalLength", "number"], ["sepalWidth", "number"], ["species", "string"]]);
            })*/
        })       
    })

    describe('Testing methods', () => {
        
        test('Testing loadData', () => {
            const store = new Store();
            const data = [
                ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                [5.1, 3.5, 1.4, 0.2, "setosa"],
                [4.9, 3, 1.4, 0.2, "setosa"],
                [4.7, 3.2, 1.3, 0.2, "setosa"]
            ];
            const header = new Map();
            header.set('sepalLength', 'number');
            header.set('sepalWidth', 'number');
            header.set('petalLength', 'number');
            header.set('petalWidth', 'number');
            header.set('spacies', 'string');
            store.loadData(data);
            expect(store.originalData).toEqual(new Data(data));
          //  expect(store.features).toEqual(header);
        })

        describe('Testing addGraph', () => {

            test('Must add one graph in graphs', () => {
                const store = new Store();
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                store.addGraph(graph1);
    
                expect(store.graphs.length).toEqual(1);
            })
    
            test('Must add one GraphState in last position', () => {
                const store = new Store();
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
                const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
                store.addGraph(graph1);
                store.addGraph(graph2);
                store.addGraph(graph3);
    
                expect(store.graphs[2]).toEqual(graph3);
            })
        })

        describe('Testing removeGraph', () => {

            test('Must have length 2', () => {
                const store = new Store();
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
                const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
                store.addGraph(graph1);
                store.addGraph(graph3);
                store.addGraph(graph2);
                store.removeGraph('id2');
    
                expect(store.graphs.length).toEqual(2);
            })
    
            test('Must remove the correct graph', () => {
                const store = new Store();
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
                const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
                store.addGraph(graph1);
                store.addGraph(graph3);
                store.addGraph(graph2);
                store.removeGraph('id2');
    
                expect(store.graphs).toEqual([graph1, graph3]);
            })
        })
    })
})