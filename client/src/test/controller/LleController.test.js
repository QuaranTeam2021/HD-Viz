/* eslint-disable object-property-newline */
import { beforeAll, describe, expect, test } from '@jest/globals';
import LleController from '../../controller/LleController';
import Store from '../../store/Store';

describe('Testing lleController', () => {

    let dataTest, lleController, store;

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
        lleController = new LleController(store);
    })

    beforeEach(() => {
        store.reset();
        store.loadData(dataTest);
        lleController.dimensions = 2;
        lleController.neighbors = 10;
        lleController.metric = 'manhattan';
    })

    describe('Testing createGraph method', () => {

        test('Must not be undefined', () => {
            lleController.createGraph('testLleId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs).not.toBeUndefined();
        })

        test('Store must contain 1 graph', () => {
            lleController.createGraph('testLleId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            expect(store.graphs.length).toEqual(1);
        })

        test('Must have correct graphId', () => {
            lleController.createGraph('testLleId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].graphId).toEqual('testLleId');
        })

        test('Must have correct type', () => {
            lleController.createGraph('testLleId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].type).toEqual('scpt');
        })

        test('Must have correct grouper', () => {
            lleController.createGraph('testLleId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species']);
            const graphs = store.graphs;
            expect(graphs[0].grouper).toEqual('species');
        })

        test('Must have correct data', () => {
            lleController.createGraph('testLleId', 'scpt', ['sepalLength', 'petalLength', 'petalWidth'], ['species'], false);
            const graphs = store.graphs;
            const expected = [
                {
                  "Dimension1": 0.5908626937764252,
                  "Dimension2": -0.012902795708325357,
                  "species": "setosa",
                },
                {
                  "Dimension1": 0.07036739075219939,
                  "Dimension2": 0.7340935715947564,
                  "species": "setosa",
                },
                {
                  "Dimension1": -0.39204689133370074,
                  "Dimension2": 0.18239804478430233,
                  "species": "setosa",
                },
                {
                  "Dimension1": -0.6120846052731267,
                  "Dimension2": -0.35321773752566055,
                  "species": "setosa",
                },
                {
                  "Dimension1": 0.34290141207818886,
                  "Dimension2": -0.5503710831450729,
                  "species": "setosa",
                }
            ];
            expect(graphs[0].data).toEqual(expected);
        })
    })
})