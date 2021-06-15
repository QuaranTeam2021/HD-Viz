/* eslint-disable sort-keys */
/* eslint-disable max-lines */
import * as druid from "@saehrimnir/druidjs";
import { afterAll, beforeAll, describe, expect, jest, test } from '@jest/globals';
import Data from '../../store/Data';
import DistanceData from "../../store/DistanceData";
import FASTMAP from '../../store/Algorithm/FASTMAP';
import FastmapParameters from '../../store/Parameters/FastmapParameters';
import StandardGraph from '../../store/Graph/StandardGraph';
import Store from '../../store/Store';

describe('Testing Store class', () => {

    let store;

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(err => console.error(err));
        store = new Store();
    })

    beforeEach(() => {
        console.error.mockClear();
        store.reset();
    })

    afterAll(() => {
        console.error.mockRestore();
        store.reset();
    })

    describe('Testing constructors', () => {

        test('Must not be undefined', () => {
            expect(store).not.toBeUndefined();
        })

        test('Must be a Store instance', () => {
            expect(store).toBeInstanceOf(Store);
        })

        test('originalData must be type of Data', () => {
            expect(store.originalData).toBeInstanceOf(Data);
        })

        test('originalData must not undefined', () => {
            expect(store.originalData).not.toBeUndefined();
        })

        test('graphs must be type of Array', () => {
            expect(store.graphs).toBeInstanceOf(Array);
        })

        test('graphs must not undefined', () => {
            expect(store.graphs).not.toBeUndefined();
        })

        test('features must not undefined', () => {
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
                store.originalData = data;
                expect(store.originalData).not.toBeUndefined();
            })

            test('originalData must be instance of Data', () => {
                store.originalData = data;
                expect(store.originalData).toBeInstanceOf(Data)
            })

            test('originalData must not be empty', () => {
                store.originalData = data;
                expect(store.originalData).not.toEqual(new Data([]));
            })

            test('originalData must have correct value', () => {
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
                store.graphs = graphs;
                expect(store.graphs).not.toBeUndefined();
            })

            test('graphs must be instance of Array', () => {
                store.graphs = graphs;
                expect(store.graphs).toBeInstanceOf(Array)
            })

            test('graphs must not be empty', () => {
                store.graphs = graphs;
                expect(store.graphs).not.toEqual([]);
            })

            test('graphs must have correct value', () => {
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
                store.features = features;
                expect(store.features).not.toBeUndefined();
            })

            test('originalData must not be empty', () => {
                store.features = features;
                const maptest = new Map();
                expect(store.features).not.toEqual(maptest);
            })
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
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).not.toBeUndefined();
            })

            test('originalData must be instance of Data', () => {
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).toBeInstanceOf(Data)
            })

            test('originalData must not be empty', () => {
                store.originalData = data;
                const getterResult = store.originalData;
                expect(getterResult).not.toEqual(new Data([]));
            })

            test('originalData must have correct value', () => {
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
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).not.toBeUndefined();
            })

            test('graphs must be instance of Array', () => {
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).toBeInstanceOf(Array)
            })

            test('graphs must not be empty', () => {
                store.graphs = graphs;
                const getterResult = store.graphs;
                expect(getterResult).not.toEqual([]);
            })

            test('graphs must have correct value', () => {
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
                store.features = features;
                const getterResult = store.features;
                expect(getterResult).not.toBeUndefined();
            })

            test('features must not be empty', () => {
                store.features = features;
                const maptest = new Map();
                const getterResult = store.features;
                expect(getterResult).not.toEqual(maptest);
            })
        })       
    })

    describe('Testing methods', () => {
        
        test('Testing loadData', () => {
            
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
        })

        describe('Testing addGraph', () => {

            test('Must add one graph in graphs', () => {
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                store.addGraph(graph1);
                expect(store.graphs.length).toEqual(1);
            })
    
            test('Must add one GraphState in last position', () => {
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
                const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
                store.addGraph(graph1);
                store.addGraph(graph2);
                store.addGraph(graph3);
                expect(store.graphs[2]).toEqual(graph3);
            })
        })

        test('Testing updateGraph method', () => {
            const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
            const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
            const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
            store.addGraph(graph1);
            store.addGraph(graph2);
            store.updateGraph(1, graph3);
            expect(store.graphs).toEqual([graph1, graph3]);
        })

        test('Testing updateGraph method', () => {
            const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
            store.addGraph(graph1);
            store.getGraphIndexById('id4');
            expect(console.error).toBeCalledTimes(1);
            expect(console.error).toBeCalledWith('Id non presente');
        })

        describe('Testing removeGraph', () => {

            test('Must have length 2', () => {
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

        test('Testing getGraphById method', () => {
            const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
            const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
            const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
            store.addGraph(graph1);
            store.addGraph(graph3);
            store.addGraph(graph2);
            const res = store.getGraphById('id2')
            expect(res).toEqual(graph2);
        })

        test('Testing getGraphIndexById method', () => {
            const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
            const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
            const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
            store.addGraph(graph1);
            store.addGraph(graph3);
            store.addGraph(graph2);
            const res = store.getGraphIndexById('id2');
            expect(res).toEqual(2);
        })

        describe('Testing reset method', () => {

            test('Must remove originalData', () => {
                const data = [
                    ["sepalLength", "sepalWidth", "petalLength", "petalWidth", "species"],
                    [5.1, 3.5, 1.4, 0.2, "setosa"],
                    [4.9, 3, 1.4, 0.2, "setosa"],
                    [4.7, 3.2, 1.3, 0.2, "setosa"]
                ];
                store.originalData = data;
                store.reset();
                expect(store.originalData).toEqual(new Data());
            })
    
            test('Must remove all graphs from graphs', () => {
                const graph1 = new StandardGraph('id1', 'heatmap', 'species', []);
                const graph2 = new StandardGraph('id2', 'heatmap', 'species', []);
                const graph3 = new StandardGraph('id3', 'heatmap', 'species', []);
                store.addGraph(graph1);
                store.addGraph(graph2);
                store.addGraph(graph3);
                store.reset();
                expect(store.graphs.length).toEqual(0);
            })
        })

        test('Testing getNumericFeatures', () => {
            const features = new Map();
            features.set('sepalLength', 'number');
            features.set('sepalWidth', 'number');
            features.set('species', 'string');
            store.features = features;
            expect(store.getNumericFeatures()).toEqual(['sepalLength', 'sepalWidth']);
        })

        test('Testing getNumericFeatures', () => {
            const features = new Map();
            features.set('sepalLength', 'number');
            features.set('sepalWidth', 'number');
            features.set('species', 'string');
            store.features = features;
            expect(store.getStringFeatures()).toEqual(['species']);
        })

        describe('Testing calculateReduction', () => {

            test('Should not be undefined', () => {
                const d = [
                    ['feat1', 'feat2', 'feat3', 'feat4'],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5.0, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5.0, 3.4, 1.5, 0.2]
                ];
                store.loadData(d);
                let param = new FastmapParameters(2, d.matrix);
                let strategy = new FASTMAP();
                let res = store.calculateReduction(['feat1', 'feat2', 'feat3'], strategy, param);
                expect(res).not.toBeUndefined();
            })
    
            test('Must set an array', () => {
                const d = [
                    ['feat1', 'feat2', 'feat3', 'feat4'],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5.0, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5.0, 3.4, 1.5, 0.2]
                ];
                store.loadData(d);
                let param = new FastmapParameters(2, d.matrix);
                let strategy = new FASTMAP();
                let res = store.calculateReduction(['feat1', 'feat2', 'feat3'], strategy, param);
                expect(res).toBeInstanceOf(Array);
            })
    
            test('Must set the correct reduction array', () => {
                const d = [
                    ['feat1', 'feat2', 'feat3', 'feat4'],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5.0, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5.0, 3.4, 1.5, 0.2]
                ];
                store.loadData(d);
                let param = new FastmapParameters(2, d.matrix);
                let strategy = new FASTMAP();
                let res = store.calculateReduction(['feat1', 'feat2', 'feat3', 'feat4'], strategy, param);
                const expected = [
                    ['Dimension1', 'Dimension2'],
                    [0.10289915108550575, 0.11270864473859267],
                    [0, 0.08725830560407187],
                    [0.6002450479987811, 0.13270533977285934],
                    [1.1661903789690604, 0.087258305604072],
                    [0.20579830217101036, 0.3235828832817664],
                    [0.48019603839902486, 0]
                  ];
                expect(res).toEqual(expected);
            })
        })

        describe('Tetsing normalizeData', () => {

            test('Must not return undefined', () => {
                let data = [
                    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                    [5.1, 3.5, 1.4, 0.2, 'setosa'],
                    [4.9, 3, 1.4, 0.2, 'setosa']
                ];
                store.loadData(data);
                expect(store.normalizeData(['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'])).not.toBeUndefined();
            })

            test('Must return correct result', () => {
                let data = [
                    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                    [5.1, 3.5, 1.4, 0.2, 'setosa'],
                    [4.9, 3, 1.4, 0.2, 'setosa']
                ];
                store.loadData(data);
                const expected = [
                    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'],
                    [1, 1, 1, 1],
                    [0.9607843137254903, 0.8571428571428571, 1, 1]
                  ]
                expect(store.normalizeData(['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth'])).toEqual(expected);
            })
        })

        describe('Testing calculateDistanceData', () => {

            test('Testing euclidean distance', () => {
                let data = [
                    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                    [5.1, 3.5, 1.4, 0.2, 'setosa'],
                    [4.9, 3, 1.4, 0.2, 'setosa']
                ];
                store.loadData(data);
                let actual = store.calculateDistanceData(druid.euclidean, ['sepalLength', 'sepalWidth', 'petalWidth'], ['species']);
                let expected = new DistanceData([
                    { 'sepalLength': 5.1,
                        'sepalWidth': 3.5, 
                        'petalWidth': 0.2, 
                        'id': 'nodo_1', 
                        'group': 'setosa' },
                    { 'sepalLength': 4.9, 
                        'sepalWidth': 3, 
                        'petalWidth': 0.2, 
                        'id': 'nodo_2', 
                        'group': 'setosa' }
                    ], [
                    { "source": "nodo_1", 
                        "target": "nodo_2", 
                        "value": 0.5385164807134502 }
                ]);
                expect(actual).toEqual(expected);
            })

            test('Must not be undefined', () => {
                let data = [
                    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                    [5.1, 3.5, 1.4, 0.2, 'setosa'],
                    [4.9, 3, 1.4, 0.2, 'setosa']
                ];
                store.loadData(data);
                let actual = store.calculateDistanceData(druid.euclidean, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');
                expect(actual).not.toBeUndefined();
            })

            test('Must not be type of DistanceData', () => {
                let data = [
                    ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
                    [5.1, 3.5, 1.4, 0.2, 'setosa'],
                    [4.9, 3, 1.4, 0.2, 'setosa']
                ];
                store.loadData(data);
                let actual = store.calculateDistanceData(druid.euclidean, ['sepalLength', 'sepalWidth', 'petalWidth'], 'species');
                expect(actual).toBeInstanceOf(DistanceData);
            })
        })

        describe('Testing calculateSelectedData method', () => {

            test('Must return correct matrix', () => {
                const d = [
                    ['feat1', 'feat2', 'feat3', 'feat4'],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5.0, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5.0, 3.4, 1.5, 0.2]
                ];
                store.loadData(d);
                const expected = [
                    ['feat1', 'feat4'],
                    [4.7, 0.2],
                    [4.6, 0.2],
                    [5.0, 0.2],
                    [5.4, 0.4],
                    [4.6, 0.3],
                    [5.0, 0.2]
                ];
                expect(store.calculateSelectedData(['feat1', 'feat4'])).toEqual(expected);
            })

            test('Must not be undefined', () => {
                const d = [
                    ['feat1', 'feat2', 'feat3', 'feat4'],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5.0, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5.0, 3.4, 1.5, 0.2]
                ];
                store.loadData(d);
                expect(store.calculateSelectedData(['feat1', 'feat4'])).not.toBeUndefined();
            })

            test('Must return an array', () => {
                const d = [
                    ['feat1', 'feat2', 'feat3', 'feat4'],
                    [4.7, 3.2, 1.3, 0.2],
                    [4.6, 3.1, 1.5, 0.2],
                    [5.0, 3.6, 1.4, 0.2],
                    [5.4, 3.9, 1.7, 0.4],
                    [4.6, 3.4, 1.4, 0.3],
                    [5.0, 3.4, 1.5, 0.2]
                ];
                store.loadData(d);
                expect(store.calculateSelectedData(['feat1', 'feat4'])).toBeInstanceOf(Array);
            })
        })
    })
})