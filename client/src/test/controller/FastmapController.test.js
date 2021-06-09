/* eslint-disable object-property-newline */
import { beforeAll, describe, expect, test } from '@jest/globals';
import FastmapController from '../../controller/FastmapController';
import Store from '../../store/Store';

describe('Testing FastmapController', () => {

    let dataTest, fastmapController, store;

    beforeAll(() => {
        store = new Store();
        dataTest = [ 
            ['sepalLength', 'sepalWidth', 'petalLength', 'petalWidth', 'species'],
            [5.1, 3.5, 1.4, 0.2, 'setosa'],
            [4.9, 3, 1.4, 0.2, 'setosa'],
            [4.7, 3.2, 1.3, 0.2, 'setosa'],
            [4.6, 3.1, 1.5, 0.2, 'setosa'],
            [5, 3.6, 1.4, 0.2, 'setosa']
        ];
        fastmapController = new FastmapController(store);
    })

    beforeEach(() => {
        store.reset();
        store.loadData(dataTest);
        fastmapController.dimensions = 2;
        fastmapController.metric = 'manhattan';
    })

    describe('Testing createGraph method', () => {

        test('Must not be undefined', () => {
            fastmapController.createGraph('testFastmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            fastmapController.createGraph('testFastmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            fastmapController.createGraph('testFastmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testFastmapId');
        })

        test('Must have correct type', () => {
            fastmapController.createGraph('testFastmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('scpt');
        })

        test('Must have correct grouper', () => {
            fastmapController.createGraph('testFastmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            fastmapController.createGraph('testFastmapId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species'], false);
            const graphs = store.graphs;
            const expected = [
                {
                  Dimension1: 0.6000000000000001,
                  Dimension2: 2.781746103385195e-17,
                  species: 'setosa'
                },
                {
                  Dimension1: 0.40000000000000074,
                  Dimension2: 0.05345224838248486,
                  species: 'setosa'
                },
                {
                  Dimension1: 0.16666666666666752,
                  Dimension2: 0.24944382578492943,
                  species: 'setosa'
                },
                { Dimension1: 0, Dimension2: 0, species: 'setosa' },
                {
                  Dimension1: 0.5000000000000004,
                  Dimension2: 0.0267261241912424,
                  species: 'setosa'
                }
            ];
            expect(graphs[0].data).toEqual(expected);
        })
    })
})